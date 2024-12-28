"use client";

import React, { useState } from "react";
import { Calendar } from "../ui/calendar";
import { DateRange } from "react-day-picker";

export default function CalendarRange() {
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 1)),
    to: new Date(),
  });

  return (
    <Calendar
      selected={range}
      mode="range"
      onSelect={(selected) => {
        setRange(selected);
      }}
    />
  );
}
