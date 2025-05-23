import SponsorshipsTable from "@/components/tables/sponsorships-table";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Bell } from "lucide-react";
import { DollarSign, Users } from "lucide-react";
import { getSponsorships } from "@/lib/actions";
export const dynamic = "force-dynamic";

export default async function SponsorshipsPage() {
  const { sponsorships, total, paidAmount, remainingAmount } =
    await getSponsorships();
  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Parrainages</h2>
        <p className="text-muted-foreground">
          Gérez tous les parrainages de la plateforme et suivez les relations
          sponsor-filleul.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="dark:bg-gray-900 dark:border-gray-800 dark:text-gray-100 rounded-xl shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-10">
            <CardTitle className="text-sm font-medium">
              Total parrainages
            </CardTitle>
            <Users className="size-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{total}</div>
            <p className="text-xs text-muted-foreground">
              Nombre total de parrainages
            </p>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-900 dark:border-gray-800 dark:text-gray-100 rounded-xl shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-10">
            <CardTitle className="text-sm font-medium">
              Montant déjà payé
            </CardTitle>
            <DollarSign className="size-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{paidAmount} XAF</div>
            <p className="text-xs text-muted-foreground">
              Dépenses éffectuées pour les parrainages
            </p>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-900 dark:border-gray-800 dark:text-gray-100 rounded-xl shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-10">
            <CardTitle className="text-sm font-medium">Reste à payer</CardTitle>
            <Bell className="size-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{remainingAmount} XAF</div>
            <p className="text-xs text-muted-foreground">
              Montant restant à payer pour les parrainages
            </p>
          </CardContent>
        </Card>
      </div>

      <SponsorshipsTable sponsorships={sponsorships} />
    </div>
  );
}
