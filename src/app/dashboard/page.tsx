"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";

export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen p-24 bg-gray-100 gap-12">
      <div className="w-1/2 border-r h-full flex flex-col justify-center">
        <span
          style={{
            fontFamily: "Audiowide",
          }}
          className="text-5xl font-bold text-primary"
        >
          Rhodium - Rhopay
        </span>
      </div>
      <div className="w-1/2 flex flex-col i gap-3">
        <span className="font-bold text-4xl">Bienvenue</span>
        <span>
          Connectez-vous pour accèder à l&apos;espace admin des platformes
          Rhopay & Rhodium
        </span>
        <div className="mt-12 flex flex-col gap-2">
          <span>Adresse e-mail</span>
          <Input type="email" className="border-2" />
        </div>
        <div className="flex flex-col gap-2">
          <span>Mot de passe</span>
          <Input type="password" className="border-2" />
        </div>
        <div>
          <Button
            onClick={() => redirect("/dashboard/rhodium")}
            className="w-full"
          >
            Se connecter
          </Button>
          <div className="mt-4">
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
