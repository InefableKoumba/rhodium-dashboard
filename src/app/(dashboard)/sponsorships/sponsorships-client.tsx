"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useTransition } from "react";
import SponsorshipsTable from "@/components/tables/sponsorships-table";
import { Sponsorship } from "@/types/types";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Bell, DollarSign, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface SponsorshipsClientProps {
  sponsorships: Sponsorship[];
  total: number;
  totalSponsorships: number;
  paidAmount: number;
  remainingAmount: number;
  currentPage: number;
  totalPages: number;
  initialSearchParams: {
    page?: string;
    role?: string;
    search?: string;
    searchType?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
  };
}

function SponsorshipsClientContent({
  sponsorships,
  total,
  totalSponsorships,
  paidAmount,
  remainingAmount,
  currentPage,
  totalPages,
  initialSearchParams,
}: SponsorshipsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handlePageChange = (newPage: number) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      params.set("page", newPage.toString());
      router.push(`/sponsorships?${params.toString()}`);
    });
  };

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

      <div className="w-full flex flex-col gap-8">
        <SponsorshipsTable
          sponsorships={sponsorships}
          total={totalSponsorships}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          isLoading={isPending}
        />
      </div>
    </div>
  );
}

function SponsorshipsLoadingSkeleton() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-96" />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card
            key={i}
            className="dark:bg-gray-900 dark:border-gray-800 dark:text-gray-100 rounded-xl shadow"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-10">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-6 w-6" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="w-full">
        <Card className="dark:bg-gray-900 dark:border-gray-800 dark:text-gray-100 rounded-xl shadow">
          <CardHeader>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function SponsorshipsClient(props: SponsorshipsClientProps) {
  return (
    <Suspense fallback={<SponsorshipsLoadingSkeleton />}>
      <SponsorshipsClientContent {...props} />
    </Suspense>
  );
}
