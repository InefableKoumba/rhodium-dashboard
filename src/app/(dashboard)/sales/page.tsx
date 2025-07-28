import React from "react";
import { getEvents, getOrders, getCreditPurchases } from "@/lib/actions";
import SalesDashboard from "@/components/SalesDashboard";

export default async function SalesPage() {
  // Fetch all necessary data
  const [ordersResponse, creditPurchasesResponse] = await Promise.all([
    getOrders(),
    getCreditPurchases(),
  ]);

  const orders = ordersResponse.orders;
  const creditPurchases = creditPurchasesResponse;
  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Ventes
        </h1>
        <p className="text-sm text-muted-foreground">
          Suivi complet des ventes et transactions
        </p>
      </div>

      <SalesDashboard orders={orders} creditPurchases={creditPurchases} />
    </div>
  );
}
