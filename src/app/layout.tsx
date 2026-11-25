import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const display = Fraunces({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const sans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

const title = "Roma Sandwich | Sándwiches de miga, picadas y catering en Córdoba";
const description = "Sandwichería y fábrica artesanal en Córdoba. Sándwiches tradicionales en pan francés y pebete, línea gourmet en ciabatta y focaccia, miga, picadas, tortas saladas y catering. Montevideo 712. Pedí por WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL("https://romasandwich.com.ar"), // TODO: cambiar por el dominio real
  title,
  description,
  keywords: [
    "sándwiches de miga Córdoba",
    "sándwiches tradicionales Córdoba",
    "pan ciabatta",
    "pan focaccia",
    "picadas Córdoba",
    "tortas saladas",
    "catering Córdoba",
    "Roma Sandwich",
  ],
  icons: {
    icon: "/img/logo.jpg",
    apple: "/img/logo.jpg",
  },
  openGraph: {
    title,
    description,
    type: "website",
    locale: "es_AR",
    siteName: "Roma Sandwich",
    images: [
      {
        url: "/img/logo.jpg",
        width: 150,
        height: 150,
        alt: "Logo Roma Sandwich",
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
