import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export function useProtectedClientRoute() {
  const session = useSession({
    required: true,
    onUnauthenticated: () => {
      redirect("/signin");
    },
  });

  return session;
}
