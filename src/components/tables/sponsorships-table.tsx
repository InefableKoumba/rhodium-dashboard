"use client";

import ExportToExcel from "@/components/common/export-to-excel";
import { GeneralAvatar } from "@/components/common/general-user-avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowDownToLine,
  Search,
  X,
  User,
  Award,
  CalendarRange,
  FileSpreadsheet,
  Tag,
  Phone,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Info,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
  ColumnFiltersState,
  SortingState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  Sponsorship,
  SponsorshipStatus,
  User as UserType,
} from "@/types/types";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { useRouter, useSearchParams } from "next/navigation";
import { updateSponsorshipStatus } from "@/service/api/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Textarea } from "@/components/ui/textarea";

// Create column definitions
const createColumns = (
  onMarkAsPaid: (id: string) => void,
  onMarkAsRejected: (id: string) => void
): ColumnDef<Sponsorship>[] => [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => <div className="w-[10px]">{row.index + 1}</div>,
  },
  {
    accessorKey: "sponsor",
    header: "Parrain",
    cell: ({ row }) => {
      const sponsor = row.original.sponsor;
      return (
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            {sponsor.avatar ? (
              <div className="w-10 h-10 rounded-full relative">
                <Image
                  fill
                  className="rounded-full object-cover"
                  alt={`${sponsor.name} avatar`}
                  src={
                    process.env.NEXT_PUBLIC_R2_BUCKET_URL + "/" + sponsor.avatar
                  }
                />
              </div>
            ) : (
              <div className="w-10 h-10">
                <GeneralAvatar />
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <Link
              href={`/users/${sponsor.id}`}
              className="font-medium hover:underline"
            >
              {sponsor.name}
            </Link>
            <div className="flex items-center gap-2">
              {sponsor.role === "COMMERCIAL" ? (
                <Badge className="bg-blue-500 text-white text-xs">
                  Commercial
                </Badge>
              ) : (
                <Badge variant="outline" className="text-xs">
                  Utilisateur
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {sponsor.email}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {sponsor.phoneNumber}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "sponsorshipCode",
    header: "Code de parrainage",
    cell: ({ row }) => (
      <div className="flex items-center">
        <Badge variant="secondary" className="font-mono">
          {row.original.sponsor.sponsorshipCode}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "godson",
    header: "Filleul",
    cell: ({ row }) => {
      const godson = row.original.godson;
      return (
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            {godson.avatar ? (
              <div className="w-10 h-10 rounded-full relative">
                <Image
                  fill
                  className="rounded-full object-cover"
                  alt={`${godson.name} avatar`}
                  src={
                    process.env.NEXT_PUBLIC_R2_BUCKET_URL + "/" + godson.avatar
                  }
                />
              </div>
            ) : (
              <div className="w-10 h-10">
                <GeneralAvatar />
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <Link
              href={`/users/${godson.id}`}
              className="font-medium hover:underline"
            >
              {godson.name}
            </Link>
            <span className="text-sm text-muted-foreground">
              {godson.email}
            </span>
            {godson.phoneNumber && (
              <span className="text-sm text-muted-foreground">
                {godson.phoneNumber}
              </span>
            )}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date d'inscription",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return (
        <div className="whitespace-nowrap">
          {date.toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Prix",
    cell: ({ row }) => {
      return (
        <Badge variant="outline" className={`bg-gray-100 text-gray-800`}>
          {row.original.price} XAF
        </Badge>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => {
      const status = row.original.status;
      const rejectionReason = row.original.rejectionReason;
      const updatedBy = row.original.updatedBy;

      const statusBadge = () => {
        switch (status) {
          case "PAID":
            return (
              <Badge
                variant="default"
                className="bg-green-500 text-white flex gap-2 justify-center cursor-pointer"
              >
                <Info size={14} /> Payé
              </Badge>
            );
          case "PENDING":
            return (
              <Badge
                variant="outline"
                className={`border-amber-500 text-amber-500 ${
                  row.original.sponsor.role === "USER" &&
                  "bg-gray-500/10 border-gray-500 text-gray-500"
                }`}
              >
                {row.original.sponsor.role === "USER"
                  ? "Non comptabilisé"
                  : "En attente"}
              </Badge>
            );
          case "REJECTED":
            return (
              <Badge
                variant="destructive"
                className="text-white flex gap-2 justify-center cursor-pointer"
              >
                <Info size={14} /> Rejeté
              </Badge>
            );
          default:
            return null;
        }
      };

      if (status !== "PENDING") {
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>{statusBadge()}</div>
              </TooltipTrigger>
              <TooltipContent className="max-w-[300px] p-4">
                <div className="space-y-2">
                  {rejectionReason && (
                    <div>
                      <p className="font-medium text-sm">Raison du rejet:</p>
                      <p className="text-sm text-muted-foreground">
                        {rejectionReason}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-sm">Mis à jour par:</p>
                    <p className="text-sm text-muted-foreground">
                      {updatedBy ?? "Information non disponible"}
                    </p>
                  </div>
                  {row.original.updatedAt && (
                    <div>
                      <p className="font-medium text-sm">
                        Date de mise à jour:
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {row.original.updatedAt
                          ? new Date(row.original.updatedAt).toLocaleDateString(
                              "fr-FR",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )
                          : "Information non disponible"}
                      </p>
                    </div>
                  )}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      }

      return statusBadge();
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const sponsorship = row.original;

      // Only show actions for PENDING sponsorships for COMMERCIAL sponsors
      const canPerformActions =
        sponsorship.status === "PENDING" &&
        sponsorship.sponsor.role === "COMMERCIAL";

      if (!canPerformActions) return null;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => onMarkAsPaid(sponsorship.id)}
              className="flex gap-2 text-green-600 focus:text-green-600"
            >
              <CheckCircle className="h-4 w-4" />
              <span>Marquer comme payé</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onMarkAsRejected(sponsorship.id)}
              className="flex gap-2 text-red-600 focus:text-red-600"
            >
              <XCircle className="h-4 w-4" />
              <span>Rejeter</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function SponsorshipsTable({
  sponsorships,
  total,
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}: {
  sponsorships: Sponsorship[];
  total: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Initialize state from URL parameters
  const [activeTab, setActiveTab] = useState<"COMMERCIAL" | "USER">(
    (typeof window !== "undefined" &&
      (new URLSearchParams(window.location.search).get("role") as
        | "COMMERCIAL"
        | "USER")) ||
      "COMMERCIAL"
  );
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [date, setDate] = useState<DateRange | undefined>(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const startDate = params.get("startDate");
      const endDate = params.get("endDate");
      if (startDate && endDate) {
        return {
          from: new Date(startDate),
          to: new Date(endDate),
        };
      }
    }
    return undefined;
  });
  const [dateFilter, setDateFilter] = useState<[Date, Date] | undefined>();
  const [searchTerm, setSearchTerm] = useState(
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("search") || ""
      : ""
  );
  const [searchType, setSearchType] = useState<
    "phoneNumber" | "sponsorshipCode"
  >(
    (typeof window !== "undefined" &&
      (new URLSearchParams(window.location.search).get("searchType") as
        | "phoneNumber"
        | "sponsorshipCode")) ||
      "phoneNumber"
  );
  const [statusFilter, setStatusFilter] = useState<SponsorshipStatus | "ALL">(
    (typeof window !== "undefined" &&
      (new URLSearchParams(window.location.search).get("status") as
        | SponsorshipStatus
        | "ALL")) ||
      "ALL"
  );

  const [isMarkingAsPaid, setIsMarkingAsPaid] = useState(false);
  const [isMarkingAsRejected, setIsMarkingAsRejected] = useState(false);
  const [selectedSponsorshipId, setSelectedSponsorshipId] = useState<
    string | null
  >(null);
  const [rejectionReason, setRejectionReason] = useState("");

  // Handler for marking sponsorship as paid
  const handleMarkAsPaid = useCallback((id: string) => {
    setSelectedSponsorshipId(id);
    setIsMarkingAsPaid(true);
  }, []);

  // Handler for marking sponsorship as rejected
  const handleMarkAsRejected = useCallback((id: string) => {
    setSelectedSponsorshipId(id);
    setIsMarkingAsRejected(true);
  }, []);

  // Confirm marking as paid
  const confirmMarkAsPaid = async () => {
    if (!selectedSponsorshipId) return;

    try {
      // Call the API
      const success = await updateSponsorshipStatus(
        selectedSponsorshipId,
        SponsorshipStatus.PAID
      );

      if (success) {
        // Note: Server will handle the update, no optimistic update needed

        toast.success("Parrainage marqué comme payé", {
          description: "Le statut du parrainage a été mis à jour avec succès.",
        });

        // Refresh the page to get updated data
        window.location.reload();
      } else {
        toast.error("Échec de l'opération", {
          description:
            "Une erreur s'est produite lors de la mise à jour du statut.",
        });
      }
    } catch (error) {
      console.error("Failed to update sponsorship:", error);
      toast.error("Échec de l'opération", {
        description: "Une erreur s'est produite. Veuillez réessayer.",
      });
    } finally {
      setIsMarkingAsPaid(false);
      setSelectedSponsorshipId(null);
    }
  };

  // Confirm marking as rejected
  const confirmMarkAsRejected = async () => {
    if (!selectedSponsorshipId) return;

    try {
      // Call the API
      const success = await updateSponsorshipStatus(
        selectedSponsorshipId,
        SponsorshipStatus.REJECTED,
        rejectionReason
      );

      if (success) {
        // Note: Server will handle the update, no optimistic update needed

        toast.success("Parrainage rejeté", {
          description: "Le statut du parrainage a été mis à jour avec succès.",
        });

        // Reset rejection reason
        setRejectionReason("");

        // Refresh the page to get updated data
        window.location.reload();
      } else {
        toast.error("Échec de l'opération", {
          description:
            "Une erreur s'est produite lors de la mise à jour du statut.",
        });
      }
    } catch (error) {
      console.error("Failed to update sponsorship:", error);
      toast.error("Échec de l'opération", {
        description: "Une erreur s'est produite. Veuillez réessayer.",
      });
    } finally {
      setIsMarkingAsRejected(false);
      setSelectedSponsorshipId(null);
    }
  };

  // Use sponsorships directly since filtering is done on the server
  const filteredSponsorships = sponsorships;

  // Handle role filter changes
  const handleRoleChange = (role: "COMMERCIAL" | "USER") => {
    const params = new URLSearchParams(searchParams);
    params.set("role", role);
    params.set("page", "1"); // Reset to first page when changing role
    router.push(`/sponsorships?${params.toString()}`);
  };

  // Handle search changes
  const handleSearchChange = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
      params.set("searchType", searchType);
    } else {
      params.delete("search");
      params.delete("searchType");
    }
    params.set("page", "1"); // Reset to first page when searching
    router.push(`/sponsorships?${params.toString()}`);
  };

  // Handle status filter changes
  const handleStatusChange = (status: SponsorshipStatus | "ALL") => {
    const params = new URLSearchParams(searchParams);
    if (status === "ALL") {
      params.delete("status");
    } else {
      params.set("status", status);
    }
    params.set("page", "1"); // Reset to first page when filtering
    router.push(`/sponsorships?${params.toString()}`);
  };

  // Handle date filter changes
  const handleDateFilter = (range: DateRange | undefined) => {
    console.log("Date filter changed:", range);

    // Update local state first
    setDate(range);

    // Use router for navigation
    const params = new URLSearchParams(searchParams);

    if (!range?.from || !range?.to) {
      params.delete("startDate");
      params.delete("endDate");
    } else {
      // Format dates as ISO strings
      const startDate = range.from.toISOString().split("T")[0];
      const endDate = range.to.toISOString().split("T")[0];
      console.log("Setting dates:", { startDate, endDate });
      params.set("startDate", startDate);
      params.set("endDate", endDate);
    }
    params.set("page", "1"); // Reset to first page when filtering

    // Use router.push for smoother navigation
    router.push(`/sponsorships?${params.toString()}`);
  };

  // Handle clear filters
  const clearFilters = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("search");
    params.delete("searchType");
    params.delete("status");
    params.delete("startDate");
    params.delete("endDate");
    params.set("page", "1");
    router.push(`/sponsorships?${params.toString()}`);
  };

  const columns = useMemo(
    () => createColumns(handleMarkAsPaid, handleMarkAsRejected),
    [handleMarkAsPaid, handleMarkAsRejected]
  );

  const table = useReactTable({
    data: filteredSponsorships,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  // Note: Server-side pagination and filtering is handled by the parent component
  // All filtering is done on the server side

  return (
    <div className="space-y-6">
      <Card className="w-full dark:bg-gray-900 dark:border-gray-800 dark:text-gray-100 rounded-xl shadow">
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0 md:space-x-2">
            <div>
              <CardTitle className="text-xl font-bold">Parrainages</CardTitle>
              <CardDescription>
                Gérer tous les parrainages de la plateforme
              </CardDescription>
            </div>
            <Tabs
              value={activeTab}
              onValueChange={(value) => {
                const role = value as "COMMERCIAL" | "USER";
                setActiveTab(role);
                handleRoleChange(role);
              }}
              className="w-full md:w-auto"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger
                  value="COMMERCIAL"
                  className="flex items-center gap-2"
                >
                  <Award className="h-4 w-4" />
                  <span>Commerciaux</span>
                </TabsTrigger>
                <TabsTrigger value="USER" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Utilisateurs</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full">
                <div className="flex-1 relative w-full">
                  <div className="absolute left-3 top-2.5">
                    <Search className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input
                    value={searchTerm}
                    onChange={(e) => {
                      const value = e.target.value;
                      setSearchTerm(value);
                      handleSearchChange(value);
                    }}
                    placeholder={
                      searchType === "phoneNumber"
                        ? "Rechercher par téléphone..."
                        : "Rechercher par code de parrainage..."
                    }
                    className="pl-9 pr-9 dark:bg-gray-800 dark:border-gray-800"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        handleSearchChange("");
                      }}
                      className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchType("phoneNumber");
                      if (searchTerm) {
                        const params = new URLSearchParams(searchParams);
                        params.set("searchType", "phoneNumber");
                        router.push(`/sponsorships?${params.toString()}`);
                      }
                    }}
                    className={cn(
                      "flex items-center gap-1",
                      searchType === "phoneNumber" &&
                        "bg-primary text-primary-foreground hover:bg-primary/90"
                    )}
                  >
                    <Phone className="h-3 w-3" />
                    <span>Téléphone</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchType("sponsorshipCode");
                      if (searchTerm) {
                        const params = new URLSearchParams(searchParams);
                        params.set("searchType", "sponsorshipCode");
                        router.push(`/sponsorships?${params.toString()}`);
                      }
                    }}
                    className={cn(
                      "flex items-center gap-1",
                      searchType === "sponsorshipCode" &&
                        "bg-primary text-primary-foreground hover:bg-primary/90"
                    )}
                  >
                    <Tag className="h-3 w-3" />
                    <span>Code</span>
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Select
                  value={statusFilter}
                  onValueChange={(value) => {
                    const status = value as SponsorshipStatus | "ALL";
                    setStatusFilter(status);
                    handleStatusChange(status);
                  }}
                >
                  <SelectTrigger className="w-[180px] dark:bg-gray-800 dark:border-gray-800">
                    <SelectValue placeholder="Filtrer par statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">Tous les statuts</SelectItem>
                    <SelectItem value="PAID">Payé</SelectItem>
                    <SelectItem value="PENDING">En attente</SelectItem>
                    <SelectItem value="REJECTED">Rejeté</SelectItem>
                  </SelectContent>
                </Select>
                <DatePickerWithRange
                  className="dark:bg-gray-800 dark:border-gray-800 w-[250px]"
                  onChange={handleDateFilter}
                />
                <ExportToExcel
                  data={filteredSponsorships}
                  fileName={`parrainages-${activeTab.toLowerCase()}`}
                >
                  <Button variant="outline" className="flex items-center gap-2">
                    <FileSpreadsheet className="h-4 w-4" />
                    <span className="hidden sm:inline">Exporter</span>
                  </Button>
                </ExportToExcel>
              </div>
            </div>

            {/* Active filters display */}
            {(searchTerm || dateFilter || statusFilter !== "ALL") && (
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="text-muted-foreground">Filtres actifs:</span>

                {searchTerm && (
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {searchType === "phoneNumber" ? "Téléphone" : "Code"}:{" "}
                    {searchTerm}
                    <button onClick={() => setSearchTerm("")} className="ml-1">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}

                {dateFilter && (
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <CalendarRange className="h-3 w-3 mr-1" />
                    {format(dateFilter[0], "dd/MM/yyyy")} -{" "}
                    {format(dateFilter[1], "dd/MM/yyyy")}
                    <button
                      onClick={() => {
                        setDate(undefined);
                        setDateFilter(undefined);
                      }}
                      className="ml-1"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}

                {statusFilter !== "ALL" && (
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    Statut:{" "}
                    {statusFilter === "PAID"
                      ? "Payé"
                      : statusFilter === "PENDING"
                      ? "En attente"
                      : "Rejeté"}
                    <button
                      onClick={() => setStatusFilter("ALL")}
                      className="ml-1"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="h-7 px-2 text-xs"
                >
                  Effacer tous les filtres
                </Button>
              </div>
            )}
          </div>

          <div className="rounded-md border dark:border-gray-800 relative">
            {isLoading && (
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm text-muted-foreground">
                    Chargement...
                  </span>
                </div>
              </div>
            )}
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
                      {sponsorships.length === 0 ? (
                        <div className="flex flex-col items-center justify-center gap-2">
                          <p className="font-medium">Aucun parrainage trouvé</p>
                          <p className="text-sm text-muted-foreground">
                            Il n'y a aucun parrainage enregistré pour ce type
                            d'utilisateur.
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
                            onClick={clearFilters}
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

          {/* Pagination */}
          <div className="flex items-center justify-between space-x-2 py-4">
            <div className="text-sm text-muted-foreground">
              {filteredSponsorships.length > 0 ? (
                <>
                  Page {currentPage} sur {totalPages}
                  {` • ${filteredSponsorships.length} sur ${total} parrainages affichés`}
                </>
              ) : (
                "Aucun résultat"
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage <= 1 || isLoading}
              >
                Précédent
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages || isLoading}
              >
                Suivant
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation dialogs */}
      <AlertDialog open={isMarkingAsPaid} onOpenChange={setIsMarkingAsPaid}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer le paiement</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir marquer ce parrainage comme payé ? Cette
              action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmMarkAsPaid}
              className="bg-green-600 hover:bg-green-700"
            >
              Confirmer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={isMarkingAsRejected}
        onOpenChange={(open) => {
          setIsMarkingAsRejected(open);
          if (!open) {
            setRejectionReason("");
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer le rejet</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir rejeter ce parrainage ? Cette action est
              irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Raison du rejet (optionnel)"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmMarkAsRejected}
              className="bg-red-600 hover:bg-red-700"
            >
              Confirmer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
