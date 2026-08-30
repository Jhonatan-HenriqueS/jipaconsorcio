import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";

import { getSiteUrl } from "@/lib/site-config";

import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const metadataBase = getSiteUrl();

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "Consórcio em Ji-Paraná | JIPA Consórcios",
    template: "%s | JIPA Consórcios",
  },
  description:
    "Consórcio em Ji-Paraná com orientação clara para imóveis, veículos, motos, serviços e planejamento patrimonial.",
  applicationName: "JIPA Consórcios",
  authors: [{ name: "JIPA Consórcios" }],
  creator: "JIPA Consórcios",
  category: "consórcios",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#071a33",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
