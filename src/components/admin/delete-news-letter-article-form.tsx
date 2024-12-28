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
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Trash } from "lucide-react";

export default function DeleteNewsLetterArticleForm({
  articleId,
}: Readonly<{ articleId: number }>) {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("articleId", articleId.toString());

      setIsLoading(true);
      const response = await fetch("/api/delete-news-letter-article", {
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
      <DialogTrigger>
        <div className="border hover:bg-red-600 text-gray-800 hover:text-white rounded-full w-10 h-10 flex items-center justify-center">
          <Trash size={18} />
        </div>
      </DialogTrigger>
      <DialogContent className="bg-gray-100">
        <DialogHeader>
          <DialogTitle>
            Voulez-vous vraiment supprimer cette publicité ?
          </DialogTitle>
          <DialogDescription>
            Vous êtes sur le point de supprimer cette publicité. Cette action
            est irréversible.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-2 my-4 items-center">
          <Checkbox />
          <span className="text-sm">
            Je confirme vouloir supprimer cette publicité
          </span>
        </div>
        <Button onClick={handleSubmit}>
          {isLoading ? (
            <div className="w-4 h-4 animate-spin border border-white border-t-transparent rounded-full" />
          ) : (
            "Supprimer"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
