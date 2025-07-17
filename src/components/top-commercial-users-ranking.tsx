"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Trophy,
  Medal,
  Award,
  Users,
  Crown,
  Calendar,
  Filter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GeneralAvatar } from "@/components/common/general-user-avatar";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

interface TopCommercialUsersRankingProps {
  users: {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    phoneNumber?: string;
    godsonsCount: number;
    todaySponsorships: number;
  }[];
  sponsorships: Array<{
    sponsorId: string;
    createdAt: string;
  }>;
}

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Crown className="h-6 w-6 text-yellow-500" />;
    case 2:
      return <Trophy className="h-6 w-6 text-gray-400" />;
    case 3:
      return <Medal className="h-6 w-6 text-amber-600" />;
    default:
      return <Award className="h-5 w-5 text-blue-500" />;
  }
};

const getRankBadgeColor = (rank: number) => {
  switch (rank) {
    case 1:
      return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white";
    case 2:
      return "bg-gradient-to-r from-gray-300 to-gray-500 text-white";
    case 3:
      return "bg-gradient-to-r from-amber-500 to-amber-700 text-white";
    default:
      return "bg-gradient-to-r from-blue-500 to-blue-700 text-white";
  }
};

export default function TopCommercialUsersRanking({
  users,
  sponsorships,
}: TopCommercialUsersRankingProps) {
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    undefined
  );
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [filterMode, setFilterMode] = useState<"all" | "single" | "range">(
    "all"
  );

  // Calculate sponsorships count for each user based on selected date filter
  const usersWithFilteredCounts = useMemo(() => {
    return users
      .map((user) => {
        let filteredCount = 0;

        if (filterMode === "all") {
          // Count all sponsorships for this user
          filteredCount = sponsorships.filter(
            (sp) => sp.sponsorId === user.id
          ).length;
        } else if (filterMode === "single" && selectedDate) {
          // Count sponsorships for the selected date
          filteredCount = sponsorships.filter((sp) => {
            const sponsorshipDate = new Date(sp.createdAt);
            return (
              sp.sponsorId === user.id &&
              sponsorshipDate.toDateString() ===
                new Date(selectedDate).toDateString()
            );
          }).length;
        } else if (filterMode === "range" && dateRange?.from && dateRange?.to) {
          // Count sponsorships within the date range
          filteredCount = sponsorships.filter((sp) => {
            const sponsorshipDate = new Date(sp.createdAt);
            const startDate = new Date(dateRange.from!);
            startDate.setHours(0, 0, 0, 0);
            const endDate = new Date(dateRange.to!);
            endDate.setHours(23, 59, 59, 999);

            return (
              sp.sponsorId === user.id &&
              sponsorshipDate >= startDate &&
              sponsorshipDate <= endDate
            );
          }).length;
        }

        return {
          ...user,
          filteredSponsorships: filteredCount,
        };
      })
      .sort((a, b) => b.filteredSponsorships - a.filteredSponsorships);
  }, [users, sponsorships, filterMode, selectedDate, dateRange]);

  const getFilterDescription = () => {
    if (filterMode === "all") {
      return "Tous les parrainages";
    } else if (filterMode === "single" && selectedDate) {
      return `Parrainages du ${format(selectedDate, "dd/MM/yyyy", {
        locale: fr,
      })}`;
    } else if (filterMode === "range" && dateRange?.from && dateRange?.to) {
      return `Parrainages du ${format(dateRange.from!, "dd/MM/yyyy", {
        locale: fr,
      })} au ${format(dateRange.to!, "dd/MM/yyyy", { locale: fr })}`;
    }
    return "Tous les parrainages";
  };

  const clearFilters = () => {
    setSelectedDate(undefined);
    setDateRange(undefined);
    setFilterMode("all");
  };

  const setTodayFilter = () => {
    setSelectedDate(new Date().toISOString());
    setDateRange(undefined);
    setFilterMode("single");
  };

  return (
    <Card className="dark:bg-gray-900 dark:border-gray-800 dark:text-gray-100 rounded-xl shadow">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
            <Crown className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-xl font-bold">Top Commerciaux</CardTitle>
            <p className="text-sm text-muted-foreground">
              {getFilterDescription()}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Filter Controls */}
        <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filtrer par période</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Select
              value={filterMode}
              onValueChange={(value) =>
                setFilterMode(value as "all" | "single" | "range")
              }
            >
              <SelectTrigger className="w-full sm:w-[180px] dark:bg-gray-700 dark:border-gray-600">
                <SelectValue placeholder="Type de filtre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les dates</SelectItem>
                <SelectItem value="single">Date spécifique</SelectItem>
                <SelectItem value="range">Période</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="lg"
              onClick={setTodayFilter}
              className="dark:bg-gray-700 dark:border-gray-600"
            >
              Aujourd'hui
            </Button>

            {filterMode === "single" && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full sm:w-[200px] justify-start text-left font-normal dark:bg-gray-700 dark:border-gray-600",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {selectedDate ? (
                      format(selectedDate, "dd/MM/yyyy", { locale: fr })
                    ) : (
                      <span>Sélectionner une date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate ? new Date(selectedDate) : undefined}
                    onSelect={(date) => setSelectedDate(date?.toISOString())}
                    initialFocus
                    locale={fr}
                  />
                </PopoverContent>
              </Popover>
            )}

            {filterMode === "range" && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="lg"
                    className={cn(
                      "w-full sm:w-[280px] justify-start text-left font-normal dark:bg-gray-700 dark:border-gray-600",
                      !dateRange && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "dd/MM/yyyy", { locale: fr })}{" "}
                          - {format(dateRange.to, "dd/MM/yyyy", { locale: fr })}
                        </>
                      ) : (
                        format(dateRange.from, "dd/MM/yyyy", { locale: fr })
                      )
                    ) : (
                      <span>Sélectionner une période</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    initialFocus
                    locale={fr}
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            )}

            {(filterMode !== "all" || selectedDate || dateRange) && (
              <Button
                variant="outline"
                size="lg"
                onClick={clearFilters}
                className="dark:bg-gray-700 dark:border-gray-600"
              >
                Effacer
              </Button>
            )}
          </div>
        </div>

        {/* Users Ranking */}
        {usersWithFilteredCounts.length === 0 ? (
          <div className="text-center py-8">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Aucun commercial trouvé</p>
          </div>
        ) : (
          usersWithFilteredCounts.map((user, index) => {
            const rank = index + 1;
            return (
              <Link
                key={user.id}
                href={`/users/${user.id}`}
                className="block group"
              >
                <div className="flex items-center gap-4 p-4 rounded-lg border dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
                  {/* Rank */}
                  <div className="flex-shrink-0">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${getRankBadgeColor(
                        rank
                      )} font-bold text-lg`}
                    >
                      {rank}
                    </div>
                  </div>

                  {/* Rank Icon */}
                  <div className="flex-shrink-0">{getRankIcon(rank)}</div>

                  {/* User Avatar */}
                  <div className="flex-shrink-0">
                    {user.avatar ? (
                      <div className="w-12 h-12 rounded-full relative">
                        <Image
                          fill
                          className="rounded-full object-cover"
                          alt={`${user.name} avatar`}
                          src={
                            process.env.NEXT_PUBLIC_R2_BUCKET_URL +
                            "/" +
                            user.avatar
                          }
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12">
                        <GeneralAvatar />
                      </div>
                    )}
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {user.name}
                      </h3>
                      <Badge className="bg-blue-500 text-white text-xs">
                        Commercial
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {user.email}
                    </p>
                    {user.phoneNumber && (
                      <p className="text-sm text-muted-foreground">
                        {user.phoneNumber}
                      </p>
                    )}
                  </div>

                  {/* Sponsorships Count */}
                  <div className="flex gap-x-6">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {user.filteredSponsorships}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {filterMode === "all" ? "Total" : "Filtré"}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {user.godsonsCount}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Total
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
