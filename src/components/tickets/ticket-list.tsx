import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Ticket, TicketStatus } from "@/types/types";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { QrCode } from "lucide-react";

interface TicketListProps {
  tickets: Ticket[];
}

const statusColors = {
  [TicketStatus.PENDING]: "bg-yellow-500",
  [TicketStatus.CONFIRMED]: "bg-green-500",
  [TicketStatus.CANCELLED]: "bg-red-500",
  [TicketStatus.DELETED_BY_USER]: "bg-red-500",
};

export function TicketList({ tickets }: TicketListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Tickets</CardTitle>
        <CardDescription>
          View your event tickets and their status
        </CardDescription>
      </CardHeader>
      <CardContent>
        {tickets.length === 0 ? (
          <p className="text-center text-gray-500 py-4">No tickets found</p>
        ) : (
          tickets.map((ticket) => (
            <Card key={ticket.id} className="mb-4">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{ticket.event?.title}</h3>
                    <p className="text-sm text-gray-500">
                      Type: {ticket.ticketType?.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Purchase Date: {format(new Date(ticket.createdAt), "PPP")}
                    </p>
                    {ticket.scannedAt && (
                      <p className="text-sm text-gray-500">
                        Scanned: {format(new Date(ticket.scannedAt), "PPP")}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className={statusColors[ticket.status]}>
                      {ticket.status}
                    </Badge>
                    {ticket.scanned && (
                      <Badge variant="outline" className="flex gap-1">
                        <QrCode className="h-4 w-4" />
                        Scanned
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </CardContent>
    </Card>
  );
}
