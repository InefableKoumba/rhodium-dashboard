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
import { Plus } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import Loader from "../loader";
import { getPresignedUrl } from "@/service/api/api";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export default function AddAds(ads: {
  id: string;
  name: string;
  image: string;
  video: string;
}) {
  const [mediatType, setMediatType] = useState<"video" | "image">("image");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const uploadFile = async (file: File) => {
    try {
      const key = `${Date.now()}-${file.name}`;
      // Get presigned URL
      const presignedUrl = await getPresignedUrl({
        key,
        contentType: file.type,
      });

      // Upload file to presigned URL
      const response = await fetch(presignedUrl, {
        method: "PUT",
        body: file,
      });

      console.log(response.status);

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      return key;
    } catch (error) {
      console.error(`Error uploading file:`, error);
      throw error;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter une publicité
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nouvelle publicité</DialogTitle>
          <DialogDescription>
            Ajoutez une nouvelle publicité à votre application
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* <div className="grid gap-2">
            <label htmlFor="content" className="text-sm font-medium">
              Contenu
            </label>
            <Textarea
              id="content"
              placeholder="Entrez le contenu de la publicité"
              className="resize-none"
            />
          </div> */}
          <div className="flex justify-between items-center gap-4">
            <button
              className={`w-1/2 h-8 rounded-full flex items-center justify-center ${
                mediatType === "image"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => {
                setFile(null);
                setMediatType("image");
              }}
            >
              Image
            </button>
            <button
              className={`w-1/2 h-8 rounded-full flex items-center justify-center ${
                mediatType === "video"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => {
                setFile(null);
                setMediatType("video");
              }}
            >
              Vidéo
            </button>
          </div>
          {mediatType === "image" && (
            <div className="grid gap-2">
              <label htmlFor="image" className="text-sm font-medium">
                Image
              </label>
              <Input
                disabled={isLoading}
                id="image"
                type="file"
                accept={ACCEPTED_IMAGE_TYPES.join(",")}
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setFile(e.target.files[0]);
                  }
                }}
              />
            </div>
          )}
          {mediatType === "video" && (
            <div className="grid gap-2">
              <label htmlFor="video" className="text-sm font-medium">
                Vidéo
              </label>
              <Input
                disabled={isLoading}
                id="video"
                type="file"
                accept="video/*"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setFile(e.target.files[0]);
                  }
                }}
              />
            </div>
          )}
          <Button
            disabled={isLoading || !file}
            onClick={async () => {
              if (!file) return;
              try {
                setIsLoading(true);
                const key = await uploadFile(file);
                console.log(key);
              } catch (error) {
                console.error("Error uploading file:", error);
              } finally {
                setIsLoading(false);
              }
            }}
          >
            {isLoading ? <Loader /> : "Ajouter"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
