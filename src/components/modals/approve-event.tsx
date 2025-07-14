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
import { Shield } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { use$, useObservable } from "@legendapp/state/react";
import { approveEvent } from "@/service/api/api";
import Loader from "../loader";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ApproveEventModal({ eventId }: { eventId: string }) {
  const formData$ = useObservable({
    confirmed: false,
    loading: false,
    notifyUsers: false,
  });
  const formData = use$(formData$);
  const router = useRouter();
  const handleSubmit = async () => {
    try {
      formData$.loading.set(true);
      const ok = await approveEvent(eventId, formData.notifyUsers);
      if (ok) {
        router.refresh();
        toast.success("L'événement a été approuvé avec succès");
      } else {
        toast.error(
          "Une erreur est survenue lors de l'approbation de l'événement"
        );
      }
    } catch (error) {
      toast.error(
        "Une erreur est survenue lors de l'approbation de l'événement"
      );
    } finally {
      formData$.loading.set(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Shield size={16} className="mr-2" />
          Approuver
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Approuver cet événement</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir approuver cet événement ?
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <Checkbox
            id="confirm"
            checked={formData.notifyUsers}
            onCheckedChange={(checked) =>
              formData$.notifyUsers.set(checked as boolean)
            }
            className="h-5 w-5"
          />
          <span className="text-sm">
            Notifier les utilisateurs de cet événement
          </span>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <Checkbox
            id="confirm"
            checked={formData.confirmed}
            onCheckedChange={(checked) =>
              formData$.confirmed.set(checked as boolean)
            }
            className="h-5 w-5"
          />
          <span className="text-sm">
            Je confirme vouloir approuver cet événement
          </span>
        </div>
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={formData.loading || !formData.confirmed}
        >
          {formData.loading ? <Loader /> : "Approuver"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
