"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Loader, Trash } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { use$ } from "@legendapp/state/react";
import { useObservable } from "@legendapp/state/react";
import { deleteEvent } from "@/service/api/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function DeleteEventModal({ eventId }: { eventId: string }) {
  const formData$ = useObservable({
    confirmed: false,
    loading: false,
    reason: "",
  });
  const formData = use$(formData$);
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      formData$.loading.set(true);
      const statusCode = await deleteEvent(eventId, formData.reason);
      if (statusCode === 200) {
        router.push("/events");
        toast.success("L'événement a été supprimé avec succès");
      } else if (statusCode === 403) {
        toast.error(
          "Cet évenement ne peut pas être supprimé car il contient des tickets déjà vendus ou en attente de paiement"
        );
      } else {
        toast.error(
          "Une erreur est survenue lors de la suppression de l'événement"
        );
      }
    } catch (error) {
      toast.error(
        "Une erreur est survenue lors de la suppression de l'événement"
      );
    } finally {
      formData$.loading.set(false);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <Trash size={16} className="mr-2" />
          Supprimer
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Supprimer cet événement</DialogTitle>
          <DialogDescription>
            Veuillez fournir une raison pour la suppression de cet événement.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="Raison de la suppression"
            value={formData.reason}
            onChange={(e) => formData$.reason.set(e.target.value)}
          />
          <div className="flex items-center gap-2">
            <Checkbox
              id="confirm"
              checked={formData.confirmed}
              onCheckedChange={(checked) =>
                formData$.confirmed.set(checked as boolean)
              }
            />
            <label htmlFor="confirm" className="text-sm">
              Je confirme vouloir supprimer cet événement
            </label>
          </div>
          <Button
            type="button"
            variant="destructive"
            className="w-full"
            onClick={handleSubmit}
            disabled={formData.loading || !formData.confirmed}
          >
            {formData.loading ? <Loader /> : "Supprimer"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
