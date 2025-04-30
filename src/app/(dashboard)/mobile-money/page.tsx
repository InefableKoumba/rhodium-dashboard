import React from "react";
import { DollarSign } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function page() {
  let collectAvailableBalance = 0;
  let disbursementAvailableBalance = 0;

  const response = await fetch(
    "https://proxy.momoapi.mtn.com/collection/token/",
    {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key":
          process.env.COLLECT_SUBSCRIPTION_PRIMARY_KEY!,
        Authorization:
          "Basic " +
          btoa(
            process.env.COLLECT_API_USER + ":" + process.env.COLLECT_API_KEY
          ),
      },
    }
  );
  if (response.ok) {
    const token = (await response.json())["access_token"];

    const res = await fetch(
      "https://proxy.momoapi.mtn.com/collection/v1_0/account/balance",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Ocp-Apim-Subscription-Key":
            process.env.COLLECT_SUBSCRIPTION_PRIMARY_KEY!,
          "X-Target-Environment": "mtncongo",
        },
      }
    );

    collectAvailableBalance = (await res.json())["availableBalance"];
  }

  const response2 = await fetch(
    "https://proxy.momoapi.mtn.com/disbursement/token/",
    {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key":
          process.env.DISBURSEMENT_SUBSCRIPTION_PRIMARY_KEY!,
        Authorization:
          "Basic " +
          btoa(
            process.env.DISBURSEMENT_API_USER +
              ":" +
              process.env.DISBURSEMENT_API_KEY
          ),
      },
    }
  );
  if (response2.ok) {
    const token = (await response2.json())["access_token"];

    const res2 = await fetch(
      "https://proxy.momoapi.mtn.com/disbursement/v1_0/account/balance",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Ocp-Apim-Subscription-Key":
            process.env.DISBURSEMENT_SUBSCRIPTION_PRIMARY_KEY!,
          "X-Target-Environment": "mtncongo",
        },
      }
    );

    disbursementAvailableBalance = (await res2.json())["availableBalance"];
  }

  return (
    <div className="p-4 md:p-12">
      <h1 className="text-3xl font-extrabold mb-6 text-dark dark:text-gray-100">
        Etat de caisses
      </h1>
      <div className="text-xl font-bold py-4">MTN CG</div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="dark:bg-gray-900 dark:border-gray-800 dark:text-gray-100 rounded-xl shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-10">
            <CardTitle className="text-sm font-medium">Compte payeur</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Number(disbursementAvailableBalance).toLocaleString("fr-FR")} XAF
            </div>
            <p className="text-xs text-muted-foreground">
              Montant dans le compte payeur
            </p>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-900 dark:border-gray-800 dark:text-gray-100 rounded-xl shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-10">
            <CardTitle className="text-sm font-medium">
              Compte collecte
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Number(collectAvailableBalance).toLocaleString("fr-FR")} XAF
            </div>
            <p className="text-xs text-muted-foreground">
              Montant dans le compte collecte
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="text-xl font-bold py-4">Airtel CG</div>
      <div className="grid gap-4 md:grid-cols-1">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Compte payeur/collecte
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0 XAF</div>
            <p className="text-xs text-muted-foreground">
              Montant dans le compte payeur/collecte
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
