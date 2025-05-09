import React from "react";
import { Button } from "@/components/ui/button";
import {
  CalendarFold,
  Mail,
  Phone,
  ShieldBan,
  Trash,
  User2,
  Award,
  CreditCard,
  Users,
  Calendar,
  CheckCircle2,
  XCircle,
  Edit,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Event, User } from "@/types/types";
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
import EventsTable from "@/components/tables/events-table";
import { getEvents, getUser } from "@/lib/actions";
import UsersTable from "@/components/tables/users-table";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const id = (await params).id;
  const user = await getUser(id);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-full">
        Utilisateur non trouvé
      </div>
    );
  }
  const eventsResponse = await getEvents({ organizerId: id });
  const events = eventsResponse.events || [];
  console.log(user);
  // Format dates properly
  const joinDateFormatted = format(user.createdAt, "PPP", { locale: fr });

  // Calculate stats
  const totalEvents = events.length;
  const approvedEvents = events.filter(
    (event) => event.status === "APPROVED"
  ).length;
  const godsonsCount = user.godsons?.length || 0;

  return (
    <div className="p-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/users">Utilisateurs</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{user.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* User Profile Card */}
      <div className="mt-6">
        <Card className="border dark:border-gray-800">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
              <div className="relative w-32 h-32 rounded-full overflow-hidden flex-shrink-0 border-4 border-gray-100 dark:border-gray-800 shadow-md">
                {user.avatar ? (
                  <Image
                    fill
                    className="object-cover"
                    alt={`Photo de profil de ${user.name}`}
                    src={user.avatar}
                  />
                ) : (
                  <div className="relative w-full h-full rounded-full bg-gray-200 dark:bg-gray-700 flex justify-center items-center">
                    <User2
                      size={48}
                      className="text-gray-500 dark:text-gray-400"
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-4 flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                    <div className="flex items-center gap-2 mt-1">
                      {user.isBlocked ? (
                        <Badge variant="destructive">Bloqué</Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-900"
                        >
                          Actif
                        </Badge>
                      )}
                      {user.role === "COMMERCIAL" && (
                        <Badge className="bg-blue-500">Commercial</Badge>
                      )}
                    </div>
                  </div>

                  {/* <div className="flex gap-2 mt-2 md:mt-0">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Edit className="mr-2 h-4 w-4" />
                          Modifier
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Modifier le profil</DialogTitle>
                          <DialogDescription>
                            Mettre à jour les informations de {user.name}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <p className="text-sm text-muted-foreground">
                            Fonctionnalité à implémenter
                          </p>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div> */}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Email
                      </p>
                      <p className="font-medium">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
                      <Phone className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Téléphone
                      </p>
                      <p className="font-medium">
                        {user.phoneNumber || "Non renseigné"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center">
                      <CalendarFold className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Membre depuis
                      </p>
                      <p className="font-medium">{joinDateFormatted}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <Card className="border dark:border-gray-800">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Événements
                </p>
                <p className="text-2xl font-bold">{totalEvents}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border dark:border-gray-800">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Événements approuvés
                </p>
                <p className="text-2xl font-bold">{approvedEvents}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border dark:border-gray-800">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Crédits
                </p>
                <p className="text-2xl font-bold">{user.credits || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border dark:border-gray-800">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Filleuls
                </p>
                <p className="text-2xl font-bold">{godsonsCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="profile" className="w-full mt-8">
        <TabsList className="w-full border-b">
          <TabsTrigger value="profile">Informations</TabsTrigger>
          <TabsTrigger value="events">Événements</TabsTrigger>
          <TabsTrigger value="sponsorship">Parrainages</TabsTrigger>
          <TabsTrigger value="settings">Paramètres</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border dark:border-gray-800">
              <CardHeader>
                <CardTitle>Informations personnelles</CardTitle>
                <CardDescription>Détails du compte utilisateur</CardDescription>
              </CardHeader>
              <CardContent>
                <dl className="space-y-4">
                  <div className="flex flex-col space-y-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Nom complet
                    </dt>
                    <dd>{user.name}</dd>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Email
                    </dt>
                    <dd>{user.email}</dd>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Téléphone
                    </dt>
                    <dd>{user.phoneNumber || "Non renseigné"}</dd>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Rôle
                    </dt>
                    <dd className="flex items-center">
                      {user.role === "COMMERCIAL" ? (
                        <div className="flex items-center">
                          <Award className="h-4 w-4 mr-1 text-blue-500" />
                          Commercial
                        </div>
                      ) : (
                        "Utilisateur"
                      )}
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <Card className="border dark:border-gray-800">
              <CardHeader>
                <CardTitle>Activité</CardTitle>
                <CardDescription>
                  Statistiques et informations d'activité
                </CardDescription>
              </CardHeader>
              <CardContent>
                <dl className="space-y-4">
                  <div className="flex flex-col space-y-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Date d'inscription
                    </dt>
                    <dd>{joinDateFormatted}</dd>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Statut du compte
                    </dt>
                    <dd className="flex items-center">
                      {user.isBlocked ? (
                        <span className="flex items-center text-red-600">
                          <XCircle className="h-4 w-4 mr-1" />
                          Bloqué
                        </span>
                      ) : (
                        <span className="flex items-center text-green-600">
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          Actif
                        </span>
                      )}
                    </dd>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Crédits
                    </dt>
                    <dd>{user.credits || 0} crédits</dd>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Dernière connexion
                    </dt>
                    <dd>Information non disponible</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="events" className="mt-6">
          <Card className="border dark:border-gray-800">
            <CardHeader>
              <CardTitle>Événements ({totalEvents})</CardTitle>
              <CardDescription>
                Liste des événements créés par l'utilisateur
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EventsTable events={events} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sponsorship" className="mt-6">
          <Card className="border dark:border-gray-800">
            <CardHeader>
              <CardTitle>Filleuls ({godsonsCount})</CardTitle>
              <CardDescription>
                Liste des utilisateurs parrainés
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UsersTable users={user.godsons || []} total={godsonsCount} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card className="border dark:border-gray-800">
            <CardHeader>
              <CardTitle>Paramètres du compte</CardTitle>
              <CardDescription>
                Gérer les paramètres de l'utilisateur
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <h3 className="text-lg font-medium">
                    Actions administratives
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Ces actions affecteront l'accès de l'utilisateur à la
                    plateforme.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  {user.isBlocked ? (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="border-green-200 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800 dark:border-green-900 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/30"
                        >
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Débloquer le compte
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Débloquer cet utilisateur ?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Débloquer l'utilisateur lui permettra de se
                            reconnecter et d'utiliser la plateforme normalement.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annuler</AlertDialogCancel>
                          <AlertDialogAction className="bg-green-600 hover:bg-green-700">
                            Confirmer
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  ) : (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="border-yellow-200 bg-yellow-50 text-yellow-700 hover:bg-yellow-100 hover:text-yellow-800 dark:border-yellow-900 dark:bg-yellow-900/20 dark:text-yellow-400 dark:hover:bg-yellow-900/30"
                        >
                          <ShieldBan className="h-4 w-4 mr-2" />
                          Bloquer le compte
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Bloquer cet utilisateur ?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Bloquer un utilisateur entraînera la suspension de
                            son compte. Il ne pourra plus se connecter à la
                            plateforme jusqu'à ce que vous le débloquez.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annuler</AlertDialogCancel>
                          <AlertDialogAction className="bg-yellow-600 hover:bg-yellow-700">
                            Confirmer
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}

                  {user.role !== "COMMERCIAL" ? (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800 dark:border-blue-900 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30"
                        >
                          <Award className="h-4 w-4 mr-2" />
                          Promouvoir en commercial
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Promouvoir en commercial ?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Cela donnera à l'utilisateur des privilèges
                            supplémentaires et le statut de commercial sur la
                            plateforme.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annuler</AlertDialogCancel>
                          <AlertDialogAction className="bg-blue-600 hover:bg-blue-700">
                            Confirmer
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  ) : (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-800 dark:border-slate-800 dark:bg-slate-900/20 dark:text-slate-400 dark:hover:bg-slate-900/30"
                        >
                          <User2 className="h-4 w-4 mr-2" />
                          Rétrograder en utilisateur
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Rétrograder en utilisateur simple ?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Cela retirera les privilèges de commercial et
                            remettra l'utilisateur au statut standard.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annuler</AlertDialogCancel>
                          <AlertDialogAction>Confirmer</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="border-red-200 bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800 dark:border-red-900 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
                      >
                        <Trash className="h-4 w-4 mr-2" />
                        Supprimer le compte
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Supprimer définitivement ce compte ?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          La suppression d'un utilisateur est irréversible.
                          Toutes ses données seront supprimées et ne pourront
                          pas être récupérées.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                          Supprimer définitivement
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
