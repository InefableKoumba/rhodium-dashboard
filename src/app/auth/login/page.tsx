"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authenticate } from "@/app/lib/actions";
import { Info } from "lucide-react";
import { useFormState } from "react-dom";

export default function Page() {
  const [errorMessage, formAction, isPending] = useFormState(
    authenticate,
    undefined
  );
  return (
    <form
      action={formAction}
      className="flex items-center justify-center h-screen bg-gray-100"
    >
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
          <Input type="email" name="email" />
        </div>
        <div className="flex flex-col gap-2">
          <span>Mot de passe</span>
          <Input type="password" name="password" />
        </div>
        <div>
          <Button type="submit" className="w-full bg-dark">
            Se connecter
          </Button>
          <div className="mt-4 text-center">
            <span className="text-sm">
              Vous n&apos;avez pas de compte? Demandez à votre administrateur de
              vous en créer un.
            </span>
          </div>
          <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            {errorMessage && (
              <>
                <Info className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-500">{errorMessage}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
