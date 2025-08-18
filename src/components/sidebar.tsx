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
  DollarSign,
  HandCoins,
  History,
  House,
  Info,
  Landmark,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Tickets,
  Users,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export default function SidebarNavigation() {
  const [activeMenuItem, setActiveMenuItem] = useState("home");
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    {
      href: "/",
      icon: LayoutDashboard,
      label: "Tableau de bord",
      active: pathname === "/",
    },
    {
      href: "/events",
      icon: Calendar1,
      label: "Évènements",
      active: pathname === "/events" || pathname?.startsWith("/events/"),
    },
    {
      href: "/users",
      icon: Users,
      label: "Utilisateurs",
      active: pathname === "/users" || pathname?.startsWith("/users/"),
    },
    {
      href: "/sponsorships",
      icon: Users,
      label: "Parrainages",
      active:
        pathname === "/sponsorships" || pathname?.startsWith("/sponsorships/"),
    },
    {
      href: "/ads",
      icon: Info,
      label: "Publicités",
      active: pathname === "/ads" || pathname?.startsWith("/ads/"),
    },
    {
      href: "/agents",
      icon: Users,
      label: "Agents",
      active: pathname === "/agents" || pathname?.startsWith("/agents/"),
    },
    {
      href: "/sales",
      icon: DollarSign,
      label: "Ventes",
      active: pathname === "/sales" || pathname?.startsWith("/sales/"),
    },
    {
      href: "/earnings",
      icon: DollarSign,
      label: "Bénéfices",
      active: pathname === "/earnings" || pathname?.startsWith("/earnings/"),
    },
    {
      href: "/mobile-money",
      icon: Landmark,
      label: "Mobile Money",
      active:
        pathname === "/mobile-money" || pathname?.startsWith("/mobile-money/"),
    },
    {
      href: "/whatsapp",
      icon: MessageSquare,
      label: "WhatsApp",
      active: pathname === "/whatsapp" || pathname?.startsWith("/whatsapp/"),
    },
    {
      href: "/settings",
      icon: Settings,
      label: "Paramètres",
      active: pathname === "/settings" || pathname?.startsWith("/settings/"),
    },
  ];

  return (
    <Sidebar className="fixed w-64 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
      <SidebarContent className="p-4">
        <div className="mb-8 px-4">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Rhodium
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Dashboard</p>
        </div>

        <SidebarMenu className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <SidebarMenuItem key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                    item.active
                      ? "bg-primary/10 text-primary dark:bg-primary/20"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <Icon size={20} className="flex-shrink-0" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
