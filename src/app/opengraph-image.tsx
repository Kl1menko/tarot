import { ImageResponse } from "next/og";
import { site } from "@/data/content";

/**
 * Прев'ю посилання в месенджерах і соцмережах.
 *
 * Малюється кодом, а не файлом: текст (імʼя, слоган, цифри практики) береться
 * з `site`, тож зміна даних не потребує перемальовування картинки.
 *
 * Шрифти проєкту (Playfair, Manrope) сюди не тягнемо — next/font віддає їх
 * лише браузеру, а Satori потрібні байти файлу. Системний шрифт рендерера
 * кирилицю відмальовує коректно, тож обходимось без нього.
 */
export const alt = `${site.brand} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Кольори продубльовані з @theme у globals.css: Satori не бачить CSS-змінних.
const ink = "#14172b";
const bg = "#f5f6f8";
const gold = "#755823";
const muted = "#55596e";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 90px",
          background: bg,
          // Тепле сяйво в кутах — перегук із акцентними кольорами сайту.
          backgroundImage:
            "radial-gradient(600px 600px at 12% 10%, rgba(117,88,35,0.10), transparent 70%), radial-gradient(560px 560px at 88% 88%, rgba(143,74,43,0.08), transparent 70%)",
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: gold,
            fontWeight: 600,
          }}
        >
          {site.tagline}
        </div>

        <div
          style={{
            marginTop: 28,
            fontSize: 92,
            lineHeight: 1.05,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: ink,
            fontWeight: 700,
          }}
        >
          {site.brand}
        </div>

        <div
          style={{
            marginTop: 32,
            fontSize: 36,
            lineHeight: 1.3,
            color: ink,
            maxWidth: 900,
          }}
        >
          Навчіться читати карти й відливки за 12 тижнів
        </div>

        <div
          style={{
            marginTop: 44,
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontSize: 26,
            color: muted,
          }}
        >
          <span>{site.yearsOfPractice} років практики</span>
          <span style={{ color: gold }}>·</span>
          <span>{site.studentsCount}+ учениць</span>
          <span style={{ color: gold }}>·</span>
          <span>онлайн</span>
        </div>
      </div>
    ),
    size,
  );
}
