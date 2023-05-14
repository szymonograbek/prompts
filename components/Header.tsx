import { getServerSession } from "next-auth";
import Image from "next/image";
import { HeaderUserDropdown } from "./HeaderUserDropdown";
import { Button } from "./Button";
import { Navigation } from "./Navigation";

export async function Header() {
  const session = await getServerSession();

  return (
    <header className="h-[56px] relative z-50 flex justify-between items-center px-4 bg-white mb-8">
      {session && (
        <>
          <Navigation />
          <HeaderUserDropdown>
            <Button className="flex items-center px-2 -mr-2" variant="ghost">
              <span className="text-gray-900 mr-4">{session.user?.name}</span>
              <Image
                src={session.user?.image ?? ""}
                className="rounded-full"
                alt="user avatar"
                height={32}
                width={32}
              />
            </Button>
          </HeaderUserDropdown>
        </>
      )}
    </header>
  );
}
