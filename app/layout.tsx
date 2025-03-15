import type { Metadata } from "next";
import { IBM_Plex_Sans as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const inter = FontSans({ subsets: ["latin"], weight: ['300', '400', '500', '600'], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "MLS",
  description: "My Love Story",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn("min-h-screen bg-background font-sans antialiased", inter.variable)}
        >
          <Header />
          <main>  
            {children}
          </main>
          <Toaster richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}
