"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";

export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-1/2 h-full bg-gray-900 flex flex-col p-12 gap-2 justify-center">
        <span className="text-5xl font-extrabold text-white">
          Tableau de bord
        </span>
        <span className="text-xl font-semibold text-white">
          Rhodium - Rhopay
        </span>
      </div>
      <div className="w-1/2 flex flex-col gap-3 p-12">
        <span className="font-bold text-4xl">Bienvenue</span>
        <span>
          Connectez-vous pour accèder à l&apos;espace admin des platformes
          Rhopay & Rhodium
        </span>
        <div className="mt-12 flex flex-col gap-2">
          <span>Adresse e-mail</span>
          <Input type="email" />
        </div>
        <div className="flex flex-col gap-2">
          <span>Mot de passe</span>
          <Input type="password" />
        </div>
        <div>
          <Button
            onClick={() => redirect("/dashboard/rhodium")}
            className="w-full bg-dark"
          >
            Se connecter
          </Button>
          <div className="mt-4 text-center">
            <span className="text-sm">
              Vous n&apos;avez pas de compte? Demandez à votre administrateur de
              vous en créer un.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
