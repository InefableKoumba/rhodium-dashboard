import { Event } from "@/types/types";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { getEvent } from "@/lib/actions";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export const dynamic = "force-dynamic";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const id = (await params).id;
    const event = await getEvent(id);

    return (
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="relative h-[400px] w-full">
          <Image
            fill
            alt={event.title}
            className="object-cover rounded-lg"
            src={
              event.coverImageId
                ? process.env.NEXT_PUBLIC_R2_BUCKET_URL +
                  "/" +
                  event.coverImageId
                : "https://via.placeholder.com/150"
            }
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 rounded-lg" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h1 className="text-4xl font-bold mb-2">{event.title}</h1>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <Calendar size={16} />
                {format(new Date(event.startsAt), "PPP", { locale: fr })}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={16} />
                {format(new Date(event.startsAt), "p", { locale: fr })}
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={16} />
                {event.location}, {event.city}
              </span>
            </div>
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive">
                  <Shield size={16} className="mr-2" />
                  Rejeter
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Rejeter cet événement</DialogTitle>
                  <DialogDescription>
                    Veuillez fournir une raison pour le rejet de cet événement.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Textarea placeholder="Raison du rejet" />
                  <div className="flex items-center gap-2">
                    <Checkbox id="confirm" />
                    <label htmlFor="confirm" className="text-sm">
                      Je confirme vouloir rejeter cet événement
                    </label>
                  </div>
                  <Button variant="destructive">Rejeter</Button>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Shield size={16} className="mr-2" />
                  Approuver
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Approuver cet événement</DialogTitle>
                  <DialogDescription>
                    Êtes-vous sûr de vouloir approuver cet événement ?
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Checkbox id="confirm" />
                    <label htmlFor="confirm" className="text-sm">
                      Je confirme vouloir approuver cet événement
                    </label>
                  </div>
                  <Button>Approuver</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="details" className="w-full p-12 pt-0">
          <TabsList>
            <TabsTrigger value="details" className="gap-2">
              <Info size={16} />
              Détails
            </TabsTrigger>
            <TabsTrigger value="tickets" className="gap-2">
              <Ticket size={16} />
              Tickets
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
                      Du{" "}
                      {format(new Date(event.startsAt), "PPP", { locale: fr })}{" "}
                      au {format(new Date(event.endsAt), "PPP", { locale: fr })}
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
                    <span>
                      Organisé par {event.organizer?.firstname}{" "}
                      {event.organizer?.lastname}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign size={16} className="text-gray-500" />
                    <span>{event.isFree ? "Gratuit" : "Payant"}</span>
                  </div>
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
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Catégories</h2>
              <div className="flex flex-wrap gap-2">
                {event.categories.map((category) => (
                  <span
                    key={category}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tickets" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Types de tickets</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Ticket size={16} className="mr-2" />
                    Ajouter un type de ticket
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Nouveau type de ticket</DialogTitle>
                    <DialogDescription>
                      Créez un nouveau type de ticket pour cet événement
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input placeholder="Nom du ticket" />
                    <Input placeholder="Prix" type="number" />
                    <Input placeholder="Quantité maximale" type="number" />
                    <Button>Créer</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Prix</TableHead>
                  <TableHead>Quantité</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {event.ticketTypes?.map((ticketType) => (
                  <TableRow key={ticketType.id}>
                    <TableCell>{ticketType.name}</TableCell>
                    <TableCell>{ticketType.price} XAF</TableCell>
                    <TableCell>{ticketType.maxQuantity}</TableCell>
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
            <h2 className="text-2xl font-bold">Paramètres de l'événement</h2>
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
                  <label className="text-sm font-medium">Type d'accès</label>
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
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Événement non trouvé</h2>
          <p className="text-gray-600">
            L'événement que vous recherchez n'existe pas ou a été supprimé.
          </p>
        </div>
      </div>
    );
  }
}
