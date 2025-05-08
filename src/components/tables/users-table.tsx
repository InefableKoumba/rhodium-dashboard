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
import { cn } from "@/lib/utils";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => <div className="w-[10px]">{row.index + 1}</div>,
  },
  {
    accessorKey: "profil",
    header: "Profile",
    accessorFn: (row) => ({
      id: row.id,
      avatar: row?.avatar ?? "",
      name: row.name,
    }),
    cell: ({ row }) => {
      const { avatar, name, id }: { avatar: string; name: string; id: number } =
        row.getValue("profil");
      return (
        <Link className="flex items-center gap-2 group" href={"/users/" + id}>
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
      name: row.name,
    }),
    filterFn: (row, id, value) => {
      const { name }: { name: string } = row.getValue("name");
      return name.toLowerCase().includes(value.toLowerCase());
    },
    cell: ({ row }) => {
      const { name }: { name: string } = row.getValue("name");
      return <div className="w-[200px]">{name}</div>;
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
  total,
}: Readonly<{
  users: User[];
  total: number;
}>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [date, setDate] = React.useState<DateRange | undefined>(undefined);

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
          <DatePickerWithRange
            className="dark:bg-gray-800 dark:border-gray-800"
            onChange={(range: DateRange | undefined) => {
              setDate(range);
              handleFilterDate(range);
            }}
          />
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
