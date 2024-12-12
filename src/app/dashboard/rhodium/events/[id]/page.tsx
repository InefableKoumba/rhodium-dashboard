import { EventResponseInterface } from "@/interfaces/interfaces";
import React from "react";
import EnventDetails from "@/components/common/envent-details";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const id = (await params).id;

    const response = await fetch(
      process.env.NEXT_API_URL +
        "/events?filters[id][$eq]=" +
        id +
        "&populate=*"
    );
    const event = (await response.json())["data"][0] as EventResponseInterface;

    return (
      <div>
        <div className="relative h-[20rem] md:h-[25rem] lg:h-[28rem] xl:h-[30rem] w-full">
          <Image
            fill
            alt={event.attributes.title}
            className="object-cover"
            src={
              event.attributes?.coverImage?.data?.attributes.url
                ? process.env.NEXT_STORAGE_BUCKET_URL! +
                  event.attributes?.coverImage?.data?.attributes.url
                : "https://via.placeholder.com/150"
            }
          />
          <div className="absolute left-0 w-full h-full bg-gradient-to-b from-transparent to-[#000000bb]"></div>
          <div className="absolute right-12 bottom-6">
            <Button className="bg-darkLight text-white hover:bg-darkLight/90">
              <Check />
              Valider l'évènement
            </Button>
          </div>
        </div>
        <div className="px-12">
          <Tabs defaultValue="details" className="w-full mt-12">
            <TabsList>
              <TabsTrigger value="details">Informations</TabsTrigger>
              <TabsTrigger value="tickets">Tickets achetés</TabsTrigger>
              <TabsTrigger value="tickets_distrubition">
                Distribution tickets
              </TabsTrigger>
              <TabsTrigger value="invitations">Invitations</TabsTrigger>
              <TabsTrigger value="tables">Tables</TabsTrigger>
              <TabsTrigger value="settings">Paramètres</TabsTrigger>
            </TabsList>
            <hr className="my-4" />
            <TabsContent value="details">
              <EnventDetails event={event} adminView />
            </TabsContent>
            <TabsContent value="tickets">
              <Table className="mb-24">
                <TableHeader>
                  <TableRow>
                    <TableHead>Categorie</TableHead>
                    <TableHead>Date d'achat</TableHead>
                    <TableHead>Scanné</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {event.attributes.tickets_generated?.data.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell className="font-medium">
                        {ticket.attributes.category}
                      </TableCell>
                      <TableCell>
                        {new Date(ticket.attributes.createdAt).toLocaleString(
                          "fr-FR",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                          }
                        )}
                      </TableCell>
                      <TableCell>
                        {ticket.attributes.isScanned ? "Déjà" : "Pas encore"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="guests">
              <Table className="mb-24">
                <TableHeader>
                  <TableRow>
                    <TableHead>Personne invitée</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Tickets</TableHead>
                    <TableHead>Scannée</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      Inefable KOUMBA
                    </TableCell>
                    <TableCell>45210</TableCell>
                    <TableCell>Acceptée</TableCell>
                    <TableCell>
                      <ol>
                        <li>Normal</li>
                        <li>VIP</li>
                      </ol>
                    </TableCell>
                    <TableCell>Déjà</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  } catch (_) {
    return null;
  }
}
