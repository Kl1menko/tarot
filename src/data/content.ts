import type { ForWhomCard, HowItWorksStep } from "./types";

export const site = {
  brand: "Viktoria Yani",
  tagline: "Онлайн-школа Таро та відливок",
  yearsOfPractice: 12,
  studentsCount: 400,
  nextStreamDate: "6 жовтня",
  seatsLeft: 8,
  refundLessons: 3,
  contacts: {
    telegram: "https://t.me/viktoria_yani",
    instagram: "https://instagram.com/viktoria_yani",
    viber: "viber://chat?number=%2B380000000000",
    email: "hello@viktoriayani.com",
  },
};

export const nav = [
  { href: "#about", label: "Про мене" },
  { href: "#how-it-works", label: "Формат навчання" },
  { href: "#program", label: "Програма" },
  { href: "#courses", label: "Курси" },
  { href: "#testimonials", label: "Відгуки" },
  { href: "#faq", label: "FAQ" },
  { href: "#form", label: "Контакти" },
];

export const aboutPoints = [
  {
    title: "Методика, а не езотерична каша",
    text: "Кожен урок має структуру, домашнє завдання і критерій «зроблено». Ви завжди знаєте, на якому ви кроці.",
  },
  {
    title: "Підтримка в закритій спільноті",
    text: "Групи до 15 людей, чат із розборами, відповіді на питання протягом доби в будні.",
  },
  {
    title: "Етика роботи з людьми",
    text: "Окремий блок про межі, важкі запити і те, чого тарологиня не має права робити з чужим життям.",
  },
  {
    title: "Практика з першого тижня",
    text: "Карти в руках уже на другому уроці. Теорія без практики тут не існує.",
  },
];

// image — карта Таро в куті картки (Райдер-Вейт, з макета «78 Tarot Cards»).
// Заміна на інші зображення не потребує змін коду — імена файлів лишити.
export const forWhom: ForWhomCard[] = [
  {
    title: "Повний нуль",
    text: "Ви ніколи не тримали колоду, але вас давно тягне. Починаємо з нуля, без вимог до «дару».",
    image: "/images/forwhom/beginner.webp",
    imageAlt: "",
  },
  {
    title: "Для себе",
    text: "Хочете розібратись у власних питаннях і приймати рішення спокійніше, без консультацій у чужих людей.",
    image: "/images/forwhom/self.webp",
    imageAlt: "",
  },
  {
    title: "Нова професія",
    text: "Плануєте вийти на клієнтів і брати гроші за роботу. Вчимо і ремесла, і того, як його продавати.",
    image: "/images/forwhom/pro.webp",
    imageAlt: "",
  },
  {
    title: "Практикуючим",
    text: "Ви вже читаєте карти, але хочете системи, глибини і другого інструменту — відливок.",
    image: "/images/forwhom/practice.webp",
    imageAlt: "",
  },
];

export const howItWorks: HowItWorksStep[] = [
  {
    number: 1,
    title: "Заявка і знайомство",
    text: "Ви залишаєте заявку, ми списуємось і разом обираємо курс під ваш рівень і мету.",
  },
  {
    number: 2,
    title: "Доступ до платформи",
    text: "Після оплати відкривається кабінет з уроками, конспектами і завданнями. Доступ залишається назавжди.",
  },
  {
    number: 3,
    title: "Уроки у своєму темпі",
    text: "Нові модулі відкриваються щотижня. Дивитесь коли зручно — записи не згорають.",
  },
  {
    number: 4,
    title: "Розбори наживо",
    text: "Щотижня зустріч у Zoom: питання, розбір ваших робіт, практика в парах.",
  },
  {
    number: 5,
    title: "Атестація і сертифікат",
    text: "Фінальна робота з відгуком від Вікторії та сертифікат про завершення курсу.",
  },
];
