"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { DateRange } from "react-day-picker";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Users,
  CreditCard,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Filter,
  Download,
  BarChart3,
  PieChart,
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Order,
  CreditPurchase,
  OrderStatus,
  CreditPurchaseStatus,
  Event,
} from "@/types/types";
import ExportToExcel from "@/components/common/export-to-excel";

interface SalesDashboardProps {
  orders: Order[];
  creditPurchases: CreditPurchase[];
}

export default function SalesDashboard({
  orders,
  creditPurchases,
}: SalesDashboardProps) {
  // Filters
  const [activeTab, setActiveTab] = useState<"orders" | "credits" | "stats">(
    "orders"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [eventFilter, setEventFilter] = useState<string>("all");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [transactionType, setTransactionType] = useState<
    "all" | "successful" | "failed"
  >("all");

  // Filtered data
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const userMatch = order.user?.name.toLowerCase().includes(searchLower);
        const phoneMatch = order.phoneNumber
          .toLowerCase()
          .includes(searchLower);
        const paymentMatch = order.paymentId
          ?.toLowerCase()
          .includes(searchLower);

        if (!userMatch && !phoneMatch && !paymentMatch) return false;
      }

      // Status filter
      if (statusFilter !== "all" && order.status !== statusFilter) return false;

      // Event filter
      if (eventFilter !== "all") {
        const orderEventId = order.eventId;
        if (!orderEventId || orderEventId !== eventFilter) return false;
      }

      // Date range filter
      if (dateRange?.from && dateRange?.to) {
        const orderDate = new Date(order.createdAt);
        const fromDate = new Date(dateRange.from);
        const toDate = new Date(dateRange.to);
        toDate.setHours(23, 59, 59, 999);

        if (orderDate < fromDate || orderDate > toDate) return false;
      }

      // Transaction type filter
      if (transactionType === "successful" && order.status !== OrderStatus.PAID)
        return false;
      if (transactionType === "failed" && order.status !== OrderStatus.FAILED)
        return false;

      return true;
    });
  }, [
    orders,
    searchTerm,
    statusFilter,
    eventFilter,
    dateRange,
    transactionType,
  ]);

  const filteredCreditPurchases = useMemo(() => {
    return creditPurchases.filter((purchase) => {
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const userMatch = purchase.user.name
          .toLowerCase()
          .includes(searchLower);
        const phoneMatch = purchase.phoneNumber
          .toLowerCase()
          .includes(searchLower);
        const paymentMatch = purchase.paymentId
          ?.toLowerCase()
          .includes(searchLower);

        if (!userMatch && !phoneMatch && !paymentMatch) return false;
      }

      // Status filter
      if (statusFilter !== "all" && purchase.status !== statusFilter)
        return false;

      // Date range filter
      if (dateRange?.from && dateRange?.to) {
        const purchaseDate = new Date(purchase.createdAt);
        const fromDate = new Date(dateRange.from);
        const toDate = new Date(dateRange.to);
        toDate.setHours(23, 59, 59, 999);

        if (purchaseDate < fromDate || purchaseDate > toDate) return false;
      }

      // Transaction type filter
      if (
        transactionType === "successful" &&
        purchase.status !== CreditPurchaseStatus.PAID
      )
        return false;
      if (
        transactionType === "failed" &&
        purchase.status !== CreditPurchaseStatus.FAILED
      )
        return false;

      return true;
    });
  }, [creditPurchases, searchTerm, statusFilter, dateRange, transactionType]);

  // Calculate filtered stats
  const filteredStats = useMemo(() => {
    const successfulOrders = filteredOrders.filter(
      (o) => o.status === OrderStatus.PAID
    );
    const failedOrders = filteredOrders.filter(
      (o) => o.status === OrderStatus.FAILED
    );
    const successfulCredits = filteredCreditPurchases.filter(
      (c) => c.status === CreditPurchaseStatus.PAID
    );
    const failedCredits = filteredCreditPurchases.filter(
      (c) => c.status === CreditPurchaseStatus.FAILED
    );

    return {
      totalRevenue: successfulOrders.reduce((sum, o) => sum + o.amount, 0),
      totalCreditRevenue: successfulCredits.reduce(
        (sum, c) => sum + c.creditPack.price,
        0
      ),
      totalOrders: filteredOrders.length,
      totalCreditPurchases: filteredCreditPurchases.length,
      failedOrders: failedOrders.length,
      failedCreditPurchases: failedCredits.length,
    };
  }, [filteredOrders, filteredCreditPurchases]);

  const getStatusBadge = (status: string, type: "order" | "credit") => {
    const isOrder = type === "order";
    const isPaid = isOrder
      ? status === OrderStatus.PAID
      : status === CreditPurchaseStatus.PAID;
    const isFailed = isOrder
      ? status === OrderStatus.FAILED
      : status === CreditPurchaseStatus.FAILED;
    const isPending = isOrder
      ? status === OrderStatus.PENDING
      : status === CreditPurchaseStatus.PENDING;

    if (isPaid) {
      return (
        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
          <CheckCircle className="w-3 h-3 mr-1" />
          Payé
        </Badge>
      );
    }
    if (isFailed) {
      return (
        <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
          <XCircle className="w-3 h-3 mr-1" />
          Échoué
        </Badge>
      );
    }
    if (isPending) {
      return (
        <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
          <Clock className="w-3 h-3 mr-1" />
          En attente
        </Badge>
      );
    }
    return <Badge variant="secondary">{status}</Badge>;
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setEventFilter("all");
    setDateRange(undefined);
    setTransactionType("all");
  };

  return (
    <div className="space-y-6">
      {/* Global Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Revenus Totaux
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredStats.totalRevenue.toLocaleString()} XAF
            </div>
            <p className="text-xs text-muted-foreground">
              +{filteredStats.totalCreditRevenue.toLocaleString()} XAF crédits
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commandes</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredStats.totalOrders}
            </div>
            <p className="text-xs text-muted-foreground">
              {filteredStats.failedOrders} échouées
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Achats Crédits
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredStats.totalCreditPurchases}
            </div>
            <p className="text-xs text-muted-foreground">
              {filteredStats.failedCreditPurchases} échoués
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Taux de Réussite
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredStats.totalOrders + filteredStats.totalCreditPurchases >
              0
                ? Math.round(
                    ((filteredStats.totalOrders +
                      filteredStats.totalCreditPurchases -
                      filteredStats.failedOrders -
                      filteredStats.failedCreditPurchases) /
                      (filteredStats.totalOrders +
                        filteredStats.totalCreditPurchases)) *
                      100
                  )
                : 0}
              %
            </div>
            <p className="text-xs text-muted-foreground">
              Transactions réussies
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtres
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm font-medium mb-2 block">
                Recherche
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Nom, téléphone, ID paiement..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="w-[180px]">
              <label className="text-sm font-medium mb-2 block">Statut</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Tous les statuts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value={OrderStatus.PAID}>Payé</SelectItem>
                  <SelectItem value={OrderStatus.PENDING}>
                    En attente
                  </SelectItem>
                  <SelectItem value={OrderStatus.FAILED}>Échoué</SelectItem>
                  <SelectItem value={OrderStatus.CANCELLED}>Annulé</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-[250px]">
              <label className="text-sm font-medium mb-2 block">Période</label>
              <DatePickerWithRange onChange={setDateRange} />
            </div>

            <Button variant="outline" onClick={clearFilters}>
              Effacer
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as any)}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Commandes ({filteredOrders.length})
          </TabsTrigger>
          <TabsTrigger value="credits" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Crédits ({filteredCreditPurchases.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Commandes</CardTitle>
                <ExportToExcel data={filteredOrders} fileName="commandes">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Exporter
                  </Button>
                </ExportToExcel>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Utilisateur</TableHead>
                    <TableHead>Téléphone</TableHead>
                    <TableHead>Événement</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>ID Paiement</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-mono text-sm">
                        {order.id.slice(0, 8)}...
                      </TableCell>
                      <TableCell>{order.user?.name || "N/A"}</TableCell>
                      <TableCell>{order.phoneNumber}</TableCell>
                      <TableCell>{order.event?.title || "N/A"}</TableCell>
                      <TableCell className="font-medium">
                        {order.amount.toLocaleString()} XAF
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(order.status, "order")}
                      </TableCell>
                      <TableCell>
                        {format(new Date(order.createdAt), "dd/MM/yyyy HH:mm", {
                          locale: fr,
                        })}
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {order.paymentId || "N/A"}
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredOrders.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={8}
                        className="text-center text-muted-foreground"
                      >
                        Aucune commande trouvée
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="credits" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Achats de Crédits</CardTitle>
                <ExportToExcel
                  data={filteredCreditPurchases}
                  fileName="achats-credits"
                >
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Exporter
                  </Button>
                </ExportToExcel>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Acheteur</TableHead>
                    <TableHead>Téléphone</TableHead>
                    <TableHead>Pack</TableHead>
                    <TableHead>Crédits</TableHead>
                    <TableHead>Prix</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>ID Paiement</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCreditPurchases.map((purchase) => (
                    <TableRow key={purchase.id}>
                      <TableCell className="font-mono text-sm">
                        {purchase.id.slice(0, 8)}...
                      </TableCell>
                      <TableCell>{purchase.user.name}</TableCell>
                      <TableCell>{purchase.phoneNumber}</TableCell>
                      <TableCell>{purchase.creditPack.name}</TableCell>
                      <TableCell>{purchase.creditPack.credits}</TableCell>
                      <TableCell className="font-medium">
                        {purchase.creditPack.price.toLocaleString()} XAF
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(purchase.status, "credit")}
                      </TableCell>
                      <TableCell>
                        {format(
                          new Date(purchase.createdAt),
                          "dd/MM/yyyy HH:mm",
                          { locale: fr }
                        )}
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {purchase.paymentId || "N/A"}
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredCreditPurchases.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={9}
                        className="text-center text-muted-foreground"
                      >
                        Aucun achat de crédit trouvé
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
