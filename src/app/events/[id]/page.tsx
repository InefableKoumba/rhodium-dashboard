import { EventResponseInterface } from "@/interfaces/interfaces";
import { CalendarDays, MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";

export default async function page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  try {
    const id = (await params).id;

    const response = await fetch(
      process.env.API_URL + "/events?filters[id][$eq]=" + id + "&populate=*"
    );
    const event = (await response.json())["data"][0] as EventResponseInterface;

    return (
      <div>
        <div className="relative h-[20rem] md:h-[25rem] lg:h-[28rem] xl:h-[30rem] w-full">
          <Image
            fill
            alt={event.attributes.title}
            className="object-cover"
            src={
              event.attributes?.coverImage?.data?.attributes.url
                ? process.env.STORAGE_BUCKET_URL! +
                  event.attributes?.coverImage?.data?.attributes.url
                : "https://via.placeholder.com/150"
            }
          />
          <div className="absolute left-0 w-full h-full bg-gradient-to-b from-transparent to-[#000000bb]"></div>
          <div className="absolute left-0 bottom-0 flex flex-col gap-6 w-full p-4 md:py-12 rounde-b-xl xl:px-24">
            <div className="flex-col gap-4 hidden md:flex">
              <span className="text-white font-medium text-3xl xl:text-6xl">
                {event.attributes.title}
              </span>
              <span className="text-white text-xl">
                {event.attributes.location_city}
              </span>
              <span className="text-white">
                {new Date(event.attributes.date_start).toLocaleDateString(
                  "fr-FR",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </span>
            </div>
            <div className="hidden md:block">
              {event.attributes.hasCost ? (
                <div className="border-orange-600 bg-orange-100 border rounded-full w-min px-4 py-2">
                  <span className="text-orange-700 font-medium">Gratuit</span>
                </div>
              ) : (
                <div className="border-green-600 bg-green-100 border rounded-full w-min px-4 py-2">
                  <span className="text-green-700 font-medium">Gratuit</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="p-4 lg:hidden">
          <div className="flex flex-col gap-6 w-full">
            <div className="flex-col gap-4">
              <span className="font-medium text-3xl">
                {event.attributes.title}
              </span>
            </div>
            {event.attributes.hasCost ? (
              <div className="border-orange-600 border-2 rounded-full w-min px-4 py-2">
                <span className="text-orange-700 font-medium">Gratuit</span>
              </div>
            ) : (
              <div className="border-green-600 bg-green-100 border rounded-full w-min px-4 py-2">
                <span className="text-green-700 font-medium">Gratuit</span>
              </div>
            )}
          </div>
          <hr className="my-6" />
          <div className="grid gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14">
                <div className="rounded-full p-2 bg-gray-200 w-14 h-14 flex items-center justify-center">
                  <CalendarDays />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <span className="font-medium">
                    {new Date(event.attributes.date_start).toLocaleDateString(
                      "fr-FR"
                    )}
                  </span>
                  <span>-</span>
                  <span className="font-medium">
                    {new Date(event.attributes.date_start).toLocaleDateString(
                      "fr-FR"
                    )}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span>{event.attributes.time_start}</span>
                  <span>-</span>
                  <span>{event.attributes.time_end}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-14">
                <div className="rounded-full p-2 bg-gray-200 w-14 h-14 flex items-center justify-center">
                  <MapPin />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <span className="font-medium">
                    {event.attributes.location_street}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span>
                    {event.attributes.location_street},{" "}
                    {event.attributes.location_city}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-6" />
          <video
            className="md:w-1/2 h-auto"
            controls
            src={
              process.env.STORAGE_BUCKET_URL +
              event.attributes.videos.data[0].attributes.url
            }
          />
        </div>
      </div>
    );
  } catch (error) {
    return <div>Erreur</div>;
  }
}
