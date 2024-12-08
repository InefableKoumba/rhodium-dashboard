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
import { UserInterface } from "@/interfaces/interfaces";
import {
  ArrowDownToLine,
  Ban,
  CalendarIcon,
  EllipsisVertical,
  ExternalLink,
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
      <Card className="w-full mt-8">
        <CardHeader>
          <CardTitle>Liste des utilisateurs — {users.length}</CardTitle>
          <CardDescription>Liste de tous les utilisateurs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-end gap-3 mb-12">
            <div className="relative w-1/2">
              <div className="absolute right-4 top-2">
                <Search color="#333" />
              </div>
              <Input placeholder="Rechercher un utilisateur" />
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className="w-[240px] pl-3 text-left font-normal"
                >
                  <span>Date d&apos;adhésion</span>
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" />
              </PopoverContent>
            </Popover>
            <Button>
              <ArrowDownToLine size={36} />
              Exporter
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Profil</TableHead>
                <TableHead>Nom & prénom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Téléphone</TableHead>
                <TableHead>Date d&apos;adhésion</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
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
                  </TableCell>
                  <TableCell className="font-medium">
                    <Link href={"/dashboard/users/" + user.id}>
                      {user.firstname} {user.lastname}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={"/dashboard/users/" + user.id}>
                      {user.email}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={"/dashboard/users/" + user.id}>
                      {user.phone_number}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={"/dashboard/users/" + user.id}>
                      {new Date(user.createdAt).toLocaleDateString("fr-FR", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </Link>
                  </TableCell>

                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <EllipsisVertical />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <ExternalLink /> Ouvrir
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Ban /> Bloquer
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Trash />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
