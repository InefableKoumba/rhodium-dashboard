import { GeneralAvatar } from "@/components/common/general-user-avatar";
import UserAvatar from "@/components/common/user-avatar";
import VideoPlayerComponent from "@/components/common/video-player";
import { EventResponseInterface } from "@/types/types";
import { CalendarDays, MapPin, Minus, Phone } from "lucide-react";
import Image from "next/image";
import React from "react";
import Link from "next/link";

export default function EnventDetails({
  event,
  adminView,
}: Readonly<{
  event: EventResponseInterface;
  adminView?: boolean;
}>) {
  return (
    <div>
      <div className="flex flex-col gap-6 w-full">
        <div className="flex-col gap-4">
          <span className="font-bold text-3xl">{event.attributes.title}</span>
        </div>
        {event.attributes.hasCost ? (
          <div className="flex gap-2">
            <div className="bg-darkLight rounded-full w-min px-6 py-3">
              <span className="text-white font-medium text-nowrap">Payant</span>
            </div>
            <div className="border border-darkLight rounded-full w-min px-6 py-3">
              <span className="text-daborder-darkLight font-medium text-nowrap">
                A partir de 100 XAF
              </span>
            </div>
          </div>
        ) : (
          <div className="bg-green-600 rounded-full w-min px-4 py-2">
            <span className="text-white font-medium">Gratuit</span>
          </div>
        )}
      </div>
      <hr className="my-6" />
      <div className="grid md:grid-cols-2 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14">
            <div className="rounded-full p-2 bg-gray-200 w-14 h-14 flex items-center justify-center">
              <CalendarDays color="#C79500" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <span className="font-semibold">
                {new Date(event.attributes.date_start).toLocaleDateString(
                  "fr-FR",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </span>
              <Minus />
              <span className="font-semibold">
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
            <div className="flex gap-1 items-center">
              <span className="text-gray-800">
                {event.attributes.time_start}
              </span>
              <Minus color="#777" />
              <span className="text-gray-800">{event.attributes.time_end}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-14">
            <div className="rounded-full p-2 bg-gray-200 w-14 h-14 flex items-center justify-center">
              <MapPin color="#C79500" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <span className="font-semibold">
                {event.attributes.location_street}
              </span>
            </div>
            <div className="flex gap-2 text-gray-800">
              <span>
                {event.attributes.location_street},{" "}
                {event.attributes.location_city}
              </span>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-6" />
      <h2 className="font-bold text-xl">Organisteur</h2>
      <div className="flex gap-4 mt-8">
        {!event.attributes?.creator?.data.id ? (
          <GeneralAvatar />
        ) : (
          <UserAvatar userId={event.attributes.creator.data.id} />
        )}
        <div className="flex flex-col justify-center">
          <span className="font-medium text-lg">
            {event.attributes?.creator?.data.attributes.firstname}{" "}
            {event.attributes?.creator?.data.attributes.lastname}
          </span>
          <span className="text-gray-500">
            {event.attributes.creator?.data.attributes.phone_number}
          </span>
        </div>
        <div>
          <Link
            href={
              "tel:" + event.attributes.creator?.data.attributes.phone_number
            }
            className="rounded-full flex px-4 py-2 justify-center items-center gap-2 text-white bg-darkLight hover:bg-darkLight/90"
          >
            <Phone size={14} color="#fff" />
            <span className="text-sm">Appeler</span>
          </Link>
        </div>
      </div>
      <hr className="my-6" />
      <h2 className="font-bold text-xl">A propos de l&apos;évènement</h2>
      <p className="mt-4">{event.attributes.description}</p>
      <hr className="my-6" />
      <h2 className="font-bold text-xl mb-4">Gallerie (Pre-Event)</h2>
      <div className="flex gap-4">
        {event.attributes.videos && event.attributes.videos.data && (
          <VideoPlayerComponent
            url={
              process.env.NEXT_STORAGE_BUCKET_URL +
              event.attributes.videos.data[0].attributes.url
            }
            title={event.attributes.title}
          />
        )}
        <div className="w-[60%] grid grid-cols-2 gap-2">
          {event.attributes.images &&
            event.attributes.images.data &&
            event.attributes.images?.data.map((image) => (
              <div
                className="relative h-44 rounded-md group overflow-hidden"
                key={image.id}
              >
                <Image
                  fill
                  alt={event.attributes.title}
                  className="object-cover rounded-md transform duration-700 transition-all group-hover:scale-105"
                  src={
                    process.env.NEXT_STORAGE_BUCKET_URL + image.attributes.url
                  }
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
