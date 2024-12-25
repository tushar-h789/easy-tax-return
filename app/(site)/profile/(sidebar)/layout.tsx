import React from "react";
import ProfileNav from "./_components/profile-nav";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto max-w-7xl py-12 px-4 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-8">
        <div className="md:col-span-3 sticky top-4">
          <ProfileNav />
        </div>
        <div className="md:col-span-9 py-10 md:py-0">{children}</div>
      </div>
    </div>
  );
}
