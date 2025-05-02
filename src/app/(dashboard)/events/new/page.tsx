"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createEvent } from "@/lib/actions";
import { EventCategory, TicketType } from "@/types/types";
import { CalendarIcon, Plus, Trash2, Upload } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { DateTimePicker24h } from "@/components/date-picker-with-time";
interface TicketTypeForm {
  name: string;
  price: number;
  maxQuantity: number;
}

export default function NewEventPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startsAt: new Date(),
    endsAt: new Date(),
    city: "",
    location: "",
    isPrivate: false,
    isFree: false,
    categories: [EventCategory.OTHER],
  });
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);
  const [ticketTypes, setTicketTypes] = useState<TicketTypeForm[]>([
    { name: "", price: 0, maxQuantity: 0 },
  ]);
  const { data: session } = useSession();
  const getPresignedUrl = async (key: string, contentType: string) => {
    const response = await fetch("/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ key, contentType }),
    });

    if (!response.ok) {
      throw new Error("Failed to get presigned URL");
    }

    const data = await response.json();
    return data.url;
  };

  const uploadFile = async (file: File) => {
    try {
      const key = `${Date.now()}-${file.name}`;
      // Get presigned URL
      const presignedUrl = await getPresignedUrl(key, file.type);

      // Upload file to presigned URL
      const response = await fetch(presignedUrl, {
        method: "PUT",
        body: file,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      return key;
    } catch (error) {
      console.error(`Error uploading file:`, error);
      throw error;
    }
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImage(e.target.files[0]);
    }
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideo(e.target.files[0]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const addTicketType = () => {
    setTicketTypes([...ticketTypes, { name: "", price: 0, maxQuantity: 0 }]);
  };

  const removeTicketType = (index: number) => {
    setTicketTypes(ticketTypes.filter((_, i) => i !== index));
  };

  const updateTicketType = (
    index: number,
    field: keyof TicketTypeForm,
    value: string | number
  ) => {
    const newTicketTypes = [...ticketTypes];
    newTicketTypes[index] = {
      ...newTicketTypes[index],
      [field]: value,
    };
    setTicketTypes(newTicketTypes);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Upload files if they exist
      const uploadPromises: Promise<void>[] = [];
      let coverImageId: string | undefined;
      let imageIds: string[] = [];
      let videoId: string | undefined;

      if (coverImage) {
        coverImageId = await uploadFile(coverImage);
      }

      if (images.length > 0) {
        uploadPromises.push(
          Promise.all(images.map((image) => uploadFile(image))).then((keys) => {
            imageIds = keys;
          })
        );
      }

      if (video) {
        uploadPromises.push(
          uploadFile(video).then((key) => {
            videoId = key;
          })
        );
      }

      // Wait for all uploads to complete
      await Promise.all(uploadPromises);

      // Create the event
      const success = await createEvent({
        ...formData,
        coverImageId,
        imageIds,
        videoId,
        categories: [formData.categories[0]],
        ticketTypes: formData.isFree
          ? undefined
          : ticketTypes.map((ticket) => ({
              name: ticket.name,
              price: ticket.price,
              maxQuantity: ticket.maxQuantity,
            })),
      });

      if (success) {
        toast.success("Évènement créé avec succès");
        router.push("/events");
      } else {
        toast.error("Erreur lors de la création de l'évènement");
      }
    } catch (error) {
      toast.error("Erreur lors de la création de l'évènement");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Créer un nouvel évènement
        </h1>
        <p className="text-sm text-muted-foreground">
          Remplissez les informations de votre évènement
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Titre</label>
            <Input
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Titre de l'évènement"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Ville</label>
            <Input
              required
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              placeholder="Ville de l'évènement"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Catégorie</label>
            <Select
              value={formData.categories[0]}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  categories: [value as EventCategory],
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(EventCategory).map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Image de couverture</label>
            <div className="flex items-center gap-2">
              <Input
                required
                type="file"
                accept="image/*"
                onChange={handleCoverImageChange}
                className="cursor-pointer"
              />
              {coverImage && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setCoverImage(null)}
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
            {coverImage && (
              <p className="text-sm text-muted-foreground">{coverImage.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Vidéo</label>
            <div className="flex items-center gap-2">
              <Input
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                className="cursor-pointer"
              />
              {video && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setVideo(null)}
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
            {video && (
              <p className="text-sm text-muted-foreground">{video.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Date de début</label>
            <DateTimePicker24h
              onSelect={(date: Date) =>
                setFormData({ ...formData, startsAt: date })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Date de fin</label>
            <DateTimePicker24h
              onSelect={(date: Date) =>
                setFormData({ ...formData, endsAt: date })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Lieu</label>
            <Input
              required
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              placeholder="Lieu de l'évènement"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Images supplémentaires</label>
          <div className="flex items-center gap-2">
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImagesChange}
              className="cursor-pointer"
            />
          </div>
          {images.length > 0 && (
            <div className="space-y-2">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 border rounded"
                >
                  <p className="text-sm">{image.name}</p>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeImage(index)}
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <Textarea
            required
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Description détaillée de l'évènement"
            className="min-h-[150px]"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              id="isPrivate"
              type="checkbox"
              onChange={(e) =>
                setFormData({ ...formData, isPrivate: e.target.checked })
              }
            />
            <label htmlFor="isPrivate" className="text-sm font-medium">
              Évènement privé
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isFree"
              onChange={(e) =>
                setFormData({ ...formData, isFree: e.target.checked })
              }
            />
            <label htmlFor="isFree" className="text-sm font-medium">
              Évènement gratuit
            </label>
          </div>

          {!formData.isFree && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Types de billets</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addTicketType}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter un type
                </Button>
              </div>

              <div className="space-y-4">
                {ticketTypes.map((ticket, index) => (
                  <div
                    key={index}
                    className="grid gap-4 p-4 border rounded-lg md:grid-cols-3"
                  >
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Nom</label>
                      <Input
                        value={ticket.name}
                        onChange={(e) =>
                          updateTicketType(index, "name", e.target.value)
                        }
                        placeholder="Standard, VIP, etc."
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Prix (XAF)</label>
                      <Input
                        type="number"
                        value={ticket.price}
                        onChange={(e) =>
                          updateTicketType(
                            index,
                            "price",
                            parseFloat(e.target.value)
                          )
                        }
                        placeholder="Prix"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Quantité max
                      </label>
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          value={ticket.maxQuantity}
                          onChange={(e) =>
                            updateTicketType(
                              index,
                              "maxQuantity",
                              parseInt(e.target.value)
                            )
                          }
                          placeholder="Quantité"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeTicketType(index)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isLoading}
          >
            Annuler
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Création..." : "Créer l'évènement"}
          </Button>
        </div>
      </form>
    </div>
  );
}
