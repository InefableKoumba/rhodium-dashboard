import DashboardTypeSelect from "@/components/admin/dashboard-type-select";
import SidebarNavigation from "@/components/admin/rhodium-navigation";
import TriggerSidebarButton from "@/components/common/trigger-sidebar-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="w-full flex h-screen overflow-hidden">
        <SidebarNavigation />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <div className="sticky top-0 z-50 bg-white border-b flex justify-between items-center px-4 md:px-6 2xl:px-10 py-4 h-16">
            <TriggerSidebarButton />
            {/* <DashboardTypeSelect /> old Dashboard Type Selector */}
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <main className="w-full">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
