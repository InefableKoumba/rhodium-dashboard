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
import { Plus, Trash2 } from "lucide-react";
import Loader from "../loader";
import { deleteAdvertisement } from "@/service/api/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function DeleteAds({ id }: { id: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const deleteAds = async () => {
    try {
      const ok = await deleteAdvertisement(id);

      if (ok) {
        toast("Publicité supprimée avec succès");
        router.refresh();
      } else {
        toast("Erreur lors de la suppression de la publicité");
      }
    } catch (error) {
      console.error(`Error deleting advertisement:`, error);
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
          <DialogTitle>Supprimer la publicité</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir supprimer cette publicité ?
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button
            disabled={isLoading}
            variant="destructive"
            onClick={async () => {
              try {
                setIsLoading(true);
                await deleteAds();
              } catch (error) {
                console.error("Error deleting advertisement:", error);
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
