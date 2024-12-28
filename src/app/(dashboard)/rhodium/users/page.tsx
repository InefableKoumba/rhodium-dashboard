import UsersTable from "@/components/admin/tables/users-table";
import ExportToExcel from "@/components/common/export-to-excel";
import { GeneralAvatar } from "@/components/common/general-user-avatar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserInterface } from "@/interfaces/interfaces";
import { ArrowDownToLine, CalendarIcon, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function page() {
  const response = await fetch(process.env.NEXT_API_URL + "/users?populate=*");
  const users = (await response.json()) as UserInterface[];

  return (
    <div className="p-8">
      <UsersTable
        users={users.map((user) => ({
          ...user,
          avatarUrl: user?.avatar?.url
            ? process.env.NEXT_STORAGE_BUCKET_URL!.concat(
                user?.avatar?.url
              )
            : undefined,
        }))}
      />
    </div>
  );
}
