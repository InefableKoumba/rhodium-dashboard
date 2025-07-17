"use client";
import React, { useMemo, useState } from "react";
import { Event, CreditPurchase, CreditPurchaseStatus } from "@/types/types";
import CalendarRange from "@/components/common/calendarRange";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DollarSign, CalendarIcon, Search } from "lucide-react";
import Link from "next/link";

function getTicketSales(event: Event) {
  if (!event.orders || !event.ticketTypes) return 0;
  const ticketTypeMap = Object.fromEntries(
    event.ticketTypes.map((tt) => [tt.id, tt.price])
  );
  return event.orders.reduce(
    (sum, o) => sum + (ticketTypeMap[o.items[0].ticketType.id] || 0),
    0
  );
}

export default function EarningsDashboard({
  events,
  creditPurchases,
}: {
  events: Event[];
  creditPurchases: CreditPurchase[];
}) {
  // Filters
  const [search, setSearch] = useState("");
  const [eventType, setEventType] = useState<string>("all");
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [onlyWithRevenue, setOnlyWithRevenue] = useState(true);

  // Filtered events
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // Only events with revenue
      if (onlyWithRevenue && getTicketSales(event) <= 0) return false;
      // Search by name
      if (search && !event.title.toLowerCase().includes(search.toLowerCase()))
        return false;
      // Event type
      if (eventType === "public" && event.isPrivate) return false;
      if (eventType === "private" && !event.isPrivate) return false;
      // Date range
      if (dateRange.from && new Date(event.startsAt) < dateRange.from)
        return false;
      if (dateRange.to && new Date(event.startsAt) > dateRange.to) return false;
      return true;
    });
  }, [events, search, eventType, dateRange, onlyWithRevenue]);

  // Filtered credit purchases (completed only)
  const filteredCreditPurchases = useMemo(
    () =>
      creditPurchases.filter(
        (cp) => cp.status === CreditPurchaseStatus.COMPLETED
      ),
    [creditPurchases]
  );

  // Summary
  const totalTicketSales = filteredEvents.reduce(
    (sum, ev) => sum + getTicketSales(ev),
    0
  );
  const totalEvents = filteredEvents.length;
  const totalCreditPurchases = filteredCreditPurchases.reduce(
    (sum, cp) => sum + (cp.creditPack?.price || 0),
    0
  );

  return (
    <div className="p-8">
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card className="dark:bg-gray-900 dark:border-gray-800 dark:text-gray-100 rounded-xl shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Chiffre d'affaires (Tickets)
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalTicketSales.toLocaleString()} XAF
            </div>
            <p className="text-xs text-muted-foreground">
              Montant généré par vente de tickets
            </p>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-900 dark:border-gray-800 dark:text-gray-100 rounded-xl shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Achats de crédits
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalCreditPurchases.toLocaleString()} XAF
            </div>
            <p className="text-xs text-muted-foreground">
              Montant généré par achat de crédits
            </p>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-900 dark:border-gray-800 dark:text-gray-100 rounded-xl shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total évènements
            </CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEvents}</div>
            <p className="text-xs text-muted-foreground">
              Nombre total d'évènements
            </p>
          </CardContent>
        </Card>
      </div>
      {/* Filters UI */}
      <Card className="w-full mt-8 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-100 rounded-xl shadow">
        <CardHeader>
          <CardTitle>Détails par évènement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-end gap-3 mb-8 flex-wrap">
            <div className="relative w-full max-w-xs">
              <div className="absolute right-4 top-2">
                <Search color="#333" />
              </div>
              <Input
                placeholder="Rechercher un évènement"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Select value={eventType} onValueChange={setEventType}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Type d'évènement" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="public">Publics</SelectItem>
                <SelectItem value="private">Privés</SelectItem>
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className="w-[200px] pl-3 text-left font-normal"
                >
                  <span>Date</span>
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarRange />
              </PopoverContent>
            </Popover>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={onlyWithRevenue}
                onChange={() => setOnlyWithRevenue((v) => !v)}
                id="onlyWithRevenue"
                className="accent-primary"
              />
              <label htmlFor="onlyWithRevenue" className="text-sm">
                Uniquement les évènements avec revenus
              </label>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="dark:hover:bg-gray-800 dark:border-gray-800">
                <TableHead>#</TableHead>
                <TableHead>Nom de l'évènement</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Tickets vendus</TableHead>
                <TableHead>Montant généré (XAF)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.map((event, i) => (
                <TableRow
                  key={event.id}
                  className="dark:hover:bg-gray-800 dark:border-gray-800"
                >
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>
                    <Link href={`/events/${event.id}`}>{event.title}</Link>
                  </TableCell>
                  <TableCell>
                    <div className="border rounded-full flex items-center justify-center px-2 py-1">
                      {event.isPrivate ? "Privé" : "Public"}
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(event.startsAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell>{event.orders?.length || 0}</TableCell>
                  <TableCell>
                    {getTicketSales(event).toLocaleString()} XAF
                  </TableCell>
                </TableRow>
              ))}
              {filteredEvents.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-muted-foreground"
                  >
                    Aucun évènement trouvé.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {/* Credit Purchases Table */}
      <Card className="w-full mt-8 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-100 rounded-xl shadow">
        <CardHeader>
          <CardTitle>Achats de crédits</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="dark:hover:bg-gray-800 dark:border-gray-800">
                <TableHead>#</TableHead>
                <TableHead>Acheteur</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Téléphone</TableHead>
                <TableHead>Pack</TableHead>
                <TableHead>Crédits</TableHead>
                <TableHead>Montant (XAF)</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCreditPurchases.map((cp, i) => (
                <TableRow
                  key={cp.id}
                  className="dark:hover:bg-gray-800 dark:border-gray-800"
                >
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{cp.buyer?.name || "-"}</TableCell>
                  <TableCell>{cp.buyer?.email || "-"}</TableCell>
                  <TableCell>{cp.phoneNumber || "-"}</TableCell>
                  <TableCell>{cp.creditPack?.name || "-"}</TableCell>
                  <TableCell>{cp.creditPack?.credits || 0}</TableCell>
                  <TableCell>
                    {cp.creditPack?.price?.toLocaleString() || 0} XAF
                  </TableCell>
                  <TableCell>
                    {new Date(cp.createdAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                </TableRow>
              ))}
              {filteredCreditPurchases.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center text-muted-foreground"
                  >
                    Aucun achat de crédits trouvé.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
