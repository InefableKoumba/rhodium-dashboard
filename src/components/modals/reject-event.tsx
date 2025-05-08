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
import { Loader, Shield } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { use$ } from "@legendapp/state/react";
import { useObservable } from "@legendapp/state/react";
import { rejectEvent } from "@/service/api/api";
import { toast } from "sonner";

export default function ApproveEventModal({ eventId }: { eventId: string }) {
  const formData$ = useObservable({
    confirmed: false,
    loading: false,
    reason: "",
  });
  const formData = use$(formData$);

  const handleSubmit = async () => {
    try {
      formData$.loading.set(true);
      const ok = await rejectEvent(eventId, formData.reason);
      if (ok) {
        window.location.reload();
      }
    } catch (error) {
      toast.error("Une erreur est survenue lors du rejet de l'événement");
    } finally {
      formData$.loading.set(false);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <Shield size={16} className="mr-2" />
          Rejeter
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rejeter cet événement</DialogTitle>
          <DialogDescription>
            Veuillez fournir une raison pour le rejet de cet événement.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="Raison du rejet"
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
              Je confirme vouloir rejeter cet événement
            </label>
          </div>
          <Button
            type="button"
            variant="destructive"
            className="w-full"
            onClick={handleSubmit}
            disabled={formData.loading || !formData.confirmed}
          >
            {formData.loading ? <Loader /> : "Rejeter"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
