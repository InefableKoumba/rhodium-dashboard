import ExportToExcel from "@/components/common/export-to-excel";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowDownToLine,
  Bell,
  CalendarIcon,
  DollarSign,
  Search,
  Users,
} from "lucide-react";
import React from "react";

const events = [
  {
    id: 1,
    name: "Test évènement 1",
    sold_tickets: 240,
    amount: 24000,
    earning: 2400,
  },
  {
    id: 2,
    name: "Test évènement 2",
    sold_tickets: 696,
    amount: 750000,
    earning: 75000,
  },
  {
    id: 3,
    name: "Test évènement 3",
    sold_tickets: 124,
    amount: 41000,
    earning: 4100,
  },
];

export default async function page() {
  return (
    <div className="p-8">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total tickets vendus
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">483</div>
            <p className="text-xs text-muted-foreground">
              Nombre total de tickets vendus
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Chiffre d&apos;affaire
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">534 200 XAF</div>
            <p className="text-xs text-muted-foreground">
              Montant généré par vente de tickets
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bénéfice</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">150 000 XAF</div>
            <p className="text-xs text-muted-foreground">
              Les bénfices de l&apos;entreprise
            </p>
          </CardContent>
        </Card>
      </div>
      <Card className="w-full mt-8">
        <CardHeader>
          <CardTitle>Bénéfices</CardTitle>
          <CardDescription>
            Bénéfices engendré par chaque évènement payant
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-end gap-3 mb-12">
            <div className="relative w-full">
              <div className="absolute right-4 top-2">
                <Search color="#333" />
              </div>
              <Input placeholder="Rechercher un évènement" />
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className="w-[400px] pl-3 text-left font-normal"
                >
                  <span>Date d&apos;adhésion</span>
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" />
              </PopoverContent>
            </Popover>
            <ExportToExcel
              data={events.map((evnt) => ({
                ...evnt,
              }))}
              fileName="Bénéfices"
            >
              <Button>
                <ArrowDownToLine size={36} />
                Exporter
              </Button>
            </ExportToExcel>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom de l&apos;évènement</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Tickets vendus</TableHead>
                <TableHead>Montant généré</TableHead>
                <TableHead>Bénéfices de l&apos;entreprise</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.name}</TableCell>
                  <TableCell className="font-medium">
                    {new Date().toLocaleDateString("fr-Fr", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell>{event.sold_tickets}</TableCell>
                  <TableCell>{event.amount} XAF</TableCell>
                  <TableCell>{event.earning} XAF</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
