import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
  return (
    <div className="p-8">
      <Skeleton className="h-12 w-1/3 xl:w-1/2 dark:bg-gray-900 mb-6" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Skeleton className="h-36 w-full bg-white border dark:border-gray-800 dark:bg-gray-900" />
        <Skeleton className="h-36 w-full bg-white border dark:border-gray-800 dark:bg-gray-900" />
        <Skeleton className="h-36 w-full bg-white border dark:border-gray-800 dark:bg-gray-900" />
        <Skeleton className="h-36 w-full bg-white border dark:border-gray-800 dark:bg-gray-900" />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <Skeleton className="h-96 w-full bg-white border dark:border-gray-800 dark:bg-gray-900" />
        <Skeleton className="h-96 w-full bg-white border dark:border-gray-800 dark:bg-gray-900" />
      </div>
    </div>
  );
}
