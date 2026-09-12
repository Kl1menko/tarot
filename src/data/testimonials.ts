import type { Testimonial } from "./types";

export const testimonials: Testimonial[] = [
  {
    id: "olena-tarot",
    type: "text",
    image: "/images/avatar-1.svg",
    authorName: "Олена",
    quote:
      "Прийшла з нуля і дуже боялась, що це буде «магія для обраних». Виявилось — чітка система з конспектами. На восьмому тижні зробила перший платний розклад подрузі подруги.",
    city: "Львів",
    courseName: "Таро: від карти до консультації",
  },
  {
    id: "screen-wax",
    type: "screenshot",
    image: "/images/testimonial-screen.svg",
    city: "Краків",
    courseName: "Воскові відливки",
  },
  {
    id: "maryna-tarot",
    type: "text",
    image: "/images/avatar-2.svg",
    authorName: "Марина",
    quote:
      "Вікторія не тисне і не лякає. Найцінніший блок для мене — етика: що казати клієнту, коли карти показують важке. Це те, чого я не знайшла на жодному іншому курсі.",
    city: "Київ",
    courseName: "Таро: від карти до консультації",
  },
  {
    id: "iryna-tin",
    type: "text",
    image: "/images/avatar-3.svg",
    authorName: "Ірина",
    quote:
      "Відливки давно хотіла освоїти, але не було в кого спитати про техніку. Тут розібрали все — від температури води до того, як не домальовувати собі образи у формі.",
    city: "Одеса",
    courseName: "Оловʼяні відливки",
  },
];
