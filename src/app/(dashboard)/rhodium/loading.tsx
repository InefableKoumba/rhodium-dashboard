import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
  return (
    <div>
      <Skeleton className="w-[100px] h-[20px]" />
    </div>
  );
}
