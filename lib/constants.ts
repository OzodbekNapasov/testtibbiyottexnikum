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
  { label: "Bizning jamoa", href: "/teachers" },
  { label: "Litsenziya", href: "#litsenziya" },
  { label: "Galereya", href: "#galereya" },
  { label: "Qabul", href: "#qabul" },
  { label: "Aloqa", href: "#aloqa" },
  { label: "Onlayn ariza topshirish", href: "/ariza" },
] as const;


export const heroContent = {
  title: "Kelajagingizni tibbiyot bilan bog'lang",
  subtitle:
    "Zamonaviy bilim va amaliy ko'nikmalarni uyg'unlashtirgan xususiy tibbiyot ta'lim muassasasi.",
  primaryCta: "Aloqa",
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
  duration: string;
  subtitle: string;
  description: string;
  professionCode: string;
  qualifications: string[];
  admissionRequirements: string;
  icon: LucideIcon;
  accent: string;
};

export const programs: Program[] = [
  {
    title: "Hamshiralik ishi",
    duration: "3 yillik",
    subtitle: "Umumiy amaliyot hamshirasi",
    description:
      "Kamida umumiy o'rta ma'lumotga ega bo'lgan shaxslar hisobidan shakllantirilgan guruhlarda, tanlangan kvalifikatsiyalar sonidan kelib chiqib o'qish muddati 3 yil etib belgilanadi. Bu guruhlarda kasb doirasida tanlangan kvalifikatsiyalarni muvaffaqiyatli o'zlashtirgan shaxslarga belgilangan namunadagi diplom beriladi va mazkur diplom bilan shu kasb bo'yicha mehnat bozorida ishlash huquqiga ega bo'ladi. Egallanmagan kvalifikatsiyalarni qayta o'zlashtirishga ruxsat beriladi va mazkur kvalifikatsiyani muvaffaqiyatli o'zlashtirganlarga belgilangan tartibda diplom beriladi.",
    professionCode: "50910203 — Hamshiralik ishi",
    qualifications: ["Umumiy amaliyot hamshirasi"],
    admissionRequirements:
      "Abituriyentlarni o'qishga qabul qilish suhbat asosida amalga oshiriladi.",
    icon: Stethoscope,
    accent: "from-indigo-500/20 to-blue-500/20",
  },
  {
    title: "Hamshiralik ishi",
    duration: "2 yillik",
    subtitle: "Tibbiyot, maktab va maktabgacha ta'lim tashkiloti hamda fizioterapevtik xonalar hamshirasi",
    description:
      "Kamida umumiy o'rta ma'lumotga ega bo'lgan shaxslar hisobidan shakllantirilgan guruhlarda, tanlangan kvalifikatsiyalar sonidan kelib chiqib o'qish muddati 2 yil etib belgilanadi. Bu guruhlarda kasb doirasida tanlangan kvalifikatsiyalarni muvaffaqiyatli o'zlashtirgan shaxslarga belgilangan namunadagi diplom beriladi va mazkur diplom bilan shu kasb hamda tegishli kvalifikatsiyalar bo'yicha mehnat bozorida ishlash huquqiga ega bo'ladi. Egallanmagan kvalifikatsiyalarni qayta o'zlashtirishga ruxsat beriladi va mazkur kvalifikatsiyani muvaffaqiyatli o'zlashtirganlarga belgilangan tartibda diplom beriladi.",
    professionCode: "40910203 — Hamshiralik ishi",
    qualifications: [
      "Tibbiyot hamshirasi",
      "Maktab va maktabgacha ta'lim tashkiloti hamshirasi",
      "Fizioterapevtik (massaj) xonasi hamshirasi",
    ],
    admissionRequirements:
      "Abituriyentlarni o'qishga qabul qilish suhbat asosida amalga oshiriladi.",
    icon: HeartPulse,
    accent: "from-blue-500/20 to-emerald-500/20",
  },
  {
    title: "Farmatsiya ishi",
    duration: "3 yillik",
    subtitle: "Farmatsevt",
    description:
      "Kamida umumiy o'rta ma'lumotga ega bo'lgan shaxslar hisobidan shakllantirilgan guruhlarda, tanlangan kvalifikatsiyalar sonidan kelib chiqib o'qish muddati 3 yil etib belgilanadi. Bu guruhlarda kasb doirasida tanlangan kvalifikatsiyalarni muvaffaqiyatli o'zlashtirgan shaxslarga belgilangan namunadagi diplom beriladi va mazkur diplom bilan shu kasb bo'yicha mehnat bozorida farmatsevtika sohasida ishlash huquqiga ega bo'ladi. Egallanmagan kvalifikatsiyalarni qayta o'zlashtirishga ruxsat beriladi va mazkur kvalifikatsiyani muvaffaqiyatli o'zlashtirganlarga belgilangan tartibda diplom beriladi.",
    professionCode: "50910401 — Farmatsiya",
    qualifications: ["Farmatsevt assistenti"],
    admissionRequirements:
      "Abituriyentlarni o'qishga qabul qilish suhbat asosida amalga oshiriladi.",
    icon: Pill,
    accent: "from-emerald-500/20 to-teal-500/20",
  },
  {
    title: "Davolash ishi / Feldsher",
    duration: "3 yillik",
    subtitle: "Feldsher",
    description:
      "Kamida umumiy o'rta ma'lumotga ega bo'lgan shaxslar hisobidan shakllantirilgan guruhlarda, tanlangan kvalifikatsiyalar sonidan kelib chiqib o'qish muddati 3 yil etib belgilanadi. Bu guruhlarda kasb doirasida tanlangan kvalifikatsiyalarni muvaffaqiyatli o'zlashtirgan shaxslarga belgilangan namunadagi diplom beriladi va mazkur diplom bilan shu kasb bo'yicha mehnat bozorida (birlamchi tibbiyot-sanitariya yordami va shoshilinch tibbiy yordam tizimida) ishlash huquqiga ega bo'ladi. Egallanmagan kvalifikatsiyalarni qayta o'zlashtirishga ruxsat beriladi va mazkur kvalifikatsiyani muvaffaqiyatli o'zlashtirganlarga belgilangan tartibda diplom beriladi.",
    professionCode: "50910204 — Davolash ishi",
    qualifications: ["Feldsher"],
    admissionRequirements:
      "Abituriyentlarni o'qishga qabul qilish suhbat asosida amalga oshiriladi.",
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
  variant?: "photo" | "graphic";
};

export const galleryItems: GalleryItem[] = [
  {
    src: "/images/building.png",
    alt: "Shahrisabz Tibbiyot Texnikumi binosi",
    category: "Texnikum",
    width: 1200,
    height: 800,
    variant: "photo",
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
  { label: "Bizning jamoa", href: "/teachers" },
  { label: "Litsenziya", href: "#litsenziya" },
  { label: "Galereya", href: "#galereya" },
  { label: "Qabul", href: "#qabul" },
  { label: "Aloqa", href: "#aloqa" },
] as const;

export type LicenseItem = {
  src: string;
  alt: string;
  title: string;
  caption: string;
};

export const licenseItems: LicenseItem[] = [
  {
    src: "/images/license/license-1.png",
    alt: "Litsenziya — asosiy sahifa",
    title: "Litsenziya",
    caption: "Nodavlat ta'lim xizmatlarini ko'rsatish faoliyati uchun rasmiy litsenziya",
  },
  {
    src: "/images/license/license-2.png",
    alt: "Litsenziya — ta'lim yo'nalishlari",
    title: "Ta'lim yo'nalishlari",
    caption: "Litsenziyada ko'rsatilgan kasb va mutaxassislik yo'nalishlari",
  },
];

export const admissionContent = {
  title: "Qabul ochiq",
  description:
    "Kelajak kasbingizni tanlang va zamonaviy tibbiyot ta'limiga birinchi qadamni qo'ying.",
  cta: "Qabulga ariza topshirish",
} as const;

export const contactContent = {
  title: "Biz bilan bog'laning",
  cta: "Biz bilan bog'laning",
} as const;

export type Teacher = {
  name: string;
  position: string;
  photo: string;
  specialty?: string;
  experience?: string;
  description?: string;
};

export const teachers: Teacher[] = [
  {
    name: "Shaxboz Raxmonov",
    position: "CEO",
    photo: "/images/teachers/shaxboz-raxmonov.jpg",
    specialty: "Marketolog",
    experience: "5 yillik tajriba",
    description: "Strategik yo'nalishlarni belgilaydi, muhim qarorlar qabul qiladi va butun jamoaning samarali ishlashini ta'minlaydi.",
  },
  {
    name: "Bahrom Eshnayev",
    position: "O'quv ishlari bo'yicha direktor o'rinbosari",
    photo: "/images/teachers/Bahrom-Eshnayev.png",
    specialty: "Ta'lim nazariyasi",
    experience: "24 yillik tajriba",
    description: "Ta'lim muassasasida o'quv jarayonini tashkil etish, nazorat qilish va sifatini ta'minlashga mas'ul rahbar. ",
  },
  {
    name: "Dilshod Karimov",
    position: "Matematika o‘qituvchisi",
    photo: "/images/teachers/teacher-1.jpg",
    specialty: "Aniq fanlar",
    experience: "7 yillik tajriba",
    description: "O‘quvchilarga mavzularni sodda va tushunarli usulda o‘rgatadi.",
  },
  {
    name: "Nigora Abdullayeva",
    position: "Biologiya o‘qituvchisi",
    photo: "/images/teachers/teacher-2.jpg",
    specialty: "Biologiya va anatomiya",
    experience: "9 yillik tajriba",
    description: "Nazariya va amaliyotni uyg‘unlashtirib interaktiv darslar olib boradi.",
  },
  {
    name: "Jasur Ergashev",
    position: "Kimyo o‘qituvchisi",
    photo: "/images/teachers/teacher-3.jpg",
    specialty: "Tibbiy kimyo",
    experience: "6 yillik tajriba",
    description: "Laboratoriya mashg‘ulotlari orqali bilimlarni mustahkamlaydi.",
  },
  {
    name: "Malika To‘xtayeva",
    position: "Farmakologiya o‘qituvchisi",
    photo: "/images/teachers/teacher-4.jpg",
    specialty: "Farmakologiya",
    experience: "8 yillik tajriba",
    description: "Dori vositalari bo‘yicha zamonaviy yondashuvlarni o‘rgatadi.",
  },
  {
    name: "Sardor Qodirov",
    position: "Feldsherlik amaliyoti rahbari",
    photo: "/images/teachers/teacher-5.jpg",
    specialty: "Shoshilinch yordam",
    experience: "11 yillik tajriba",
    description: "Amaliy ko‘nikmalarni real klinik holatlar asosida rivojlantiradi.",
  },
  {
    name: "Gulnoza Raximova",
    position: "Hamshiralik ishi o‘qituvchisi",
    photo: "/images/teachers/teacher-6.jpg",
    specialty: "Parvarish asoslari",
    experience: "5 yillik tajriba",
    description: "Talabalarda bemor bilan ishlash madaniyatini shakllantiradi.",
  },
  {
    name: "Bekzod Yo‘ldoshev",
    position: "Anatomiya o‘qituvchisi",
    photo: "/images/teachers/teacher-7.jpg",
    specialty: "Inson anatomiyasi",
    experience: "10 yillik tajriba",
    description: "Murakkab anatomik mavzularni vizual usullar bilan bayon etadi.",
  },
  {
    name: "Shahnoza Mamatqulova",
    position: "Fiziologiya o‘qituvchisi",
    photo: "/images/teachers/teacher-8.jpg",
    specialty: "Fiziologiya",
    experience: "7 yillik tajriba",
    description: "Organizm funksiyalarini klinik misollar bilan tushuntiradi.",
  },
  {
    name: "Azizbek Nurmatov",
    position: "Ichki kasalliklar o‘qituvchisi",
    photo: "/images/teachers/teacher-9.jpg",
    specialty: "Terapiya asoslari",
    experience: "12 yillik tajriba",
    description: "Kasalliklarni tahlil qilish va tashxis qo‘yish ko‘nikmalarini oshiradi.",
  },
  {
    name: "Mohira Xudoyberdiyeva",
    position: "Pediatriya o‘qituvchisi",
    photo: "/images/teachers/teacher-10.jpg",
    specialty: "Bolalar salomatligi",
    experience: "9 yillik tajriba",
    description: "Bolalar bilan ishlashning nozik jihatlarini puxta o‘rgatadi.",
  },
  {
    name: "Rustam Tursunov",
    position: "Jarrohlik asoslari o‘qituvchisi",
    photo: "/images/teachers/teacher-11.jpg",
    specialty: "Jarrohlik amaliyoti",
    experience: "13 yillik tajriba",
    description: "Sterillik va operatsion protokollar bo‘yicha amaliy darslar o‘tadi.",
  },
  {
    name: "Dilafruz Sobirova",
    position: "Akusherlik va ginekologiya o‘qituvchisi",
    photo: "/images/teachers/teacher-12.jpg",
    specialty: "Akusherlik",
    experience: "8 yillik tajriba",
    description: "Onalik va ayollar salomatligi bo‘yicha chuqur bilim beradi.",
  },
  {
    name: "Umidjon Asqarov",
    position: "Patologiya o‘qituvchisi",
    photo: "/images/teachers/teacher-13.jpg",
    specialty: "Patologik jarayonlar",
    experience: "6 yillik tajriba",
    description: "Kasalliklarning mexanizmlarini tahliliy yondashuvda o‘rgatadi.",
  },
  {
    name: "Lola Eshonqulova",
    position: "Mikrobiologiya o‘qituvchisi",
    photo: "/images/teachers/teacher-14.jpg",
    specialty: "Mikrobiologiya",
    experience: "7 yillik tajriba",
    description: "Infeksiyalar profilaktikasi va laborator tashxis usullarini tushuntiradi.",
  },
  {
    name: "Zafarbek Ismoilov",
    position: "Tibbiy etika o‘qituvchisi",
    photo: "/images/teachers/teacher-15.jpg",
    specialty: "Kasbiy etika",
    experience: "10 yillik tajriba",
    description: "Shifokor va bemor o‘rtasidagi muloqot madaniyatini rivojlantiradi.",
  },
];
