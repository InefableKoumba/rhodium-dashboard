"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { TicketIcon } from "lucide-react";
import { Input } from "../ui/input";
import { use$ } from "@legendapp/state/react";
import { useObservable } from "@legendapp/state/react";
import { createTicketType } from "@/service/api/api";
import { toast } from "sonner";
import Loader from "../loader";

export default function AddTicketTypeModal({ eventId }: { eventId: string }) {
  const formData$ = useObservable({
    name: "",
    price: 0,
    quantity: 1,
    loading: false,
    error: null,
  });
  const formData = use$(formData$);

  const handleSubmit = async () => {
    try {
      formData$.loading.set(true);
      const response = await createTicketType(eventId, {
        name: formData.name,
        price: formData.price,
        maxQuantity: formData.quantity,
      });
      if (response) {
        toast.success("Type de ticket créé avec succès");
      } else {
        toast.error(
          "Une erreur est survenue lors de la création du type de ticket"
        );
      }
    } catch (error) {
      toast.error(
        "Une erreur est survenue lors de la création du type de ticket"
      );
    } finally {
      formData$.loading.set(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <TicketIcon size={16} className="mr-2" />
          Ajouter un type de ticket
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nouveau type de ticket</DialogTitle>
          <DialogDescription>
            Créez un nouveau type de ticket pour cet événement
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Nom du ticket"
            value={formData.name}
            onChange={(e) => formData$.name.set(e.target.value)}
          />
          <Input
            placeholder="Prix"
            type="number"
            value={formData.price}
            onChange={(e) => formData$.price.set(Number(e.target.value))}
          />
          <Input
            placeholder="Quantité maximale"
            type="number"
            value={formData.quantity}
            onChange={(e) => formData$.quantity.set(Number(e.target.value))}
          />
          <Button onClick={handleSubmit} disabled={formData.loading}>
            {formData.loading ? <Loader /> : "Créer"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
