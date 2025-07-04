import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.scss";
import { ReduxProvider } from "@/components/Provider/Provider";
import ClientToastContainer from "@/components/ClientToastContainer/ClientToastContainer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tower Defence",
  description: "Browser-based Warcraft 3 Clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ReduxProvider>
          <ClientToastContainer />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
