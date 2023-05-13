import { AgentGPTPrompt } from "@/features/agentgpt";
import { useProtectedServerRoute } from "@/hooks/useProtectedServerRoute";

export default async function AutoGPT() {
  await useProtectedServerRoute();

  return (
    <div>
      <AgentGPTPrompt />
    </div>
  );
}
