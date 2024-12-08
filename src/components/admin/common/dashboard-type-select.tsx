"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Calendar, DollarSign, RefreshCcw } from "lucide-react";

export default function DashboardTypeSelect({
  defaultType = "rhodium",
}: Readonly<{
  defaultType?: "rhodium" | "rhopay";
}>) {
  return (
    <Select
      defaultValue={defaultType}
      onValueChange={(value: string) => {
        if (value === "rhodium") {
          window.location.href = "/dashboard/rhodium";
        } else {
          window.location.href = "/dashboard/rhopay";
        }
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Rhodium" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="rhodium">
          <div className="flex gap-2 items-center">
            <Calendar size={16} />
            <span className="font-medium">Rhodium</span>
          </div>
        </SelectItem>
        <SelectItem value="rhopay">
          <div className="flex gap-2 items-center">
            <DollarSign size={16} />
            <span className="font-medium">Rhopay</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
