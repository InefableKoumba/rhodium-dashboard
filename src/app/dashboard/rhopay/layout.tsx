import DashboardTypeSelect from "@/components/admin/dashboard-type-select";
import SidebarNavigation from "@/components/admin/rhopay-navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full z-10">
        <SidebarNavigation />
        <div className="fixed w-full z-50 bg-white border-b flex justify-between items-center px-6 h-16">
          <DashboardTypeSelect />
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="w-full mt-16">{children}</div>
      </div>
    </SidebarProvider>
  );
}
