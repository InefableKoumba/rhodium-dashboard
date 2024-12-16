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
import {
  CalendarFold,
  CalendarIcon,
  Info,
  Mail,
  Pencil,
  Phone,
  Search,
  ShieldBan,
  Trash,
  User,
  Users,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { UserInterface } from "@/interfaces/interfaces";
import Image from "next/image";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UsersList from "@/components/admin/rhopay/users-list";
import UserInfoFormInput from "@/components/admin/rhopay/user-info-form-input";

const transactions: {
  id: number;
  sender: string;
  recipient: string;
  sender_phone: string;
  time: string;
  receiver_phone: string;
  amount: number;
  date: Date;
  fees: number;
  status: string;
}[] = [
  {
    id: 1,
    sender: "Inefable KOUMBA",
    recipient: "Jane Doe",
    sender_phone: "+242 06 880 19 86",
    time: "10:30",
    receiver_phone: "+242 05 512 01 22",
    amount: 1000,
    date: new Date("2024-11-20T10:30:00"),
    fees: 10,
    status: "success",
  },
  {
    id: 2,
    sender: "Sarah Doe",
    recipient: "Inefable KOUMBA",
    sender_phone: "+242 05 512 01 22",
    time: "10:30",
    receiver_phone: "+242 06 880 19 86",
    amount: 2500,
    date: new Date("2024-11-20T10:30:00"),
    fees: 25,
    status: "failed",
  },
  {
    id: 3,
    sender: "Inefable KOUMBA",
    recipient: "Jane Doe",
    sender_phone: "+242 06 880 19 86",
    time: "10:30",
    receiver_phone: "+242 05 512 01 22",
    amount: 500,
    date: new Date("2024-11-20T10:30:00"),
    fees: 5,
    status: "pending",
  },
  {
    id: 4,
    sender: "Ruth Doe",
    recipient: "Inefable KOUMBA",
    sender_phone: "+242 05 512 01 22 ",
    time: "10:30",
    receiver_phone: "+242 06 880 19 86",
    amount: 7200,
    date: new Date("2024-11-20T10:30:00"),
    fees: 72,
    status: "success",
  },
  {
    id: 5,
    sender: "Inefable KOUMBA",
    recipient: "Jane Doe",
    sender_phone: "+242 06 880 19 86",
    time: "10:30",
    receiver_phone: "+242 05 512 01 22",
    amount: 32000,
    date: new Date("2024-11-20T10:30:00"),
    fees: 320,
    status: "success",
  },
  {
    id: 6,
    sender: "Deborah Doe",
    recipient: "Inefable KOUMBA",
    sender_phone: "+242 05 512 01 22",
    time: "10:30",
    receiver_phone: " +242 06 880 19 86",
    amount: 1000,
    date: new Date("2024-11-20T10:30:00"),
    fees: 10,
    status: "success",
  },
];

export default async function Page({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const id = (await params).id;
  const response = await fetch(
    process.env.NEXT_API_URL + "/users/" + id + "?populate=*"
  );
  const user = (await response.json()) as UserInterface;

  return (
    <div className="p-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/rhopay">Accueil</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/rhopay/users">Utilisateurs</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Inefable</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Tabs defaultValue="profile" className="w-full mt-12">
        <TabsList>
          <TabsTrigger value="profile">Informations personnelles</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="sponsorship">Parrainages</TabsTrigger>
          <TabsTrigger value="settings">paramètres</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <div className="mt-12 rounded flex items-center justify-between gap-4">
            <div>
              <div className="relative w-44 h-44 rounded">
                {user.avatar ? (
                  <Image
                    fill
                    className="rounded-full object-cover"
                    alt="Event creator image"
                    src={process.env.NEXT_STORAGE_BUCKET_URL + user.avatar.url}
                  />
                ) : (
                  <div className="relative w-full h-full rounded bg-gray-200 flex justify-center items-center">
                    <User size={48} />
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2 w-full">
              <span className="font-bold text-2xl">Inefable KOUMBA</span>
              <div className="text-sm font-medium flex gap-4 mt-2">
                <div className="flex gap-3 items-center">
                  <div className="border p-2 rounded-full">
                    <Phone size={20} className="text-gray-500" />
                  </div>
                  <span className="font-light">(+242) 06 880 19 86</span>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="border p-2 rounded-full">
                    <Mail size={20} className="text-gray-500" />
                  </div>
                  <span className="font-light">inefablekoumba@proton.me</span>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="border p-2 rounded-full">
                    <CalendarFold size={20} className="text-gray-500" />
                  </div>
                  <span className="font-light">
                    Membre depuis le 7 Octobre 2024
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-12 w-2/3">
            <UserInfoFormInput
              defaultValue={"KOUMBA"}
              label="Nom"
              type="text"
            />
            <UserInfoFormInput
              defaultValue={"Inefable"}
              label="Prénom"
              type="text"
            />
            <UserInfoFormInput
              defaultValue={"inefablekoumba@proton.me"}
              label="Adresse e-mail"
              type="email"
            />
          </div>
        </TabsContent>
        <TabsContent value="transactions">
          <Card className="w-full mt-12">
            <CardHeader>
              <CardTitle>Transactions de Inefable -</CardTitle>
              <CardDescription>
                Liste des transaction éffectuées par Inefable
              </CardDescription>
              <div className="flex items-center justify-end gap-4 w-full pt-12">
                <div className="relative w-full">
                  <div className="absolute right-3 top-2">
                    <Search className="text-sm text-gray-700" />
                  </div>
                  <Input placeholder="Rechercher une transaction" />
                </div>
                <Select>
                  <SelectTrigger className="w-[480px]">
                    <SelectValue placeholder="Toutes les transactions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="all">
                        Toutes les transactions
                      </SelectItem>
                      <SelectItem value="done">Effectuées</SelectItem>
                      <SelectItem value="pending">En attente</SelectItem>
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
                  {transactions.map((transaction) => (
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
                        {new Date(transaction.date).toLocaleDateString(
                          "fr-FR",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}{" "}
                        à {transaction.time}
                      </TableCell>
                      <TableCell className="font-medium">
                        {transaction.fees} XAF
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
                                    La transaction a échouée en raison d&apos;un
                                    solde insuffisant de l&apos;expéditeur
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
        </TabsContent>
        <TabsContent value="sponsorship">
          <UsersList isSponsorshipList />
        </TabsContent>
        <TabsContent value="settings">
          <div className="mt-12 flex flex-col gap-4 w-min">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="bg-yellow-700 hover:bg-yellow-600">
                  <ShieldBan />
                  Bannir
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Etes-vous sûr de bannir cet utilisateur?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Bannir un utilisateur entraînera la suspension de son
                    compte. Il ne pourra plus effectuer de transactions et sera
                    notifié.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction>Confirmer</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="bg-red-700 hover:bg-red-600">
                  <Trash />
                  Supprimer l&apos;utilisateur
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Etes-vous sûr de supprimer cet utilisateur?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    La suppression d&apos;un utilisateur est irréversible.
                    Toutes ses transactions et données seront supprimées.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction>Confirmer</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
