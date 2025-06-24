import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit2 } from "lucide-react";
import { getCreditPacks } from "@/lib/actions";
import AddCreditPack from "@/components/modals/add-credit-pack";
import EditCreditPack from "@/components/modals/edit-credit-pack";
import DeleteCreditPack from "@/components/modals/delete-credit-pack";
export default async function SettingsPage() {
  const creditPacks = await getCreditPacks();
  return (
    <div className="p-8 space-y-8">
      <div className="grid gap-8">
        {/* Sponsorship Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Paramètres de parrainage</CardTitle>
            <CardDescription>
              Configurez les paramètres liés au système de parrainage
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">
                  Prix du parrainage
                </label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Prix du parrainage"
                    defaultValue="100"
                    className="max-w-xs"
                  />
                  <Button>Sauvegarder</Button>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">
                  % de commission sur tickets vendus
                </label>
                <div className="flex gap-2">
                  <Input type="number" defaultValue={10} className="max-w-xs" />
                  <Button>Sauvegarder</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Credit Packs Management */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Lots de crédits</CardTitle>
              <CardDescription>
                Gérez les différents lots de crédits disponibles
              </CardDescription>
            </div>
            <AddCreditPack />
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Crédits</TableHead>
                  <TableHead>Prix</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Date de création</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {creditPacks.map((pack) => (
                  <TableRow key={pack.id}>
                    <TableCell>{pack.name}</TableCell>
                    <TableCell>{pack.credits}</TableCell>
                    <TableCell>{pack.price} XAF</TableCell>
                    <TableCell>
                      <Badge
                        variant={pack.isActive ? "default" : "secondary"}
                        className={pack.isActive ? "bg-green-500" : ""}
                      >
                        {pack.isActive ? "Actif" : "Inactif"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(pack.createdAt).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <EditCreditPack pack={pack} />
                        <DeleteCreditPack id={pack.id} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
