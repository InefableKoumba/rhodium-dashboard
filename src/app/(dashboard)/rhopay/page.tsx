import { ArrowLeftRight, CalendarIcon, DollarSign, Search } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { id } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import CalendarRange from "@/components/common/calendarRange";

const transactions = [
  {
    id: 1,
    sender: "John Doe",
    recipient: "Jane Doe",
    sender_phone: "+242 05 485 21 20",
    time: "10:30",
    receiver_phone: "+242 05 512 01 22",
    amount: 1000,
    date: new Date("2024-11-20T10:30:00"),
    fees: 10,
    status: "success",
  },
  {
    id: 2,
    sender: "Alice Smith",
    time: "12:45",
    sender_phone: "+242 05 485 21 20",
    receiver_phone: "+242 05 512 01 22",
    recipient: "Bob Brown",
    amount: 500,
    date: new Date("2024-11-21T12:45:00"),
    fees: 5,
    status: "failed",
  },
  {
    id: 3,
    sender: "Michael Johnson",
    time: "15:20",
    sender_phone: "+242 05 485 21 20",
    receiver_phone: "+242 05 512 01 22",
    recipient: "Sarah Connor",
    amount: 750,
    date: new Date("2024-11-22T15:20:00"),
    fees: 7.5,
    status: "success",
  },
  {
    id: 4,
    sender: "Emily Davis",
    sender_phone: "+242 05 485 21 20",
    time: "09:10",
    receiver_phone: "+242 05 512 01 22",
    recipient: "Chris Wilson",
    amount: 200,
    date: new Date("2024-11-23T09:10:00"),
    fees: 2,
    status: "pending",
  },
  {
    id: 5,
    sender: "David Clark",
    sender_phone: "+242 05 485 21 20",
    time: "16:50",
    receiver_phone: "+242 05 512 01 22",
    recipient: "Laura Adams",
    amount: 3000,
    date: new Date("2024-11-24T16:50:00"),
    fees: 30,
    status: "success",
  },
  {
    id: 6,
    sender: "Sophia Thompson",
    sender_phone: "+242 05 485 21 20",
    receiver_phone: "+242 05 512 01 22",
    time: "11:00",
    recipient: "James Evans",
    amount: 150,
    date: new Date("2024-11-25T11:00:00"),
    fees: 1.5,
    status: "success",
  },
  {
    id: 7,
    sender: "Benjamin Lee",
    sender_phone: "+242 05 485 21 20",
    receiver_phone: "+242 05 512 01 22",
    time: "13:15",
    recipient: "Olivia Martinez",
    amount: 1200,
    date: new Date("2024-11-26T13:15:00"),
    fees: 12,
    status: "success",
  },
  {
    id: 8,
    sender: "Charlotte White",
    sender_phone: "+242 05 485 21 20",
    receiver_phone: "+242 05 512 01 22",
    time: "08:40",
    recipient: "Liam Harris",
    amount: 850,
    date: new Date("2024-11-27T08:40:00"),
    fees: 8.5,
    status: "failed",
  },
  {
    id: 9,
    sender: "Daniel Moore",
    sender_phone: "+242 05 485 21 20",
    receiver_phone: "+242 05 512 01 22",
    recipient: "Ella Walker",
    time: "14:25",
    amount: 450,
    date: new Date("2024-11-27T14:25:00"),
    fees: 4.5,
    status: "success",
  },
  {
    id: 10,
    sender: "Henry Green",
    sender_phone: "+242 05 485 21 20",
    receiver_phone: "+242 05 512 01 22",
    time: "18:30",
    recipient: "Amelia Scott",
    amount: 2500,
    date: new Date("2024-11-27T18:30:00"),
    fees: 25,
    status: "pending",
  },
];

export default async function Page() {
  return (
    <main className="flex-1 overflow-y-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Tableau de bord Rhopay</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Volume transactions journalières
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">254 000 XAF</div>
            <p className="text-xs text-muted-foreground">
              +12% par rapport à hier
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Transactions journalières
            </CardTitle>
            <ArrowLeftRight className="text-xs" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">102</div>
            <p className="text-xs text-muted-foreground">
              +18% par rapport à hier
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Volume transactions mensuelles
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5 034 200 XAF</div>
            <p className="text-xs text-muted-foreground">
              +5% par rapport au mois passé
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Transactions menuselles
            </CardTitle>
            <ArrowLeftRight className="text-xs" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">340</div>
            <p className="text-xs text-muted-foreground">
              +2 par rapport au mois passé
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Transactions récentes</CardTitle>
            <CardDescription>Liste des dernières transactions.</CardDescription>
            <div className="flex items-center justify-end gap-4 w-full pt-8">
              <div className="relative w-full">
                <div className="absolute right-3 top-2">
                  <Search className="text-sm text-gray-700" />
                </div>
                <Input placeholder="Rechercher une transaction" />
              </div>
              <Select>
                <SelectTrigger className="w-[450px]">
                  <SelectValue placeholder="Toutes les transactions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">Toutes les transactions</SelectItem>
                    <SelectItem value="free">Effectuées</SelectItem>
                    <SelectItem value="paid">En attente</SelectItem>
                    <SelectItem value="paid">Echouées</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="w-[240px] pl-3 text-left font-normal"
                  >
                    <span>Choisissez une date</span>
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarRange />
                </PopoverContent>
              </Popover>
              <Button>Exporter</Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Expéditeur</TableHead>
                  <TableHead>Destinataire</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Frais</TableHead>
                  <TableHead className="flex justify-end items-center">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.slice(0, 5).map((transaction) => (
                  <TableRow key={transaction.id} className="cursor-pointer">
                    <TableCell className="font-medium flex flex-col gap-1">
                      <div className="flex flex-col gap-1">
                        <span className="">{transaction.sender}</span>
                        <span className="text-gray-500">
                          {transaction.sender_phone}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className=" flex flex-col gap-1">
                        <span className="">{transaction.recipient}</span>
                        <span className="text-gray-500">
                          {transaction.receiver_phone}
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
                      {transaction.fees} XAF
                    </TableCell>
                    <TableCell className="font-medium flex justify-end">
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
