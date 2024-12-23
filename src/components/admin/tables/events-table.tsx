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
import { Event } from "@/interfaces/interfaces";

const columns: ColumnDef<Event>[] = [
  {
    accessorKey: "head",
    accessorFn: (row) => ({
      title: row.title,
      cover: row.coverImage,
    }),
    header: "Couverture",
    cell: ({ row }) => {
      const { title, cover }: { title: string; cover: string } =
        row.getValue("head");
      const id = parseInt(row.id) + 1;
      return (
        <Link
          className="flex items-center gap-2 group"
          href={"/rhodium/events/" + id}
        >
          {cover ? (
            <div className="relative w-24 h-16 rounded overflow-hidden">
              <Image
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
                src={cover}
                alt={title}
                className="object-cover group-hover:scale-110 transform transition-all duration-700"
              />
            </div>
          ) : (
            <div className="w-24 h-14 rounded bg-gray-200 flex items-center justify-center">
              <CalendarDays color="#888" />
            </div>
          )}
        </Link>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Titre",
    cell: ({ row }) => <div className="w-[200px]">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "creator",
    accessorFn: (row) => ({
      creatorName:
        row.creator?.data?.attributes?.firstname +
        " " +
        row.creator?.data?.attributes?.lastname,
    }),
    header: "Organisateur",
    cell: ({ row }) => {
      const {
        creatorName,
      }: {
        creatorName: string;
      } = row.getValue("creator");
      return <>{creatorName}</>;
    },
  },
  {
    accessorKey: "location",
    accessorFn: (row) => ({
      country: row.country,
      location_city: row.location_city,
    }),
    header: "Lieu",
    cell: ({ row }) => {
      const {
        location_city,
        country,
      }: {
        location_city: string;
        country: string;
      } = row.getValue("location");
      return <span>{location_city + (country ? `, ${country}` : "")}</span>;
    },
  },
  {
    accessorKey: "hasCost",
    header: "Accès",
    cell: ({ row }) => {
      const hasCost = row.getValue("hasCost");
      if (!hasCost)
        return (
          <div className="bg-orange-600 whitespace-nowrap text-white rounded-full text-sm px-3 py-1 flex items-center justify-center">
            Payant
          </div>
        );
      return (
        <div className="border whitespace-nowrap rounded-full text-sm px-3 py-1 flex items-center justify-center">
          Gratuit
        </div>
      );
    },
  },
  {
    accessorKey: "isValidatedByAdmin",
    header: "Validation",
    cell: ({ row }) => {
      const isValidatedByAdmin = row.getValue("isValidatedByAdmin");

      switch (isValidatedByAdmin) {
        case "VALIDATED":
          return (
            <div className="bg-green-600 whitespace-nowrap text-white rounded-full text-sm px-3 py-1 flex items-center justify-center">
              Validée
            </div>
          );
        case "PENDING":
          return (
            <div className="bg-yellow-500 whitespace-nowrap text-white rounded-full text-sm px-3 py-1 flex items-center justify-center">
              En attente
            </div>
          );
        case "REJECTED":
          return (
            <div className="bg-red-500 whitespace-nowrap text-white rounded-full text-sm px-3 py-1 flex items-center justify-center">
              Rejétée
            </div>
          );
      }
    },
  },
  {
    accessorKey: "date_start",
    header: "Date",
    cell: ({ row }) => (
      <div className="whitespace-nowrap">
        {new Date(row.getValue("date_start")).toLocaleDateString("fr-FR", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </div>
    ),
  },
];

export default function EventsTable({
  events,
  showAgentFilter,
  showValidatedFilter,
}: Readonly<{
  events: Event[];
  showAgentFilter?: boolean;
  showValidatedFilter?: boolean;
}>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data: events,
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
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Evènements — {events.length}</CardTitle>
        <CardDescription>Liste de tous les événements</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-end gap-3 mb-12">
          <div className="relative w-full">
            <div className="absolute right-4 top-2">
              <Search color="#333" />
            </div>
            <Input
              value={
                (table.getColumn("title")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) => {
                table.getColumn("title")?.setFilterValue(event.target.value);
              }}
              placeholder="Rechercher un évènement"
            />
          </div>
          {showValidatedFilter && (
            <Select>
              <SelectTrigger className="w-[450px]">
                <SelectValue placeholder="Validés et En attente" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">Validés et En attente</SelectItem>
                  <SelectItem value="free">Validés</SelectItem>
                  <SelectItem value="paid">En attente</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
          {showAgentFilter && (
            <Select>
              <SelectTrigger className="w-[450px]">
                <SelectValue placeholder="Tous les agents" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">Tous les agents</SelectItem>
                  <SelectItem value="free">Inefable KOUMBA</SelectItem>
                  <SelectItem value="paid">Franz OSSETE</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
          <Select
            onValueChange={(value) => {
              if (value === "all") {
                table.getColumn("hasCost")?.setFilterValue(undefined);
              } else if (value === "free") {
                table.getColumn("hasCost")?.setFilterValue(true);
              } else if (value === "paid") {
                table.getColumn("hasCost")?.setFilterValue(false);
              }
            }}
          >
            <SelectTrigger className="w-[450px]">
              <SelectValue placeholder="Privés et Publics" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">Privé et Public</SelectItem>
                <SelectItem value="free">Publics</SelectItem>
                <SelectItem value="paid">Privés</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) => {
              if (value === "all") {
                table.getColumn("hasCost")?.setFilterValue(undefined);
              } else if (value === "free") {
                table.getColumn("hasCost")?.setFilterValue(true);
              } else if (value === "paid") {
                table.getColumn("hasCost")?.setFilterValue(false);
              }
            }}
          >
            <SelectTrigger className="w-[450px]">
              <SelectValue placeholder="Gratuits et payants" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">Tous les évènements</SelectItem>
                <SelectItem value="free">Gratuits</SelectItem>
                <SelectItem value="paid">Payants</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className="w-[245px] pl-3 text-left font-normal"
              >
                <span>
                  {(table
                    .getColumn("date_start")
                    ?.getFilterValue() as string) ?? "Choisissez une date"}
                </span>
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                onDayClick={(e) =>
                  table
                    .getColumn("date_start")
                    ?.setFilterValue(
                      new Date(e.getTime() + 1000 * 60 * 60 * 24)
                        .toISOString()
                        .split("T")[0]
                    )
                }
                mode="single"
              />
            </PopoverContent>
          </Popover>
          <ExportToExcel data={events} fileName="events">
            <Button>
              <ArrowDownToLine size={36} />
              Exporter
            </Button>
          </ExportToExcel>
        </div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup, i) => (
              <TableRow key={headerGroup.id}>
                <TableHead key={i + 1} className="whitespace-nowrap">
                  #
                </TableHead>
                {headerGroup.headers.map((header) => {
                  if (
                    !showValidatedFilter &&
                    header.column.id === "isValidatedByAdmin"
                  )
                    return (
                      <TableHead key={header.id} className="whitespace-nowrap">
                        Rejeté par
                      </TableHead>
                    );
                  return (
                    <TableHead key={header.id} className="whitespace-nowrap">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, i) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  <TableCell key={i + 1}>{i + 1}</TableCell>
                  {row.getVisibleCells().map((cell) => {
                    if (
                      cell.column.id === "isValidatedByAdmin" &&
                      !showValidatedFilter
                    )
                      return (
                        <TableCell key={cell.id}>
                          Nom de l&apos;agent ayant rejeté
                        </TableCell>
                      );
                    return (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
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
