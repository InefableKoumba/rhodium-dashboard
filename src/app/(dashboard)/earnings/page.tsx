import { getCreditPurchases, getEvents } from "@/lib/actions";
import EarningsDashboard from "../../../components/EarningsDashboardClient";
import React from "react";

export const dynamic = "force-dynamic";

export default async function Page() {
  const { events } = await getEvents({});
  const creditPurchases = await getCreditPurchases();

  return (
    <EarningsDashboard events={events} creditPurchases={creditPurchases} />
  );
}
