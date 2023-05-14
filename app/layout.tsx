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
          <div className="md:px-12">
            {/* @ts-expect-error Async Server Component */}
            <Header />
            <main className="px-4 pb-4">{children}</main>
          </div>
        </body>
      </html>
    </Providers>
  );
}
