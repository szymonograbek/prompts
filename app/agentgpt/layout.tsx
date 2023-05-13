import { Heading } from "@/components/Heading";

export const metadata = {
  title: "AutoGPT",
  description: "Generate goals and tasks with GPT",
};

export default function AutoGPTLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <Heading className="mb-6" size="large">
        AgentGPT
      </Heading>
      {children}
    </div>
  );
}
