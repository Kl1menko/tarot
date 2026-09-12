export type CourseId = "tarot" | "wax" | "tin";

export interface Module {
  title: string;
  lessons: number;
  detail: string;
}

export interface Course {
  id: CourseId;
  name: string;
  meta: string;
  desc: string;
  price: number;
  currency: string;
  installments: boolean;
  image: string;
  badge?: string;
  modules: Module[];
}

export interface Testimonial {
  /** Стабільний ключ списку. Індекс масиву для цього не годиться:
      при зміні порядку React переприв'язав би DOM не до тих відгуків. */
  id: string;
  type: "screenshot" | "text";
  image: string;
  authorName?: string;
  quote?: string;
  city: string;
  courseName: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ForWhomCard {
  title: string;
  text: string;
  /** Декоративне зображення в куті картки. */
  image: string;
  /** Опис зображення; порожній рядок — суто декоративне. */
  imageAlt: string;
}

export interface HowItWorksStep {
  number: number;
  title: string;
  text: string;
}
