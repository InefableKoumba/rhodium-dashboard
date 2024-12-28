import React from "react";
import { Button } from "@/components/ui/button";
import {
  CalendarFold,
  Mail,
  Phone,
  ShieldBan,
  Trash,
  User,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { EventResponseInterface, UserInterface } from "@/interfaces/interfaces";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UsersList from "@/components/admin/rhopay/users-list";
import UserInfoFormInput from "@/components/admin/rhopay/user-info-form-input";
import EventsTable from "@/components/admin/tables/events-table";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const id = (await params).id;
  const response = await fetch(
    process.env.NEXT_API_URL + "/users/" + id + "?populate=*"
  );
  const user = (await response.json()) as UserInterface;

  const response2 = await fetch(
    process.env.NEXT_API_URL + "/events?populate=*"
  );
  const events = (await response2.json())["data"] as EventResponseInterface[];

  return (
    <div className="p-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/rhopay">Accueil</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/rhopay/users">Utilisateurs</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Inefable</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Tabs defaultValue="profile" className="w-full mt-12">
        <TabsList>
          <TabsTrigger value="profile">Informations personnelles</TabsTrigger>
          <TabsTrigger value="events">Evènements</TabsTrigger>
          <TabsTrigger value="sponsorship">Parrainages</TabsTrigger>
          <TabsTrigger value="settings">paramètres</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <div className="mt-12 rounded flex items-center justify-between gap-4">
            <div>
              <div className="relative w-44 h-44 rounded">
                {user.avatar ? (
                  <Image
                    fill
                    className="rounded-full object-cover"
                    alt="Event creator image"
                    src={process.env.NEXT_STORAGE_BUCKET_URL + user.avatar.url}
                  />
                ) : (
                  <div className="relative w-full h-full rounded bg-gray-200 flex justify-center items-center">
                    <User size={48} />
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2 w-full">
              <span className="font-bold text-2xl">Inefable KOUMBA</span>
              <div className="text-sm font-medium flex gap-4 mt-2">
                <div className="flex gap-3 items-center">
                  <div className="border p-2 rounded-full">
                    <Phone size={20} className="text-gray-500" />
                  </div>
                  <span className="font-light">(+242) 06 880 19 86</span>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="border p-2 rounded-full">
                    <Mail size={20} className="text-gray-500" />
                  </div>
                  <span className="font-light">inefablekoumba@proton.me</span>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="border p-2 rounded-full">
                    <CalendarFold size={20} className="text-gray-500" />
                  </div>
                  <span className="font-light">
                    Membre depuis le 7 Octobre 2024
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-12 w-2/3">
            <UserInfoFormInput
              defaultValue={"KOUMBA"}
              label="Nom"
              type="text"
            />
            <UserInfoFormInput
              defaultValue={"Inefable"}
              label="Prénom"
              type="text"
            />
            <UserInfoFormInput
              defaultValue={"inefablekoumba@proton.me"}
              label="Adresse e-mail"
              type="email"
            />
          </div>
        </TabsContent>
        <TabsContent value="events" className="mt-10">
          <EventsTable
            events={events.map((event) => ({
              id: event.id,
              ...event.attributes,
              coverImage: event.attributes?.coverImage?.data
                ? process.env.NEXT_STORAGE_BUCKET_URL!.concat(
                    event.attributes?.coverImage?.data?.attributes.url
                  )
                : undefined,
              images: event.attributes?.images?.data?.map((image) =>
                process.env.NEXT_STORAGE_BUCKET_URL!.concat(
                  image?.attributes?.url
                )
              ),
              videos: event.attributes?.videos?.data?.map((video) =>
                process.env.NEXT_STORAGE_BUCKET_URL!.concat(
                  video?.attributes?.url
                )
              ),
            }))}
          />
        </TabsContent>
        <TabsContent value="sponsorship">
          <UsersList isSponsorshipList />
        </TabsContent>
        <TabsContent value="settings">
          <div className="mt-12 flex flex-col gap-4 w-min">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="bg-yellow-700 hover:bg-yellow-600">
                  <ShieldBan />
                  Bannir
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Etes-vous sûr de bannir cet utilisateur?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Bannir un utilisateur entraînera la suspension de son
                    compte. Il ne pourra plus se connecter à la plateforme
                    jusqu&apos;à ce que vous le débanniez.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction>Confirmer</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="bg-red-700 hover:bg-red-600">
                  <Trash />
                  Supprimer l&apos;utilisateur
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Etes-vous sûr de supprimer cet utilisateur?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    La suppression d&apos;un utilisateur est irréversible.
                    Toutes ses données seront supprimées.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction>Confirmer</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
