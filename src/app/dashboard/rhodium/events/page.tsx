import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
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
import { EventResponseInterface } from "@/interfaces/interfaces";
import {
  ArrowDownToLine,
  CalendarDays,
  CalendarIcon,
  ExternalLink,
  Search,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function page() {
  const response = await fetch(process.env.API_URL + "/events?populate=*");
  const events = (await response.json())["data"] as EventResponseInterface[];

  return (
    <div className="px-8">
      <Card className="w-full mt-8">
        <CardHeader>
          <CardTitle>Liste des évènements — {events.length}</CardTitle>
          <CardDescription>Liste de tous les événements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-end gap-3 mb-12">
            <div className="relative w-full">
              <div className="absolute right-4 top-2">
                <Search color="#333" />
              </div>
              <Input placeholder="Rechercher un utilisateur" />
            </div>
            <Select>
              <SelectTrigger className="w-[450px]">
                <SelectValue placeholder="Toutes les transactions" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">Touts les évènements</SelectItem>
                  <SelectItem value="free">Gratuits</SelectItem>
                  <SelectItem value="paid">Payant</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className="w-[240px] pl-3 text-left font-normal"
                >
                  <span>Choisissez une date</span>
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
                    <Link href={"/dashboard/rhodium/events/" + event.id}>
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
                      className="border flex items-center justify-center gap-2 text-gray-800 py-1 px-2 rounded"
                      href={"/dashboard/events/" + event.id}
                    >
                      <ExternalLink size={14} color="#333" />
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
