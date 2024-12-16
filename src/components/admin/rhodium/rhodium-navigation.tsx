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
import {
  Calendar1,
  CalendarDays,
  ChartArea,
  ChartNoAxesCombined,
  House,
  LayoutDashboard,
  Tickets,
  Users,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import DashboardSelect from "../dashboard-select";

export default function SidebarNavigation() {
  const [activeMenuItem, setActiveMenuItem] = useState("home");
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Sidebar className="bg-dark shadow">
      <SidebarContent className="p-4 divide-y divide-gray-800">
        <DashboardSelect />
        <SidebarMenu className="border-t pt-4 space-y-2">
          <SidebarMenuItem>
            <Link
              href="/rhodium"
              className={`text-gray-400 flex space-x-2 items-center p-2 py-3 rounded-r-full transition-colors duration-500 ${
                pathname === "/rhodium"
                  ? "bg-darkLight text-white"
                  : "hover:bg-darkLight/50"
              }`}
            >
              <LayoutDashboard size={20} />
              <span>Tableau de bord</span>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link
              href="/rhodium/events"
              className={`text-gray-400 flex space-x-2 items-center p-2 py-3 rounded-r-full transition-colors duration-500 ${
                pathname === "/rhodium/events" ||
                pathname.startsWith("/rhodium/events")
                  ? "bg-darkLight text-white"
                  : "hover:bg-darkLight/50"
              }`}
            >
              <Calendar1 size={20} />
              <span>Evenements</span>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link
              href="/rhodium/users"
              className={`text-gray-400 flex space-x-2 items-center p-2 py-3 rounded-r-full transition-colors duration-500 ${
                pathname === "/rhodium/users" ||
                pathname.startsWith("/rhodium/users")
                  ? "bg-darkLight text-white"
                  : "hover:bg-darkLight/50"
              }`}
            >
              <Users size={20} />
              <span>Utilisateurs</span>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link
              href="/rhodium/analytics"
              className={`text-gray-400 flex space-x-2 items-center p-2 py-3 rounded-r-full transition-colors duration-500 ${
                pathname === "/rhodium/analytics" ||
                pathname.startsWith("/rhodium/analytics")
                  ? "bg-darkLight text-white"
                  : "hover:bg-darkLight/50"
              }`}
            >
              <Users size={20} />
              <span>Parrainages</span>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link
              href="/rhodium/analytics"
              className={`text-gray-400 flex space-x-2 items-center p-2 py-3 rounded-r-full transition-colors duration-500 ${
                pathname === "/rhodium/analytics" ||
                pathname.startsWith("/rhodium/analytics")
                  ? "bg-darkLight text-white"
                  : "hover:bg-darkLight/50"
              }`}
            >
              <ChartArea size={20} />
              <span>Analytiques</span>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarMenu className="border-t pt-4 hidden">
          <SidebarMenuItem>
            <SidebarMenuButton
              className={
                activeMenuItem === "home" ? "bg-primary text-white" : undefined
              }
              onClick={() => {
                setActiveMenuItem("home");
                router.push("/rhodium");
              }}
              isActive={activeMenuItem === "home"}
            >
              <House />
              Accueil
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              className={
                activeMenuItem === "events"
                  ? "bg-primary text-white"
                  : undefined
              }
              onClick={() => {
                setActiveMenuItem("events");
                router.push("/rhodium/events");
              }}
              isActive={activeMenuItem === "events"}
            >
              <CalendarDays />
              Evènements
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              className={
                activeMenuItem === "users" ? "bg-primary text-white" : undefined
              }
              onClick={() => {
                setActiveMenuItem("users");
                router.push("/rhodium/users");
              }}
              isActive={activeMenuItem === "users"}
            >
              <Users />
              Utilisateurs
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              className={
                activeMenuItem === "analytics"
                  ? "bg-primary text-white"
                  : undefined
              }
              onClick={() => {
                setActiveMenuItem("analytics");
                router.push("/rhodium/analytics");
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
