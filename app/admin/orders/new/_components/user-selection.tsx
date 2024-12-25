"use client";

import { useState } from "react";
import { Check, ChevronsUpDown, PlusCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useQueryString from "@/hooks/use-query-string";
import { useRouter } from "next/navigation";
import CreateUserDialog from "./create-user-dialog";

interface User {
  id: string;
  name: string | null;
  email: string | null;
}

interface UserSelectionProps {
  users?: User[];
}

export default function UserSelection({ users = [] }: UserSelectionProps) {
  const [openCombobox, setOpenCombobox] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { createQueryString } = useQueryString();
  const router = useRouter();

  // Prevent opening the popover when users aren't loaded
  const handleOpenChange = (open: boolean) => {
    if (!users?.length && open) return;
    setOpenCombobox(open);
  };

  return (
    <Card className="mb-8 shadow-md">
      <CardHeader>
        <CardTitle>Select User</CardTitle>
        <CardDescription>
          Choose an existing user or create a new one to process their tax
          return
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 flex-col md:flex-row">
          <div className="flex-1">
            <Popover open={openCombobox} onOpenChange={handleOpenChange}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openCombobox}
                  className="w-full justify-between"
                  disabled={!users}
                >
                  <span className="text-muted-foreground flex items-center gap-2 min-w-0">
                    {selectedUser ? (
                      <span className="flex items-center gap-2 truncate">
                        <span className="font-medium text-foreground whitespace-nowrap">
                          {selectedUser.name || "Unnamed User"}
                        </span>
                        <span className="text-muted-foreground text-sm truncate">
                          ({selectedUser.email || "No email"})
                        </span>
                      </span>
                    ) : (
                      "Select a user"
                    )}
                  </span>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Command>
                  <CommandInput placeholder="Search users..." />
                  <CommandList>
                    <CommandEmpty>No users found.</CommandEmpty>
                    <CommandGroup>
                      {users?.map((user) => (
                        <CommandItem
                          key={user.id}
                          value={user.email ?? user.id} // Fallback to id if email is null
                          onSelect={() => {
                            setSelectedUser(user);
                            setOpenCombobox(false);
                            // Update URL with selected user_id
                            const queryString = createQueryString({
                              user_id: user.id,
                            });
                            router.push(`?${queryString}`);
                          }}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center">
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedUser?.id === user.id
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            <div>
                              <p className="font-medium">
                                {user.name || "Unnamed User"}
                              </p>
                              <p className="text-xs text-muted-foreground truncate">
                                {user.email || "No email"}
                              </p>
                            </div>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <CreateUserDialog />
        </div>

        {selectedUser && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-blue-900">Selected User</h3>
                <p className="text-sm text-blue-700">
                  You are creating a tax return for:
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedUser(null)}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-100"
              >
                Change
              </Button>
            </div>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-white rounded-md shadow-sm">
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">
                  {selectedUser.name || "Unnamed User"}
                </p>
              </div>
              <div className="p-3 bg-white rounded-md shadow-sm">
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">
                  {selectedUser.email || "No email provided"}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
