import { Ticket, TicketStatus } from "@/types/types";
import React from "react";
import { TableBody } from "../ui/table";
import { TableCell } from "../ui/table";
import { TableHead, TableRow } from "../ui/table";
import { Table, TableHeader } from "../ui/table";
import { Card, CardContent, CardTitle, CardHeader } from "../ui/card";
import Link from "next/link";
import { Badge } from "../ui/badge";

export default function UserTicketsTable({ tickets }: { tickets: Ticket[] }) {
  const confirmedTickets = tickets.filter(
    (ticket) => ticket.status === TicketStatus.CONFIRMED
  );
  const pendingTickets = tickets.filter(
    (ticket) => ticket.status === TicketStatus.PENDING
  );
  const deletedTickets = tickets.filter(
    (ticket) => ticket.status === TicketStatus.DELETED_BY_USER
  );
  return (
    <div>
      <TableContent
        tickets={confirmedTickets}
        title="Billets achetés ou reçus"
      />
      <TableContent
        tickets={pendingTickets}
        title="Achats de billets non confirmés"
      />
      <TableContent
        tickets={deletedTickets}
        title="Billets supprimés (par l'utilisateur)"
      />
    </div>
  );
}

const TableContent = ({
  tickets,
  title,
}: {
  tickets: Ticket[];
  title: string;
}) => {
  return (
    <Card className="w-full mt-8 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-100 rounded-xl shadow">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="dark:hover:bg-gray-800 dark:border-gray-800">
              <TableHead>#</TableHead>
              <TableHead>Événement</TableHead>
              <TableHead>Type de billet</TableHead>
              <TableHead>Prix (XAF)</TableHead>
              <TableHead>Date d'achat</TableHead>
              <TableHead>Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((ticket, i) => (
              <TableRow
                key={ticket.id}
                className="dark:hover:bg-gray-800 dark:border-gray-800"
              >
                <TableCell>{i + 1}</TableCell>
                <TableCell>
                  <Link
                    href={`/events/${ticket.event?.id}`}
                    className="text-blue-900 hover:underline"
                  >
                    {ticket.event?.title || "-"}
                  </Link>
                </TableCell>
                <TableCell>{ticket.ticketType?.name || "-"}</TableCell>
                <TableCell>
                  {ticket.ticketType?.price?.toLocaleString() || 0} XAF
                </TableCell>
                <TableCell>
                  {new Date(ticket.createdAt).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell>
                  {ticket.scanned ? (
                    <Badge variant="success">Déjà scanné</Badge>
                  ) : (
                    <Badge variant="outline">Non scanné</Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {tickets.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center text-muted-foreground"
                >
                  Aucun billet trouvé.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
