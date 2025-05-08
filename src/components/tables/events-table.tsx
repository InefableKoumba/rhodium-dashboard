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
import { Event, EventCategory } from "@/types/types";
import { cn } from "@/lib/utils";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";

const columns: ColumnDef<Event>[] = [
  {
    accessorKey: "head",
    accessorFn: (row) => ({
      title: row.title,
      cover: row.coverImageId,
    }),
    header: "Couverture",
    cell: ({ row }) => {
      const { title, cover }: { title: string; cover: string } =
        row.getValue("head");
      return (
        <Link
          className="flex items-center gap-2 group"
          href={"/events/" + row.original.id}
        >
          {cover ? (
            <div className="relative w-24 h-16 rounded overflow-hidden">
              <Image
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
                src={process.env.NEXT_PUBLIC_R2_BUCKET_URL + "/" + cover}
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
    accessorKey: "organizer",
    accessorFn: (row) => ({
      creatorName: row.organizer?.name,
    }),
    header: "Organisateur",
    cell: ({ row }) => {
      const { creatorName }: { creatorName: string } =
        row.getValue("organizer");
      return <>{creatorName}</>;
    },
  },
  {
    accessorKey: "location",
    accessorFn: (row) => ({
      city: row.city,
      location: row.location,
    }),
    header: "Lieu",
    cell: ({ row }) => {
      const { city, location }: { city: string; location: string } =
        row.getValue("location");
      return <span>{location + (city ? `, ${city}` : "")}</span>;
    },
  },
  {
    accessorKey: "isFree",
    header: "Accès",
    cell: ({ row }) => {
      const isFree = row.getValue("isFree");
      return (
        <div
          className={`whitespace-nowrap rounded-full text-sm px-3 py-1 flex items-center justify-center ${
            isFree ? "bg-green-600 text-white" : "border"
          }`}
        >
          {isFree ? "Gratuit" : "Payant"}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => {
      const status = row.getValue("status");
      let bgColor = "bg-gray-500";
      let text = "Inconnu";

      switch (status) {
        case "PENDING":
          bgColor = "bg-yellow-500";
          text = "En attente";
          break;
        case "APPROVED":
          bgColor = "bg-green-600";
          text = "Approuvé";
          break;
        case "REJECTED":
          bgColor = "bg-red-500";
          text = "Rejeté";
          break;
      }

      return (
        <div
          className={`${bgColor} whitespace-nowrap text-white rounded-full text-sm px-3 py-1 flex items-center justify-center`}
        >
          {text}
        </div>
      );
    },
  },
  {
    accessorKey: "startsAt",
    header: "Date de début",
    cell: ({ row }) => (
      <div className="whitespace-nowrap">
        {new Date(row.getValue("startsAt")).toLocaleDateString("fr-FR", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </div>
    ),
    filterFn: (row, id, value) => {
      return (
        new Date(row.getValue("startsAt")) >= new Date(value[0]) &&
        new Date(row.getValue("startsAt")) <= new Date(value[1])
      );
    },
  },
  {
    accessorKey: "endsAt",
    header: "Date de fin",
    cell: ({ row }) => (
      <div className="whitespace-nowrap">
        {new Date(row.getValue("endsAt")).toLocaleDateString("fr-FR", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </div>
    ),
  },
  {
    accessorKey: "categories",
    header: "Catégories",
    cell: ({ row }) => {
      const categories = row.getValue("categories") as EventCategory[];
      return (
        <div className="flex flex-wrap gap-1">
          {categories.map((category) => (
            <span
              key={category}
              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
            >
              {category}
            </span>
          ))}
        </div>
      );
    },
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
    table.getColumn("startsAt")?.setFilterValue([formattedFrom, formattedTo]);
  };

  return (
    <Card className="w-full dark:bg-gray-900 dark:border-gray-800 rounded-xl shadow">
      <CardHeader>
        <CardTitle>Evènements — {events.length}</CardTitle>
        <CardDescription>Liste de tous les événements</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-end gap-3 mb-12">
          <div className="relative w-full">
            <div className="absolute right-4 top-2">
              <Search className="text-muted-foreground" />
            </div>
            <Input
              value={
                (table.getColumn("title")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) => {
                table.getColumn("title")?.setFilterValue(event.target.value);
              }}
              className="dark:bg-gray-800 dark:border-gray-800"
              placeholder="Rechercher un évènement"
            />
          </div>
          {showValidatedFilter && (
            <Select
              onValueChange={(value) => {
                if (value === "all") {
                  table.getColumn("status")?.setFilterValue(undefined);
                } else {
                  table.getColumn("status")?.setFilterValue(value);
                }
              }}
            >
              <SelectTrigger className="w-[450px] dark:bg-gray-800 dark:border-gray-800">
                <SelectValue placeholder="Approuvés et En attente" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="dark:bg-gray-800 dark:border-gray-800">
                  <SelectItem value="all">Approuvés et En attente</SelectItem>
                  <SelectItem value="APPROVED">Approuvés</SelectItem>
                  <SelectItem value="PENDING">En attente</SelectItem>
                  <SelectItem value="REJECTED">Rejétés</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
          {showAgentFilter && (
            <Select>
              <SelectTrigger className="w-[450px] dark:bg-gray-800 dark:border-gray-800">
                <SelectValue placeholder="Tous les agents" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="dark:bg-gray-800 dark:border-gray-800">
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
                table.getColumn("isFree")?.setFilterValue(undefined);
              } else if (value === "free") {
                table.getColumn("isFree")?.setFilterValue(true);
              } else if (value === "paid") {
                table.getColumn("isFree")?.setFilterValue(false);
              }
            }}
          >
            <SelectTrigger className="w-[450px] dark:bg-gray-800 dark:border-gray-800">
              <SelectValue placeholder="Privés et Publics" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="dark:bg-gray-800 dark:border-gray-800">
                <SelectItem value="all">Privé et Public</SelectItem>
                <SelectItem value="free">Publics</SelectItem>
                <SelectItem value="paid">Privés</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) => {
              if (value === "all") {
                table.getColumn("isFree")?.setFilterValue(undefined);
              } else if (value === "free") {
                table.getColumn("isFree")?.setFilterValue(true);
              } else if (value === "paid") {
                table.getColumn("isFree")?.setFilterValue(false);
              }
            }}
          >
            <SelectTrigger className="w-[450px] dark:bg-gray-800 dark:border-gray-800">
              <SelectValue placeholder="Gratuits et payants" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="dark:bg-gray-800 dark:border-gray-800">
                <SelectItem value="all">Tous les évènements</SelectItem>
                <SelectItem value="free">Gratuits</SelectItem>
                <SelectItem value="paid">Payants</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[300px] justify-start text-left font-normal dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-900",
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
              <TableRow
                key={headerGroup.id}
                className="dark:hover:bg-gray-800 dark:border-gray-800"
              >
                <TableHead key={i + 1} className="whitespace-nowrap">
                  #
                </TableHead>
                {headerGroup.headers.map((header) => {
                  if (!showValidatedFilter && header.column.id === "status")
                    return (
                      <TableHead key={header.id} className="whitespace-nowrap">
                        Statut
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
                  className="dark:hover:bg-gray-800 dark:border-gray-800"
                >
                  <TableCell key={i + 1}>{i + 1}</TableCell>
                  {row.getVisibleCells().map((cell) => {
                    if (cell.column.id === "status" && !showValidatedFilter)
                      return <TableCell key={cell.id}>Statut</TableCell>;
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
