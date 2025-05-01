"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { toast } from "sonner";

export default function AddNewsLetterArticleForm() {
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      if (!image) return;

      formData.append("files", image);
      setIsLoading(true);
      const response = await fetch("/api/add-news-letter-article", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast("Opération résussie");
      } else {
        toast("Opération échouée");
      }
    } catch (error) {
      toast("Opération échouée");
    } finally {
      setIsModalOpen(false);
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={() => setIsModalOpen(!isModalOpen)}
    >
      <DialogTrigger asChild>
        <Button>Ajouter une publicité</Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-100">
        <DialogHeader>
          <DialogTitle>Ajouter une publicité</DialogTitle>
          <DialogDescription>
            Vous êtes sur le point d&apos;ajouter une publicité. Cette action
            est irréversible.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 mt-4">
          <Input
            onChange={(e) =>
              setImage(e.target.files ? e.target.files[0] : null)
            }
            name="files"
            accept="image/*"
            type="file"
            placeholder="Image"
          />
          <Input placeholder="Désignation" />
          <Textarea placeholder="Description de la publicité" />
        </div>
        <div className="flex gap-2 my-4 items-center">
          <Checkbox />
          <span className="text-sm">
            Je confirme vouloir ajouter cette publicité
          </span>
        </div>
        <Button onClick={handleSubmit}>
          {isLoading ? (
            <div className="w-4 h-4 animate-spin border border-white border-t-transparent rounded-full" />
          ) : (
            "Ajouter"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
