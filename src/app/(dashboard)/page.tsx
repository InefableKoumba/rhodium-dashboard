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
import { Event, EventStatus } from "@/types/types";
import { getEvents } from "@/lib/actions";

export default async function Page() {
  const response = await getEvents();
  const events = response.events;
  const totalEvents = response.total;
  const pendingEvents = events.filter(
    (event: Event) => event.status === EventStatus.PENDING
  );
  const soldTicketsNum = events.reduce(
    (acc: number, event: Event) => acc + (event.tickets?.length || 0),
    0
  );

  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Tableau de bord Rhodium
        </h1>
        <p className="text-sm text-muted-foreground">
          Aperçu général de votre activité
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 dark:border-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-6">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Total évènements
            </CardTitle>
            <div className="p-2 bg-primary/10 rounded-lg">
              <CalendarDays className="size-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {events.length}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              +12% par rapport au mois passé
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 dark:border-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-6">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Total Invités
            </CardTitle>
            <div className="p-2 bg-primary/10 rounded-lg">
              <Users className="size-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {events.reduce(
                (acc: number, event: Event) =>
                  acc + (event.invitations?.length || 0),
                0
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              +18% par rapport au mois passe
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 dark:border-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-6">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Total tickets vendus
            </CardTitle>
            <div className="p-2 bg-primary/10 rounded-lg">
              <DollarSign className="size-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {soldTicketsNum}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              +5% par rapport au mois passé
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 dark:border-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-6">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Publicités
            </CardTitle>
            <div className="p-2 bg-primary/10 rounded-lg">
              <Bell className="size-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              0
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              +2% par rapport au mois passe
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 dark:border-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
              Evenement récents
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Liste des {events.length} derniers événements.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border dark:border-gray-800 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 dark:bg-gray-800/50">
                    <TableHead className="text-gray-600 dark:text-gray-300">
                      Evènement
                    </TableHead>
                    <TableHead className="text-gray-600 dark:text-gray-300">
                      Date
                    </TableHead>
                    <TableHead className="text-gray-600 dark:text-gray-300">
                      Type d&apos;accès
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.slice(0, 5).map((event: Event) => (
                    <TableRow
                      key={event.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <TableCell className="font-medium">
                        <Link
                          href={"/events/" + event.id}
                          className="text-primary hover:text-primary/80 transition-colors"
                        >
                          {event.title}
                        </Link>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(event.startsAt).toLocaleDateString("fr-FR", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        {!event.isFree ? (
                          <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                            Payant
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-800 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:text-gray-300">
                            Gratuit
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-4">
              <Link
                href={"/events"}
                className="w-full bg-primary hover:bg-primary/90 text-white flex items-center justify-center py-2 rounded-lg transition-colors"
              >
                Tout afficher
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 dark:border-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
              En attente de validation
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Les évènements ci-dessous sont en attente de validation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border dark:border-gray-800 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 dark:bg-gray-800/50">
                    <TableHead className="text-gray-600 dark:text-gray-300">
                      Evènement
                    </TableHead>
                    <TableHead className="text-gray-600 dark:text-gray-300">
                      Date
                    </TableHead>
                    <TableHead className="text-gray-600 dark:text-gray-300"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingEvents.map((event: Event) => (
                    <TableRow
                      key={event.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <TableCell className="font-medium text-gray-900 dark:text-white">
                        {event.title}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(event.startsAt).toLocaleDateString("fr-FR", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        <Link
                          className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
                          href={"/events/" + event.id}
                        >
                          Ouvrir
                          <ExternalLink size={14} />
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
