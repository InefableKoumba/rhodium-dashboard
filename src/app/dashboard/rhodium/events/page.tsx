import EventsTable from "@/components/admin/tables/events-table";
import { EventResponseInterface } from "@/interfaces/interfaces";
import React from "react";

export default async function Page() {
  const response = await fetch(process.env.NEXT_API_URL + "/events?populate=*");
  const { data: events } = (await response.json()) as {
    data: EventResponseInterface[];
  };

  if (events) {
    return (
      <div className="p-8">
        <EventsTable
          events={events.map((event) => ({
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
      </div>
    );
  }
}
