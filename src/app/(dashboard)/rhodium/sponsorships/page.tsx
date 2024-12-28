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

export default async function page() {
  const response = await fetch(process.env.NEXT_API_URL + "/users?populate=*");
  const users = (await response.json()) as UserInterface[];

  return (
    <div className="p-8">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="dark:bg-gray-900 dark:border-gray-800 dark:text-gray-100 rounded-xl shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-10">
            <CardTitle className="text-sm font-medium">
              Total parrainages
            </CardTitle>
            <Users className="size-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4830</div>
            <p className="text-xs text-muted-foreground">
              Nombre total de parrainages
            </p>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-900 dark:border-gray-800 dark:text-gray-100 rounded-xl shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-10">
            <CardTitle className="text-sm font-medium">
              Montant déjà payé
            </CardTitle>
            <DollarSign className="size-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">534 200 XAF</div>
            <p className="text-xs text-muted-foreground">
              Dépenses éffectuées pour les parrainages
            </p>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-900 dark:border-gray-800 dark:text-gray-100 rounded-xl shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-10">
            <CardTitle className="text-sm font-medium">Reste à payer</CardTitle>
            <Bell className="size-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2800 XAF</div>
            <p className="text-xs text-muted-foreground">
              Montant restant à payer pour les parrainages
            </p>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="unpaid" className="w-full mt-8 ">
        <TabsList className="dark:bg-gray-900 dark:border-gray-800 shadow">
          <TabsTrigger value="unpaid" className="gap-2 px-6">
            <Info color="#333" size={20} />
            Non payés
          </TabsTrigger>
          <TabsTrigger value="paid" className="gap-2 px-6">
            <CheckCheck color="#333" size={20} />
            Déjà payés
          </TabsTrigger>
          <TabsTrigger value="rejected" className="gap-2 px-6">
            <CircleX color="#333" size={20} />
            Rejetés
          </TabsTrigger>
        </TabsList>
        <TabsContent value="unpaid">
          <Card className="w-full mt-8 dark:bg-gray-900 dark:border-gray-800 rounded-xl shadow">
            <CardHeader>
              <CardTitle>
                Liste des parrainages non payés — {users.length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-end gap-3 mb-12">
                <div className="relative w-full">
                  <div className="absolute right-4 top-2">
                    <Search color="#333" />
                  </div>
                  <Input placeholder="Rechercher un parrainage" />
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="w-[400px] pl-3 text-left font-normal"
                    >
                      <span>Date de parrainage</span>
                      <CalendarIcon className="ml-auto size-6 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" />
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
                  <TableRow className="dark:hover:bg-gray-800 dark:border-gray-800">
                    <TableHead>Parrain</TableHead>
                    <TableHead>Filleul</TableHead>
                    <TableHead>Date de parrainage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id} className="dark:hover:bg-gray-800 dark:border-gray-800">
                      <TableCell>
                        <TableCell className="flex gap-2 items-center">
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
                      </TableCell>
                      <TableCell>
                        <TableCell className="flex gap-2 items-center">
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
                      </TableCell>
                      <TableCell>
                        <Link href={"/rhodium/users/" + user.id}>
                          {new Date(user.createdAt).toLocaleDateString(
                            "fr-FR",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="rounded-full">
                              Payer 100 XAF
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Voulez-vous vraiment effectuer ce paiement ?
                              </DialogTitle>
                              <DialogDescription>
                                Vous êtes sur le point de payer 100 XAF pour ce
                                parrainage en faveur de l&apos;utilisateur :{" "}
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="paid">
          <Card className="w-full mt-8 dark:bg-gray-900 dark:border-gray-800 rounded-xl shadow">
            <CardHeader>
              <CardTitle>
                Liste des parrainages déjà payés — {users.length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-end gap-3 mb-12">
                <div className="relative w-full">
                  <div className="absolute right-4 top-2">
                    <Search color="#333" />
                  </div>
                  <Input placeholder="Rechercher un parrainage" />
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="w-[480px] pl-3 text-left font-normal"
                    >
                      <span>Date de parrainage</span>
                      <CalendarIcon className="ml-auto size-6 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" />
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="w-[480px] pl-3 text-left font-normal"
                    >
                      <span>Date de paiement</span>
                      <CalendarIcon className="ml-auto size-6 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" />
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
                  <TableRow className="dark:hover:bg-gray-800 dark:border-gray-800">
                    <TableHead>Parrain</TableHead>
                    <TableHead>Filleul</TableHead>
                    <TableHead>Date de parrainage</TableHead>
                    <TableHead>Date de paiement</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Agent</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id} className="dark:hover:bg-gray-800 dark:border-gray-800">
                      <TableCell>
                        <TableCell className="flex gap-2 items-center">
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
                      </TableCell>
                      <TableCell>
                        <TableCell className="flex gap-2 items-center">
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
                      </TableCell>
                      <TableCell>
                        {new Date(user.createdAt).toLocaleDateString("fr-FR", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        {new Date(user.createdAt).toLocaleDateString("fr-FR", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell>100 XAF</TableCell>
                      <TableCell>Nom de l&apos;agent</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="rejected">
          <Card className="w-full mt-8 dark:bg-gray-900 dark:border-gray-800 rounded-xl shadow">
            <CardHeader>
              <CardTitle>
                Liste des parrainages rejetés — {users.length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-end gap-3 mb-12">
                <div className="relative w-full">
                  <div className="absolute right-4 top-2">
                    <Search color="#333" />
                  </div>
                  <Input placeholder="Rechercher un parrainage" />
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="w-[480px] pl-3 text-left font-normal"
                    >
                      <span>Date de parrainage</span>
                      <CalendarIcon className="ml-auto size-6 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" />
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="w-[480px] pl-3 text-left font-normal"
                    >
                      <span>Date de rejet</span>
                      <CalendarIcon className="ml-auto size-6 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" />
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
                  <TableRow className="dark:hover:bg-gray-800 dark:border-gray-800">
                    <TableHead>Parrain</TableHead>
                    <TableHead>Filleul</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Date de parrainage</TableHead>
                    <TableHead>Date de rejet</TableHead>
                    <TableHead>Agent</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id} className="dark:hover:bg-gray-800 dark:border-gray-800">
                      <TableCell>
                        <div className="flex gap-2 items-center">
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
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2 items-center">
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
                        </div>
                      </TableCell>
                      <TableCell>100 XAF</TableCell>
                      <TableCell>
                        {new Date(user.createdAt).toLocaleDateString("fr-FR", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        {new Date(user.createdAt).toLocaleDateString("fr-FR", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell>Agent 2</TableCell>
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
