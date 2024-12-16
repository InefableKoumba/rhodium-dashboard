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
  ArrowLeftRight,
  ChartNoAxesCombined,
  House,
  Store,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function SidebarNavigation() {
  const [activeMenuItem, setActiveMenuItem] = useState("home");
  const router = useRouter();
  return (
    <Sidebar className="bg-white shadow">
      <SidebarContent className="pt-20 px-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className={
                activeMenuItem === "home" ? "bg-primary text-white" : undefined
              }
              onClick={() => {
                setActiveMenuItem("home");
                router.push("/rhopay");
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
                activeMenuItem === "transactions"
                  ? "bg-primary text-white"
                  : undefined
              }
              onClick={() => {
                setActiveMenuItem("transactions");
                router.push("/rhopay/transactions");
              }}
              isActive={activeMenuItem === "transactions"}
            >
              <ArrowLeftRight />
              Transactions
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              className={
                activeMenuItem === "deposit-withdrawal"
                  ? "bg-primary text-white"
                  : undefined
              }
              onClick={() => {
                setActiveMenuItem("deposit-withdrawal");
                router.push("/rhopay/deposit-withdrawal");
              }}
              isActive={activeMenuItem === "deposit-withdrawal"}
            >
              <ArrowLeftRight />
              Dépots & Retraits
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              className={
                activeMenuItem === "users" ? "bg-primary text-white" : undefined
              }
              onClick={() => {
                setActiveMenuItem("users");
                router.push("/rhopay/users");
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
                activeMenuItem === "marchants"
                  ? "bg-primary text-white"
                  : undefined
              }
              onClick={() => {
                setActiveMenuItem("marchants");
                router.push("/rhopay/marchants");
              }}
              isActive={activeMenuItem === "marchants"}
            >
              <Store />
              Marchands
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              className={
                activeMenuItem === "shops" ? "bg-primary text-white" : undefined
              }
              onClick={() => {
                setActiveMenuItem("shops");
                router.push("/rhopay/shops");
              }}
              isActive={activeMenuItem === "shops"}
            >
              <Store />
              Agence
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
