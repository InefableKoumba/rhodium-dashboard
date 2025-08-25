import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreditPack } from "@/types/types";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface AddCreditButtonProps {
  creditPacks: CreditPack[];
  onPurchase: (creditPackId: string, phoneNumber: string) => Promise<void>;
}

export function AddCreditButton({
  creditPacks,
  onPurchase,
}: AddCreditButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPack, setSelectedPack] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async () => {
    if (!selectedPack || !phoneNumber) {
      toast.error("Please select a credit pack and enter your phone number");
      return;
    }

    try {
      setIsLoading(true);
      await onPurchase(selectedPack, phoneNumber);
      toast.success("Credit purchase initiated successfully");
      setIsOpen(false);
    } catch (error) {
      toast.error("Failed to initiate credit purchase");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Credits
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Purchase Credits</DialogTitle>
          <DialogDescription>
            Select a credit pack to purchase
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {creditPacks.map((pack) => (
            <Card
              key={pack.id}
              className={`cursor-pointer transition-colors ${
                selectedPack === pack.id
                  ? "border-primary"
                  : "hover:border-primary/50"
              }`}
              onClick={() => setSelectedPack(pack.id)}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{pack.name}</h3>
                    <p className="text-sm text-gray-500">
                      {pack.credits} credits
                    </p>
                  </div>
                  <p className="font-semibold">${pack.price}</p>
                </div>
              </CardContent>
            </Card>
          ))}
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium">
              Phone Number
            </label>
            <Input
              id="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
            />
          </div>
          <Button
            onClick={handlePurchase}
            disabled={!selectedPack || !phoneNumber || isLoading}
            className="w-full"
          >
            {isLoading ? "Processing..." : "Purchase Credits"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
