"use client";
import React, { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { CalendarDays, ChartNoAxesCombined, House, Users } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SidebarNavigation() {
  const [activeMenuItem, setActiveMenuItem] = useState("dashboard");
  const router = useRouter();
  return (
    <Sidebar>
      <SidebarContent className="pt-20 pl-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => {
                setActiveMenuItem("dashboard");
                router.push("/rhodium/dashboard");
              }}
              isActive={activeMenuItem === "dashboard"}
            >
              <House />
              Accueil
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => {
                setActiveMenuItem("events");
                router.push("/rhodium/dashboard/events");
              }}
              isActive={activeMenuItem === "events"}
            >
              <CalendarDays />
              Evènements
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => {
                setActiveMenuItem("users");
                router.push("/rhodium/dashboard/users");
              }}
              isActive={activeMenuItem === "users"}
            >
              <Users />
              Utilisateurs
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => {
                setActiveMenuItem("analytics");
                router.push("/rhodium/dashboard/analytics");
              }}
              isActive={activeMenuItem === "analytics"}
            >
              <ChartNoAxesCombined />
              Analytiques
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
