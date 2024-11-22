import { Bell, CalendarDays, DollarSign, Users } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";
import SidebarNavigation from "@/components/navigation";
import UsersChart from "@/components/analytics/charts/users";
import TicketsChart from "@/components/analytics/charts/tickets";

const ticketsData = [
  { name: "Jan", total: 7600 },
  { name: "Feb", total: 9000 },
  { name: "Mar", total: 6500 },
  { name: "Apr", total: 8100 },
  { name: "May", total: 12000 },
  { name: "Jun", total: 8000 },
];

const usersData = [
  { name: "Jan", total: 1200 },
  { name: "Feb", total: 1800 },
  { name: "Mar", total: 2200 },
  { name: "Apr", total: 2800 },
  { name: "May", total: 3500 },
  { name: "Jun", total: 4000 },
];

const recentEvents = [
  {
    id: 1,
    name: "Concert Fally Ipupa",
    date: "2023-07-15",
    attendees: 5000,
    revenue: 150000,
  },
  {
    id: 2,
    name: "La fête de la musique",
    date: "2023-08-22",
    attendees: 3000,
    revenue: 90000,
  },
  {
    id: 3,
    name: "Festival de Jazz",
    date: "2023-09-12",
    attendees: 2000,
    revenue: 60000,
  },
  {
    id: 4,
    name: "Festival de la mode",
    date: "2023-10-05",
    attendees: 1000,
    revenue: 30000,
  },
  {
    id: 5,
    name: "Festival de la gastronomie",
    date: "2023-11-20",
    attendees: 4000,
    revenue: 120000,
  },
  {
    id: 6,
    name: "Festival de la culture",
    date: "2023-12-10",
    attendees: 6000,
    revenue: 180000,
  },
];

export default function Page() {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-100 w-full">
        <SidebarNavigation />

        <main className="flex-1 overflow-y-auto p-8">
          <div className="flex justify-end items-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total évènements
                </CardTitle>
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">254</div>
                <p className="text-xs text-muted-foreground">
                  +12% par rapport au mois passé
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Invités
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">10 483</div>
                <p className="text-xs text-muted-foreground">
                  +18% par rapport au mois passé
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total tickets vendus
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">534 200 XAF</div>
                <p className="text-xs text-muted-foreground">
                  +5% par rapport au mois passé
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Evenements en promotion
                </CardTitle>
                <Bell className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">
                  +2 from last week
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="flex gap-4 mt-4">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Evenement récents</CardTitle>
                <CardDescription>
                  List des {recentEvents.length} derniers événements.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Evènement</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Invités</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentEvents.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell className="font-medium">
                          {event.name}
                        </TableCell>
                        <TableCell>
                          {new Date(event.date).toLocaleDateString("fr-FR", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </TableCell>
                        <TableCell>
                          {event.attendees.toLocaleString("fr-FR")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>En attente de validation</CardTitle>
                <CardDescription>
                  Les évènements ci-dessous sont en attente de validation.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Evènement</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentEvents.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell className="font-medium">
                          {event.name}
                        </TableCell>
                        <TableCell>
                          {new Date(event.date).toLocaleDateString("fr-FR", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </TableCell>
                        <TableCell>
                          <Button>Ouvrir</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 mt-8">
            <TicketsChart data={ticketsData} />
            <UsersChart data={usersData} />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
