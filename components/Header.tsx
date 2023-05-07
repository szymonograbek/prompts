import { getServerSession } from "next-auth";
import Image from "next/image";
import { HeaderUserDropdown } from "./HeaderUserDropdown";
import { Button } from "./Button";

export async function Header() {
  const session = await getServerSession();

  return (
    <header className="h-[56px] flex justify-end items-center px-4">
      {session && (
        <HeaderUserDropdown>
          <Button className="flex items-center" variant="ghost">
            <span className="text-slate-800 mr-4">{session.user?.name}</span>
            <Image
              src={session.user?.image ?? ""}
              className="rounded-full"
              alt="user avatar"
              height={32}
              width={32}
            />
          </Button>
        </HeaderUserDropdown>
      )}
    </header>
  );
}
