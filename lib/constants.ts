import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BookOpen,
  BriefcaseMedical,
  GraduationCap,
  HeartPulse,
  Pill,
  Stethoscope,
  Syringe,
  FlaskConical,
  Sparkles,
} from "lucide-react";

export const navLinks = [
  { label: "Biz haqimizda", href: "#haqimizda" },
  { label: "Yo'nalishlar", href: "#yonalishlar" },
  { label: "Galereya", href: "#galereya" },
  { label: "Qabul", href: "#qabul" },
  { label: "Aloqa", href: "#aloqa" },
] as const;

export const heroContent = {
  title: "Kelajagingizni tibbiyot bilan bog'lang",
  subtitle:
    "Zamonaviy bilim va amaliy ko'nikmalarni uyg'unlashtirgan xususiy tibbiyot ta'lim muassasasi.",
  primaryCta: "Qabulga ariza topshirish",
  secondaryCta: "Yo'nalishlarni ko'rish",
} as const;

export const aboutContent = {
  title: "Biz haqimizda",
  description:
    "Shahrisabz Tibbiyot Texnikumi 2023-yilda tashkil etilgan zamonaviy tibbiyot ta'lim muassasasi bo'lib, talabalarni nazariy va amaliy bilimlar bilan tayyorlaydi.",
} as const;

export const statistics = [
  { value: 370, suffix: "+", label: "Faol talabalar" },
  { value: 318, suffix: "+", label: "Bitiruvchilar" },
  { value: 4, suffix: "", label: "Asosiy ta'lim yo'nalishi" },
  { value: 2023, suffix: "", label: "Tashkil etilgan yil" },
] as const;

export type Program = {
  title: string;
  duration?: string;
  description: string;
  icon: LucideIcon;
  accent: string;
};

export const programs: Program[] = [
  {
    title: "Hamshiralik ishi",
    duration: "2 yillik",
    description:
      "Qisqa muddatda amaliy bilim va ko'nikmalarni egallash imkonini beruvchi zamonaviy ta'lim dasturi.",
    icon: HeartPulse,
    accent: "from-blue-500/20 to-emerald-500/20",
  },
  {
    title: "Hamshiralik ishi",
    duration: "3 yillik",
    description:
      "Nazariy va amaliy bilimlarni chuqur o'rganishga yo'naltirilgan ta'lim.",
    icon: Stethoscope,
    accent: "from-indigo-500/20 to-blue-500/20",
  },
  {
    title: "Farmatsiya ishi",
    description:
      "Dorivor vositalar va farmatsevtika texnologiyalari bo'yicha zamonaviy ta'lim.",
    icon: Pill,
    accent: "from-emerald-500/20 to-teal-500/20",
  },
  {
    title: "Feldsherlik ishi",
    description:
      "Birlamchi tibbiy yordam va diagnostika bo'yicha mutaxassislar tayyorlash.",
    icon: Syringe,
    accent: "from-red-500/20 to-orange-500/20",
  },
];

export type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const features: Feature[] = [
  {
    title: "Malakali pedagoglar",
    description: "Tajribali va sertifikatlangan o'qituvchilar jamoasi.",
    icon: GraduationCap,
  },
  {
    title: "Zamonaviy dasturlar",
    description: "So'nggi tibbiyot standartlariga mos o'quv rejasi.",
    icon: BookOpen,
  },
  {
    title: "Amaliy mashg'ulotlar",
    description: "Laboratoriya va amaliyotda chuqur tajriba.",
    icon: FlaskConical,
  },
  {
    title: "Qulay muhit",
    description: "Zamonaviy auditoriyalar va talabalar uchun qulay sharoit.",
    icon: Sparkles,
  },
  {
    title: "Talab yuqori bo'lgan kasblar",
    description: "Sog'liqni saqlash sohasida barqaror kelajak.",
    icon: BriefcaseMedical,
  },
];

export const missionContent = {
  title: "Bizning maqsadimiz",
  description:
    "Yoshlarni zamonaviy tibbiyot sohasida yuqori malakali mutaxassis etib tayyorlash va sog'liqni saqlash tizimi uchun munosib kadrlar yetishtirish.",
} as const;

