import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { getAdvertisements, updateAdvertisement } from "@/lib/actions";
import { Advertisement } from "@/types/types";
import { Plus, Trash2, Pencil } from "lucide-react";
import Image from "next/image";
import React from "react";

export const dynamic = "force-dynamic";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export default async function AdsPage() {
  const { advertisements } = await getAdvertisements();

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Publicités</h1>
          <p className="text-muted-foreground">
            Gérez les publicités de votre application
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter une publicité
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Nouvelle publicité</DialogTitle>
              <DialogDescription>
                Ajoutez une nouvelle publicité à votre application
              </DialogDescription>
            </DialogHeader>
            <form className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="content" className="text-sm font-medium">
                  Contenu
                </label>
                <Textarea
                  id="content"
                  placeholder="Entrez le contenu de la publicité"
                  className="resize-none"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="image" className="text-sm font-medium">
                  Image
                </label>
                <Input
                  id="image"
                  type="file"
                  accept={ACCEPTED_IMAGE_TYPES.join(",")}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="video" className="text-sm font-medium">
                  Vidéo
                </label>
                <Input id="video" type="file" accept="video/*" />
              </div>
              <Button type="submit">Créer</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des publicités</CardTitle>
          <CardDescription>
            {advertisements.length} publicité
            {advertisements.length > 1 ? "s" : ""} au total
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Contenu</TableHead>
                <TableHead>Date de création</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {advertisements.map((ad: Advertisement) => (
                <TableRow key={ad.id}>
                  <TableCell>
                    {ad.imageId ? (
                      <div className="relative w-20 h-20 rounded-md overflow-hidden">
                        <Image
                          src={`${process.env.NEXT_STORAGE_BUCKET_URL}${ad.imageId}`}
                          alt="Publicité"
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-md bg-muted flex items-center justify-center">
                        <span className="text-muted-foreground">
                          Aucune image
                        </span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="max-w-[300px]">
                    <p className="truncate">{ad.content}</p>
                  </TableCell>
                  <TableCell>
                    {new Date(ad.createdAt).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
                    <Switch
                      defaultChecked={ad.published}
                      onChange={() => {
                        updateAdvertisement(ad.id, {
                          published: !ad.published,
                        });
                      }}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
