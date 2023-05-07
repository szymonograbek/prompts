import { Heading } from "@/components/Heading";

export const metadata = {
  title: "Sign In",
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full flex flex-col">
      <Heading className="mb-6" size="large">
        Sign In
      </Heading>
      <div className="self-center">{children}</div>
    </div>
  );
}
