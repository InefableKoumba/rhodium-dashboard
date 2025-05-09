import EventsTable from "@/components/tables/events-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Event, EventStatus } from "@/types/types";
import {
  Calendar,
  Clock,
  X,
  Users,
  DollarSign,
  Lock,
  Unlock,
  Plus,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getEvents } from "@/lib/actions";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Page() {
  const { events } = await getEvents({});

  const privateEvents = events.filter((event) => event.isPrivate);
  const publicEvents = events.filter((event) => !event.isPrivate);
  const freeEvents = events.filter((event) => event.isFree);
  const paidEvents = events.filter((event) => !event.isFree);
  const upcomingEvents = events.filter(
    (event) => new Date(event.startsAt) > new Date()
  );
  const pastEvents = events.filter(
    (event) => new Date(event.startsAt) <= new Date()
  );
  const rejectedEvents = events.filter(
    (event) => event.status === EventStatus.REJECTED
  );

  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              Gestion des évènements
            </h1>
            <p className="text-sm text-muted-foreground">
              Gérez et suivez tous vos évènements
            </p>
          </div>
          <Link href="/events/new">
            <Button className="gap-2">
              <Plus className="size-4" />
              Ajouter un évènement
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 dark:border-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-6">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Evènements privés
            </CardTitle>
            <div className="p-2 bg-primary/10 rounded-lg">
              <Lock className="size-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {privateEvents.length}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {privateEvents.length === 1
                ? "Évènement privé"
                : "Évènements privés"}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 dark:border-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-6">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Evènements publics
            </CardTitle>
            <div className="p-2 bg-primary/10 rounded-lg">
              <Unlock className="size-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {publicEvents.length}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {publicEvents.length === 1
                ? "Évènement public"
                : "Évènements publics"}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 dark:border-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-6">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Evènements gratuits
            </CardTitle>
            <div className="p-2 bg-primary/10 rounded-lg">
              <Users className="size-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {freeEvents.length}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {freeEvents.length === 1
                ? "Évènement gratuit"
                : "Évènements gratuits"}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 dark:border-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-6">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Evènements payants
            </CardTitle>
            <div className="p-2 bg-primary/10 rounded-lg">
              <DollarSign className="size-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {paidEvents.length}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {paidEvents.length === 1
                ? "Évènement payant"
                : "Évènements payants"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="incoming_events" className="w-full">
        <TabsList className="bg-white dark:bg-gray-900 dark:border-gray-800 shadow-sm">
          <TabsTrigger
            value="incoming_events"
            className="gap-2 px-6 data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            <Calendar size={20} />
            Evènements à venir ({upcomingEvents.length})
          </TabsTrigger>
          <TabsTrigger
            value="passed_events"
            className="gap-2 px-6 data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            <Clock size={20} />
            Evènements passés ({pastEvents.length})
          </TabsTrigger>
          <TabsTrigger
            value="rejected_events"
            className="gap-2 px-6 data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            <X size={20} />
            Evènements rejetés ({rejectedEvents.length})
          </TabsTrigger>
        </TabsList>

        <div className="my-8" />

        <TabsContent value="incoming_events">
          <EventsTable showValidatedFilter events={upcomingEvents} />
        </TabsContent>

        <TabsContent value="passed_events">
          <EventsTable showValidatedFilter events={pastEvents} />
        </TabsContent>

        <TabsContent value="rejected_events">
          <EventsTable showAgentFilter events={rejectedEvents} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
