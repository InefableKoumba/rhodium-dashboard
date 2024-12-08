import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  Table,
  TableCell,
} from "@/components/ui/table";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Info, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const transactions: {
  id: number;
  client: string;
  merchant: string;
  client_phone: string;
  time: string;
  merchant_id: string;
  amount: number;
  date: Date;
  transaction_type: "deposit" | "withdrawal";
  commissions: number;
  status: string;
}[] = [
  {
    id: 1,
    client: "Inefable KOULBA",
    merchant: "Jane Doe",
    client_phone: "+242 06 880 19 86",
    time: "10:30",
    transaction_type: "deposit",
    merchant_id: "857412",
    amount: 1000,
    date: new Date("2024-11-20T10:30:00"),
    commissions: 10,
    status: "success",
  },
  {
    id: 2,
    client: "Inefable KOULBA",
    merchant: "Jane Doe",
    client_phone: "+242 06 880 19 86",
    time: "10:30",
    transaction_type: "deposit",
    merchant_id: "857412",
    amount: 1000,
    date: new Date("2024-11-20T10:30:00"),
    commissions: 10,
    status: "success",
  },
  {
    id: 3,
    client: "Inefable KOULBA",
    merchant: "Jane Doe",
    client_phone: "+242 06 880 19 86",
    time: "10:30",
    transaction_type: "withdrawal",
    merchant_id: "857412",
    amount: 1000,
    date: new Date("2024-11-20T10:30:00"),
    commissions: 10,
    status: "failed",
  },
];

export default function Page() {
  return (
    <div className="p-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Transactions récentes</CardTitle>
          <CardDescription>Liste des dernières transactions.</CardDescription>
          <div className="flex items-center justify-end gap-4 w-full pt-12">
            <div className="relative w-full">
              <div className="absolute right-3 top-2">
                <Search className="text-sm text-gray-700" />
              </div>
              <Input placeholder="Rechercher une transaction" />
            </div>
            <Select>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Dépôts & retraits" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">Dépôts & retraits</SelectItem>
                  <SelectItem value="free">Dépôts</SelectItem>
                  <SelectItem value="paid">Retraits</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Toutes les transactions" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">Toutes les transactions</SelectItem>
                  <SelectItem value="free">Effectuées</SelectItem>
                  <SelectItem value="paid">En attente</SelectItem>
                  <SelectItem value="failed">Echouées</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className="w-[480px] pl-3 text-left font-normal"
                >
                  <span>Choisissez une date</span>
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" />
              </PopoverContent>
            </Popover>
            <Button>Exporter</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Marchand</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Commissions</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="flex justify-end items-center">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id} className="cursor-pointer">
                  <TableCell className="font-medium flex flex-col gap-1">
                    <div className="flex flex-col gap-1">
                      <span className="">{transaction.client}</span>
                      <span className="text-gray-500">
                        {transaction.client_phone}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className=" flex flex-col gap-1">
                      <span className="">{transaction.merchant}</span>
                      <span className="text-gray-500">
                        {transaction.merchant_id}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="font-medium">
                    {transaction.amount} XAF
                  </TableCell>
                  <TableCell className="font-medium">
                    {new Date(transaction.date).toLocaleDateString("fr-FR", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}{" "}
                    à {transaction.time}
                  </TableCell>
                  <TableCell className="font-medium">
                    {transaction.commissions} XAF
                  </TableCell>
                  <TableCell className="font-medium">
                    <span
                      className={`${
                        transaction.transaction_type === "deposit"
                          ? "bg-primary text-white"
                          : undefined
                      } ${
                        transaction.transaction_type === "withdrawal"
                          ? "bg-blue-700 text-white"
                          : undefined
                      }  px-3 py-1 rounded-full`}
                    >
                      {transaction.transaction_type === "deposit" && "Dépôt"}
                      {transaction.transaction_type === "withdrawal" &&
                        "Retrait"}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex justify-end items-center gap-3">
                      {transaction.status === "failed" && (
                        <AlertDialog>
                          <AlertDialogTrigger>
                            <Info color="#444" />
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Transaction échouée
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                La transaction a échouée en raison d'un solde
                                insuffisant de l'expéditeur
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogAction>Compris</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                      <span
                        className={`${
                          transaction.status === "failed"
                            ? "bg-red-600 text-white"
                            : undefined
                        } ${
                          transaction.status === "pending"
                            ? "bg-yellow-600 text-white"
                            : undefined
                        } ${
                          transaction.status === "success"
                            ? "bg-green-600 text-white"
                            : undefined
                        } px-3 py-1 rounded-full`}
                      >
                        {transaction.status === "failed" && "Echouée"}
                        {transaction.status === "success" && "Effectuée"}
                        {transaction.status === "pending" && "En attente"}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
