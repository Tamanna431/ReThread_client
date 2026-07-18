import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/QueryProvider";
import AIChatbot from "@/components/AIChatbot"; // ✅ Add this

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ReThread - Sustainable Fashion Marketplace",
  description: "Buy and sell pre-loved fashion sustainably",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://accounts.google.com/gsi/client" async defer></script>
      </head>
      <body className={`${playfair.variable} ${inter.variable} font-body bg-oat text-gray-800`}>
        <QueryProvider>
          {children}
          <AIChatbot /> {/* ✅ Add tis */}
        </QueryProvider>
      </body>
    </html>
  );
}