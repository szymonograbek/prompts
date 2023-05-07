import { ChatPrompt } from "@/features/chat-gpt";
import { useProtectedServerRoute } from "@/hooks/useProtectedServerRoute";

export default async function Chat() {
  await useProtectedServerRoute();

  return (
    <div>
      <ChatPrompt />
    </div>
  );
}
