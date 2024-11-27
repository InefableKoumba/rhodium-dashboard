import { UserInterface } from "@/interfaces/interfaces";
import { GeneralAvatar } from "./general-user-avatar";
import Image from "next/image";

export default async function UserAvatar({
  userId,
}: Readonly<{ userId: number }>) {
  try {
    const response = await fetch(
      process.env.NEXT_API_URL +
        "/users?filters[id][$eq]=" +
        userId +
        "&populate=*"
    );

    const data = await response.json();
    const user = data[0] as UserInterface | null;

    if (!user || !user.avatar) {
      return <GeneralAvatar />;
    }

    return (
      <div className="relative w-14 h-14 rounded-full">
        <Image
          fill
          className="rounded-full object-cover"
          alt="Event creator image"
          src={process.env.NEXT_STORAGE_BUCKET_URL + user.avatar.url}
        />
      </div>
    );
  } catch {
    return <GeneralAvatar />;
  }
}
