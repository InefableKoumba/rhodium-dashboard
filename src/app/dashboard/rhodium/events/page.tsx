import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EventResponseInterface } from "@/interfaces/interfaces";
import { ArrowDownToLine, CalendarDays, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function page() {
  const response = await fetch(process.env.API_URL + "/events?populate=*");
  const events = (await response.json())["data"] as EventResponseInterface[];

  return (
    <div className="p-12">
      <h2 className="font-bold text-2xl">
        Liste des évènements — {events.length}
      </h2>
      <span>Liste de tous les événements</span>
      <Card className="w-full mt-8">
        <CardContent>
          <div className="flex items-center justify-end gap-3 my-12">
            <div className="relative w-1/2">
              <div className="absolute right-4 top-2">
                <Search color="#333" />
              </div>
              <Input placeholder="Rechercher un utilisateur" />
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
                <TableHead>Couverture</TableHead>
                <TableHead>Evènement</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Invités</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">
                    <Link href={"/dashboard/events/" + event.id}>
                      {event.attributes.coverImage &&
                      event.attributes.coverImage.data ? (
                        <div className="relative w-28 h-14 roundeds-sm">
                          <Image
                            fill
                            src={
                              process.env.STORAGE_BUCKET_URL +
                              event.attributes.coverImage.data?.attributes.url
                            }
                            alt={event.attributes.title}
                            className="object-cover rounded-sm"
                          />
                        </div>
                      ) : (
                        <div className="w-28 h-14 rounded-sm bg-gray-200 flex items-center justify-center">
                          <CalendarDays color="#888" />
                        </div>
                      )}
                    </Link>
                  </TableCell>
                  <TableCell className="font-medium">
                    <Link href={"/dashboard/events/" + event.id}>
                      {event.attributes.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={"/dashboard/events/" + event.id}>
                      {new Date(event.attributes.date_start).toLocaleDateString(
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
                    {event.attributes.event_invitations?.data.length.toLocaleString(
                      "fr-FR"
                    )}
                  </TableCell>
                  <TableCell>
                    <Link
                      className="bg-black text-white py-2 px-3 rounded"
                      href={"/dashboard/events/" + event.id}
                    >
                      Ouvrir
                    </Link>
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
