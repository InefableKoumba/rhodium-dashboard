import { User2 } from "lucide-react";

export function GeneralAvatar({
  iconSize = 24,
}: Readonly<{ iconSize?: number }>) {
  return (
    <div className="relative w-full h-full rounded-full bg-gray-200 flex justify-center items-center">
      <User2 size={iconSize} />
    </div>
  );
}
