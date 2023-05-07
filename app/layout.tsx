import { Providers } from "@/components/Providers";
import "./globals.css";
import { Inter } from "next/font/google";
import { Header } from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Prompts",
  description: "Application that contains various tools to work with GPT",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>
          {/* @ts-expect-error Async Server Component */}
          <Header />
          <main className="px-4">{children}</main>
        </body>
      </html>
    </Providers>
  );
}
