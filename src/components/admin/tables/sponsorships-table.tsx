"use client";

import ExportToExcel from "@/components/common/export-to-excel";
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowDownToLine,
  CalendarDays,
  CalendarIcon,
  Search,
} from "lucide-react";
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
import { SponsorshipInterface, UserInterface } from "@/types/types";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { GeneralAvatar } from "@/components/common/general-user-avatar";
import { cn } from "@/lib/utils";

const columns: ColumnDef<SponsorshipInterface>[] = [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => <div className="w-[10px]">{row.index + 1}</div>,
  },
  {
    accessorKey: "referrer",
    header: "Parrain",
    accessorFn: (row) => ({
      id: row.referred_by.id,
      avatar: row?.referred_by.avatarUrl ?? "",
      name:
        !row.referred_by.firstname && row.referred_by.lastname
          ? row.referred_by.firstname + " " + row.referred_by.lastname
          : row.referred_by.username,
      email: row.referred_by.email,
      phone_number: row.referred_by.phone_number,
    }),
    filterFn: (row, id, value) => {
      const { name, email }: { name: string; email: string } =
        row.getValue("referrer");
      return (
        name.toLowerCase().includes(value.toLowerCase()) ||
        email.toLowerCase().includes(value.toLowerCase())
      );
    },
    cell: ({ row }) => {
      const {
        avatar,
        name,
        id,
        email,
        phone_number,
      }: {
        avatar: string;
        name: string;
        id: number;
        email: string;
        phone_number: string;
      } = row.getValue("referrer");
      return (
        <Link
          className="flex items-center gap-4 group"
          href={"/rhodium/users/" + id}
        >
          {typeof avatar === "string" && avatar !== "" ? (
            <div className="size-16 rounded-full relative">
              <Image
                fill
                className="rounded-full object-cover"
                alt={name + " avatar"}
                src={avatar}
              />
            </div>
          ) : (
            <div className="size-16">
              <GeneralAvatar />
            </div>
          )}
          <div className="flex-1">
            <div className="font-semibold text-lg">{name}</div>
            <div className="text-muted-foreground text-sm">{email}</div>
            <div className="text-muted-foreground text-sm">{phone_number}</div>
          </div>
        </Link>
      );
    },
  },
  {
    accessorKey: "referred_user",
    header: "Filleul",
    accessorFn: (row) => ({
      id: row.referred_user.id,
      avatar: row?.referred_user.avatarUrl ?? "",
      name:
        !row.referred_user.firstname && row.referred_user.lastname
          ? row.referred_user.firstname + " " + row.referred_user.lastname
          : row.referred_user.username,
      email: row.referred_user.email,
      phone_number: row.referred_user.phone_number,
    }),
    filterFn: (row, id, value) => {
      const { name, email }: { name: string; email: string } =
        row.getValue("referred_user");
      return (
        name.toLowerCase().includes(value.toLowerCase()) ||
        email.toLowerCase().includes(value.toLowerCase())
      );
    },
    cell: ({ row }) => {
      const {
        avatar,
        name,
        id,
        email,
        phone_number,
      }: {
        avatar: string;
        name: string;
        id: number;
        email: string;
        phone_number: string;
      } = row.getValue("referred_user");
      return (
        <Link
          className="flex items-center gap-4 group"
          href={"/rhodium/users/" + id}
        >
          {typeof avatar === "string" && avatar !== "" ? (
            <div className="size-16 rounded-full relative">
              <Image
                fill
                className="rounded-full object-cover"
                alt={name + " avatar"}
                src={avatar}
              />
            </div>
          ) : (
            <div className="size-16">
              <GeneralAvatar />
            </div>
          )}
          <div className="flex-1">
            <div className="font-semibold text-lg">{name}</div>
            <div className="text-muted-foreground text-sm">{email}</div>
            <div className="text-muted-foreground text-sm">{phone_number}</div>
          </div>
        </Link>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date de parrainage",
    cell: ({ row }) => (
      <div className="whitespace-nowrap w-[100px]">
        {new Date(row.getValue("createdAt")).toLocaleDateString("fr-FR", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </div>
    ),
    filterFn: (row, id, value) => {
      return (
        new Date(row.getValue("createdAt")) >= new Date(value[0]) &&
        new Date(row.getValue("createdAt")) <= new Date(value[1])
      );
    },
  },
  {
    accessorKey: "paidAt",
    header: "Date de parrainage",
    cell: ({ row }) => (
      <div className="whitespace-nowrap w-[100px]">
        {new Date(row.getValue("paidAt")).toLocaleDateString("fr-FR", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </div>
    ),
    filterFn: (row, id, value) => {
      return (
        new Date(row.getValue("paidAt")) >= new Date(value[0]) &&
        new Date(row.getValue("paidAt")) <= new Date(value[1])
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Montant",
    cell: ({ row }) => <div className="w-auto">{row.getValue("amount")}</div>,
  },
  {
    accessorKey: "agent",
    header: "Agent",
    cell: ({ row }) => (
      <div className="w-auto whitespace-nowrap">{row.getValue("agent")}</div>
    ),
  },
];

export default function SponsorshipsTable({
  sponsorships,
}: Readonly<{
  sponsorships: SponsorshipInterface[];
}>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data: sponsorships,
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

  const [date, setDate] = React.useState<DateRange | undefined>(undefined);

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

    console.log("Applying filter for date range:", {
      from: formattedFrom,
      to: formattedTo,
    });

    // Set the filter value for the column
    table.getColumn("createdAt")?.setFilterValue([formattedFrom, formattedTo]);
  };

  return (
    <Card className="w-full py-4 mt-8 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-100 rounded-xl shadow">
      <CardHeader>
        <CardTitle>
          Liste des parrainages non payés — {sponsorships.length}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-end gap-3 mb-12">
          <div className="relative w-full">
            <div className="absolute right-4 top-2">
              <Search className="text-muted-foreground" />
            </div>
            <Input
              value={
                (table.getColumn("referrer")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) => {
                table.getColumn("referrer")?.setFilterValue(event.target.value);
              }}
              placeholder="Rechercher un utilisateur"
              className="dark:bg-gray-800 dark:border-gray-800"
            />
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[450px] justify-start text-left font-normal dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-900",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Selectionnez une plage de date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0 dark:bg-gray-800 dark:border-gray-800"
              align="start"
            >
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={(range) => {
                  setDate(range);
                  handleFilterDate(range);
                }}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          <ExportToExcel
            data={sponsorships.map((sponsorship) => ({
              ...sponsorship,
            }))}
            fileName="sponsorships"
          >
            <Button>
              <ArrowDownToLine size={36} />
              Exporter
            </Button>
          </ExportToExcel>
        </div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup, i) => (
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
              table.getRowModel().rows.map((row, i) => (
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
