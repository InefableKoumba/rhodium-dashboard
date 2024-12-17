import { EventResponseInterface } from "@/interfaces/interfaces";
import React from "react";
import EnventDetails from "@/components/common/envent-details";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Check,
  Info,
  Pencil,
  Settings,
  ShieldX,
  Sofa,
  Ticket,
  TicketCheck,
  Trash,
  Users,
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

const tickets = [
  {
    category: "Standard",
    quantity: 120,
    price: 5000,
  },
  {
    category: "VIP",
    quantity: 14,
    price: 20000,
  },
  {
    category: "VVIP",
    quantity: 5,
    price: 50000,
  },
  {
    category: "Autres",
    quantity: 60,
    price: 2500,
  },
];

const invitations = [
  {
    name: "Inefable KOUMBA",
    code: "45210",
    status: "Acceptée",
    tickets: ["Normal", "VIP"],
    scanned: true,
  },
  {
    name: "Gabi MABIALA",
    code: "45211",
    status: "Acceptée",
    tickets: ["Normal", "VIP"],
    scanned: false,
  },
  {
    name: "Franz OSSETE",
    code: "45212",
    status: "Acceptée",
    tickets: ["Normal", "VIP"],
    scanned: true,
  },
];

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
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-darkLight text-white hover:bg-darkLight/90">
                  <Check />
                  Valider l&apos;évènement
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    Voulez-vous vraiment valider cet évènement?
                  </DialogTitle>
                  <DialogDescription>
                    Vous êtes sur le point de valider cet évènement. Les
                    utilisateurs pourront voir et acheter des tickets pour cet
                    évènement.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex gap-2 my-4 items-center">
                  <Checkbox />
                  <span className="text-sm">
                    Je confirme vouloir valider cet évènement
                  </span>
                </div>
                <Button>Valider</Button>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="px-12">
          <Tabs defaultValue="details" className="w-full mt-12">
            <TabsList>
              <TabsTrigger value="details" className="gap-2 px-6">
                <Info color="#333" size={20} />
                Informations
              </TabsTrigger>
              <TabsTrigger value="tickets" className="gap-2 px-6">
                <Ticket color="#333" size={20} />
                Tickets
              </TabsTrigger>
              <TabsTrigger value="sold_tickets" className="gap-2 px-6">
                <TicketCheck color="#333" size={20} />
                Tickets vendus
              </TabsTrigger>
              <TabsTrigger value="invitations" className="gap-2 px-6">
                <Users color="#333" size={20} />
                Invitations
              </TabsTrigger>
              <TabsTrigger value="tables" className="gap-2 px-6">
                <Sofa color="#333" size={20} />
                Tables
              </TabsTrigger>
              <TabsTrigger value="settings" className="gap-2 px-6">
                <Settings />
                Paramètres
              </TabsTrigger>
            </TabsList>
            <div className="my-12" />
            <TabsContent value="details">
              <EnventDetails event={event} adminView />
            </TabsContent>
            <TabsContent value="tickets">
              <div className="flex flex-col gap-2 mb-10">
                <span className="text-2xl font-bold">
                  Liste des catégories de tickets pour cet évènement
                </span>
                <span>
                  Ici vous pouvez ajouter, modifier ou supprimer des catégories
                  de tickets pour cet évènement
                </span>
              </div>
              <Table className="mb-24 border">
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Catégorie ticket</TableHead>
                    <TableHead>Quantité de tickets</TableHead>
                    <TableHead>Prix du ticket</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tickets.map((ticket, i) => (
                    <TableRow key={ticket.category}>
                      <TableCell className="font-medium">{i + 1}</TableCell>
                      <TableCell className="font-medium">Standard</TableCell>
                      <TableCell className="font-medium">120</TableCell>
                      <TableCell className="font-medium">5 000 XAF</TableCell>
                      <TableCell className="font-medium flex gap-2">
                        <Dialog>
                          <DialogTrigger>
                            <div className="border rounded-full w-10 h-10 flex items-center justify-center">
                              <Pencil size={18} color="#333" />
                            </div>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Modifier ce ticket</DialogTitle>
                              <DialogDescription>
                                Vous êtes sur le point de modifier ce ticket.
                                Cette action est irréversible.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="flex flex-col gap-2 mt-4">
                              <Input placeholder="Catégorie" />
                              <Input placeholder="Quantité" type="number" />
                              <Input placeholder="Prix" type="number" />
                            </div>
                            <div className="flex gap-2 my-4 items-center">
                              <Checkbox />
                              <span className="text-sm">
                                Je confirme vouloir modifier ce ticket
                              </span>
                            </div>
                            <Button>Modifier</Button>
                          </DialogContent>
                        </Dialog>
                        <Dialog>
                          <DialogTrigger>
                            <div className="border rounded-full w-10 h-10 flex items-center justify-center">
                              <Trash size={18} color="#333" />
                            </div>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Voulez-vous vraiment supprimer ce ticket ?
                              </DialogTitle>
                              <DialogDescription>
                                Vous êtes sur le point de supprimer ce ticket.
                                Cette action est irréversible.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="flex gap-2 my-4 items-center">
                              <Checkbox />
                              <span className="text-sm">
                                Je confirme vouloir supprimer ce ticket
                              </span>
                            </div>
                            <Button>Supprimer</Button>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="sold_tickets">
              <div className="flex gap-4">
                <div className="w-1/2 border text-sm p-8 rounded flex flex-col bg-gray-50 shadow-sm justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <span>Montant généré</span>
                      </div>
                      <span className="font-bold text-2xl text-green-700">
                        8 500 XAF
                      </span>
                    </div>
                    <hr className="mt-4" />
                    <div className="flex items-center justify-between">
                      <span>12 Tickets GOLDEN vendus</span>
                      <span> 6000 XAF</span>
                    </div>
                    <hr />
                    <div className="flex items-center justify-between">
                      <span>02 Tickets STANDARD vendus</span>
                      <span>1000 XAF</span>
                    </div>
                    <hr />
                    <div className="flex items-center justify-between">
                      <span>02 Tickets VIP vendus</span>
                      <span>1000 XAF</span>
                    </div>
                    <hr />
                    <div className="flex items-center justify-between">
                      <span>01 Tickets VVIP vendus</span>
                      <span>500 XAF</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Tickets scannés : 0</span>
                    <span>Absents : 0</span>
                  </div>
                </div>
                <div className="w-1/2 border text-sm p-8 rounded flex flex-col bg-gray-50 shadow-sm gap-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <span>Montant déjà payé</span>
                    </div>
                    <span className="font-bold text-2xl text-red-600">
                      5 000 XAF
                    </span>
                  </div>
                  <hr className="mt-4" />
                  <div className="flex justify-between items-center">
                    <div>
                      <span>Montant restant</span>
                    </div>
                    <span className="font-bold text-2xl text-blue-800">
                      3 500 XAF
                    </span>
                  </div>
                  <hr className="mt-4" />
                  <div className="flex flex-col gap-2 mb-4">
                    <span className="font-semibold">Procéder au paiement</span>
                    <span className="text-sm">
                      Le virement sera éffectué sur le portefeuille electronique
                      de l&apos;organisateur de l&apos;évènement
                    </span>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full">Payer maintenant</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          Payer l&apos;organisateur d&apos;évènement
                        </DialogTitle>
                        <DialogDescription>
                          Vous êtes sur le point de payer cet organisateur
                          d&apos;évènement
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex flex-col gap-2 mt-4">
                        <Input
                          placeholder="Montant à payer"
                          type="number"
                          max={3500}
                        />
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Opérateur" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="accepted">Airtel</SelectItem>
                            <SelectItem value="pending">MTN</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex gap-2 my-4 items-center">
                        <Checkbox />
                        <span className="text-sm">
                          Je confirme vouloir payer l&apos;organisateur de cet
                          évènement
                        </span>
                      </div>
                      <Button>Payer maintenant</Button>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <Table className="mb-24 mt-10 border rounded">
                <TableHeader>
                  <TableRow>
                    <TableHead className="py-4">#</TableHead>
                    <TableHead>Acheteur</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Prix</TableHead>
                    <TableHead>Date de vente</TableHead>
                    <TableHead>Scanné</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {event.attributes.tickets_generated?.data.map((ticket, i) => (
                    <TableRow key={ticket.id}>
                      <TableCell className="font-medium">{i + 1}</TableCell>
                      <TableCell className="font-medium">
                        Nom de l&apos;acheteur
                      </TableCell>
                      <TableCell className="font-medium">
                        {ticket.attributes.category}
                      </TableCell>
                      <TableCell className="font-medium">500 XAF</TableCell>
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
            <TabsContent value="invitations">
              <div className="flex flex-col gap-2 mb-10">
                <span className="text-2xl font-bold">
                  Liste d&apos;invitations de cet évènement
                </span>
                <span>
                  Ici vous pouvez ajouter, modifier ou supprimer des invitations
                </span>
              </div>
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
                  {invitations.map((invitation) => (
                    <TableRow key={invitation.code}>
                      <TableCell className="font-medium">
                        {invitation.name}
                      </TableCell>
                      <TableCell>{invitation.code}</TableCell>
                      <TableCell>{invitation.status}</TableCell>
                      <TableCell>
                        <ol>
                          {invitation.tickets.map((ticket) => (
                            <li key={ticket}>{ticket}</li>
                          ))}
                        </ol>
                      </TableCell>
                      <TableCell>
                        {invitation.scanned ? "Déjà" : "Pas encore"}
                      </TableCell>
                      <TableCell className="font-medium flex gap-2">
                        <Dialog>
                          <DialogTrigger>
                            <div className="border rounded-full w-10 h-10 flex items-center justify-center">
                              <Pencil size={18} color="#333" />
                            </div>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Modifier cette invitation
                              </DialogTitle>
                              <DialogDescription>
                                Vous êtes sur le point de modifier ce ticket.
                                Cette action est irréversible.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="flex flex-col gap-2 mt-4">
                              <Input placeholder="Personne invitée" />
                              <Input placeholder="Code" type="number" />
                              <Select>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Acceptée" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="accepted">
                                    Acceptée
                                  </SelectItem>
                                  <SelectItem value="pending">
                                    En attente
                                  </SelectItem>
                                  <SelectItem value="rejected">
                                    Rejeté
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <Select>
                                <SelectContent>
                                  <SelectItem value="scanned">
                                    Déjà scannée
                                  </SelectItem>
                                  <SelectItem value="pending">
                                    Pas encore
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="flex gap-2 my-4 items-center">
                              <Checkbox />
                              <span className="text-sm">
                                Je confirme vouloir modifier ces informations
                              </span>
                            </div>
                            <Button>Modifier</Button>
                          </DialogContent>
                        </Dialog>
                        <Dialog>
                          <DialogTrigger>
                            <div className="border rounded-full w-10 h-10 flex items-center justify-center">
                              <Trash size={18} color="#333" />
                            </div>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Voulez-vous vraiment supprimer cette invitation
                                ?
                              </DialogTitle>
                              <DialogDescription>
                                Vous êtes sur le point de supprimer ce ticket.
                                Cette action est irréversible.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="flex gap-2 my-4 items-center">
                              <Checkbox />
                              <span className="text-sm">
                                Je confirme vouloir supprimer cette invitation
                              </span>
                            </div>
                            <Button>Supprimer</Button>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="tables">
              <div className="flex flex-col gap-2 mb-10">
                <span className="text-2xl font-bold">
                  Liste de tables pour cet évènement
                </span>
                <span>
                  Ici vous pouvez ajouter, modifier ou supprimer des tables pour
                  cet évènement
                </span>
              </div>
              <Table className="mb-24">
                <TableHeader>
                  <TableRow>
                    <TableHead>Désignation</TableHead>
                    <TableHead>Personnes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Table 1</TableCell>
                    <TableCell className="font-medium flex flex-col">
                      <ol className="list-decimal">
                        <li>Franz OSSETE</li>
                        <li>Inefable KOUMBA</li>
                      </ol>
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger>
                            <div className="border rounded-full w-10 h-10 flex items-center justify-center">
                              <Pencil size={18} color="#333" />
                            </div>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Modifier cette table</DialogTitle>
                              <DialogDescription>
                                Vous êtes sur le point de modifier cette table.
                                Cette action est irréversible.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="flex flex-col gap-2 mt-4">
                              <Input placeholder="Désignation" />
                            </div>
                            <div className="flex gap-2 my-4 items-center">
                              <Checkbox />
                              <span className="text-sm">
                                Je confirme vouloir modifier cette table
                              </span>
                            </div>
                            <Button>Modifier</Button>
                          </DialogContent>
                        </Dialog>
                        <Dialog>
                          <DialogTrigger>
                            <div className="border rounded-full w-10 h-10 flex items-center justify-center">
                              <Trash size={18} color="#333" />
                            </div>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Voulez-vous vraiment supprimer cette table ?
                              </DialogTitle>
                              <DialogDescription>
                                Vous êtes sur le point de supprimer ce ticket.
                                Cette action est irréversible.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="flex gap-2 my-4 items-center">
                              <Checkbox />
                              <span className="text-sm">
                                Je confirme vouloir supprimer cette table
                              </span>
                            </div>
                            <Button>Supprimer</Button>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="settings" className="mb-24">
              <div className="flex flex-col gap-2 mb-10">
                <span className="text-2xl font-bold">
                  Paramètres de cet évènement
                </span>
                <span>
                  Ici vous pouvez modifier les paramètres de cet évènement et le
                  supprimer
                </span>
              </div>
              <div className="flex flex-col gap-4 w-min">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className=" text-white flex items-center justify-center">
                      <ShieldX size={18} color="#ddd" />
                      Suspendre cet évènement
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Voulez-vous vraiment suspendre cet évènement?
                      </DialogTitle>
                      <DialogDescription>
                        Les utilisateurs ne pourront plus acheter de tickets
                        pour cet évènement ni voir les informations de cet
                        évènement.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex gap-2 my-4 items-center">
                      <Checkbox />
                      <span className="text-sm">
                        Je confirme vouloir suspendre cet évènement
                      </span>
                    </div>
                    <Button>Suspendre</Button>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-red-700 hover:bg-red-600 text-white flex items-center justify-center">
                      <Trash size={18} color="#ddd" />
                      Supprimer cet évènement
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Voulez-vous vraiment supprimer cet évènement?
                      </DialogTitle>
                      <DialogDescription>
                        Vous êtes sur le point de supprimer cet évènement.
                        Toutes les données liées à cet évènement seront perdues.
                        Cette action est irréversible
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex gap-2 my-4 items-center">
                      <Checkbox />
                      <span className="text-sm">
                        Je confirme vouloir supprimer cet évènement
                      </span>
                    </div>
                    <Button className="bg-red-700 hover:bg-red-600">
                      Supprimer
                    </Button>
                  </DialogContent>
                </Dialog>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  } catch (_) {
    return null;
  }
}
