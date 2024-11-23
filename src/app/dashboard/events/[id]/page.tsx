import VideoPlayerComponent from "@/components/video-player";
import { EventResponseInterface, UserInterface } from "@/interfaces/interfaces";
import { CalendarDays, MapPin, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
          <div className="absolute right-6 bottom-6 z-10">
            <button className="rounded bg-white px-6 py-3">Valider</button>
          </div>
        </div>
        <div className="p-12">
          <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col gap-4">
              <span className="font-bold text-3xl">
                {event.attributes.title}
              </span>
            </div>
            {event.attributes.hasCost ? (
              <div className="border-orange-600 border-2 rounded-full w-min px-4 py-2">
                <span className="text-orange-700 font-medium">Payant</span>
              </div>
            ) : (
              <div className="border-green-600 bg-green-100 border rounded-full w-min px-4 py-2">
                <span className="text-green-700 font-medium">Gratuit</span>
              </div>
            )}
          </div>
          <hr className="my-6" />
          <div className="">
            <h2 className="font-bold text-xl">Heure, date et lieu</h2>
            <div className="flex justify-between gap-4 mt-6">
              <div className="flex items-center gap-4 w-full">
                <div className="w-14">
                  <div className="rounded-full p-2 bg-gray-200 w-14 h-14 flex items-center justify-center">
                    <CalendarDays />
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex gap-2 text-lg">
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
                  <div className="flex gap-2 text-gray-600">
                    <span>{event.attributes.time_start}</span>
                    <span>-</span>
                    <span>{event.attributes.time_end}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 w-full">
                <div className="w-14">
                  <div className="rounded-full p-2 bg-gray-200 w-14 h-14 flex items-center justify-center">
                    <MapPin />
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex gap-2">
                    <span className="font-medium text-lg">
                      {event.attributes.location_street}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-gray-500">
                      {event.attributes.location_street},
                      {event.attributes.location_city}
                    </span>
                  </div>
                  <div className="flex mt-2">
                    <Link
                      href="/"
                      className="bg-yellow-600 text-white rounded-full flex justify-center items-center text-sm px-6 py-2 whitespace-nowrap"
                    >
                      Voir sur la carte
                    </Link>
                  </div>
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
          </div>
          <hr className="my-6" />
          {event.attributes.videos && (
            <VideoPlayerComponent
              url={
                process.env.STORAGE_BUCKET_URL +
                event.attributes.videos.data[0].attributes.url
              }
              title={event.attributes.title}
            />
          )}
        </div>
      </div>
    );
  } catch (error) {
    return <div>Erreur</div>;
  }
}

async function UserAvatar({ userId }: Readonly<{ userId: number }>) {
  try {
    const response = await fetch(
      process.env.API_URL + "/users?filters[id][$eq]=" + userId + "&populate=*"
    );

    const data = await response.json();
    const user = data[0] as UserInterface | null;

    if (!user || !user.avatar) {
      return <GeneralAvatar />;
    }

    return (
      <div className="relative w-14 h-14 rounded-full">
        <Image
          fill
          className="rounded-full"
          alt="Event creator image"
          src={process.env.STORAGE_BUCKET_URL + user.avatar.url}
        />
      </div>
    );
  } catch (error) {
    return <GeneralAvatar />;
  }
}

function GeneralAvatar() {
  return (
    <div className="relative w-14 h-14 rounded-full bg-gray-200 flex justify-center items-center">
      <User />
    </div>
  );
}
