import CalendarRange from "@/components/common/calendarRange";
import ExportToExcel from "@/components/common/export-to-excel";
import { Button } from "@/components/ui/button";
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
import {
  ArrowDownToLine,
  DollarSign,
  CalendarIcon,
  Search,
  Users,
  Ticket,
} from "lucide-react";
import React from "react";

export const dynamic = "force-dynamic";

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
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="dark:bg-gray-900 dark:border-gray-800 dark:text-gray-100 rounded-xl shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Chiffre d&apos;affaire
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1 068 400 XAF</div>
            <p className="text-xs text-muted-foreground">
              Montant généré par vente de tickets et achat de lot
              d&apos;invitaions
            </p>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-900 dark:border-gray-800 dark:text-gray-100 rounded-xl shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bénéfice</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <span className="font-bold text-2xl">292 500 XAF</span>
              <span className="text-red-600 font-medium text-sm">
                (300 000 XAF - 7 500 XAF)
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Les bénfices de l&apos;entreprise{" "}
              <span className="text-red-600 font-medium">
                (-2.5% commissions)
              </span>
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-4 mt-4">
        <Card className="dark:bg-gray-900 dark:border-gray-800 dark:text-gray-100 rounded-xl shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total évènements publics
            </CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">53</div>
            <p className="text-xs text-muted-foreground">
              Evènements publics ayant généré des bénéfices
            </p>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-900 dark:border-gray-800 dark:text-gray-100 rounded-xl shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total tickets vendus
            </CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">483</div>
            <p className="text-xs text-muted-foreground">
              Nombre total de tickets vendus
            </p>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-900 dark:border-gray-800 dark:text-gray-100 rounded-xl shadow">
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
        <Card className="dark:bg-gray-900 dark:border-gray-800 dark:text-gray-100 rounded-xl shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bénéfice</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">150 000 XAF</div>
            <p className="text-xs text-muted-foreground">
              Les bénfices de l&apos;entreprise
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-4 mt-4">
        <Card className="dark:bg-gray-900 dark:border-gray-800 dark:text-gray-100 rounded-xl shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total évènements privés
            </CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">17</div>
            <p className="text-xs text-muted-foreground">
              Evènements privés ayant généré des bénéfices
            </p>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-900 dark:border-gray-800 dark:text-gray-100 rounded-xl shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total invitations vendues
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">483</div>
            <p className="text-xs text-muted-foreground">
              Nombre total d&apos;invitations vendues
            </p>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-900 dark:border-gray-800 dark:text-gray-100 rounded-xl shadow">
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
        <Card className="dark:bg-gray-900 dark:border-gray-800 dark:text-gray-100 rounded-xl shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bénéfice</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">150 000 XAF</div>
            <p className="text-xs text-muted-foreground">
              Les bénfices de l&apos;entreprise
            </p>
          </CardContent>
        </Card>
      </div>
      <Card className="w-full mt-8 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-100 rounded-xl shadow">
        <CardHeader>
          <CardTitle>Détails</CardTitle>
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
            <Select>
              <SelectTrigger className="w-[600px]">
                <SelectValue placeholder="Tous les évènements" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="agent_1">Tous les évènements</SelectItem>
                <SelectItem value="agent_1">Privés</SelectItem>
                <SelectItem value="agent_2">Publics</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[600px]">
                <SelectValue placeholder="Achat de tickets et lot d'invitations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="agent_1">
                  Achat tickets et lot d&apos;invitations
                </SelectItem>
                <SelectItem value="agent_1">Achat de tickets</SelectItem>
                <SelectItem value="agent_2">
                  Achat de lot d&apos;invitations
                </SelectItem>
              </SelectContent>
            </Select>
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
                <CalendarRange />
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
              <TableRow className="dark:hover:bg-gray-800 dark:border-gray-800">
                <TableHead>#</TableHead>
                <TableHead>Nom de l&apos;évènement</TableHead>
                <TableHead>Accès</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Tickets vendus</TableHead>
                <TableHead>Invitations vendus</TableHead>
                <TableHead>Montant généré</TableHead>
                <TableHead>Bénéfices</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event, i) => (
                <TableRow key={event.id} className="dark:hover:bg-gray-800 dark:border-gray-800">
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{event.name}</TableCell>
                  <TableCell>
                    <div className="border rounded-full flex items-center justify-center px-2 py-1">
                      Public
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date().toLocaleDateString("fr-Fr", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell>{event.sold_tickets}</TableCell>
                  <TableCell>0</TableCell>
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
