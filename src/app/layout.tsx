import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

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
    <html lang="en" className="dark">
      <body
        className={`${playfair.variable} ${inter.variable} font-body bg-oat text-gray-800 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-300`}
      >
        {children}
      </body>
    </html>
  );
}