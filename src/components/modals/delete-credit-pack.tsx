"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Dialog } from "../ui/dialog";
import { Trash2 } from "lucide-react";
import Loader from "../loader";
import { deleteCreditPack } from "@/service/api/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function DeleteCreditPack({ id }: { id: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDeleteCreditPack = async () => {
    try {
      const ok = await deleteCreditPack(id);

      if (ok) {
        toast("Paquet de crédits supprimé avec succès");
        router.refresh();
      } else {
        toast("Erreur lors de la suppression du paquet de crédits");
      }
    } catch (error) {
      console.error(`Error deleting credit pack:`, error);
      throw error;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Supprimer le paquet de crédits</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir supprimer ce paquet de crédits ?
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button
            disabled={isLoading}
            variant="destructive"
            onClick={async () => {
              try {
                setIsLoading(true);
                await handleDeleteCreditPack();
              } catch (error) {
                console.error("Error deleting credit pack:", error);
              } finally {
                setIsLoading(false);
              }
            }}
          >
            {isLoading ? <Loader /> : "Supprimer"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
