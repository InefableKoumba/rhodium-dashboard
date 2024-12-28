import EventsTable from "@/components/admin/tables/events-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventResponseInterface } from "@/interfaces/interfaces";
import { Calendar, Calendar1, Clock, DollarSign, Info, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

export default async function Page() {
  const response = await fetch(process.env.NEXT_API_URL + "/events?populate=*");
  const { data: events } = (await response.json()) as {
    data: EventResponseInterface[];
  };

  if (events) {
    return (
      <div className="p-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Card className="dark:bg-gray-900 dark:border-gray-800 rounded-xl shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-10">
              <CardTitle className="text-sm font-medium">
                Evènements privés
              </CardTitle>
              <Calendar className="size-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">14</div>
              <p className="text-xs text-muted-foreground">
                Nombre d&apos;évènements privés
              </p>
            </CardContent>
          </Card>
          <Card className="dark:bg-gray-900 dark:border-gray-800 rounded-xl shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-10">
              <CardTitle className="text-sm font-medium">
                Evènements publics
              </CardTitle>
              <Calendar className="size-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <span className="font-bold text-2xl">5</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Nombre d&apos;évènements publics
              </p>
            </CardContent>
          </Card>
          <Card className="dark:bg-gray-900 dark:border-gray-800 rounded-xl shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-10">
              <CardTitle className="text-sm font-medium">
                Evènements gratuits
              </CardTitle>
              <Calendar className="size-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <span className="font-bold text-2xl">8</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Nombre d&apos;évènements gratuits
              </p>
            </CardContent>
          </Card>
          <Card className="dark:bg-gray-900 dark:border-gray-800 rounded-xl shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-10">
              <CardTitle className="text-sm font-medium">
                Evènements payants
              </CardTitle>
              <Calendar className="size-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <span className="font-bold text-2xl">11</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Nombre d&apos;évènements payants
              </p>
            </CardContent>
          </Card>
        </div>
        <Tabs defaultValue="incoming_events" className="w-full mt-8">
          <TabsList className="dark:bg-gray-900 dark:border-gray-800 shadow">
            <TabsTrigger 
              value="incoming_events" 
              className="gap-2 px-6 data-[state=active]:dark:bg-gray-800 data-[state=active]:dark:text-white"
            >
              <Calendar size={20} />
              Evènements à venir
            </TabsTrigger>
            <TabsTrigger 
              value="passed_events" 
              className="gap-2 px-6 data-[state=active]:dark:bg-gray-800 data-[state=active]:dark:text-white"
            >
              <Clock size={20} />
              Evènements passés
            </TabsTrigger>
            <TabsTrigger 
              value="rejected_events" 
              className="gap-2 px-6 data-[state=active]:dark:bg-gray-800 data-[state=active]:dark:text-white"
            >
              <X size={20} />
              Evènements rejetés
            </TabsTrigger>
            <TabsTrigger value="trashed_events" className="gap-2 px-6">
              <X color="#333" size={20} />
              Evènements dans la corbeille
            </TabsTrigger>
          </TabsList>
          <div className="my-8" />
          <TabsContent value="incoming_events">
            <EventsTable
              showValidatedFilter
              events={events.filter((event) => new Date(event.attributes.date_start) > new Date()).map((event) => ({
                id: event.id,
                ...event.attributes,
                coverImage: event.attributes?.coverImage?.data
                  ? process.env.NEXT_STORAGE_BUCKET_URL!.concat(
                      event.attributes?.coverImage?.data?.attributes.url
                    )
                  : undefined,
                images: event.attributes?.images?.data?.map((image) =>
                  process.env.NEXT_STORAGE_BUCKET_URL!.concat(
                    image?.attributes?.url
                  )
                ),
                videos: event.attributes?.videos?.data?.map((video) =>
                  process.env.NEXT_STORAGE_BUCKET_URL!.concat(
                    video?.attributes?.url
                  )
                ),
              }))}
            />
          </TabsContent>
          <TabsContent value="passed_events">
            <EventsTable
              showValidatedFilter
              events={events.filter((event) => new Date(event.attributes.date_start) <= new Date()).map((event) => ({
                id: event.id,
                ...event.attributes,
                coverImage: event.attributes?.coverImage?.data
                  ? process.env.NEXT_STORAGE_BUCKET_URL!.concat(
                      event.attributes?.coverImage?.data?.attributes.url
                    )
                  : undefined,
                images: event.attributes?.images?.data?.map((image) =>
                  process.env.NEXT_STORAGE_BUCKET_URL!.concat(
                    image?.attributes?.url
                  )
                ),
                videos: event.attributes?.videos?.data?.map((video) =>
                  process.env.NEXT_STORAGE_BUCKET_URL!.concat(
                    video?.attributes?.url
                  )
                ),
              }))}
            />
          </TabsContent>
          <TabsContent value="rejected_events">
            <EventsTable
              showAgentFilter
              events={events.filter((event) => event.attributes.isValidatedByAdmin === "REJECTED").map((event) => ({
                id: event.id,
                ...event.attributes,
                coverImage: event.attributes?.coverImage?.data
                  ? process.env.NEXT_STORAGE_BUCKET_URL!.concat(
                      event.attributes?.coverImage?.data?.attributes.url
                    )
                  : undefined,
                images: event.attributes?.images?.data?.map((image) =>
                  process.env.NEXT_STORAGE_BUCKET_URL!.concat(
                    image?.attributes?.url
                  )
                ),
                videos: event.attributes?.videos?.data?.map((video) =>
                  process.env.NEXT_STORAGE_BUCKET_URL!.concat(
                    video?.attributes?.url
                  )
                ),
              }))}
            />
          </TabsContent>
        </Tabs>
      </div>
    );
  }
}
