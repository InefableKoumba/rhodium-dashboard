import { Ticket } from "@/types/types";
import React from "react";
import { TableBody } from "../ui/table";
import { TableCell } from "../ui/table";
import { TableHead, TableRow } from "../ui/table";
import { Table, TableHeader } from "../ui/table";
import { Card, CardContent, CardTitle, CardHeader } from "../ui/card";

export default function TicketsTable({ tickets }: { tickets: Ticket[] }) {
  return (
    <div>
      <Card className="w-full mt-8 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-100 rounded-xl shadow">
        <CardHeader>
          <CardTitle>Billets achetés</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="dark:hover:bg-gray-800 dark:border-gray-800">
                <TableHead>#</TableHead>
                <TableHead>Événement</TableHead>
                <TableHead>Type de billet</TableHead>
                <TableHead>Prix (XAF)</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.map((ticket, i) => (
                <TableRow
                  key={ticket.id}
                  className="dark:hover:bg-gray-800 dark:border-gray-800"
                >
                  <TableCell>{i + 1}</TableCell>
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
    </div>
  );
}
