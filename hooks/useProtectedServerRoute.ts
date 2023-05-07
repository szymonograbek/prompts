import { authOptions } from "@/lib/next-auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function useProtectedServerRoute() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }

  return session;
}
