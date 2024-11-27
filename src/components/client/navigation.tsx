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
import { CalendarDays, Compass, DollarSign, House } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SidebarNavigation() {
  const [activeMenuItem, setActiveMenuItem] = useState("dashboard");
  const router = useRouter();
  return (
    <Sidebar className="bg-white">
      <SidebarContent className="pt-20 pl-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => {
                setActiveMenuItem("home");
                router.push("/");
              }}
              isActive={activeMenuItem === "home"}
            >
              <House />
              Accueil
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => {
                setActiveMenuItem("explore");
                router.push("/explore");
              }}
              isActive={activeMenuItem === "events"}
            >
              <Compass />
              Explorer
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => {
                setActiveMenuItem("my-events");
                router.push("/my-events");
              }}
              isActive={activeMenuItem === "my-events"}
            >
              <CalendarDays />
              Evènements
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => {
                setActiveMenuItem("rhopay");
                router.push("/rhopay");
              }}
              isActive={activeMenuItem === "rhopay"}
            >
              <DollarSign />
              Rhopay
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
