export type NewsItem = {
  slug: string;
  title: string;
  alt: string;
  photo: string;
  date: string;
  preview: string;
  content: string;
};

export const newsItems: NewsItem[] = [
  {
    slug: "yangilik-1",
    title: "Yangilik #1",
    alt: "Yangilik 1 rasm",
    photo: "/images/news-milliy-taomlar.jpg",
    date: "2024-01-10",
    preview: "Texnikumda bo‘lib o‘tgan muhim tadbir haqida qisqacha ma’lumot.",
    content:
      "Texnikumda navbatdagi tadbir muvaffaqiyatli o‘tkazildi.\n\nTalabalar faol ishtirok etib, yangi bilim va ko‘nikmalarni amaliyotda sinab ko‘rishdi.\n\nHamkor tashkilotlar bilan kelgusidagi rejalar ham muhokama qilindi.",
  },
  {
    slug: "yangilik-2",
    title: "Yangilik #2",
    alt: "Yangilik 2 rasm",
    photo: "/images/texnikum.png",
    date: "2024-02-05",
    preview: "O‘quv jarayonidagi yangiliklar va talabalar uchun yangi imkoniyatlar.",
    content:
      "O‘quv jarayonida bir qator zamonaviy yondashuvlar joriy etildi.\n\nLaboratoriya va amaliy mashg‘ulotlar ko‘lamini kengaytirish bo‘yicha ishlar davom etmoqda.\n\nTalabalar uchun motivatsion dasturlar ham yo‘lga qo‘yildi.",
  },
];

