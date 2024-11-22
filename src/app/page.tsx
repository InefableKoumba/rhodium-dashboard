import { EventResponseInterface } from "@/interfaces/interfaces";
import Image from "next/image";

export default async function Home() {
  try {
    const response = await fetch(process.env.API_URL + "/events?populate=*");
    // const response = await fetch(
    //   process.env.API_URL +
    //     "/events?filters[isValidatedByAdmin][$eq]=VALIDATED&populate=*"
    // );
    const events = (await response.json())["data"] as EventResponseInterface[];

    return (
      <div className="p-24">
        <div className="grid grid-cols-4 gap-4">
          {events.map((event) => (
            <div className="rounded-2xl" key={event.id}>
              <div className="relative h-[40rem] w-full rounded-2xl">
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

                <div className="absolute left-0 bottom-0 flex flex-col gap-2  w-full py-8 rounde-b-xl px-4">
                  <div className="blur-sm bg-black rounded-b-2xl bg-opacity-40 absolute left-0 top-0 w-full h-full"></div>
                  <div className="relative z-10">
                    <div className="flex flex-col mb-4">
                      <span className="text-white font-medium text-3xl">
                        {event.attributes.title}
                      </span>
                      <span className="text-white text-xl">
                        {event.attributes.location_city}
                      </span>
                      <span className="text-white text-xl">
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
                      <div className="border-orange-600 bg-orange-100 border-2 rounded-full w-min px-6 py-3">
                        <span className="text-orange-700 font-semibold">
                          Gratuit
                        </span>
                      </div>
                    ) : (
                      <div className="border-green-600 bg-green-100 border-2 rounded-full w-min px-6 py-3">
                        <span className="text-green-700 font-semibold">
                          Gratuit
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);
    return <div>An error occured</div>;
  }
}
