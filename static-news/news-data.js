// News data array - add new news items here
const newsData = [
  {
    id: 1,
    slug: "yangi-oquv-yili-boshladi",
    title: "Yangi 2024-2025 o'quv yili boshlandi",
    previewText: "Shahrisabz Tibbiyot Texnikumida yangi o'quv yili tantanali ravishda ochildi. Talabalar va o'qituvchilar yangi bilimlar va muvaffaqiyatlar tilaydi.",
    fullText: "Shahrisabz Tibbiyot Texnikumida 2024-2025 o'quv yili tantanali ravishda ochildi. Bu yil texnikumimiz yangi imkoniyatlar va zamonaviy o'quv dasturlarini taklif etadi.\n\nTalabalar yangi o'quv yilida nazariy bilimlar va amaliy ko'nikmalarni birgalikda o'rganadigan bo'lishadi. Bizning maqsadimiz - har bir talabani yuqori malakali mutaxassis etib tayyorlash.\n\nTexnikumimizda Hamshiralik ishi, Farmatsiya ishi va Davolash ishi yo'nalishlari bo'yicha chuqur bilim beriladi. Bitiruvchilar esa sog'liqni saqlash tizimida muvaffaqiyatli faoliyat yuritishlari mumkin.",
    date: "2024-09-01",
    image: "../images/building.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: 2,
    slug: "talabalar-amaliyoti",
    title: "Talabalar amaliyoti - Shahrisabz shifoxonasida",
    previewText: "Bizning talabalar amaliyot davomida Shahrisabz shifoxonasida haqiqiy tibbiyot muhitida ishlamoqda. Bu ularga kelajakdagi kasblarida muhim tajriba beradi.",
    fullText: "Shahrisabz Tibbiyot Texnikumi talabalari har yili Shahrisabz shifoxonasida amaliyot o'tashadi. Bu ularga haqiqiy tibbiyot muhitida ishlash tajribasini beradi.\n\nAmaliyot davomida talabalar:\n- Bemorlar bilan ishlashni o'rganadilar\n- Tibbiy hujjatlarni to'ldiradilar\n- Shifokorlar va hamshiralar bilan hamkorlik qiladilar\n- Turli tibbiy protseduralarni bajaradilar\n\nBu tajriba ularning kasbiy ko'nikmalarini rivojlantirishda muhim rol o'ynaydi.",
    date: "2024-08-15",
    image: "../images/student-practice.jpg"
  },
  {
    id: 3,
    slug: "oqituvchilar-kuni",
    title: "O'qituvchilar kuni - 1 Oktabr",
    previewText: "1 oktabr - O'qituvchilar kuni munosabati bilan Shahrisabz Tibbiyot Texnikumida tantana o'tkazildi. Barcha o'qituvchilarga hurmat va minnatdorchilik!",
    fullText: "1 oktabr kuni O'qituvchilar kunisi nishonlandi. Shahrisabz Tibbiyot Texnikumida bu kunni nishonlash uchun maxsus tadbir o'tkazildi.\n\nTadbirda texnikum direktori, o'qituvchilar va talabalar ishtirok etdi. O'qituvchilarga diplomlar va esdalik sovg'alar topshirildi.\n\nBizning o'qituvchilar - tajribali va malakali mutaxassislar. Ular nafaqat nazariy bilimlarni, balki amaliy ko'nikmalarni ham o'rgatadilar. Ularning mehnati bizning eng katta boyligimizdir.",
    date: "2024-10-01",
    image: "../images/teacher-day.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: 4,
    slug: "navruz-bayrami",
    title: "Navruz bayrami nishonlandi",
    previewText: "Shahrisabz Tibbiyot Texnikumida Navruz bayrami tantanali ravishda nishonlandi. Talabalar va o'qituvchilar bayramona kayfiyatda bayramlashdi.",
    fullText: "Navruz bayrami - yangi yilning kelishi va tabiatning uyg'onishini nishonlash bayramidir. Bu yil ham Shahrisabz Tibbiyot Texnikumida bu bayramni nishonlash uchun tadbir o'tkazildi.\n\nTalabalar va o'qituvchilar birgalikda:\n- Milliy taomlar tayyorladilar\n- An'anaviy o'yinlar o'ynadilar\n- Qo'shiqlar kuirladilar\n- Bayramona shovqin solishdi\n\nBunday tadbirlar talabalar o'rtasida do'stona munosabatlarni mustahkamlashda muhim rol o'ynaydi.",
    date: "2024-03-21",
    image: "../images/navruz.jpg"
  },
  {
    id: 5,
    slug: "qabul-kampaniyasi",
    title: "2025-yilgi qabul kampaniyasi boshlandi",
    previewText: "Shahrisabz Tibbiyot Texnikumi 2025-yilgi qabul kampaniyasini e'lon qiladi. Sog'liqni saqlash sohasida kelajakingizni quring!",
    fullText: "Shahrisabz Tibbiyot Texnikumi 2025-yilgi qabul kampaniyasini e'lon qiladi!\n\nBiz quyidagi yo'nalishlarga qabul qilamiz:\n1. Hamshiralik ishi (3 yillik)\n2. Hamshiralik ishi (2 yillik)\n3. Farmatsiya ishi (3 yillik)\n4. Davolash ishi / Feldsher (3 yillik)\n\nQabul suhbat asosida amalga oshiriladi. Kelishingizni kutib qolamiz!\n\nBizning afzalliklarimiz:\n- Malakali pedagoglar\n- Zamonaviy laboratoriyalar\n- Amaliyot imkoniyatlari\n- Qulay muhit",
    date: "2024-12-01",
    image: "../images/texnikum.jpg"
  },
  {
    id: 6,
    slug: "bitiruv-marosimi",
    title: "2024-yil bitiruv marosimi",
    previewText: "Shahrisabz Tibbiyot Texnikumida 2024-yil bitiruv marosimi o'tkazildi. Barcha bitiruvchilarga kelajakdagi kasblarida muvaffaqiyat tilaymiz!",
    fullText: "2024-yil bitiruv marosimi tantanali ravishda o'tkazildi. Bu yil 318 nafar talaba texnikumimizni muvaffaqiyatli bitirib, diplomlarni qo'lga kiritdi.\n\nBitiruv marosimida:\n- Texnikum direktori nutq so'zladi\n- Bitiruvchilarga diplomlar topshirildi\n- Eng yaxshi talabalar taqdirlandi\n- Bayramona dastur taqdim etildi\n\nBiz barcha bitiruvchilarga sog'liqlikni saqlash sohasida muvaffaqiyat tilaymiz! Ular endi mustaqil mutaxassis sifatida faoliyat yuritadilar.",
    date: "2024-06-15",
    image: "../images/students.jpg"
  }
];

// Navigation links
const navLinks = [
  { label: "Bosh sahifa", href: "index.html" },
  { label: "Yangiliklar", href: "news.html" },
  { label: "Biz haqimizda", href: "about.html" },
  { label: "Aloqa", href: "contact.html" }
];

// Format date to Uzbek locale
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('uz-UZ', options);
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { newsData, navLinks, formatDate };
}
