"use client";
import { CreditPack } from "@/types/types";
import { CreateCreditPackInput } from "@/types/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Checkbox } from "../ui/checkbox";
import { Edit2, Plus } from "lucide-react";
import { updateCreditPack } from "@/service/api/api";
import { useRouter } from "next/navigation";
import Loader from "../loader";

export default function EditCreditPack({ pack }: { pack: CreditPack }) {
  const router = useRouter();
  const [isEditingPack, setIsEditingPack] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newPack, setNewPack] = useState<CreateCreditPackInput>({
    name: pack.name,
    credits: pack.credits,
    price: pack.price,
    isActive: pack.isActive,
  });

  const handleEditPack = async () => {
    try {
      setIsLoading(true);
      const ok = await updateCreditPack(pack.id, newPack);
      if (ok) {
        setIsEditingPack(false);
        toast.success("Lot de crédits modifié avec succès");
        router.refresh();
      } else {
        toast.error("Erreur lors de la modification du lot de crédits");
      }
    } catch (error) {
      toast.error("Erreur lors de la modification du lot de crédits");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsEditingPack(true)}
        variant="ghost"
        size="icon"
      >
        <Edit2 className="h-4 w-4" />
      </Button>
      <Dialog open={isEditingPack} onOpenChange={setIsEditingPack}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter un lot de crédits</DialogTitle>
            <DialogDescription>
              Remplissez les informations pour créer un nouveau lot de crédits
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nom du lot</label>
              <Input
                value={newPack.name}
                onChange={(e) =>
                  setNewPack({ ...newPack, name: e.target.value })
                }
                placeholder="Ex: Pack Basique"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Nombre de crédits</label>
              <Input
                type="number"
                value={newPack.credits}
                onChange={(e) =>
                  setNewPack({ ...newPack, credits: parseInt(e.target.value) })
                }
                placeholder="Ex: 100"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Prix</label>
                <Input
                  type="number"
                  value={newPack.price}
                  onChange={(e) =>
                    setNewPack({ ...newPack, price: parseInt(e.target.value) })
                  }
                  placeholder="Ex: 5000"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="active"
                checked={newPack.isActive}
                onCheckedChange={(checked) =>
                  setNewPack({ ...newPack, isActive: checked as boolean })
                }
              />
              <label
                htmlFor="active"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Actif
              </label>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsEditingPack(false)}>
              Annuler
            </Button>
            <Button onClick={handleEditPack} disabled={isLoading}>
              {isLoading ? <Loader /> : "Modifier"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
