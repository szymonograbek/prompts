import { useProtectedServerRoute } from "@/hooks/useProtectedServerRoute";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await useProtectedServerRoute();

  if (session) {
    redirect("/chat");
  }
}