export type GalleryItem = {
  src: string;
  alt: string;
  category: string;
  width: number;
  height: number;
};

export const galleryItems: GalleryItem[] = [
  {
    src: "/images/building.png",
    alt: "Shahrisabz Tibbiyot Texnikumi binosi",
    category: "Texnikum",
    width: 1200,
    height: 800,
  },
  {
    src: "/images/navruz.png",
    alt: "Navro'z bayrami",
    category: "Tadbirlar",
    width: 800,
    height: 1200,
  },
  {
    src: "/images/students-oath.png",
    alt: "Talabalar kasbiy qasamyod",
    category: "Talabalar",
    width: 800,
    height: 1200,
  },
  {
    src: "/images/student-practice.png",
    alt: "Amaliyot mashg'uloti",
    category: "Amaliyot",
    width: 800,
    height: 1200,
  },
  {
    src: "/images/teacher-day.png",
    alt: "Bir kunga ustoz bo'lib qolganimda",
    category: "Darslar",
    width: 800,
    height: 1200,
  },
  {
    src: "/images/students-class.png",
    alt: "Dars jarayonida",
    category: "Talabalar",
    width: 800,
    height: 1200,
  },
  {
    src: "/images/students-lesson.png",
    alt: "Amaliy mashg'ulot",
    category: "Darslar",
    width: 800,
    height: 1200,
  },
];

export type Testimonial = {
  name: string;
  program: string;
  text: string;
  rating: number;
  avatar: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Dilnoza Karimova",
    program: "Hamshiralik ishi",
    text: "Bu yerda o'qish mening hayotimni o'zgartirdi. O'qituvchilar juda tajribali va har doim yordam berishga tayyor. Amaliy mashg'ulotlar haqiqiy tibbiyot muhitida o'tkaziladi.",
    rating: 5,
    avatar: "/images/students-oath.png",
  },
  {
    name: "Javohir Rahimov",
    program: "Feldsherlik ishi",
    text: "Zamonaviy laboratoriyalar va amaliyot imkoniyatlari ajoyib. Bitirgach, darhol ish topdim. Shahrisabz Tibbiyot Texnikumi haqiqiy professional tayyorgarlik beradi.",
    rating: 5,
    avatar: "/images/student-practice.png",
  },
  {
    name: "Malika Tosheva",
    program: "Farmatsiya ishi",
    text: "Farmatsiya yo'nalishi bo'yicha chuqur bilim oldim. Darslar zamonaviy usullar bilan o'tkaziladi. O'qituvchilar har bir talabaga alohida e'tibor qaratadi.",
    rating: 5,
    avatar: "/images/students-class.png",
  },
  {
    name: "Sardor Mirzayev",
    program: "Hamshiralik ishi (3 yillik)",
    text: "3 yillik dastur nazariy va amaliy bilimlarni mukammal uyg'unlashtiradi. Texnikum muhiti juda qulay va do'stona. Kelajak kasbim uchun eng to'g'ri tanlov qildim.",
    rating: 5,
    avatar: "/images/students-lesson.png",
  },
];

export const floatingIcons = [Stethoscope, HeartPulse, Syringe, Activity, Pill] as const;

export const footerLinks = [
  { label: "Biz haqimizda", href: "#haqimizda" },
  { label: "Yo'nalishlar", href: "#yonalishlar" },
  { label: "Galereya", href: "#galereya" },
  { label: "Qabul", href: "#qabul" },
  { label: "Aloqa", href: "#aloqa" },
] as const;

export const admissionContent = {
  title: "Qabul davom etmoqda",
  description:
    "Kelajak kasbingizni tanlang va zamonaviy tibbiyot ta'limiga birinchi qadamni qo'ying.",
  cta: "Qabulga ariza topshirish",
} as const;

export const contactContent = {
  title: "Biz bilan bog'laning",
  cta: "Biz bilan bog'laning",
} as const;
