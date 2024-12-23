import SidebarNavigation from "@/components/admin/rhodium/rhodium-navigation";
import TriggerSidebarButton from "@/components/common/trigger-sidebar-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { SidebarProvider } from "@/components/ui/sidebar";
import { Bell, CalendarDays, User, Users } from "lucide-react";
import React from "react";
import { signOut } from "../../../../auth";
import { ThemeModeToggle } from "@/components/theme-toggle";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <div className="w-full flex h-screen overflow-hidden">
        <SidebarNavigation />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <div className="sticky top-0 z-50 bg-white border-b flex justify-between items-center px-4 md:px-6 2xl:px-10 py-4 h-16">
            <TriggerSidebarButton />
            <div className="flex items-center gap-8">
              <ThemeModeToggle />
              <Dialog>
                <DialogTrigger>
                  <div className="border hover:bg-dark hover:text-white w-10 h-10 flex justify-center items-center rounded-full">
                    <Bell />
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
                  <div className="w-12 hover:bg-dark hover:text-white h-12 rounded-full border flex justify-center items-center">
                    <User />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <form
                      action={async () => {
                        "use server";
                        await signOut();
                      }}
                    >
                      <button>Déconnexion</button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <main className="w-full">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
