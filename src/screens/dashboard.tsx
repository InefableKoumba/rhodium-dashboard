import { useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Bell, CalendarDays, DollarSign, Users } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./../components/ui/table";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    name: "Summer Music Festival",
    date: "2023-07-15",
    attendees: 5000,
    revenue: 150000,
  },
  {
    id: 2,
    name: "Tech Conference 2023",
    date: "2023-08-22",
    attendees: 3000,
    revenue: 90000,
  },
  {
    id: 3,
    name: "Food & Wine Expo",
    date: "2023-09-10",
    attendees: 4000,
    revenue: 120000,
  },
  {
    id: 4,
    name: "Art Gallery Opening",
    date: "2023-10-05",
    attendees: 1000,
    revenue: 30000,
  },
];

export default function Dashboard() {
  const [activeMenuItem, setActiveMenuItem] = useState("dashboard");

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-100 w-full">
        <Sidebar>
          <SidebarHeader>
            <h2 className="text-xl font-bold">RHODIUM</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveMenuItem("dashboard")}
                  isActive={activeMenuItem === "dashboard"}
                >
                  Dashboard
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveMenuItem("events")}
                  isActive={activeMenuItem === "events"}
                >
                  Events
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveMenuItem("users")}
                  isActive={activeMenuItem === "users"}
                >
                  Users
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveMenuItem("analytics")}
                  isActive={activeMenuItem === "analytics"}
                >
                  Analytics
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>

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

          <div className="grid gap-4 md:grid-cols-2 mt-8">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Tickets distribués</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ChartContainer
                  config={{
                    total: {
                      label: "Tickets distribués",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ticketsData}>
                      <XAxis
                        dataKey="name"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}`}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar
                        dataKey="total"
                        fill="var(--color-total)"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Utilisateurs de l'application</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ChartContainer
                  config={{
                    total: {
                      label: "Utilisateurs de l'application",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={usersData}>
                      <XAxis
                        dataKey="name"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}`}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar
                        dataKey="total"
                        fill="var(--color-total)"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Recent Events</CardTitle>
                <CardDescription>
                  You have {recentEvents.length} events this period.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Attendees</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentEvents.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell className="font-medium">
                          {event.name}
                        </TableCell>
                        <TableCell>{event.date}</TableCell>
                        <TableCell>
                          {event.attendees.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
