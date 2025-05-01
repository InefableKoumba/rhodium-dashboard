import CalendarRange from "@/components/common/calendarRange";
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
import { Checkbox } from "@/components/ui/checkbox";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAdmin, getAdmins } from "@/lib/actions";
import {
  ArrowDownToLine,
  CalendarIcon,
  Pencil,
  Search,
  Trash,
} from "lucide-react";
import React from "react";

export const dynamic = "force-dynamic";

export default async function page() {
  const { admins } = await getAdmins();
  return (
    <div className="p-8">
      <div className="flex justify-end">
        <Dialog>
          <DialogTrigger>
            <Button>Ajouter un agent</Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-100">
            <DialogHeader>
              <DialogTitle>Ajouter un agent</DialogTitle>
              <DialogDescription>
                Vous êtes sur le point d&apos;ajouter un agent.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-2 mt-4">
              <Input placeholder="Nom de l'agent" />
              <Input placeholder="Email" type="email" />
              <Input placeholder="Téléphone" />
            </div>
            <div className="flex gap-2 my-4 items-center">
              <Checkbox />
              <span className="text-sm">
                Je confirme vouloir ajouter un agent
              </span>
            </div>
            <Button>Modifier</Button>
          </DialogContent>
        </Dialog>
      </div>
      <Card className="w-full mt-8 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-100 rounded-xl shadow">
        <CardHeader>
          <CardTitle>Liste des agents — {admins.length}</CardTitle>
          <CardDescription>Liste de tous les agents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-end gap-3 mb-12">
            <div className="relative w-full">
              <div className="absolute right-4 top-2">
                <Search color="#333" />
              </div>
              <Input placeholder="Rechercher un agent" />
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
                <CalendarRange />
              </PopoverContent>
            </Popover>
            <ExportToExcel
              data={admins.map((admin) => ({
                ...admin,
              }))}
              fileName="agents"
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
                <TableHead>Nom de l&apos;agent</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Date de creation</TableHead>
                <TableHead>Actif</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {admins.map((admin) => (
                <TableRow
                  key={admin.id}
                  className="dark:hover:bg-gray-800 dark:border-gray-800"
                >
                  <TableCell className="font-medium">
                    {admin.firstname} {admin.lastname}
                  </TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>
                    {new Date().toLocaleDateString("fr-FR", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
                    <Switch defaultChecked={admin.isActive} />
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex gap-3 items-center">
                      <Dialog>
                        <DialogTrigger>
                          <div className="border hover:bg-blue-600 hover:text-white text-gray-800 rounded-full w-10 h-10 flex items-center justify-center">
                            <Pencil size={18} />
                          </div>
                        </DialogTrigger>
                        <DialogContent className="bg-gray-100">
                          <DialogHeader>
                            <DialogTitle>Modifier cet agent</DialogTitle>
                            <DialogDescription>
                              Vous êtes sur le point de modifier cet agent.
                              Cette action est irréversible.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="flex flex-col gap-2 mt-4">
                            <Input placeholder="Nom de l'agent" />
                            <Input placeholder="Email" type="email" />
                            <Input placeholder="Téléphone" />
                          </div>
                          <div className="flex gap-2 my-4 items-center">
                            <Checkbox />
                            <span className="text-sm">
                              Je confirme vouloir modifier cet agent
                            </span>
                          </div>
                          <Button>Modifier</Button>
                        </DialogContent>
                      </Dialog>
                      <Dialog>
                        <DialogTrigger>
                          <div className="border hover:bg-red-600 text-gray-800 hover:text-white rounded-full w-10 h-10 flex items-center justify-center">
                            <Trash size={18} />
                          </div>
                        </DialogTrigger>
                        <DialogContent className="bg-gray-100">
                          <DialogHeader>
                            <DialogTitle>
                              Voulez-vous vraiment supprimer cet agent ?
                            </DialogTitle>
                            <DialogDescription>
                              Vous êtes sur le point de supprimer cet agent.
                              Cette action est irréversible.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="flex gap-2 my-4 items-center">
                            <Checkbox />
                            <span className="text-sm">
                              Je confirme vouloir supprimer cet agent
                            </span>
                          </div>
                          <Button>Supprimer</Button>
                        </DialogContent>
                      </Dialog>
                    </div>
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
