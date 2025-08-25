"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Invitation, InvitationStatus } from "@/types/types";
import { Badge } from "@/components/ui/badge";
import { TicketIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface InvitationListProps {
  sentInvitations: Invitation[];
  receivedInvitations: Invitation[];
}

const statusColors = {
  [InvitationStatus.PENDING]: "bg-yellow-500",
  [InvitationStatus.ACCEPTED]: "bg-green-500",
  [InvitationStatus.DECLINED]: "bg-red-500",
};

export function InvitationList({
  sentInvitations,
  receivedInvitations,
}: InvitationListProps) {
  const [activeTab, setActiveTab] = useState("received");

  const renderInvitation = (invitation: Invitation) => (
    <Card key={invitation.id} className="mb-4">
      <CardContent className="pt-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link href={`/events/${invitation.event?.id}`}>
              <Image
                src={
                  process.env.NEXT_PUBLIC_R2_BUCKET_URL +
                  "/" +
                  invitation.event?.coverImageId
                }
                objectFit="cover"
                alt={invitation.event?.title || ""}
                width={160}
                height={160}
                className="w-20 h-20 rounded-full"
              />
            </Link>
            <div>
              <h3 className="font-semibold">
                <Link
                  href={`/events/${invitation.event?.id}`}
                  className="flex items-center gap-2"
                >
                  {invitation.event?.title}
                </Link>
              </h3>
              {invitation.ticket && (
                <h4 className="text-sm flex gap-2 items-center py-2">
                  <TicketIcon className="w-4 h-4" />{" "}
                  {invitation.ticket?.ticketType?.name} -{" "}
                  {invitation.ticket?.ticketType?.price} FCFA
                </h4>
              )}

              <p className="text-sm text-gray-500">
                {new Date(invitation.createdAt).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </p>
            </div>
          </div>
          <Badge className={statusColors[invitation.status]}>
            {invitation.status === InvitationStatus.PENDING
              ? "En attente"
              : invitation.status === InvitationStatus.ACCEPTED
              ? "Acceptée"
              : "Refusée"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invitations</CardTitle>
        <CardDescription>Manage your event invitations</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="received">Reçues</TabsTrigger>
            <TabsTrigger value="sent">Envoyées</TabsTrigger>
          </TabsList>
          <TabsContent value="received">
            {receivedInvitations.length === 0 ? (
              <p className="text-center text-gray-500 py-4">
                Aucune invitation reçue
              </p>
            ) : (
              receivedInvitations.map(renderInvitation)
            )}
          </TabsContent>
          <TabsContent value="sent">
            {sentInvitations.length === 0 ? (
              <p className="text-center text-gray-500 py-4">
                Aucune invitation envoyée
              </p>
            ) : (
              sentInvitations.map(renderInvitation)
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
