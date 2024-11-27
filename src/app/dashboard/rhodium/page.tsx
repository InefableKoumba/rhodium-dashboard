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
import Link from "next/link";
import { EventResponseInterface } from "@/interfaces/interfaces";
import { Button } from "@/components/ui/button";

export default async function Page() {
  const response = await fetch(process.env.API_URL + "/events?populate=*");
  const events = (await response.json())["data"] as EventResponseInterface[];
  // const response2 = await fetch(process.env.API_URL + "/users?populate=*");
  // const users = (await response2.json())["data"] as UserInterface[];

  return (
    <main className="flex-1 overflow-y-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboardcc</h1>
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
            <CardTitle className="text-sm font-medium">Total Invités</CardTitle>
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
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col xl:flex-row gap-4 mt-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Evenement récents</CardTitle>
            <CardDescription>
              Liste des {events.length} derniers événements.
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
                {events.slice(0, 5).map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">
                      <Link href={"/dashboard/events/" + event.id}>
                        {event.attributes.title}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link href={"/dashboard/events/" + event.id}>
                        {new Date(
                          event.attributes.date_start
                        ).toLocaleDateString("fr-FR", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {event.attributes.event_invitations?.data.length.toLocaleString(
                        "fr-FR"
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4">
              <Button className="w-full">Tout afficher</Button>
            </div>
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
                {events.map((event) => {
                  if (event.attributes.isValidatedByAdmin === "PENDING") {
                    return (
                      <TableRow key={event.id}>
                        <TableCell className="font-medium">
                          {event.attributes.title}
                        </TableCell>
                        <TableCell>
                          {new Date(
                            event.attributes.date_start
                          ).toLocaleDateString("fr-FR", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </TableCell>
                        <TableCell>
                          <Link
                            className="bg-black text-white py-2 px-3 rounded"
                            href={"/dashboard/events/" + event.id}
                          >
                            Ouvrir
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  }
                  return null;
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
