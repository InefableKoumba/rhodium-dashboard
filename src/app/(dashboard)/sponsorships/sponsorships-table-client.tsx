"use client";

import { useRouter, useSearchParams } from "next/navigation";
import SponsorshipsTable from "@/components/tables/sponsorships-table";
import { Sponsorship } from "@/types/types";

interface SponsorshipsTableClientProps {
  sponsorships: Sponsorship[];
  total: number;
  currentPage: number;
  totalPages: number;
  currentSearchParams: { page?: string; limit?: string };
}

export default function SponsorshipsTableClient({
  sponsorships,
  total,
  currentPage,
  totalPages,
  currentSearchParams,
}: SponsorshipsTableClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`/sponsorships?${params.toString()}`);
  };

  return (
    <SponsorshipsTable
      sponsorships={sponsorships}
      //   total={total}
      //   currentPage={currentPage}
      //   totalPages={totalPages}
      //   onPageChange={handlePageChange}
    />
  );
}
