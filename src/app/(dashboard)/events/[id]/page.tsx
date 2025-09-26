import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Ticket,
  DollarSign,
  Shield,
  Info,
  Settings,
  Pencil,
  Trash,
  QrCode,
  Minus,
  Quote,
  BarChart3,
  Phone,
  Wallet,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import ApproveEventModal from "@/components/modals/approve-event";
import RejectEventModal from "@/components/modals/reject-event";
import { getEvent } from "@/lib/actions";
import AddTicketTypeModal from "@/components/modals/add-ticket";
import { EventCategory, EventCategoryLabels } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DeleteEventModal from "@/components/modals/delete-event";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function EventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const id = (await params).id;
    const event = await getEvent(id);

    const paidOrders =
      event.orders?.filter((order) => order.status === "PAID") ?? [];

    let statusBgColor = "bg-yellow-500";
    let statusText = "En attente d'approbation";
    switch (event.status) {
      case "APPROVED":
        statusBgColor = "bg-green-600";
        statusText = "Approuvé";
        break;
      case "REJECTED":
        statusBgColor = "bg-red-500";
        statusText = "Rejeté";
        break;
    }

    return (
      <div className="space-y-8 px-8 pt-4">
        {/* Hero Section */}
        <div className="relative h-[400px] w-full">
          <Image
            fill
            alt={event.title}
            className="object-cover rounded-lg"
            src={
              process.env.NEXT_PUBLIC_R2_BUCKET_URL + "/" + event.coverImageId
            }
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 rounded-lg" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div
              className={`px-2 py-1 rounded-full text-sm ${statusBgColor} w-max py-2 px-4 mb-2`}
            >
              {statusText}
            </div>
            <h1 className="text-4xl font-bold mb-2">{event.title}</h1>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <Calendar size={16} />
                {new Date(event.startsAt).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={16} />
                {new Date(event.startsAt).toLocaleTimeString("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              <Minus size={16} />
              <span className="flex items-center gap-1">
                <Calendar size={16} />
                {new Date(event.endsAt).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={16} />
                {new Date(event.endsAt).toLocaleTimeString("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={16} />
                {event.location}, {event.city}
              </span>
            </div>
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
            {event.status !== "REJECTED" && <RejectEventModal eventId={id} />}
            {event.status !== "APPROVED" && <ApproveEventModal eventId={id} />}
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="details" className="w-full p-12 pt-0">
          <div className="flex justify-between items-center">
            <TabsList className="mb-4">
              <TabsTrigger value="details" className="gap-2">
                <Info size={16} />
                Détails
              </TabsTrigger>
              <TabsTrigger value="tickets" className="gap-2">
                <Ticket size={16} />
                Tickets
              </TabsTrigger>
              <TabsTrigger value="sales" className="gap-2">
                <BarChart3 size={16} />
                Ventes
              </TabsTrigger>
              <TabsTrigger value="invitations" className="gap-2">
                <Users size={16} />
                Invitations
              </TabsTrigger>
              <TabsTrigger value="settings" className="gap-2">
                <Settings size={16} />
                Paramètres
              </TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Wallet size={24} />
                    <span>Procéder au paiement</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Procéder au paiement</DialogTitle>
                  </DialogHeader>
                  <div className="flex items-center gap-2">
                    <Input type="number" placeholder="Montant" />
                    <Button>Procéder au paiement</Button>
                  </div>
                </DialogContent>
              </Dialog>
              <DeleteEventModal eventId={id} />
            </div>
          </div>
          <TabsContent value="details" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Description</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {event.description}
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Informations</h2>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-gray-500" />
                    <span>
                      Publié le{" "}
                      {new Date(event.createdAt).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}{" "}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-gray-500" />
                    <span>
                      Du{" "}
                      {new Date(event.startsAt).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}{" "}
                      au{" "}
                      {new Date(event.endsAt).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-gray-500" />
                    <span>
                      {event.location}, {event.city}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-gray-500" />
                    <div className="flex items-center gap-2">
                      <span>Organisé par </span>
                      <span className="font-semibold">
                        {event.organizer?.name}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-gray-500" />
                    <div className="flex items-center gap-2">
                      <span>Téléphone </span>
                      <span className="font-semibold">
                        +{event.organizer?.countryCode}{" "}
                        {event.organizer?.phoneNumber}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <QrCode size={16} className="text-gray-500" />
                    <div className="flex items-center gap-2">
                      <span>Code QR </span>
                      <span className="font-semibold">{event.scanCode}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign size={16} className="text-gray-500" />
                    <span>{event.isFree ? "Gratuit" : "Payant"}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <Shield size={16} className="text-gray-500" />
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          event.status === "APPROVED"
                            ? "bg-green-100 text-green-800"
                            : event.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {event.status === "APPROVED"
                          ? "Approuvé"
                          : event.status === "PENDING"
                          ? "En attente"
                          : "Rejeté"}
                      </span>
                      {event.approvedBy && (
                        <span>
                          Par{" "}
                          <span className="font-semibold">
                            {event.approvedBy?.firstname}{" "}
                            {event.approvedBy?.lastname}
                          </span>
                        </span>
                      )}
                    </div>
                    {event.rejectionReason && (
                      <div className="flex items-center gap-2 mt-2">
                        <Quote size={18} color="#333" /> {event.rejectionReason}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Catégories</h2>
              <div className="flex flex-wrap gap-2">
                {event.categories?.map((category) => (
                  <span
                    key={category}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {EventCategoryLabels[category as EventCategory] ??
                      "Catégorie inconnue"}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-full">
                {event.videoId && (
                  <video
                    src={
                      process.env.NEXT_PUBLIC_R2_BUCKET_URL +
                      "/" +
                      event.videoId
                    }
                    controls
                  ></video>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4 w-full">
                {event.imageIds?.map((imageId, i) => (
                  <div className="w-full h-44 relative" key={i}>
                    <Image
                      src={
                        process.env.NEXT_PUBLIC_R2_BUCKET_URL + "/" + imageId
                      }
                      alt={event.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tickets" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Types de tickets</h2>
              <AddTicketTypeModal eventId={id} />
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Prix</TableHead>
                  <TableHead>Quantité</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {event.ticketTypes?.map((ticketType) => (
                  <TableRow key={ticketType.id}>
                    <TableCell>{ticketType.name}</TableCell>
                    <TableCell>{ticketType.price} XAF</TableCell>
                    <TableCell>{ticketType.maxQuantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="sales" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="dark:bg-gray-900 dark:border-gray-800 dark:text-gray-100 rounded-xl shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Chiffre d&apos;affaires total
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {event.totalEarnings?.toLocaleString()} XAF
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Montant total généré par les ventes
                  </p>
                </CardContent>
              </Card>

              <Card className="dark:bg-gray-900 dark:border-gray-800 dark:text-gray-100 rounded-xl shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Tickets vendus
                  </CardTitle>
                  <Ticket className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {paidOrders?.reduce(
                      (total, order) => total + order.items.length,
                      0
                    ) || 0}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Nombre total de tickets vendus
                  </p>
                </CardContent>
              </Card>

              <Card className="dark:bg-gray-900 dark:border-gray-800 dark:text-gray-100 rounded-xl shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Taux de conversion
                  </CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {event?.ticketTypes &&
                    event.ticketTypes.reduce(
                      (total, tt) => total + tt.maxQuantity,
                      0
                    ) > 0
                      ? `${Math.round(
                          ((event.orders?.length || 0) /
                            event.ticketTypes?.reduce(
                              (total, tt) => total + tt.maxQuantity,
                              0
                            )) *
                            100
                        )}%`
                      : "0%"}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Pourcentage de tickets vendus
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Ventes par type de ticket</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type de ticket</TableHead>
                    <TableHead>Prix unitaire</TableHead>
                    <TableHead>Quantité vendue</TableHead>
                    <TableHead>Quantité partagée</TableHead>
                    <TableHead>Revenu généré</TableHead>
                    <TableHead>Disponibilité</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {event.ticketTypes?.map((ticketType) => {
                    let soldTickets = 0;

                    for (const order of paidOrders) {
                      for (const item of order.items) {
                        if (item.ticketType.id === ticketType.id) {
                          soldTickets++;
                        }
                      }
                    }

                    const sharedTickets =
                      event.orders?.filter((o) =>
                        o.items.some((i) => i.ticketType.id === ticketType.id)
                      ).length || 0;

                    const revenue = soldTickets * ticketType.price;
                    const availability = `${soldTickets}/${ticketType.maxQuantity}`;

                    return (
                      <TableRow key={ticketType.id}>
                        <TableCell>{ticketType.name}</TableCell>
                        <TableCell>
                          {ticketType.price.toLocaleString()} XAF
                        </TableCell>
                        <TableCell>{soldTickets}</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>{revenue.toLocaleString()} XAF</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                              <div
                                className="bg-primary h-2.5 rounded-full"
                                style={{
                                  width: `${
                                    (soldTickets / ticketType.maxQuantity) * 100
                                  }%`,
                                }}
                              ></div>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {availability}
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Historique des ventes</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Acheteur</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type de ticket</TableHead>
                    <TableHead>Prix</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {event.orders?.map((order) => {
                    const ticketType = event.ticketTypes?.find(
                      (tt) => tt.id === order.items[0]?.ticketType.id
                    );
                    return (
                      <TableRow key={order.id}>
                        <TableCell>
                          <Link href={`/users/${order.user?.id}`}>
                            {order.user?.name}
                          </Link>
                        </TableCell>
                        <TableCell>
                          {new Date(order.createdAt).toLocaleDateString(
                            "fr-FR",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </TableCell>
                        <TableCell>
                          {ticketType?.name || "Type inconnu"}
                        </TableCell>
                        <TableCell>
                          {(ticketType?.price || 0).toLocaleString()} XAF
                        </TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-sm ${
                              order.status === "PAID"
                                ? "bg-green-100 text-green-800"
                                : order.status === "PENDING"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {order.status === "PAID"
                              ? "Confirmé"
                              : order.status === "PENDING"
                              ? "En attente"
                              : "Annulé"}
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="invitations" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Invitations</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Users size={16} className="mr-2" />
                    Ajouter une invitation
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Nouvelle invitation</DialogTitle>
                    <DialogDescription>
                      Créez une nouvelle invitation pour cet événement
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input placeholder="Email de l'invité" />
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Type de ticket" />
                      </SelectTrigger>
                      <SelectContent>
                        {event.ticketTypes?.map((ticketType) => (
                          <SelectItem key={ticketType.id} value={ticketType.id}>
                            {ticketType.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button>Créer</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invité</TableHead>
                  <TableHead>Type de ticket</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {event.invitations?.map((invitation) => (
                  <TableRow key={invitation.id}>
                    <TableCell>{invitation.userId}</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          invitation.status === "ACCEPTED"
                            ? "bg-green-100 text-green-800"
                            : invitation.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {invitation.status === "ACCEPTED"
                          ? "Acceptée"
                          : invitation.status === "PENDING"
                          ? "En attente"
                          : "Refusée"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Pencil size={16} />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold">
              Paramètres de l&apos;événement
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Titre</label>
                  <Input defaultValue={event.title} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea defaultValue={event.description} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Lieu</label>
                  <Input defaultValue={event.location} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Ville</label>
                  <Input defaultValue={event.city} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date de début</label>
                  <Input
                    type="datetime-local"
                    defaultValue={new Date(event.startsAt)
                      .toISOString()
                      .slice(0, 16)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date de fin</label>
                  <Input
                    type="datetime-local"
                    defaultValue={new Date(event.endsAt)
                      .toISOString()
                      .slice(0, 16)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Type d&apos;accès
                  </label>
                  <Select defaultValue={event.isFree ? "free" : "paid"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un type d'accès" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="free">Gratuit</SelectItem>
                      <SelectItem value="paid">Payant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Catégories</label>
                  <Select defaultValue={event.categories[0]}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {event.categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Annuler</Button>
                <Button>Enregistrer</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  } catch (error) {
    console.error(error);
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Événement non trouvé</h2>
          <p className="text-gray-600">
            L&apos;événement que vous recherchez n&apos;existe pas ou a été
            supprimé.
          </p>
        </div>
      </div>
    );
  }
}
