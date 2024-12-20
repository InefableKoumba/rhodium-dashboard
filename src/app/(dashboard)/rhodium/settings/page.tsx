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
  Pencil,
  Search,
  Trash,
  Users,
} from "lucide-react";
import React from "react";

export default async function page() {
  return (
    <div className="p-8">
      <div className="2xl:w-1/2 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <span className="font-medium text-sm">Prix du parrainage</span>
          <Input
            type="number"
            placeholder="Prix du parrainage"
            defaultValue={100}
          />
          <span className="text-sm mt-4">
            <span className="font-bold">NB:</span> Si vous modifiez le prix du
            parrainage, le nouveau montant ne sera considéré que pour les
            parrainages éffectués après cette modification.
          </span>
        </div>
        <div className="flex flex-col gap-2 mt-8">
          <span className="font-medium text-sm">
            % de commission sur tickets vendus
          </span>
          <Input type="number" placeholder="10%" defaultValue={10} />
          <span className="text-sm mt-4">
            <span className="font-bold">NB:</span> Si vous modifiez le % des
            commissions sur les tickets vendus, le nouveau pourcentage ne sera
            appliqué qu&apos;aux évènements créés après cette modification.
          </span>
        </div>
        <div>
          <Dialog>
            <DialogTrigger>
              <Button>Enregistrer</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Voulez-vous vraiment apporter enregistrer ?
                </DialogTitle>
                <DialogDescription>
                  Vous êtes sur le point de modifier des configurations
                  importantes de l&apos;application. Assurez-vous d&apos;avoir
                  renseigner des informations correctes.
                </DialogDescription>
              </DialogHeader>
              <div className="flex gap-2 my-4 items-center">
                <Checkbox />
                <span className="text-sm">
                  Je confirme vouloir apporter ces modifcations
                </span>
              </div>
              <Button>Enregistrer</Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
