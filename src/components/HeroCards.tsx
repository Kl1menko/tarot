"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { RefObject } from "react";

/**
 * Золоті карти переднього плану.
 *
 * Поведінка при скролі — як на undercat.io: кожна карта зміщується вниз
 * із власним множником швидкості, тому вони «розʼїжджаються» одна відносно
 * одної й створюють глибину. Реакції на мишку немає навмисно.
 */
interface FlyCard {
  src: string;
  /** позиція центру, % від контейнера */
  x: number;
  y: number;
  /** ширина, % від контейнера (десктоп) */
  width: number;
  /** ширина на мобільному, % — сцена там вужча і вища */
  widthMobile: number;
  /** позиція на мобільному, % */
  xMobile: number;
  yMobile: number;
  /** звідки прилітає на старті (px відносно кінцевої позиції) */
  from: { x: number; y: number };
  /** множник швидкості при скролі: більший — карта тікає далі */
  speed: number;
  /** точковий зсув по вертикалі, px (відʼємне — вище). Не у відсотках,
      щоб зсув був однаковий на будь-якій ширині екрана. */
  offsetY?: number;
}

const flyCards: FlyCard[] = [
  { src: "/images/cards/fly-1.webp", x: 27, y: 32, width: 14, xMobile: 15, yMobile: 26, widthMobile: 25, from: { x: -70, y: -45 }, speed: 0.5 },
  { src: "/images/cards/fly-2.webp", x: 23, y: 76, width: 23, xMobile: 24, yMobile: 63, widthMobile: 40, from: { x: -80, y: 55 }, speed: 1.5 },
  { src: "/images/cards/fly-3.webp", x: 73, y: 29, width: 13, xMobile: 85, yMobile: 33, widthMobile: 24, from: { x: 70, y: -50 }, speed: 0.3, offsetY: -40 },
  { src: "/images/cards/fly-4.webp", x: 78, y: 70, width: 15, xMobile: 87, yMobile: 58, widthMobile: 27, from: { x: 80, y: 50 }, speed: 1.1 },
];

export function HeroCardsFront({
  sceneRef,
}: {
  /** Посилання на секцію hero — від неї рахується прогрес скролу. */
  sceneRef: RefObject<HTMLElement | null>;
}) {
  // 0 — hero повністю у вʼюпорті, 1 — верх hero дійшов до верху екрана.
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start end", "end start"],
  });

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {flyCards.map((card, i) => (
        <FlyCardView key={card.src} card={card} index={i} progress={scrollYProgress} />
      ))}
    </div>
  );
}

function FlyCardView({
  card,
  index,
  progress,
}: {
  card: FlyCard;
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const reduceMotion = useReducedMotion();

  // Базове зміщення 260px множимо на швидкість карти — звідси різнобій.
  // Ефект рахуємо від моменту, коли hero починає йти вгору (прогрес ~0.5).
  const scrollY = useTransform(progress, [0.5, 1], [0, 420 * card.speed]);
  // Дальні карти ще й трохи бліднуть, посилюючи глибину.
  const scrollOpacity = useTransform(progress, [0.5, 0.95], [1, 0.1]);

  const variants = {
    hidden: reduceMotion
      ? { opacity: 0 }
      : {
          opacity: 0,
          scale: 0.3,
          x: card.from.x,
          y: card.from.y,
          filter: "blur(12px)",
        },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: reduceMotion
        ? { duration: 0.4, delay: index * 0.08 }
        : { duration: 1.3, delay: 0.55 + index * 0.16, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    // Шар 1 — розкладка. Мобільні координати перекриваються десктопними
    // через CSS-змінні і медіазапит у globals.css (.hero-card).
    <div
      className="hero-card absolute"
      style={
        {
          "--x": `${card.xMobile}%`,
          "--y": `${card.yMobile}%`,
          "--w": `${card.widthMobile}%`,
          "--x-lg": `${card.x}%`,
          "--y-lg": `${card.y}%`,
          "--w-lg": `${card.width}%`,
          "--dy": `${card.offsetY ?? 0}px`,
        } as React.CSSProperties
      }
    >
      {/* Шар 2 — реакція на скрол */}
      <motion.div
        style={{
          y: reduceMotion ? 0 : scrollY,
          opacity: reduceMotion ? 1 : scrollOpacity,
          willChange: "transform",
        }}
      >
        {/* Шар 3 — поява з-за портрета */}
        <motion.div variants={variants} initial="hidden" animate="visible">
          {/* Шар 4 — тихе плавання після приземлення */}
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, -14, 0] }}
            transition={{
              duration: 5 + index * 0.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2 + index * 0.25,
            }}
          >
            <Image
              src={card.src}
              alt=""
              width={890}
              height={890}
              className="h-auto w-full"
              priority
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
