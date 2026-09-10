import type { Metadata, Viewport } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Viktoria Yani — школа Таро та відливок",
  description:
    "Онлайн-навчання Таро, восковим та оловʼяним відливкам. Системна методика, практика з першого тижня, підтримка в закритій спільноті.",
  openGraph: {
    title: "Viktoria Yani — школа Таро та відливок",
    description:
      "Онлайн-навчання Таро, восковим та оловʼяним відливкам. Практика з першого тижня.",
    locale: "uk_UA",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f2ede1",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk" className={`${playfair.variable} ${manrope.variable}`}>
      <body>
        <div className="starfield" aria-hidden="true" />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
