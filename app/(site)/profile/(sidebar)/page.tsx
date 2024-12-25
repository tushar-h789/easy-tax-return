"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTransition } from "react";
import { updateUser } from "../actions";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Check, Loader2, Pencil, X } from "lucide-react";
import { Prisma } from "@prisma/client";
import { useRouter } from "next/navigation";

function formatDate(date: Date | string) {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

type UpdateUserData = {
  phone?: string;
};

type UserWithOrders = Prisma.UserGetPayload<{
  include: {
    orders: {
      include: {
        individualTaxes: true;
      };
    };
  };
}>;

export default function ProfilePage() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [user, setUser] = useState<UserWithOrders | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/users/me");
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        setUser(userData);
        setPhoneNumber(userData.phone || "");
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        toast({
          title: "Error",
          description: "Failed to load profile data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [toast]);

  const handleUpdate = async (data: UpdateUserData) => {
    startTransition(async () => {
      try {
        await updateUser(data);
        setIsEditing(false);

        if (user) {
          setUser({ ...user, phone: data.phone || null });
        }

        toast({
          title: "Success",
          description: "Phone number updated successfully",
        });
      } catch (error) {
        toast({
          title: "Error",
          description:
            error instanceof Error ? error.message : "Failed to update profile",
          variant: "destructive",
        });
      }
    });
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleUpdate({ phone: phoneNumber });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="container mx-auto text-center py-8">
        <h1 className="text-2xl font-bold text-red-500">
          Error Loading Profile
        </h1>
        <p className="text-gray-600 mt-2">
          {error || "Failed to load user data"}
        </p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Try Again
        </Button>
      </div>
    );
  }

  const recentOrders = user.orders.slice(0, 5);
  const hasMoreOrders = user.orders.length > 5;

  return (
    <div className="container mx-auto min-h-[600px]">
      <h1 className="text-4xl font-bold text-primary mb-8">My Profile</h1>

      <div className="grid gap-6">
        {/* Basic Info Card */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.image || ""} alt={user.name || ""} />
              <AvatarFallback>
                {user.name?.charAt(0) || user.email?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{user.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Phone Number
                </dt>
                <dd className="mt-1 text-sm text-gray-900 flex items-center gap-2">
                  {isEditing ? (
                    <form onSubmit={handlePhoneSubmit} className="flex gap-2">
                      <Input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+1234567890"
                        className="w-[200px]"
                      />
                      <Button
                        type="submit"
                        size="icon"
                        className="h-8 w-8"
                        disabled={isPending}
                      >
                        {isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Check className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => {
                          setIsEditing(false);
                          setPhoneNumber(user.phone || "");
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </form>
                  ) : (
                    <>
                      <span>{user.phone || "Not set"}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setIsEditing(true)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Member Since
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {formatDate(user.createdAt)}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        {/* Latest Tax Returns Card */}
        <Card>
          <CardHeader>
            <CardTitle>Latest Tax Returns</CardTitle>
          </CardHeader>
          <CardContent>
            {recentOrders.length > 0 ? (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex justify-between items-center border-b pb-4 last:border-0"
                  >
                    <div>
                      <p className="text-sm font-medium">Return #{order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        ${order.amount?.toFixed(2)}
                      </p>
                      <p className="text-sm text-muted-foreground capitalize">
                        {order.paymentStatus.toLowerCase()}
                      </p>
                    </div>
                  </div>
                ))}
                {hasMoreOrders && (
                  <div className="text-center pt-4">
                    <Button
                      variant="outline"
                      onClick={() => router.push("/profile/submitted")}
                    >
                      See All Returns
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No tax returns yet.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
