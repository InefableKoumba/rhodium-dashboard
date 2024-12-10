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
import { Calendar1, CalendarDays, ChartArea, ChartNoAxesCombined, House, LayoutDashboard, LucideGitGraph, Tickets, Users, Users2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import DashboardSelect from "./dashboard-select";
import Link from "next/link";

export default function SidebarNavigation() {
  const [activeMenuItem, setActiveMenuItem] = useState("dashboard");
  const router = useRouter();
  const pathname = usePathname()
  return (
    <Sidebar className="bg-gray-900 shadow">
      <div className="logo p-4">
        <div className="h-16 bg-primary w-full rounded-lg" />
      </div>
      <SidebarContent className="p-4 divide-y divide-gray-800">
        <DashboardSelect />
        <SidebarMenu className="border-t pt-4 space-y-2">
          <SidebarMenuItem>
            <Link
              href="/dashboard/rhodium"
              className={`group flex space-x-2 items-center p-2 py-3 rounded-r-full transition-colors duration-500 ${pathname === "/dashboard/rhodium" ? "bg-primary" : "hover:bg-primary/50"}`}
            >
              <LayoutDashboard 
                className={pathname === "/dashboard/rhodium" ? "text-white" : "text-gray-400 group-hover:text-white"} 
                size={20} 
              />
              <span 
                className={`text-sm ${pathname === "/dashboard/rhodium" ? "text-white" : "text-gray-400 group-hover:text-white"}`}
              >Tableau de bord</span>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link
              href="/dashboard/rhodium/events"
              className={`group flex space-x-2 items-center p-2 py-3 rounded-r-full transition-colors duration-500 ${(pathname === "/dashboard/rhodium/events" || pathname.startsWith("/dashboard/rhodium/events")) ? "bg-primary" : "hover:bg-primary/50"}`}
            >
              <Calendar1 
                className={(pathname === "/dashboard/rhodium/events" || pathname.startsWith("/dashboard/rhodium/events")) ? "text-white" : "text-gray-400 group-hover:text-white"} 
                size={20} 
              />
              <span 
                className={`text-sm ${(pathname === "/dashboard/rhodium/events" || pathname.startsWith("/dashboard/rhodium/events")) ? "text-white" : "text-gray-400 group-hover:text-white"}`}
              >Evenements</span>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link
              href="/dashboard/rhodium/tickets"
              className={`group flex space-x-2 items-center p-2 py-3 rounded-r-full transition-colors duration-500 ${(pathname === "/dashboard/rhodium/tickets" || pathname.startsWith("/dashboard/rhodium/tickets")) ? "bg-primary" : "hover:bg-primary/50"}`}
            >
              <Tickets 
                className={(pathname === "/dashboard/rhodium/tickets" || pathname.startsWith("/dashboard/rhodium/tickets")) ? "text-white" : "text-gray-400 group-hover:text-white"} 
                size={20} 
              />
              <span 
                className={`text-sm ${(pathname === "/dashboard/rhodium/tickets" || pathname.startsWith("/dashboard/rhodium/tickets")) ? "text-white" : "text-gray-400 group-hover:text-white"}`}
              >Gestion de tickets</span>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link
              href="/dashboard/rhodium/users"
              className={`group flex space-x-2 items-center p-2 py-3 rounded-r-full transition-colors duration-500 ${(pathname === "/dashboard/rhodium/users" || pathname.startsWith("/dashboard/rhodium/users")) ? "bg-primary" : "hover:bg-primary/50"}`}
            >
              <Users 
                className={(pathname === "/dashboard/rhodium/users" || pathname.startsWith("/dashboard/rhodium/users")) ? "text-white" : "text-gray-400 group-hover:text-white"} 
                size={20} 
              />
              <span 
                className={`text-sm ${(pathname === "/dashboard/rhodium/users" || pathname.startsWith("/dashboard/rhodium/users")) ? "text-white" : "text-gray-400 group-hover:text-white"}`}
              >Utilisateurs</span>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link
              href="/dashboard/rhodium/analytics"
              className={`group flex space-x-2 items-center p-2 py-3 rounded-r-full transition-colors duration-500 ${(pathname === "/dashboard/rhodium/analytics" || pathname.startsWith("/dashboard/rhodium/analytics")) ? "bg-primary" : "hover:bg-primary/50"}`}
            >
              <ChartArea 
                className={(pathname === "/dashboard/rhodium/analytics" || pathname.startsWith("/dashboard/rhodium/analytics")) ? "text-white" : "text-gray-400 group-hover:text-white"} 
                size={20} 
              />
              <span 
                className={`text-sm ${(pathname === "/dashboard/rhodium/analytics" || pathname.startsWith("/dashboard/rhodium/analytics")) ? "text-white" : "text-gray-400 group-hover:text-white"}`}
              >Analytiques</span>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>


        <SidebarMenu className="border-t pt-4 hidden"> {/* Hide old menu */}
          <SidebarMenuItem>
            <SidebarMenuButton
              className={
                activeMenuItem === "home" ? "bg-primary text-white" : undefined
              }
              onClick={() => {
                setActiveMenuItem("home");
                router.push("/dashboard/rhodium");
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
                router.push("/dashboard/rhodium/events");
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
                router.push("/dashboard/rhodium/users");
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
                router.push("/dashboard/rhodium/analytics");
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
