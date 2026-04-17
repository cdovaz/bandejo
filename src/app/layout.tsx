

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bandejo | Filas e Eventos",
  description: "Acompanhe o tempo de espera nas filas do RU e os eventos das entidades da USP em tempo real.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-50">
        
        {/* 2. Coloque a Navbar aqui! Ela vai aparecer em todas as telas automaticamente */}
        <Navbar />

        {/* Onde as páginas específicas serão renderizadas */}
        <main className="flex-1 container mx-auto px-4 py-8">
          {children}
        </main>

        <Footer/>

      </body>
    </html>
  );
}