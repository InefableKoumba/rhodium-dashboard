import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import React from "react";

export const dynamic = "force-dynamic";

export default async function page() {
  return (
    <div className="p-8">
      <div className="2xl:w-1/2 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <span className="font-medium">Prix du parrainage</span>
          <Input
            type="number"
            placeholder="Prix du parrainage"
            defaultValue={100}
          />
          <span className="text-sm mt-4">
            <span className="font-bold">NB:</span> Si vous modifiez le prix du
            parrainage, le nouveau montant ne sera considéré que pour les
            parrainages éffectués après cette modification.
          </span>
        </div>
        <div className="flex flex-col gap-2 mt-8">
          <span className="font-medium">
            % de commission sur tickets vendus
          </span>
          <Input type="number" placeholder="10%" defaultValue={10} />
          <span className="text-sm mt-4">
            <span className="font-bold">NB:</span> Si vous modifiez le % des
            commissions sur les tickets vendus, le nouveau pourcentage ne sera
            appliqué qu&apos;aux évènements créés après cette modification.
          </span>
        </div>
        <div className="flex flex-col gap-4 mt-8">
          <span className="font-medium">Prix des lots d&apos;invitations</span>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid grid-cols-2 gap-4 border p-4">
              <div className="flex flex-col gap-2">
                <span className="font-medium text-sm">Quantité</span>
                <Input type="number" placeholder="10" defaultValue={10} />
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-medium text-sm">Prix</span>
                <Input type="number" placeholder="500" defaultValue={500} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 border p-4">
              <div className="flex flex-col gap-2">
                <span className="font-medium text-sm">Quantité</span>
                <Input type="number" placeholder="50" defaultValue={50} />
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-medium text-sm">Prix</span>
                <Input type="number" placeholder="500" defaultValue={2000} />
              </div>
            </div>
          </div>
          <div className="text-sm">
            <span className="font-bold">NB:</span> Si vous modifiez le % des
            commissions sur les tickets vendus, le nouveau pourcentage ne sera
            appliqué qu&apos;aux évènements créés après cette modification.
          </div>
        </div>
        <div>
          <Dialog>
            <DialogTrigger>
              <Button>Enregistrer</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Voulez-vous vraiment apporter enregistrer ?
                </DialogTitle>
                <DialogDescription>
                  Vous êtes sur le point de modifier des configurations
                  importantes de l&apos;application. Assurez-vous d&apos;avoir
                  renseigner des informations correctes.
                </DialogDescription>
              </DialogHeader>
              <div className="flex gap-2 my-4 items-center">
                <Checkbox />
                <span className="text-sm">
                  Je confirme vouloir apporter ces modifcations
                </span>
              </div>
              <Button>Enregistrer</Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
