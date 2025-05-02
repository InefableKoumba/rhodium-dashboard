"use client";
import React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import SidebarNavigation from "@/components/sidebar";
import TriggerSidebarButton from "@/components/common/trigger-sidebar-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { Bell, CalendarDays, User, Users } from "lucide-react";
import { ThemeModeToggle } from "@/components/theme-toggle";
import { signOut } from "next-auth/react";

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { state } = useSidebar();
  const isExpanded = state === "expanded";

  return (
    <div
      className={`flex-1 flex flex-col overflow-auto ${
        isExpanded ? "ml-64" : "ml-0"
      } w-full transition-all duration-200`}
    >
      <div className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b dark:border-gray-800 flex justify-between items-center px-4 md:px-6 2xl:px-10 py-4 h-16">
        <TriggerSidebarButton />
        <div className="flex items-center gap-8">
          <ThemeModeToggle />
          <Dialog>
            <DialogTrigger>
              <div className="border dark:border-gray-800 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 w-10 h-10 flex justify-center items-center rounded-full">
                <Bell color="#555" />
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-[800px]">
              <DialogHeader>
                <DialogTitle>Bilan de la journée d&apos;hier</DialogTitle>
                <DialogDescription>
                  Voici un résumé de ce qui s&apos;est passé hier.
                </DialogDescription>
              </DialogHeader>
              <div>
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Nouveaux utilisateurs
                      </CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">483</div>
                      <p className="text-xs text-muted-foreground">
                        +18% par rapport au jour précédent
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Nouveaux évènements publics
                      </CardTitle>
                      <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">24</div>
                      <p className="text-xs text-muted-foreground">
                        +12% par rapport au mois passé
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Nouveaux évènements privés
                      </CardTitle>
                      <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">7</div>
                      <p className="text-xs text-muted-foreground">
                        +41% par rapport au mois passé
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Paiement de parrainage
                      </CardTitle>
                      <Bell className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">240</div>
                      <p className="text-xs text-muted-foreground">
                        +2% par rapport au jour précédent
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="w-12 h-12 rounded-full border hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-100 flex justify-center items-center">
                <User color="#555" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>
                Déconnexion
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <main className="w-full">{children}</main>
    </div>
  );
}

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider>
        <div className="flex w-full h-screen">
          <SidebarNavigation />
          <DashboardContent>{children}</DashboardContent>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}
