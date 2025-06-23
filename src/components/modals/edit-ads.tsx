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
import { CalendarIcon, Pen, Plus } from "lucide-react";
import { Input } from "../ui/input";
import Loader from "../loader";
import { updateAdvertisement } from "@/service/api/api";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function EditAd(ads: {
  id: string;
  title: string;
  content: string;
  expiresAt: Date;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(ads.title);
  const [content, setContent] = useState(ads.content);
  const [expiresAt, setExpiresAt] = useState(new Date(ads.expiresAt));
  const router = useRouter();

  const updateAd = async () => {
    try {
      const ok = await updateAdvertisement(ads.id, {
        content,
        title,
        expiresAt,
      });

      if (!ok) {
        throw new Error("Failed to upload file");
      }

      if (ok) {
        toast("Publicité modifiée avec succès");
        router.refresh();
      } else {
        toast("Erreur lors de la modification de la publicité");
      }
    } catch (error) {
      console.error(`Error uploading file:`, error);
      throw error;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Pen className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Nouvelle publicité</DialogTitle>
          <DialogDescription>
            Ajoutez une nouvelle publicité à votre application
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="title" className="text-sm font-medium">
              Titre
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Entrez le titre de la publicité"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="date" className="text-sm font-medium">
              Date d'expiration
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !expiresAt && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {expiresAt.toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Calendar
                  initialFocus
                  mode="single"
                  defaultMonth={expiresAt}
                  selected={expiresAt}
                  onSelect={(day) => {
                    if (day) {
                      setExpiresAt(day);
                    }
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid gap-2">
            <label htmlFor="content" className="text-sm font-medium">
              Contenu
            </label>
            <Textarea
              id="content"
              value={content}
              rows={10}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Entrez le contenu de la publicité"
              className="resize-none"
            />
          </div>
          <Button
            disabled={isLoading}
            onClick={async () => {
              try {
                setIsLoading(true);
                await updateAd();
              } catch (error) {
                console.error("Error uploading file:", error);
              } finally {
                setIsLoading(false);
              }
            }}
          >
            {isLoading ? <Loader /> : "Modifier"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
