import type { Metadata, Viewport } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import { site } from "@/data/content";
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

const title = `${site.brand} — школа Таро та відливок`;
const description =
  "Онлайн-навчання Таро, восковим та оловʼяним відливкам. Системна методика, практика з першого тижня, підтримка в закритій спільноті.";

export const metadata: Metadata = {
  // Без metadataBase відносні URL (зокрема OG-картинка) не розгортаються
  // в абсолютні, і прев'ю в месенджерах лишається порожнім.
  metadataBase: new URL(site.url),
  title,
  description,
  keywords: [
    "курси Таро",
    "навчання Таро онлайн",
    "воскові відливки",
    "оловʼяні відливки",
    "школа Таро",
    "Таро з нуля",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description:
      "Онлайн-навчання Таро, восковим та оловʼяним відливкам. Практика з першого тижня.",
    url: site.url,
    siteName: site.brand,
    locale: "uk_UA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description:
      "Онлайн-навчання Таро, восковим та оловʼяним відливкам. Практика з першого тижня.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  // Збігається з --color-bg: інакше смуга браузера на мобільному іншого
  // відтінку, ніж сама сторінка.
  themeColor: "#f5f6f8",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk" className={`${playfair.variable} ${manrope.variable}`}>
      <body>
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
