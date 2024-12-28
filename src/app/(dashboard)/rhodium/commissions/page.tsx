import CalendarRange from "@/components/common/calendarRange";
import ExportToExcel from "@/components/common/export-to-excel";
import { GeneralAvatar } from "@/components/common/general-user-avatar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserInterface } from "@/interfaces/interfaces";
import {
  ArrowDownToLine,
  Bell,
  CalendarIcon,
  CheckCheck,
  CircleX,
  DollarSign,
  Info,
  Search,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const dynamic = "force-dynamic";

export default async function page() {
  const response = await fetch(process.env.NEXT_API_URL + "/users?populate=*");
  const users = (await response.json()) as UserInterface[];

  const handlePayNow = async () => {
    "use server";
    const response = await fetch(
      "https://proxy.momoapi.mtn.com/disbursement/token/",
      {
        method: "POST",
        headers: {
          "Ocp-Apim-Subscription-Key":
            process.env.DISBURSEMENT_SUBSCRIPTION_PRIMARY_KEY!,
          Authorization:
            "Basic " +
            btoa(
              process.env.DISBURSEMENT_API_USER +
                ":" +
                process.env.DISBURSEMENT_API_KEY
            ),
        },
      }
    );
    if (response.ok) {
      const token = (await response.json())["access_token"];

      const res = await fetch(
        "https://proxy.momoapi.mtn.com/disbursement/v1_0/deposit",
        {
          method: "POST",
          headers: {
            "Ocp-Apim-Subscription-Key":
              process.env.DISBURSEMENT_SUBSCRIPTION_PRIMARY_KEY!,
            Authorization: "Bearer " + token,
            "X-Target-Environment": "mtncongo",
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            "X-Reference-Id": process.env.DISBURSEMENT_API_USER!,
          },
          body: JSON.stringify({
            amount: "10",
            currency: "XAF",
            externalId: "1234",
            payee: {
              partyIdType: "MSISDN",
              partyId: "242068801986",
            },
            payerMessage: "Paiement parrainage",
            payeeNote: "Paiement parrainage",
          }),
        }
      );
    }
  };

  return (
    <div className="p-8">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total commissions
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4830</div>
            <p className="text-xs text-muted-foreground">
              Nombre total de commissions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Montant déjà payé
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">534 200 XAF</div>
            <p className="text-xs text-muted-foreground">
              Dépenses éffectuées pour les commissions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reste à payer</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2800 XAF</div>
            <p className="text-xs text-muted-foreground">
              Montant restant à payer pour les commissions
            </p>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="unpaid" className="w-full mt-8">
        <TabsList>
          <TabsTrigger value="unpaid" className="gap-2 px-6">
            <Info color="#333" size={20} />
            Non payées
          </TabsTrigger>
          <TabsTrigger value="paid" className="gap-2 px-6">
            <CheckCheck color="#333" size={20} />
            Déjà payées
          </TabsTrigger>
          <TabsTrigger value="rejected" className="gap-2 px-6">
            <CircleX color="#333" size={20} />
            Rejetées
          </TabsTrigger>
        </TabsList>
        <TabsContent value="unpaid">
          <Card className="w-full mt-8">
            <CardHeader>
              <CardTitle>
                Liste des commissions non payées — {users.length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-end gap-3 mb-12">
                <div className="relative w-full">
                  <div className="absolute right-4 top-2">
                    <Search color="#333" />
                  </div>
                  <Input placeholder="Rechercher une commission" />
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="w-[400px] pl-3 text-left font-normal"
                    >
                      <span>Date de l&apos;achat du ticket</span>
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarRange />
                  </PopoverContent>
                </Popover>
                <ExportToExcel
                  data={users.map((user) => ({
                    ...user,
                    avatar: process.env.NEXT_STORAGE_BUCKET_URL!.concat(
                      user.avatar?.url as string
                    ),
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
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Parrain (Bénéficiaire)</TableHead>
                    <TableHead>Filleul (Acheteur)</TableHead>
                    <TableHead>Date de l&apos;achat</TableHead>
                    <TableHead>Prix de l&apos;achat</TableHead>
                    <TableHead>Payer</TableHead>
                    <TableHead>Rejeter</TableHead>
                    <TableHead>
                      <Checkbox />
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user, i) => (
                    <TableRow key={user.id}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>
                        {user.avatar ? (
                          <div className="w-14 h-14 rounded-full relative">
                            <Image
                              fill
                              className="rounded-full object-cover"
                              alt="Event creator image"
                              src={
                                process.env.NEXT_STORAGE_BUCKET_URL +
                                user?.avatar.url
                              }
                            />
                          </div>
                        ) : (
                          <div className="w-14 h-14">
                            <GeneralAvatar />
                          </div>
                        )}
                        <div className="flex flex-col">
                          <Link href={"/rhodium/users/" + user.id}>
                            <span className="font-bold">
                              {user.firstname} {user.lastname}
                            </span>
                          </Link>
                          <Link href={"/rhodium/users/" + user.id}>
                            {user.email}
                          </Link>
                          <Link href={"/rhodium/users/" + user.id}>
                            {user.phone_number}
                          </Link>
                        </div>
                      </TableCell>
                      <TableCell>
                        {user.avatar ? (
                          <div className="w-14 h-14 rounded-full relative">
                            <Image
                              fill
                              className="rounded-full object-cover"
                              alt="Event creator image"
                              src={
                                process.env.NEXT_STORAGE_BUCKET_URL +
                                user?.avatar.url
                              }
                            />
                          </div>
                        ) : (
                          <div className="w-14 h-14">
                            <GeneralAvatar />
                          </div>
                        )}
                        <div className="flex flex-col">
                          <Link href={"/rhodium/users/" + user.id}>
                            <span className="font-bold">
                              {user.firstname} {user.lastname}
                            </span>
                          </Link>
                          <Link href={"/rhodium/users/" + user.id}>
                            {user.email}
                          </Link>
                          <Link href={"/rhodium/users/" + user.id}>
                            {user.phone_number}
                          </Link>
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(user.createdAt).toLocaleDateString("fr-FR", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell>5 000 XAF</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <form action={handlePayNow}>
                              <Button type="submit" className="rounded-full">
                                Payer 500 XAF
                              </Button>
                            </form>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Voulez-vous vraiment effectuer ce paiement ?
                              </DialogTitle>
                              <DialogDescription>
                                Vous êtes sur le point de payer 500 XAF pour ce
                                parrainage en faveur des utilisateurs :{" "}
                                {user.lastname} {user.firstname}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="flex gap-2 my-4 items-center">
                              <Checkbox />
                              <span className="text-sm">
                                Je confirme vouloir effectuer ce paiement
                              </span>
                            </div>
                            <Button>Confirmer le paiement</Button>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              className="rounded-full"
                              variant={"destructive"}
                            >
                              Rejeter
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Voulez-vous vraiment rejeter ce parrainage ?
                              </DialogTitle>
                              <DialogDescription>
                                Vous êtes sur le point de rejeter ce parrainage.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="flex gap-2 my-4 items-center">
                              <Checkbox />
                              <span className="text-sm">
                                Je confirme vouloir rejeter ce parrainage
                              </span>
                            </div>
                            <Button variant={"destructive"}>
                              Confirmer le rejet
                            </Button>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="paid">
          <Card className="w-full mt-8">
            <CardHeader>
              <CardTitle>
                Liste des commissions déjà payées — {users.length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-end gap-3 mb-12">
                <div className="relative w-full">
                  <div className="absolute right-4 top-2">
                    <Search color="#333" />
                  </div>
                  <Input placeholder="Rechercher une commission" />
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="w-[480px] pl-3 text-left font-normal"
                    >
                      <span>Date de l&apos;achat</span>
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarRange />
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="w-[480px] pl-3 text-left font-normal"
                    >
                      <span>Date du paiement</span>
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarRange />
                  </PopoverContent>
                </Popover>
                <Select>
                  <SelectTrigger className="w-[480px]">
                    <SelectValue placeholder="Tous les agents" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="agent_1">Agent 1</SelectItem>
                    <SelectItem value="agent_2">Agent 2</SelectItem>
                    <SelectItem value="agent_2">Agent 3</SelectItem>
                  </SelectContent>
                </Select>

                <ExportToExcel
                  data={users.map((user) => ({
                    ...user,
                    avatar: process.env.NEXT_STORAGE_BUCKET_URL!.concat(
                      user.avatar?.url as string
                    ),
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
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Parrain (Bénéficiaire)</TableHead>
                    <TableHead>Filleul (Acheteur)</TableHead>
                    <TableHead>Date de l&apos;achat</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Date du paiement</TableHead>
                    <TableHead>Commission</TableHead>
                    <TableHead>Agent</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user, i) => (
                    <TableRow key={user.id}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>
                        {user.avatar ? (
                          <div className="w-14 h-14 rounded-full relative">
                            <Image
                              fill
                              className="rounded-full object-cover"
                              alt="Event creator image"
                              src={
                                process.env.NEXT_STORAGE_BUCKET_URL +
                                user?.avatar.url
                              }
                            />
                          </div>
                        ) : (
                          <div className="w-14 h-14">
                            <GeneralAvatar />
                          </div>
                        )}
                        <div className="flex flex-col">
                          <Link href={"/rhodium/users/" + user.id}>
                            <span className="font-bold">
                              {user.firstname} {user.lastname}
                            </span>
                          </Link>
                          <Link href={"/rhodium/users/" + user.id}>
                            {user.email}
                          </Link>
                          <Link href={"/rhodium/users/" + user.id}>
                            {user.phone_number}
                          </Link>
                        </div>
                      </TableCell>
                      <TableCell>
                        {user.avatar ? (
                          <div className="w-14 h-14 rounded-full relative">
                            <Image
                              fill
                              className="rounded-full object-cover"
                              alt="Event creator image"
                              src={
                                process.env.NEXT_STORAGE_BUCKET_URL +
                                user?.avatar.url
                              }
                            />
                          </div>
                        ) : (
                          <div className="w-14 h-14">
                            <GeneralAvatar />
                          </div>
                        )}
                        <div className="flex flex-col">
                          <Link href={"/rhodium/users/" + user.id}>
                            <span className="font-bold">
                              {user.firstname} {user.lastname}
                            </span>
                          </Link>
                          <Link href={"/rhodium/users/" + user.id}>
                            {user.email}
                          </Link>
                          <Link href={"/rhodium/users/" + user.id}>
                            {user.phone_number}
                          </Link>
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(user.createdAt).toLocaleDateString("fr-FR", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell>5000 XAF</TableCell>
                      <TableCell>
                        {new Date(user.createdAt).toLocaleDateString("fr-FR", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell>500 XAF</TableCell>
                      <TableCell>Nom de l&apos;agent</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="rejected">
          <Card className="w-full mt-8">
            <CardHeader>
              <CardTitle>
                Liste des commissions rejetées — {users.length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-end gap-3 mb-12">
                <div className="relative w-full">
                  <div className="absolute right-4 top-2">
                    <Search color="#333" />
                  </div>
                  <Input placeholder="Rechercher une commission" />
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="w-[480px] pl-3 text-left font-normal"
                    >
                      <span>Date de l&apos;achat</span>
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="range" />
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="w-[480px] pl-3 text-left font-normal"
                    >
                      <span>Date de paiement</span>
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarRange />
                  </PopoverContent>
                </Popover>
                <Select>
                  <SelectTrigger className="w-[480px]">
                    <SelectValue placeholder="Tous les agents" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="agent_1">Agent 1</SelectItem>
                    <SelectItem value="agent_2">Agent 2</SelectItem>
                    <SelectItem value="agent_2">Agent 3</SelectItem>
                  </SelectContent>
                </Select>

                <ExportToExcel
                  data={users.map((user) => ({
                    ...user,
                    avatar: process.env.NEXT_STORAGE_BUCKET_URL!.concat(
                      user.avatar?.url as string
                    ),
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
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Parrain (Bénéficiaire)</TableHead>
                    <TableHead>Filleul (Acheteur)</TableHead>
                    <TableHead>Date de l&apos;achat</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Date du paiement</TableHead>
                    <TableHead>Commission</TableHead>
                    <TableHead>Agent</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user, i) => (
                    <TableRow key={user.id}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>
                        {user.avatar ? (
                          <div className="w-14 h-14 rounded-full relative">
                            <Image
                              fill
                              className="rounded-full object-cover"
                              alt="Event creator image"
                              src={
                                process.env.NEXT_STORAGE_BUCKET_URL +
                                user?.avatar.url
                              }
                            />
                          </div>
                        ) : (
                          <div className="w-14 h-14">
                            <GeneralAvatar />
                          </div>
                        )}
                        <div className="flex flex-col">
                          <Link href={"/rhodium/users/" + user.id}>
                            <span className="font-bold">
                              {user.firstname} {user.lastname}
                            </span>
                          </Link>
                          <Link href={"/rhodium/users/" + user.id}>
                            {user.email}
                          </Link>
                          <Link href={"/rhodium/users/" + user.id}>
                            {user.phone_number}
                          </Link>
                        </div>
                      </TableCell>
                      <TableCell>
                        {user.avatar ? (
                          <div className="w-14 h-14 rounded-full relative">
                            <Image
                              fill
                              className="rounded-full object-cover"
                              alt="Event creator image"
                              src={
                                process.env.NEXT_STORAGE_BUCKET_URL +
                                user?.avatar.url
                              }
                            />
                          </div>
                        ) : (
                          <div className="w-14 h-14">
                            <GeneralAvatar />
                          </div>
                        )}
                        <div className="flex flex-col">
                          <Link href={"/rhodium/users/" + user.id}>
                            <span className="font-bold">
                              {user.firstname} {user.lastname}
                            </span>
                          </Link>
                          <Link href={"/rhodium/users/" + user.id}>
                            {user.email}
                          </Link>
                          <Link href={"/rhodium/users/" + user.id}>
                            {user.phone_number}
                          </Link>
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(user.createdAt).toLocaleDateString("fr-FR", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell>5000 XAF</TableCell>
                      <TableCell>
                        {new Date(user.createdAt).toLocaleDateString("fr-FR", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell>500 XAF</TableCell>
                      <TableCell>Nom de l&apos;agent</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
