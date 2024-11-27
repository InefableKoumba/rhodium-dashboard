import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
  return (
    <div className="p-24">
      <Skeleton className="w-[100px] h-[20px]" />
    </div>
  );
}
