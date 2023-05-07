import { Heading } from "@/components/Heading";

export const metadata = {
  title: "Chat",
  description: "Chat with GPT",
};

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full flex flex-col">
      <Heading className="mb-6" size="large">
        Chat
      </Heading>
      {children}
    </div>
  );
}
