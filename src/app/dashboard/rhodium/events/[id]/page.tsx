import { EventResponseInterface } from "@/interfaces/interfaces";
import React from "react";
import EnventDetails from "@/components/common/envent-details";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const id = (await params).id;

    const response = await fetch(
      process.env.NEXT_API_URL +
        "/events?filters[id][$eq]=" +
        id +
        "&populate=*"
    );
    const event = (await response.json())["data"][0] as EventResponseInterface;

    return <EnventDetails event={event} adminView />;
  } catch (_) {
    return null;
  }
}
