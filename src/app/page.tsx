import { EventResponseInterface } from "@/interfaces/interfaces";
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
      <div className="px-4 lg:px-12 xl:px-24 py-4 md:py-12 grid gap-6">
        <div className="grid gap-6">
          <h2 className="text-3xl font-bold">Informations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-200 h-72 rounded-2xl"></div>
            <div className="bg-gray-200 h-72 rounded-2xl"></div>
            <div className="bg-gray-200 h-72 rounded-2xl"></div>
          </div>
        </div>
        <div className="grid gap-6">
          <h2 className="text-3xl font-bold">Informations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
            {events.map((event) => (
              <Link
                href={"/events/" + event.id}
                className="rounded-2xl"
                key={event.id}
              >
                <div className="relative h-[20rem] md:h-[25rem] lg:h-[28rem] xl:h-[30rem] w-full rounded-2xl">
                  <Image
                    fill
                    className="rounded-2xl"
                    alt={event.attributes.title}
                    objectFit="cover"
                    src={
                      event.attributes?.coverImage?.data?.attributes.url
                        ? process.env.STORAGE_BUCKET_URL! +
                          event.attributes?.coverImage?.data?.attributes.url
                        : "https://via.placeholder.com/150"
                    }
                  />
                  <div className="absolute left-0 w-full h-full rounded-2xl bg-gradient-to-b from-transparent to-[#000000bb]"></div>
                  <div className="absolute left-0 bottom-0 flex flex-col gap-2  w-full py-8 rounde-b-xl px-4">
                    <div className="relative z-10">
                      <div className="flex flex-col mb-4">
                        <span className="text-white font-medium text-2xl">
                          {event.attributes.title}
                        </span>
                        <span className="text-white">
                          {event.attributes.location_city}
                        </span>
                        <span className="text-white">
                          {new Date(
                            event.attributes.date_start
                          ).toLocaleDateString("fr-FR", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      {event.attributes.hasCost ? (
                        <div className="border-orange-600 bg-orange-100 border rounded-full w-min px-4 py-2">
                          <span className="text-orange-700 font-medium">
                            Gratuit
                          </span>
                        </div>
                      ) : (
                        <div className="border-green-600 bg-green-100 border rounded-full w-min px-4 py-2">
                          <span className="text-green-700 font-medium">
                            Gratuit
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);
    return <div>An error occured</div>;
  }
}
