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
import { Pencil } from "lucide-react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { toast } from "sonner";

export default function UpDateNewsLetterArticleForm({
  articleId,
}: Readonly<{ articleId: number }>) {
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      if (!image) return;

      formData.append("files", image);
      formData.append("articleId", articleId.toString());

      const response = await fetch("/api/update-news-letter-article", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast("Opération résussie");
      } else {
        toast("Opération échouée");
      }
    } catch (error) {
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
      <DialogTrigger>
        <div className="border hover:bg-blue-600 hover:text-white text-gray-800 rounded-full w-10 h-10 flex items-center justify-center">
          <Pencil size={18} />
        </div>
      </DialogTrigger>
      <DialogContent className="bg-gray-100">
        <DialogHeader>
          <DialogTitle>Modifier cette publicité</DialogTitle>
          <DialogDescription>
            Vous êtes sur le point de modifier cette publicité. Cette action est
            irréversible.
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
            Je confirme vouloir modifier cette publicité
          </span>
        </div>
        <Button disabled={!image} onClick={handleSubmit}>
          {isLoading ? (
            <div className="w-4 h-4 animate-spin border border-white border-t-transparent rounded-full" />
          ) : (
            "Modifier"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
