// Main JavaScript for Static News Website

// Load news data
const newsData = [
  {
    id: 1,
    slug: "yangi-oquv-yili-boshladi",
    title: "Yangi 2024-2025 o'quv yili boshlandi",
    previewText: "Shahrisabz Tibbiyot Texnikumida yangi o'quv yili tantanali ravishda ochildi. Talabalar va o'qituvchilar yangi bilimlar va muvaffaqiyatlar tilaydi.",
    fullText: "Shahrisabz Tibbiyot Texnikumida 2024-2025 o'quv yili tantanali ravishda ochildi. Bu yil texnikumimiz yangi imkoniyatlar va zamonaviy o'quv dasturlarini taklif etadi.\n\nTalabalar yangi o'quv yilida nazariy bilimlar va amaliy ko'nikmalarni birgalikda o'rganadigan bo'lishadi. Bizning maqsadimiz - har bir talabani yuqori malakali mutaxassis etib tayyorlash.\n\nTexnikumimizda Hamshiralik ishi, Farmatsiya ishi va Davolash ishi yo'nalishlari bo'yicha chuqur bilim beriladi. Bitiruvchilar esa sog'liqni saqlash tizimida muvaffaqiyatli faoliyat yuritishlari mumkin.",
    date: "2024-09-01",
    image: "images/building.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: 2,
    slug: "talabalar-amaliyoti",
    title: "Talabalar amaliyoti - Shahrisabz shifoxonasida",
    previewText: "Bizning talabalar amaliyot davomida Shahrisabz shifoxonasida haqiqiy tibbiyot muhitida ishlamoqda. Bu ularga kelajakdagi kasblarida muhim tajriba beradi.",
    fullText: "Shahrisabz Tibbiyot Texnikumi talabalari har yili Shahrisabz shifoxonasida amaliyot o'tashadi. Bu ularga haqiqiy tibbiyot muhitida ishlash tajribasini beradi.\n\nAmaliyot davomida talabalar:\n- Bemorlar bilan ishlashni o'rganadilar\n- Tibbiy hujjatlarni to'ldiradilar\n- Shifokorlar va hamshiralar bilan hamkorlik qiladilar\n- Turli tibbiy protseduralarni bajaradilar\n\nBu tajriba ularning kasbiy ko'nikmalarini rivojlantirishda muhim rol o'ynaydi.",
    date: "2024-08-15",
    image: "images/student-practice.jpg"
  },
  {
    id: 3,
    slug: "oqituvchilar-kuni",
    title: "O'qituvchilar kuni - 1 Oktabr",
    previewText: "1 oktabr - O'qituvchilar kuni munosabati bilan Shahrisabz Tibbiyot Texnikumida tantana o'tkazildi. Barcha o'qituvchilarga hurmat va minnatdorchilik!",
    fullText: "1 oktabr kuni O'qituvchilar kunisi nishonlandi. Shahrisabz Tibbiyot Texnikumida bu kunni nishonlash uchun maxsus tadbir o'tkazildi.\n\nTadbirda texnikum direktori, o'qituvchilar va talabalar ishtirok etdi. O'qituvchilarga diplomlar va esdalik sovg'alar topshirildi.\n\nBizning o'qituvchilar - tajribali va malakali mutaxassislar. Ular nafaqat nazariy bilimlarni, balki amaliy ko'nikmalarni ham o'rgatadilar. Ularning mehnati bizning eng katta boyligimizdir.",
    date: "2024-10-01",
    image: "images/teacher-day.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: 4,
    slug: "navruz-bayrami",
    title: "Navruz bayrami nishonlandi",
    previewText: "Shahrisabz Tibbiyot Texnikumida Navruz bayrami tantanali ravishda nishonlandi. Talabalar va o'qituvchilar bayramona kayfiyatda bayramlashdi.",
    fullText: "Navruz bayrami - yangi yilning kelishi va tabiatning uyg'onishini nishonlash bayramidir. Bu yil ham Shahrisabz Tibbiyot Texnikumida bu bayramni nishonlash uchun tadbir o'tkazildi.\n\nTalabalar va o'qituvchilar birgalikda:\n- Milliy taomlar tayyorladilar\n- An'anaviy o'yinlar o'ynadilar\n- Qo'shiqlar kuirladilar\n- Bayramona shovqin solishdi\n\nBunday tadbirlar talabalar o'rtasida do'stona munosabatlarni mustahkamlashda muhim rol o'ynaydi.",
    date: "2024-03-21",
    image: "images/navruz.jpg"
  },
  {
    id: 5,
    slug: "qabul-kampaniyasi",
    title: "2025-yilgi qabul kampaniyasi boshlandi",
    previewText: "Shahrisabz Tibbiyot Texnikumi 2025-yilgi qabul kampaniyasini e'lon qiladi. Sog'liqni saqlash sohasida kelajakingizni quring!",
    fullText: "Shahrisabz Tibbiyot Texnikumi 2025-yilgi qabul kampaniyasini e'lon qiladi!\n\nBiz quyidagi yo'nalishlarga qabul qilamiz:\n1. Hamshiralik ishi (3 yillik)\n2. Hamshiralik ishi (2 yillik)\n3. Farmatsiya ishi (3 yillik)\n4. Davolash ishi / Feldsher (3 yillik)\n\nQabul suhbat asosida amalga oshiriladi. Kelishingizni kutib qolamiz!\n\nBizning afzalliklarimiz:\n- Malakali pedagoglar\n- Zamonaviy laboratoriyalar\n- Amaliyot imkoniyatlari\n- Qulay muhit",
    date: "2024-12-01",
    image: "images/texnikum.jpg"
  },
  {
    id: 6,
    slug: "bitiruv-marosimi",
    title: "2024-yil bitiruv marosimi",
    previewText: "Shahrisabz Tibbiyot Texnikumida 2024-yil bitiruv marosimi o'tkazildi. Barcha bitiruvchilarga kelajakdagi kasblarida muvaffaqiyat tilaymiz!",
    fullText: "2024-yil bitiruv marosimi tantanali ravishda o'tkazildi. Bu yil 318 nafar talaba texnikumimizni muvaffaqiyatli bitirib, diplomlarni qo'lga kiritdi.\n\nBitiruv marosimida:\n- Texnikum direktori nutq so'zladi\n- Bitiruvchilarga diplomlar topshirildi\n- Eng yaxshi talabalar taqdirlandi\n- Bayramona dastur taqdim etildi\n\nBiz barcha bitiruvchilarga sog'liqlikni saqlash sohasida muvaffaqiyat tilaymiz! Ular endi mustaqil mutaxassis sifatida faoliyat yuritadilar.",
    date: "2024-06-15",
    image: "images/students.jpg"
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

// Render navigation
function renderNav() {
  const navContainer = document.getElementById('navbar');
  if (!navContainer) return;

  // Get current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  // Build nav HTML
  let navHTML = `
    <div class="container">
      <a href="index.html" class="logo">
        <div class="logo-img">ST</div>
        <span>Shahrisabz Tibbiyot</span>
      </a>
      <button class="menu-toggle" onclick="toggleMenu()">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul class="nav-menu" id="nav-menu">
        ${navLinks.map(link => `
          <li><a href="${link.href}" class="${link.href === currentPage ? 'active' : ''}">${link.label}</a></li>
        `).join('')}
      </ul>
    </div>
  `;
  navContainer.innerHTML = navHTML;
}

// Toggle mobile menu
function toggleMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  menuToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
}

// Render footer
function renderFooter() {
  const footerContainer = document.getElementById('footer');
  if (!footerContainer) return;

  footerContainer.innerHTML = `
    <div class="container">
      <p>&copy; 2024 Shahrisabz Tibbiyot Texnikumi. Barcha huquqlar himoyalangan.</p>
    </div>
  `;
}

// Render news grid
function renderNewsGrid() {
  const newsGrid = document.getElementById('news-grid');
  if (!newsGrid) return;

  newsGrid.innerHTML = newsData.map(news => `
    <article class="news-card">
      <img src="${news.image}" alt="${news.title}" class="news-card-image" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 200%22><rect fill=%22%230b1220%22 width=%22400%22 height=%22200%22/><text fill=%22%2394a3b8%22 x=%22200%22 y=%22100%22 text-anchor=%22middle%22>Yangilik rasmi</text></svg>'">
      <div class="news-card-content">
        <div class="news-card-date">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          ${formatDate(news.date)}
        </div>
        <h3>${news.title}</h3>
        <p>${news.previewText}</p>
        <a href="news-detail.html?slug=${news.slug}" class="btn-read-more">
          Davomini o'qish
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </a>
      </div>
    </article>
  `).join('');
}

// Render news detail
function renderNewsDetail() {
  const detailContainer = document.getElementById('news-detail');
  if (!detailContainer) return;

  // Get slug from URL
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('slug');
  
  const news = newsData.find(n => n.slug === slug);
  
  if (!news) {
    detailContainer.innerHTML = `
      <a href="news.html" class="back-btn">
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        Orqaga qaytish
      </a>
      <h1>Yangilik topilmadi</h1>
      <p>Bu sahifa mavjud emas.</p>
    `;
    return;
  }

  const videoSection = news.videoUrl ? `
    <div class="video-container">
      <h3>Video materiallar</h3>
      <div class="video-wrapper">
        <iframe src="${news.videoUrl}" allowfullscreen></iframe>
      </div>
    </div>
  ` : '';

  detailContainer.innerHTML = `
    <a href="news.html" class="back-btn">
      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
      </svg>
      Yangiliklar ro'yxatiga qaytish
    </a>
    <div class="news-detail-header">
      <div class="news-detail-date">
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
        ${formatDate(news.date)}
      </div>
      <h1>${news.title}</h1>
    </div>
    <img src="${news.image}" alt="${news.title}" class="news-detail-image" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 800 400%22><rect fill=%22%230b1220%22 width=%22800%22 height=%22400%22/><text fill=%22%2394a3b8%22 x=%22400%22 y=%22200%22 text-anchor=%22middle%22>Yangilik rasmi</text></svg>'">
    <div class="news-detail-content">
      <p>${news.fullText}</p>
    </div>
    ${videoSection}
  `;
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  renderNav();
  renderFooter();
  
  // Render page-specific content
  if (document.getElementById('news-grid')) {
    renderNewsGrid();
  }
  if (document.getElementById('news-detail')) {
    renderNewsDetail();
  }
});
