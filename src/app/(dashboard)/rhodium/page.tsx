import {
  Bell,
  CalendarDays,
  DollarSign,
  ExternalLink,
  Users,
} from "lucide-react";

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
import { strapiSdk } from "@/strapi";

export default async function Page() {
  const eventsCollection = strapiSdk.collection("events");
  const allEvents = await eventsCollection.find({
    populate: "*",
    sort: "createdAt:desc",
  });
  const events: EventResponseInterface[] = allEvents.data as any;

  const eventsInvitationsCollection = strapiSdk.collection("event-invitations");
  const allEventsInvitations = await eventsInvitationsCollection.find({
    populate: "*",
  });

  // const ticketsCollection = strapiSdk.collection("tickets");
  // const allTickets = await ticketsCollection.find({
  //   populate: "*",
  // });
  // const tickets: TicketInterface[] = allTickets.data as any;

  const transactionsCollection = strapiSdk.collection("transactions");
  const allTransactions = await transactionsCollection.find({
    populate: "*",
    filters: {
      status: "SUCCESSFUL",
    },
  });
  const transactions = allTransactions.data as any;
  let soldTicketsNum = 0;
  for (const t of transactions) {
    soldTicketsNum += t.attributes.tickets.data.length;
  }

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <h1 className="text-3xl font-extrabold mb-6 text-dark">
        Tableau de bord Rhodium
      </h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total évènements
            </CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{events.length}</div>
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
            <div className="text-2xl font-bold">
              {allEventsInvitations.data.length}
            </div>
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
            <div className="text-2xl font-bold">{soldTicketsNum}</div>
            <p className="text-xs text-muted-foreground">
              +5% par rapport au mois passé
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Publicités</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              +2% par rapport au mois passé
            </p>
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
                  <TableHead>Type d&apos;accès</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.slice(0, 5).map((event) => (
                  <TableRow key={event.id} className="cursor-pointer">
                    <TableCell className="font-medium w-[50%]">
                      <Link href={"/rhodium/events/" + event.id}>
                        {event.attributes.title}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link href={"/rhodium/events/" + event.id}>
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
                      {event.attributes.hasCost ? (
                        <div className="bg-darkLight text-white rounded-full px-3 py-1 flex items-center justify-center">
                          Payant
                        </div>
                      ) : (
                        <div className="border rounded-full px-3 py-1 flex items-center justify-center">
                          Gratuit
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4">
              <Link
                href={"/rhodium/events"}
                className="w-full bg-dark hover:bg-darkLight text-white flex items-center gap-x-2 border justify-center py-2 rounded-lg"
              >
                Tout afficher
              </Link>
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
                            className="border-2 flex justify-center bg-dark hover:bg-darkLight text-white transform transition-colors duration-200 items-center gap-2 py-2 rounded-full"
                            href={"/rhodium/events/" + event.id}
                          >
                            Ouvrir
                            <ExternalLink size={14} />
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
    </div>
  );
}
