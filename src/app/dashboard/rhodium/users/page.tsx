import { GeneralAvatar } from "@/components/common/general-user-avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
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
  EllipsisVertical,
  ExternalLink,
  Search,
  Trash,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function page() {
  const response = await fetch(process.env.API_URL + "/users?populate=*");
  const users = (await response.json()) as UserInterface[];

  return (
    <div className="p-12">
      <h2 className="font-bold text-2xl">
        Liste des utilisateurs — {users.length}
      </h2>
      <span>Liste de tous les utilisateurs</span>
      <Card className="w-full mt-8">
        <CardContent>
          <div className="flex items-center justify-end gap-3 my-12">
            <div className="relative w-1/2">
              <div className="absolute right-4 top-2">
                <Search color="#333" />
              </div>
              <Input placeholder="Rechercher un évènement" />
            </div>
            <Button>
              <ArrowDownToLine size={36} />
              Exporter
            </Button>
          </div>
          <hr className="mb-4" />
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
                            process.env.STORAGE_BUCKET_URL + user?.avatar.url
                          }
                        />
                      </div>
                    ) : (
                      <GeneralAvatar />
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
