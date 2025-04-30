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
import { UserInterface } from "@/types/types";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { GeneralAvatar } from "@/components/common/general-user-avatar";
import { cn } from "@/lib/utils";

const columns: ColumnDef<UserInterface>[] = [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => <div className="w-[10px]">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "profil",
    header: "Profile",
    accessorFn: (row) => ({
      id: row.id,
      avatar: row?.avatarUrl ?? "",
      name:
        !row.firstname && row.lastname
          ? row.firstname + " " + row.lastname
          : row.username,
    }),
    cell: ({ row }) => {
      const { avatar, name, id }: { avatar: string; name: string; id: number } =
        row.getValue("profil");
      return (
        <Link
          className="flex items-center gap-2 group"
          href={"/rhodium/users/" + id}
        >
          {typeof avatar === "string" && avatar !== "" ? (
            <div className="w-14 h-14 rounded-full relative">
              <Image
                fill
                className="rounded-full object-cover"
                alt={name + " avatar"}
                src={avatar}
              />
            </div>
          ) : (
            <div className="w-14 h-14">
              <GeneralAvatar />
            </div>
          )}
        </Link>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Nom & prénom",
    accessorFn: (row) => ({
      firstname: row.firstname,
      lastname: row.lastname,
    }),
    filterFn: (row, id, value) => {
      const { firstname, lastname }: { firstname: string; lastname: string } =
        row.getValue("name");
      return (firstname + " " + lastname)
        .toLowerCase()
        .includes(value.toLowerCase());
    },
    cell: ({ row }) => {
      const { firstname, lastname }: { firstname: string; lastname: string } =
        row.getValue("name");
      return <div className="w-[200px]">{firstname + " " + lastname}</div>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div className="w-[200px]">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "phone_number",
    header: "Téléphone",
    cell: ({ row }) => (
      <div className="w-[200px]">{row.getValue("phone_number")}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date d'adhésion",
    cell: ({ row }) => (
      <div className="whitespace-nowrap">
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
];

export default function UsersTable({
  users,
}: Readonly<{
  users: UserInterface[];
}>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data: users,
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
    <Card className="w-full py-4 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-100 rounded-xl shadow">
      <CardHeader>
        <CardTitle>Liste des utilisateurs — {users.length}</CardTitle>
        <CardDescription>Liste de tous les utilisateurs</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-end gap-3 mb-12">
          <div className="relative w-full">
            <div className="absolute right-4 top-2">
              <Search className="text-muted-foreground" />
            </div>
            <Input
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) => {
                table.getColumn("name")?.setFilterValue(event.target.value);
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
                  <span>Selectionnez plage de date</span>
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
            data={users.map((user) => ({
              ...user,
            }))}
            fileName="users"
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
