"use client";
import React, { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

export default function SidebarNavigation() {
  const [activeMenuItem, setActiveMenuItem] = useState("dashboard");
  return (
    <Sidebar>
      <SidebarHeader className="px-4 pt-4">
        <h2 className="text-xl font-bold text-black">RHODIUM</h2>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setActiveMenuItem("dashboard")}
              isActive={activeMenuItem === "dashboard"}
            >
              Accueil
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setActiveMenuItem("events")}
              isActive={activeMenuItem === "events"}
            >
              Evènements
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setActiveMenuItem("users")}
              isActive={activeMenuItem === "users"}
            >
              Utilisateurs
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setActiveMenuItem("analytics")}
              isActive={activeMenuItem === "analytics"}
            >
              Analytiques
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
