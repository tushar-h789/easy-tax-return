"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Card } from "@/components/ui/card";
import { User, FileText, FileCheck } from "lucide-react";

const navItems = [
  {
    label: "My Profile",
    href: "/profile",
    icon: User,
  },
  {
    label: "Submitted Tax Returns",
    href: "/profile/submitted",
    icon: FileCheck,
  },
  {
    label: "Saved Tax Returns",
    href: "/profile/saved",
    icon: FileText,
  },
];

export default function ProfileNav() {
  const pathname = usePathname();

  return (
    <Card className="p-4">
      <nav className="grid grid-cols-3 md:grid-cols-1 gap-2 md:space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col md:flex-row items-center md:items-center gap-1 md:gap-2 p-2 md:px-4 md:py-2 rounded-lg transition-colors text-center md:text-left ${
                isActive
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "hover:bg-gray-100"
              }`}
            >
              <Icon className="w-6 h-6 md:w-5 md:h-5 flex-shrink-0" />
              <span className="text-xs md:text-base font-medium leading-tight md:leading-normal">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </Card>
  );
}
