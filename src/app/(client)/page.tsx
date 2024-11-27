import AdList from "@/components/client/ad-list";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EventResponseInterface } from "@/interfaces/interfaces";
import { CalendarIcon, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  try {
    const response = await fetch(process.env.API_URL + "/events?populate=*");
    // const response = await fetch(
    //   process.env.API_URL +
    //     "/events?filters[isValidatedByAdmin][$eq]=VALIDATED&populate=*"
    // );
    const events = (await response.json())["data"] as EventResponseInterface[];

    return (
      <div className="px-4 md:p-12 grid gap-12">
        <div className="grid gap-6">
          <h2 className="text-3xl font-medium">Informations</h2>
          <AdList />
        </div>
        <div className="grid gap-6">
          <h2 className="text-3xl font-medium">Derniers évènements</h2>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <button className="flex justify-center items-center rounded-full px-4 py-2 bg-primary text-white">
                Tout
              </button>
              <button className="flex justify-center items-center rounded-full px-4 py-2 bg-gray-400 text-white">
                Concert
              </button>
              <button className="flex justify-center items-center rounded-full px-4 py-2 bg-gray-400 text-white">
                Mariage
              </button>
              <button className="flex justify-center items-center rounded-full px-4 py-2 bg-gray-400 text-white">
                Show
              </button>
            </div>
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Tous les évènements" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">Tous les évènements</SelectItem>
                    <SelectItem value="free">Gratuits</SelectItem>
                    <SelectItem value="paid">Payants</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="w-[240px] pl-3 text-left font-normal"
                  >
                    <span>Choisissez une date</span>
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6 overflow-hidden">
            {events.map((event) => (
              <Link href={"/events/" + event.id} key={event.id}>
                <div className="relative group  shadow-sm h-60 w-full rounded overflow-hidden">
                  <Image
                    fill
                    className="rounded object-cover group-hover:scale-105 transform transition-all duration-700"
                    alt={event.attributes.title}
                    src={
                      event.attributes?.coverImage?.data?.attributes.url
                        ? process.env.STORAGE_BUCKET_URL! +
                          event.attributes?.coverImage?.data?.attributes.url
                        : "https://via.placeholder.com/150"
                    }
                  />
                  <div className="absolute bottom-4 left-4">
                    {event.attributes.hasCost ? (
                      <div className="bg-primary rounded-full w-min px-3 py-1">
                        <span className="text-white font-medium text-sm">
                          Payant
                        </span>
                      </div>
                    ) : (
                      <div className="bg-green-700 rounded-full w-min px-3 py-1">
                        <span className="text-white font-medium text-sm">
                          Gratuit
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-full pt-2">
                  <div>
                    <div className="flex flex-col">
                      <span className="font-bold text-lg">
                        {event.attributes.title}
                      </span>
                      <div className="flex  gap-x-4 my-2">
                        <div className="flex items-center gap-2">
                          <CalendarIcon color={"#C79500"} />
                          <span className="text-sm text-gray-800">
                            {new Date(
                              event.attributes.date_start
                            ).toLocaleDateString("fr-FR", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin color={"#C79500"} />
                          <span className="text-sm text-gray-800">
                            {event.attributes.location_city}
                          </span>
                        </div>
                      </div>

                      <span className="text-sm line-clamp-2 text-gray-800">
                        {event.attributes.description}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  } catch (_) {
    return null;
  }
}
