import ExportToExcel from "@/components/common/export-to-excel";
import { GeneralAvatar } from "@/components/common/general-user-avatar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  Ban,
  CalendarIcon,
  CheckCheck,
  CircleX,
  EllipsisVertical,
  ExternalLink,
  Info,
  Search,
  Trash,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function page() {
  const response = await fetch(process.env.NEXT_API_URL + "/users?populate=*");
  const users = (await response.json()) as UserInterface[];

  return (
    <div className="p-8">
      <Tabs defaultValue="unpaid" className="w-full mt-12">
        <TabsList>
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
          <Card className="w-full mt-8">
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
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
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
                  <TableRow>
                    <TableHead>Parrain</TableHead>
                    <TableHead>Filleul</TableHead>
                    <TableHead>Date de parrainage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
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
                      className="w-[400px] pl-3 text-left font-normal"
                    >
                      <span>Date de parrainage</span>
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
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
                      className="w-[400px] pl-3 text-left font-normal"
                    >
                      <span>Date de paiement</span>
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
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
                  <TableRow>
                    <TableHead>Parrain</TableHead>
                    <TableHead>Filleul</TableHead>
                    <TableHead>Date de parrainage</TableHead>
                    <TableHead>Date de paiement</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
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
                      className="w-[400px] pl-3 text-left font-normal"
                    >
                      <span>Date de parrainage</span>
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
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
                      className="w-[400px] pl-3 text-left font-normal"
                    >
                      <span>Date de rejet</span>
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
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
                  <TableRow>
                    <TableHead>Parrain</TableHead>
                    <TableHead>Filleul</TableHead>
                    <TableHead>Date de parrainage</TableHead>
                    <TableHead>Date de rejet</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
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
