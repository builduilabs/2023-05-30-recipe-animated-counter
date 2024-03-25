import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Animated Counter",
  description: "A counter that animates in response to React state changes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased h-full bg-gray-800 text-white">
      <body
        className={`${inter.className} flex h-full items-center justify-center`}
      >
        {children}
      </body>
    </html>
  );
}
