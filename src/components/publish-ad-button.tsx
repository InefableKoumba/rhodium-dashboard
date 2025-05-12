"use client";
import React from "react";
import { Switch } from "./ui/switch";
import { updateAdvertisement } from "@/service/api/api";
import { toast } from "sonner";

export default function PublishAdButton({
  id,
  published,
}: {
  id: string;
  published: boolean;
}) {
  return (
    <Switch
      defaultChecked={published}
      onCheckedChange={async () => {
        const ok = await updateAdvertisement(id, {
          published: !published,
        });
        if (ok) {
          toast.success("Publicité publiée avec succès");
        } else {
          toast.error("Erreur lors de la publication de la publicité");
        }
      }}
    />
  );
}
