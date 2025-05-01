"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowDownToLine, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
  ColumnFiltersState,
  SortingState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { User } from "@/types/types";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { GeneralAvatar } from "@/components/common/general-user-avatar";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Badge } from "@/components/ui/badge";

interface Sponsorship {
  id: string;
  sponsor: User;
  sponsored: User;
  status: "PENDING" | "PAID" | "REJECTED";
  amount: number;
  createdAt: Date;
  paidAt?: Date;
  rejectedAt?: Date;
}

const columns: ColumnDef<Sponsorship>[] = [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => <div className="w-[10px]">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "sponsor",
    header: "Parrain",
    cell: ({ row }) => {
      const sponsor: User = row.getValue("sponsor");
      return (
        <Link
          className="flex items-center gap-2 group"
          href={"/users/" + sponsor.id}
        >
          {sponsor.avatar ? (
            <div className="w-14 h-14 rounded-full relative">
              <Image
                fill
                className="rounded-full object-cover"
                alt={sponsor.firstname + " " + sponsor.lastname + " avatar"}
                src={sponsor.avatar}
              />
            </div>
          ) : (
            <div className="w-14 h-14">
              <GeneralAvatar />
            </div>
          )}
          <div className="flex flex-col">
            <span className="font-bold">
              {sponsor.firstname} {sponsor.lastname}
            </span>
            <span className="text-sm text-muted-foreground">
              {sponsor.email}
            </span>
            <span className="text-sm text-muted-foreground">
              {sponsor.phoneNumber}
            </span>
          </div>
        </Link>
      );
    },
  },
  {
    accessorKey: "sponsored",
    header: "Filleul",
    cell: ({ row }) => {
      const sponsored: User = row.getValue("sponsored");
      return (
        <Link
          className="flex items-center gap-2 group"
          href={"/users/" + sponsored.id}
        >
          {sponsored.avatar ? (
            <div className="w-14 h-14 rounded-full relative">
              <Image
                fill
                className="rounded-full object-cover"
                alt={sponsored.firstname + " " + sponsored.lastname + " avatar"}
                src={sponsored.avatar}
              />
            </div>
          ) : (
            <div className="w-14 h-14">
              <GeneralAvatar />
            </div>
          )}
          <div className="flex flex-col">
            <span className="font-bold">
              {sponsored.firstname} {sponsored.lastname}
            </span>
            <span className="text-sm text-muted-foreground">
              {sponsored.email}
            </span>
            <span className="text-sm text-muted-foreground">
              {sponsored.phoneNumber}
            </span>
          </div>
        </Link>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant={
            status === "PAID"
              ? "success"
              : status === "REJECTED"
              ? "destructive"
              : "secondary"
          }
        >
          {status === "PAID"
            ? "Payé"
            : status === "REJECTED"
            ? "Rejeté"
            : "En attente"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Montant",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("amount")} XAF</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date de parrainage",
    cell: ({ row }) => (
      <div className="whitespace-nowrap">
        {format(new Date(row.getValue("createdAt")), "LLL dd, y")}
      </div>
    ),
  },
  {
    accessorKey: "paidAt",
    header: "Date de paiement",
    cell: ({ row }) => {
      const paidAt = row.getValue("paidAt") as Date | undefined;
      return (
        <div className="whitespace-nowrap">
          {paidAt ? format(new Date(paidAt), "LLL dd, y") : "-"}
        </div>
      );
    },
  },
];

// Mock data
const mockSponsorships: Sponsorship[] = [
  {
    id: "1",
    sponsor: {
      id: "1",
      email: "john.doe@example.com",
      firstname: "John",
      lastname: "Doe",
      avatar: "https://i.pravatar.cc/150?img=1",
      phoneNumber: "+242 06 88 01 98 6",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    sponsored: {
      id: "2",
      email: "jane.smith@example.com",
      firstname: "Jane",
      lastname: "Smith",
      avatar: "https://i.pravatar.cc/150?img=2",
      phoneNumber: "+242 06 88 01 98 7",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    status: "PAID",
    amount: 10000,
    createdAt: new Date("2024-01-15"),
    paidAt: new Date("2024-01-20"),
  },
  {
    id: "2",
    sponsor: {
      id: "3",
      email: "alice.johnson@example.com",
      firstname: "Alice",
      lastname: "Johnson",
      avatar: "https://i.pravatar.cc/150?img=3",
      phoneNumber: "+242 06 88 01 98 8",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    sponsored: {
      id: "4",
      email: "bob.wilson@example.com",
      firstname: "Bob",
      lastname: "Wilson",
      avatar: "https://i.pravatar.cc/150?img=4",
      phoneNumber: "+242 06 88 01 98 9",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    status: "PENDING",
    amount: 10000,
    createdAt: new Date("2024-02-01"),
  },
  {
    id: "3",
    sponsor: {
      id: "5",
      email: "emma.brown@example.com",
      firstname: "Emma",
      lastname: "Brown",
      avatar: "https://i.pravatar.cc/150?img=5",
      phoneNumber: "+242 06 88 01 98 0",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    sponsored: {
      id: "6",
      email: "michael.davis@example.com",
      firstname: "Michael",
      lastname: "Davis",
      avatar: "https://i.pravatar.cc/150?img=6",
      phoneNumber: "+242 06 88 01 98 1",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    status: "REJECTED",
    amount: 10000,
    createdAt: new Date("2024-02-10"),
    rejectedAt: new Date("2024-02-15"),
  },
];

export default function SponsorshipsTable() {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [date, setDate] = React.useState<DateRange | undefined>(undefined);

  const table = useReactTable({
    data: mockSponsorships,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const handleFilterDate = (range: DateRange | undefined) => {
    if (!range?.from || !range?.to) return;

    const { from, to } = range;

    // Format the dates to ISO string with added 1 day offset
    const formattedFrom = new Date(from.getTime() + 1000 * 60 * 60 * 24)
      .toISOString()
      .split("T")[0];

    const formattedTo = new Date(to.getTime() + 1000 * 60 * 60 * 24)
      .toISOString()
      .split("T")[0];

    // Set the filter value for the column
    table.getColumn("createdAt")?.setFilterValue([formattedFrom, formattedTo]);
  };

  return (
    <Card className="w-full py-4 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-100 rounded-xl shadow">
      <CardHeader>
        <CardTitle>Liste des parrainages — {mockSponsorships.length}</CardTitle>
        <CardDescription>Liste de tous les parrainages</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-end gap-3 mb-12">
          <div className="relative w-full">
            <div className="absolute right-4 top-2">
              <Search className="text-muted-foreground" />
            </div>
            <Input
              value={
                (table.getColumn("sponsor")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) => {
                table.getColumn("sponsor")?.setFilterValue(event.target.value);
              }}
              placeholder="Rechercher un parrain"
              className="dark:bg-gray-800 dark:border-gray-800"
            />
          </div>
          <DatePickerWithRange
            className="dark:bg-gray-800 dark:border-gray-800"
            onChange={(range) => {
              setDate(range);
              handleFilterDate(range);
            }}
          />
          <Button>
            <ArrowDownToLine className="mr-2 h-4 w-4" />
            Exporter
          </Button>
        </div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="dark:hover:bg-gray-800 dark:border-gray-800"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="whitespace-nowrap">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="dark:hover:bg-gray-800 dark:border-gray-800"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Aucun résultat.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Précédent
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Suivant
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
