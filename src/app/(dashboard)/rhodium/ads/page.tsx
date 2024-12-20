import { Button } from "@/components/ui/button";
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
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Trash } from "lucide-react";
import Image from "next/image";
import React from "react";

const ads = [
  {
    id: 1,
    name: "First  ad",
    imageUrl: "https://www.rhodiumevent.xyz/uploads/promo2_ef78b52b11.jpeg",
    description: "Descrition of the first ad",
  },
  {
    id: 2,
    name: "First  ad",
    imageUrl: "https://www.rhodiumevent.xyz/uploads/promo3_775040608e.jpeg",
    description: "Descrition of the first ad",
  },
  {
    id: 3,
    name: "First  ad",
    imageUrl: "https://www.rhodiumevent.xyz/uploads/promo1_e2f7618121.jpeg",
    description: "Descrition of the first ad",
  },
];

export default function page() {
  return (
    <div className="p-12">
      <h1 className="font-extrabold text-3xl">Publicités</h1>
      <div className="flex justify-end">
        <Dialog>
          <DialogTrigger>
            <Button>Ajouter une publicité</Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-100">
            <DialogHeader>
              <DialogTitle>Ajouter une publicité</DialogTitle>
              <DialogDescription>
                Vous êtes sur le point d&apos;ajouter une publicité. Cette
                action est irréversible.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-2 mt-4">
              <Input type="file" placeholder="Image" />
              <Input placeholder="Désignation" />
              <Textarea placeholder="Description de la publicité" />
            </div>
            <div className="flex gap-2 my-4 items-center">
              <Checkbox />
              <span className="text-sm">
                Je confirme vouloir ajouter cette publicité
              </span>
            </div>
            <Button>Modifier</Button>
          </DialogContent>
        </Dialog>
      </div>
      <Table className="mt-12">
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Désignation</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Visible</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ads.map((ad, i) => (
            <TableRow key={ad.id} className="cursor-pointer">
              <TableCell className="font-medium">{i + 1}</TableCell>
              <TableCell className="font-medium">
                <div className="relative w-24 h-24 rounded">
                  <Image
                    src={ad.imageUrl}
                    alt={ad.name}
                    fill
                    className="rounded object-cover"
                  />
                </div>
              </TableCell>
              <TableCell className="font-medium">{ad.name}</TableCell>
              <TableCell className="font-medium">{ad.description}</TableCell>
              <TableCell className="font-medium">
                <div className="flex items-center space-x-2">
                  <Switch id="airplane-mode" />
                </div>
              </TableCell>
              <TableCell className="font-medium">
                <div className="flex gap-3 items-center">
                  <Dialog>
                    <DialogTrigger>
                      <div className="border hover:bg-blue-600 hover:text-white text-gray-800 rounded-full w-10 h-10 flex items-center justify-center">
                        <Pencil size={18} />
                      </div>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-100">
                      <DialogHeader>
                        <DialogTitle>Modifier cette publicité</DialogTitle>
                        <DialogDescription>
                          Vous êtes sur le point de modifier cette publicité.
                          Cette action est irréversible.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex flex-col gap-2 mt-4">
                        <Input type="file" placeholder="Image" />
                        <Input placeholder="Désignation" />
                        <Textarea placeholder="Description de la publicité" />
                      </div>
                      <div className="flex gap-2 my-4 items-center">
                        <Checkbox />
                        <span className="text-sm">
                          Je confirme vouloir modifier cette publicité
                        </span>
                      </div>
                      <Button>Modifier</Button>
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger>
                      <div className="border hover:bg-red-600 text-gray-800 hover:text-white rounded-full w-10 h-10 flex items-center justify-center">
                        <Trash size={18} />
                      </div>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-100">
                      <DialogHeader>
                        <DialogTitle>
                          Voulez-vous vraiment supprimer cette publicité ?
                        </DialogTitle>
                        <DialogDescription>
                          Vous êtes sur le point de supprimer cette publicité.
                          Cette action est irréversible.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex gap-2 my-4 items-center">
                        <Checkbox />
                        <span className="text-sm">
                          Je confirme vouloir supprimer cette publicité
                        </span>
                      </div>
                      <Button>Supprimer</Button>
                    </DialogContent>
                  </Dialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
