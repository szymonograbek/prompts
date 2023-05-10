import { AutoGPTPrompt } from "@/features/autogpt";
import { useProtectedServerRoute } from "@/hooks/useProtectedServerRoute";

export default async function AutoGPT() {
  await useProtectedServerRoute();

  return (
    <div>
      <AutoGPTPrompt />
    </div>
  );
}
