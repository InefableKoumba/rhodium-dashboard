import SponsorshipsClient from "./sponsorships-client";
import { getSponsorshipsStats, getSponsorships } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function SponsorshipsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    role?: string;
    search?: string;
    searchType?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
  }>;
}) {
  const params = await searchParams;
  const { total, paidAmount, remainingAmount } = await getSponsorshipsStats();
  const {
    sponsorships,
    total: totalSponsorships,
    currentPage,
    totalPages,
  } = await getSponsorships({
    page: parseInt(params.page || "1"),
    role: params.role,
    search: params.search,
    searchType: params.searchType,
    status: params.status,
    startDate: params.startDate,
    endDate: params.endDate,
  });

  return (
    <SponsorshipsClient
      sponsorships={sponsorships}
      total={total}
      totalSponsorships={totalSponsorships}
      paidAmount={paidAmount}
      remainingAmount={remainingAmount}
      currentPage={currentPage}
      totalPages={totalPages}
      initialSearchParams={params}
    />
  );
}
