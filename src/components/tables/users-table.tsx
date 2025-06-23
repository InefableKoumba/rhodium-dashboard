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
import {
  ArrowDownToLine,
  Search,
  Ban,
  Trash2,
  Award,
  MoreHorizontal,
  X,
  Lock,
  Unlock,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback } from "react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteUser, updateUser } from "@/service/api/api";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { use$, useObservable } from "@legendapp/state/react";
import Loader from "../loader";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// User actions modals
const BlockUserDialog = ({
  user,
  onSuccess,
  unblock = false,
}: {
  user: User;
  onSuccess: () => void;
  unblock?: boolean;
}) => {
  const state$ = useObservable({
    isOpen: false,
    isLoading: false,
  });
  const state = use$(state$);

  const handleBlock = async () => {
    try {
      state$.isLoading.set(true);
      const ok = await updateUser(user.id, {
        isBlocked: unblock ? false : true,
      });
      if (ok) {
        toast.success(
          `${user.name} a été ${unblock ? "débloqué" : "bloqué"} avec succès.`
        );
        state$.isOpen.set(false);
        onSuccess();
      } else {
        toast.error(
          `Une erreur est survenue lors du ${
            unblock ? "déblocage" : "blocage"
          } de l'utilisateur.`
        );
      }
    } catch (error) {
      toast.error(
        `Une erreur est survenue lors du ${
          unblock ? "déblocage" : "blocage"
        } de l'utilisateur.`
      );
    } finally {
      state$.isLoading.set(false);
    }
  };

  return (
    <Dialog open={state.isOpen} onOpenChange={state$.isOpen.set}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          {unblock ? (
            <Unlock className="mr-2 h-4 w-4" />
          ) : (
            <Lock className="mr-2 h-4 w-4" />
          )}
          <span>{unblock ? "Débloquer" : "Bloquer"}</span>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {unblock ? "Débloquer" : "Bloquer"} l'utilisateur
          </DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir {unblock ? "débloquer" : "bloquer"}{" "}
            {user.name} ? Cette action empêchera l'utilisateur de se connecter à
            son compte.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => state$.isOpen.set(false)}>
            Annuler
          </Button>
          <Button
            variant={unblock ? "default" : "destructive"}
            onClick={handleBlock}
            disabled={state.isLoading}
          >
            {state.isLoading ? <Loader /> : unblock ? "Débloquer" : "Bloquer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const PromoteUserDialog = ({
  user,
  onSuccess,
  demote = false,
}: {
  user: User;
  onSuccess: () => void;
  demote?: boolean;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handlePromote = async () => {
    try {
      setIsLoading(true);
      const ok = await updateUser(user.id, {
        role: demote ? "USER" : "COMMERCIAL",
      });
      if (ok) {
        toast.success(
          `${user.name} a été ${demote ? "rétrogradé" : "promu"} au rôle ${
            demote ? "utilisateur" : "commercial"
          } avec succès.`
        );
        onSuccess();
      } else {
        toast.error(
          "Une erreur est survenue lors de la promotion de l'utilisateur."
        );
      }
    } catch (error) {
      toast.error(
        "Une erreur est survenue lors de la promotion de l'utilisateur."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Award className="mr-2 h-4 w-4" />
          <span>
            {demote ? "Rétrograder en utilisateur" : "Promouvoir en commercial"}
          </span>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {demote ? "Rétrograder en utilisateur" : "Promouvoir en commercial"}
          </DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir {demote ? "rétrograder" : "promouvoir"}
            {user.name} en tant que {demote ? "utilisateur" : "commercial"} ?
            Cela lui donnera accès à des fonctionnalités supplémentaires.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Annuler
          </Button>
          <Button onClick={handlePromote} disabled={isLoading}>
            {isLoading ? <Loader /> : demote ? "Rétrograder" : "Promouvoir"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Add actions column to the columns definition
const createColumns = (refreshData: () => void): ColumnDef<User>[] => [
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
      const { avatar, name, id }: { avatar: string; name: string; id: string } =
        row.getValue("profil");
      return (
        <Link className="flex items-center gap-2 group" href={"/users/" + id}>
          {typeof avatar === "string" && avatar !== "" ? (
            <div className="w-14 h-14 rounded-full relative">
              <Image
                fill
                className="rounded-full object-cover"
                alt={name + " avatar"}
                src={process.env.NEXT_PUBLIC_R2_BUCKET_URL + "/" + avatar}
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
    accessorKey: "phoneNumber",
    header: "Téléphone",
    cell: ({ row }) => (
      <div className="w-[200px]">
        {row.getValue("phoneNumber") || "Non renseigné"}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date d'adhésion",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return (
        <div className="whitespace-nowrap">
          {date.toLocaleDateString("fr-FR", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      if (!value || !Array.isArray(value) || value.length !== 2) return true;

      const rowDate = new Date(row.getValue("createdAt"));
      const startDate = new Date(value[0]);
      const endDate = new Date(value[1]);

      return rowDate >= startDate && rowDate <= endDate;
    },
  },
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex flex-wrap gap-1">
          {user.isBlocked && (
            <Badge
              variant="destructive"
              className="whitespace-nowrap text-white"
            >
              Bloqué
            </Badge>
          )}
          {!user.isBlocked && user.role === "COMMERCIAL" && (
            <Badge variant="default" className="whitespace-nowrap bg-blue-500">
              Commercial
            </Badge>
          )}
          {!user.isBlocked && user.role === "USER" && (
            <Badge variant="outline" className="whitespace-nowrap">
              Utilisateur
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Ouvrir le menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/users/${user.id}`}>Voir le profil</Link>
            </DropdownMenuItem>
            <BlockUserDialog
              user={user}
              onSuccess={refreshData}
              unblock={user.isBlocked}
            />
            {!user.isBlocked && (
              <PromoteUserDialog
                user={user}
                onSuccess={refreshData}
                demote={user.role === "COMMERCIAL"}
              />
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function UsersTable({
  users,
  total,
  isSponsredUsersTable = false,
}: Readonly<{
  users: User[];
  total: number;
  isSponsredUsersTable?: boolean;
}>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [date, setDate] = React.useState<DateRange | undefined>(undefined);
  const [refreshTrigger, setRefreshTrigger] = React.useState(0);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [dateFilter, setDateFilter] = React.useState<
    [Date, Date] | undefined
  >();
  const [roleFilter, setRoleFilter] = React.useState<string>("all");
  const [blockedFilter, setBlockedFilter] = React.useState<string>("all");
  const router = useRouter();

  // Function to refresh data that will be passed to action components
  const refreshData = useCallback(() => {
    router.refresh();
  }, [router]);

  const columns = React.useMemo(
    () => createColumns(refreshData),
    [refreshData]
  );

  // Custom filter function that checks name, email, phone number, role, and blocked status
  const filterUsers = React.useCallback(
    (users: User[], filterValue: string, dateRange?: [Date, Date]) => {
      let result = [...users];

      // Text search filter
      if (filterValue) {
        const lowerCaseFilter = filterValue.toLowerCase();

        result = result.filter((user) => {
          const nameMatch = user.name.toLowerCase().includes(lowerCaseFilter);
          const emailMatch = user.email.toLowerCase().includes(lowerCaseFilter);
          const phoneMatch = user.phoneNumber
            ? user.phoneNumber.toLowerCase().includes(lowerCaseFilter)
            : false;

          return nameMatch || emailMatch || phoneMatch;
        });
      }

      // Date filter
      if (dateRange && dateRange.length === 2) {
        const [startDate, endDate] = dateRange;

        result = result.filter((user) => {
          const userDate = new Date(user.createdAt);
          return userDate >= startDate && userDate <= endDate;
        });
      }

      // Role filter
      if (roleFilter !== "all") {
        result = result.filter((user) => user.role === roleFilter);
      }

      // Blocked status filter
      if (blockedFilter !== "all") {
        const isBlocked = blockedFilter === "blocked";
        result = result.filter((user) => user.isBlocked === isBlocked);
      }

      return result;
    },
    [roleFilter, blockedFilter]
  );

  const filteredUsers = React.useMemo(() => {
    return filterUsers(users, globalFilter, dateFilter);
  }, [users, globalFilter, dateFilter, filterUsers]);

  const table = useReactTable({
    data: filteredUsers,
    columns,
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

  // When search or date changes, reset to first page
  React.useEffect(() => {
    table.resetPageIndex(true);
  }, [globalFilter, dateFilter, table]);

  const handleFilterDate = (range: DateRange | undefined) => {
    setDate(range);

    if (!range?.from || !range?.to) {
      setDateFilter(undefined);
      return;
    }

    // Set start date to beginning of day
    const from = new Date(range.from);
    from.setHours(0, 0, 0, 0);

    // Set end date to end of day
    const to = new Date(range.to);
    to.setHours(23, 59, 59, 999);

    // Set date filter for our custom filter function
    setDateFilter([from, to]);
  };

  return (
    <Card className="w-full py-4 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-100 rounded-xl shadow">
      <CardHeader>
        <CardTitle>
          {isSponsredUsersTable
            ? "Liste des filleuls "
            : "Liste des utilisateurs "}{" "}
          — {filteredUsers.length}
        </CardTitle>
        <CardDescription>
          {isSponsredUsersTable
            ? "Liste des utilisateurs parrainés par cet utilisateur"
            : "Liste de tous les utilisateurs dans le système"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2 mb-12">
          <div className="flex items-center justify-end gap-3 flex-wrap">
            <div className="relative w-full">
              <div className="absolute left-3 top-2.5">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
              <Input
                value={globalFilter}
                onChange={(event) => setGlobalFilter(event.target.value)}
                placeholder="Rechercher par nom, email ou téléphone..."
                className="pl-9 pr-9 dark:bg-gray-800 dark:border-gray-800"
              />
              {globalFilter && (
                <button
                  onClick={() => setGlobalFilter("")}
                  className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[180px] dark:bg-gray-800 dark:border-gray-800">
                <SelectValue placeholder="Filtrer par rôle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les rôles</SelectItem>
                <SelectItem value="USER">Utilisateurs</SelectItem>
                <SelectItem value="COMMERCIAL">Commerciaux</SelectItem>
              </SelectContent>
            </Select>
            <Select value={blockedFilter} onValueChange={setBlockedFilter}>
              <SelectTrigger className="w-[180px] dark:bg-gray-800 dark:border-gray-800">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="blocked">Bloqués</SelectItem>
                <SelectItem value="active">Actifs</SelectItem>
              </SelectContent>
            </Select>
            <DatePickerWithRange
              className="dark:bg-gray-800 dark:border-gray-800"
              onChange={handleFilterDate}
            />
            <ExportToExcel data={filteredUsers} fileName="users">
              <Button>
                <ArrowDownToLine className="mr-2 h-4 w-4" />
                Exporter
              </Button>
            </ExportToExcel>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {globalFilter && (
              <div className="text-xs text-muted-foreground">
                Recherche par <span className="font-medium">nom</span>,{" "}
                <span className="font-medium">email</span> et{" "}
                <span className="font-medium">téléphone</span>
              </div>
            )}
            {dateFilter && (
              <div className="text-xs text-muted-foreground ml-2">
                <span className="font-medium">•</span> Période du{" "}
                <span className="font-medium">
                  {dateFilter[0].toLocaleDateString("fr-FR")}
                </span>{" "}
                au{" "}
                <span className="font-medium">
                  {dateFilter[1].toLocaleDateString("fr-FR")}
                </span>
              </div>
            )}
            {roleFilter !== "all" && (
              <div className="text-xs text-muted-foreground ml-2">
                <span className="font-medium">•</span> Rôle :{" "}
                <span className="font-medium">
                  {roleFilter === "USER" ? "Utilisateur" : "Commercial"}
                </span>
              </div>
            )}
            {blockedFilter !== "all" && (
              <div className="text-xs text-muted-foreground ml-2">
                <span className="font-medium">•</span> Statut :{" "}
                <span className="font-medium">
                  {blockedFilter === "blocked" ? "Bloqué" : "Actif"}
                </span>
              </div>
            )}
            {(globalFilter ||
              dateFilter ||
              roleFilter !== "all" ||
              blockedFilter !== "all") &&
              filteredUsers.length !== users.length && (
                <div className="text-xs ml-2">
                  <Badge variant="outline" className="text-xs font-normal">
                    {filteredUsers.length} sur {users.length} utilisateurs
                  </Badge>
                </div>
              )}
          </div>
        </div>
        <div className="rounded-md border dark:border-gray-800">
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
                    className="h-32 text-center"
                  >
                    {users.length === 0 ? (
                      <div className="flex flex-col items-center justify-center gap-2">
                        <p className="font-medium">Aucun utilisateur trouvé</p>
                        <p className="text-sm text-muted-foreground">
                          Il n'y a aucun utilisateur enregistré dans le système.
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-2">
                        <p className="font-medium">Aucun résultat trouvé</p>
                        <p className="text-sm text-muted-foreground">
                          Modifiez vos critères de recherche ou réinitialisez
                          les filtres.
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setGlobalFilter("");
                            setDateFilter(undefined);
                            setDate(undefined);
                          }}
                          className="mt-2"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Réinitialiser les filtres
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="text-sm text-muted-foreground">
            {filteredUsers.length > 0 ? (
              <>
                Page {table.getState().pagination.pageIndex + 1} sur{" "}
                {table.getPageCount()}{" "}
                {filteredUsers.length > table.getState().pagination.pageSize &&
                  `• ${table.getRowModel().rows.length} sur ${
                    filteredUsers.length
                  } utilisateurs affichés`}
              </>
            ) : (
              "Aucun résultat"
            )}
          </div>
          <div className="flex items-center space-x-2">
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
        </div>
      </CardContent>
    </Card>
  );
}
