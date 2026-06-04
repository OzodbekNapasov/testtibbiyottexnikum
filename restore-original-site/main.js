// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
    });
  }
});

// News data
const newsData = [
  {
    id: 'qabul-shahrisabz-tibbiyot-texnikum',
    title: "Shahrisabz Tibbiyot Texnikumida qabul davom etyapti",
    date: "01.06.2026",
    image: "/images/Qabul 2026.jpg",
    excerpt: "Shahrisabz Tibbiyot Texnikumi 2026-2027 o'quv yili uchun qabulni davom ettirmoqda!",
    videoUrl: "https://www.youtube.com/embed/oeo-9zJXrwU"
  }
];

// Load and render news items
function loadNews() {
  const newsGrid = document.getElementById('newsGrid');
  
  if (!newsGrid) return;
  
  newsGrid.innerHTML = newsData.map(news => `
    <article class="news-card">
      <img src="${news.image}" alt="${news.title}" class="news-card-image">
      <div class="news-card-content">
        <p class="news-card-date">${news.date}</p>
        <h3 class="news-card-title">${news.title}</h3>
        <p class="news-card-excerpt">${news.excerpt}</p>
        <a href="news-detail.html?id=${news.id}" class="news-card-link">Batafsil &rarr;</a>
      </div>
    </article>
  `).join('');
}

// Get URL parameter
function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Export for use in other files
if (typeof window !== 'undefined') {
  window.newsData = newsData;
  window.loadNews = loadNews;
  window.getUrlParameter = getUrlParameter;
}
