import AddAds from "@/components/modals/add-ads";
import DeleteAds from "@/components/modals/delete-ads";
import EditAd from "@/components/modals/edit-ads";
import PublishAdButton from "@/components/publish-ad-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAdvertisements } from "@/lib/actions";
import { Advertisement } from "@/types/types";
import Image from "next/image";
import React from "react";

export const dynamic = "force-dynamic";

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
        <AddAds />
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
                    {ad.imageId && (
                      <div className="relative w-44 h-44 rounded-md overflow-hidden">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_R2_BUCKET_URL}/${ad.imageId}`}
                          alt="Publicité"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    {ad.videoId && (
                      <div className="relative w-44 h-44   rounded-md overflow-hidden">
                        <video
                          src={`${process.env.NEXT_PUBLIC_R2_BUCKET_URL}/${ad.videoId}`}
                          controls
                          className="object-cover h-44"
                        />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="max-w-[300px] gap-3">
                    <p className="truncate font-bold">{ad.title}</p>
                    <p className="truncate text-gray-700">{ad.content}</p>
                  </TableCell>
                  <TableCell>
                    {new Date(ad.createdAt).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
                    <PublishAdButton id={ad.id} published={ad.published} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <EditAd
                        id={ad.id}
                        title={ad.title}
                        content={ad.content}
                        expiresAt={ad.expiresAt}
                      />
                      <DeleteAds id={ad.id} />
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
