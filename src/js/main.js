/* =====================================================
   TERRENOS BADÉN — main.js
   ===================================================== */

// ── 1. NAVBAR SCROLL BEHAVIOR ──────────────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ── 8. BACK TO TOP BUTTON ────────────────────────────
(function() {
  const btn = document.getElementById('btn-volver');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > window.innerHeight);
  }, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// ── 2. MOBILE HAMBURGER ────────────────────────────────
const hamburger = document.querySelector('.nav-hamburger');
const navLinks  = document.querySelector('.nav-links');
const closeBtn  = document.querySelector('.nav-close-btn');

// ── 2a. Open / Close functions ──────────────────────────
function openMenu() {
  if (!hamburger || !navLinks || navLinks.classList.contains('open')) return;
  hamburger.classList.add('open');
  navLinks.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  hamburger.setAttribute('aria-label', 'Cerrar menú');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  if (!hamburger || !navLinks || !navLinks.classList.contains('open')) return;
  hamburger.classList.remove('open');
  navLinks.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.setAttribute('aria-label', 'Abrir menú');
  document.body.style.overflow = '';
}

// ── 2b. Hamburger toggle ───────────────────────────────
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    if (navLinks.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });
}

// ── 2c. Close triggers ─────────────────────────────────
// Close button
if (closeBtn) {
  closeBtn.addEventListener('click', closeMenu);
}

// Overlay background click (target is navLinks itself, not a child)
if (navLinks) {
  navLinks.addEventListener('click', function (e) {
    if (e.target === this) {
      closeMenu();
    }
  });
}

// Escape key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && navLinks && navLinks.classList.contains('open')) {
    closeMenu();
  }
});

// Close on link click inside menu
if (navLinks) {
  navLinks.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });
}

// ── 9. FOOTER LEGAL MODAL ────────────────────────────
(function() {
  const overlay = document.getElementById('modal-overlay');
  const body = overlay?.querySelector('.modal-body');
  const closeBtn = overlay?.querySelector('.modal-close');

  const content = {
    terminos: '<h2>Términos y condiciones</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>',
    privacidad: '<h2>Políticas de privacidad</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.</p>'
  };

  function openModal(key) {
    console.log('openModal llamado con:', key);
    if (!overlay || !body || !content[key]) { console.log('algo es null:', {overlay:!!overlay, body:!!body, content:!!content[key]}); return; }
    body.innerHTML = content[key];
    overlay.classList.add('open');
    console.log('clase open agregada');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!overlay) return;
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Wire links
  document.querySelectorAll('[data-modal]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      console.log('link clickeado:', this.dataset.modal);
      e.preventDefault();
      openModal(this.dataset.modal);
    });
  });

  // Close button
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  // Overlay background click
  if (overlay) overlay.addEventListener('click', function(e) {
    if (e.target === this) closeModal();
  });

  // Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && overlay?.classList.contains('open')) closeModal();
  });
})();

// ── 3. SMOOTH SCROLL ───────────────────────────────────
document.querySelectorAll('a[href^="#"]:not([data-modal])').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── 4. COUNTDOWN TIMER ─────────────────────────────────
function initCountdown() {
  // Target: 30 días desde el primer acceso (o fecha fija)
  const STORAGE_KEY = 'terrenos_countdown_end';
  //let endTime = localStorage.getItem(STORAGE_KEY);
  let endTime = new Date('2026-08-15T00:00:00').getTime();
  
console.log(endTime);
 /*  if (!endTime) {
     const future = new Date();
    future.setDate(future.getDate() + 30);
    endTime = future.getTime(); 
    console.log("nodefinida");
    try { localStorage.setItem(STORAGE_KEY, endTime); } catch(e) {}
  } */

  //endTime = parseInt(endTime);

  const elDays  = document.getElementById('cd-dias');
  const elHours = document.getElementById('cd-horas');
  const elMins  = document.getElementById('cd-minutos');
  const elSecs  = document.getElementById('cd-segundos');

  if (!elDays) return;

  function pad(n) { return String(Math.max(0, n)).padStart(2, '0'); }

  function update() {
    const now  = Date.now();
    const diff = Math.max(0, endTime - now);

    const totalSecs = Math.floor(diff / 1000);
    const days  = Math.floor(totalSecs / 86400);
    const hours = Math.floor((totalSecs % 86400) / 3600);
    const mins  = Math.floor((totalSecs % 3600) / 60);
    const secs  = totalSecs % 60;

    elDays.textContent  = pad(days);
    elHours.textContent = pad(hours);
    elMins.textContent  = pad(mins);
    elSecs.textContent  = pad(secs);
  }

  update();
  setInterval(update, 1000);
}

initCountdown();

// ── 5. COUNTER ANIMATION ───────────────────────────────
function animateCounter(el, target, duration = 1600, prefix = '', suffix = '') {
  const start = performance.now();
  const startVal = 0;

  function step(ts) {
    const elapsed  = ts - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(startVal + (target - startVal) * ease);
    el.textContent = prefix + current.toLocaleString('es-AR') + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

// ── 6. INTERSECTION OBSERVER (scroll triggers) ─────────
const observers = [];

// Counter trigger
const counterEls = document.querySelectorAll('[data-counter]');
if (counterEls.length) {
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.done) {
        entry.target.dataset.done = '1';
        const target   = parseInt(entry.target.dataset.counter);
        const prefix   = entry.target.dataset.prefix || '';
        const suffix   = entry.target.dataset.suffix || '';
        const duration = parseInt(entry.target.dataset.duration) || 1600;
        animateCounter(entry.target, target, duration, prefix, suffix);
      }
    });
  }, { threshold: 0.5 });

  counterEls.forEach(el => counterObs.observe(el));
  observers.push(counterObs);
}

// ── 7. LEAFLET MAP ─────────────────────────────────────
let mapInitialized = false;

function initMap() {
  if (mapInitialized) return;
  mapInitialized = true;

  // Coordenadas: zona Baden, Tucumán, Argentina
  const LAT = -27.630421;
  const LNG = -65.693640;

  const map = L.map('mapa-container', {
    center: [LAT, LNG],
    zoom: 15,
    zoomControl: true,
    scrollWheelZoom: false,
    attributionControl: false,
  });

  // Tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(map);

  // Custom icon SVG
  const customIcon = L.divIcon({
    className: '',
    html: `
      <div style="position:relative;width:36px;height:44px;">
        <svg viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:36px;height:44px;filter:drop-shadow(0 4px 8px rgba(0,0,0,0.35))">
          <path d="M18 0C8.06 0 0 8.06 0 18c0 12.44 18 26 18 26S36 30.44 36 18C36 8.06 27.94 0 18 0z" fill="#1e4620"/>
          <path d="M18 0C8.06 0 0 8.06 0 18c0 12.44 18 26 18 26S36 30.44 36 18C36 8.06 27.94 0 18 0z" fill="url(#pg)"/>
          <defs>
            <linearGradient id="pg" x1="0" y1="0" x2="36" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#2d6a2d"/>
              <stop offset="100%" stop-color="#0f2410"/>
            </linearGradient>
          </defs>
          <circle cx="18" cy="18" r="9" fill="#f5c518" opacity="0.95"/>
          <text x="18" y="22" text-anchor="middle" font-size="10" font-weight="bold" fill="#0f2410" font-family="Arial">3🌿</text>
        </svg>
        <div style="position:absolute;top:8px;left:50%;transform:translateX(-50%);width:20px;height:20px;border-radius:50%;border:2px solid rgba(245,197,24,0.6);animation:ripple 2s infinite;"></div>
      </div>
    `,
    iconSize: [36, 44],
    iconAnchor: [18, 44],
    popupAnchor: [0, -46],
  });

  // Popup content
  const popupContent = `
    <div class="map-popup">
      <h4>🌿 3 Terrenos disponibles</h4>
      <p>📐 10 × 30 mts (300 m² c/u)</p>
      <p>🛣️ Acceso por Camino Vecinal</p>
      <p>💡 Factibilidad agua y luz</p>
      <p class="map-precio">$ 7.000.000</p>
      <p style="font-size:0.78rem;color:#888;margin-top:4px;">Cerca del Puente del Badén · Ruta 308</p>
    </div>
  `;

  const marker = L.marker([LAT, LNG], { icon: customIcon })
    .addTo(map)
    .bindPopup(popupContent, { maxWidth: 220 });

  // Open popup by default
  marker.openPopup();

  // Circle showing approximate area
  L.circle([LAT, LNG], {
    color: '#2d6a2d',
    fillColor: '#4a8c3f',
    fillOpacity: 0.12,
    weight: 2,
    dashArray: '8,6',
    radius: 60,
  }).addTo(map);

  // Ruta 308 label approximate point
  L.marker([-27.625739, -65.684788], {
    icon: L.divIcon({
      className: '',
      html: `<div style="background:#f5c518;color:#0f2410;font-size:11px;font-weight:800;padding:3px 8px;border-radius:4px;white-space:nowrap;box-shadow:0 2px 6px rgba(0,0,0,0.3)">RUTA 308</div>`,
      iconAnchor: [30, 10],
    }), 
  }).addTo(map);
  L.marker([-27.624808, -65.697727], {
    icon: L.divIcon({
      className: '',
      html: `<div style="background:#A2CADF;color:#0f2410;font-size:11px;font-weight:800;padding:3px 8px;border-radius:4px;white-space:nowrap;box-shadow:0 2px 6px rgba(0,0,0,0.3)">CAMINO VECINAL</div>`,
      iconAnchor: [30, 10],
    })
  }).addTo(map);
 
  L.marker([-27.623620, -65.694800], {
    icon: L.divIcon({
      className: '',
      html: `<div style="background:#3fd33e;color:#0f2410;font-size:11px;font-weight:800;padding:3px 8px;border-radius:4px;white-space:nowrap;box-shadow:0 2px 6px rgba(0,0,0,0.3)">PUENTE DEL BADEN</div>`,
      iconAnchor: [30, 10],
    })
  }).addTo(map);    
}

// Load map when section is visible
const mapSection = document.getElementById('mapa');
if (mapSection) {
  const mapObs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      initMap();
      mapObs.disconnect();
    }
  }, { threshold: 0.1 });
  mapObs.observe(mapSection);
}

// ── 8. WHATSAPP BUTTONS ────────────────────────────────
const WA_NUMBER  = '543865430532';
const WA_MESSAGE = 'Hola! Me interesa un terreno cerca del Badén. ¿Pueden darme más información?';
const WA_URL     = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;

document.querySelectorAll('.whatsapp-btn, .btn-wa-grande, .mapa-cta, .btn-nav-wa').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.open(WA_URL, '_blank');
  });
});

// ── 9. AOS INIT ────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      offset: 80,
      easing: 'ease-out-cubic',
    });
  }
});

// ── 10. RIPPLE ANIMATION (CSS injection for map) ───────
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    0%   { transform: translateX(-50%) scale(1); opacity: 0.7; }
    100% { transform: translateX(-50%) scale(3); opacity: 0; }
  }
`;
document.head.appendChild(style);

// ── 11. GALERÍA LIGHTBOX ───────────────────────────────
const galeriaItems = document.querySelectorAll('.galeria-item');

// Simple lightbox
let lightbox = null;

function createLightbox() {
  lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  lightbox.style.cssText = `
    position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.92);
    display:flex;align-items:center;justify-content:center;
    opacity:0;transition:opacity 0.3s ease;cursor:pointer;
  `;
  lightbox.innerHTML = `
    <button id="lb-close" style="position:absolute;top:20px;right:24px;background:none;border:none;color:#fff;font-size:2rem;cursor:pointer;line-height:1;">×</button>
    <img id="lb-img" src="" alt="" style="max-width:90vw;max-height:85vh;border-radius:8px;box-shadow:0 20px 60px rgba(0,0,0,0.5);transition:transform 0.3s ease;">
  `;
  document.body.appendChild(lightbox);

  lightbox.addEventListener('click', closeLightbox);
  document.getElementById('lb-close').addEventListener('click', closeLightbox);
}

function openLightbox(src, alt) {
  if (!lightbox) createLightbox();
  const img = document.getElementById('lb-img');
  img.src = src;
  img.alt = alt || '';
  lightbox.style.display = 'flex';
  requestAnimationFrame(() => { lightbox.style.opacity = '1'; });
  document.body.style.overflow = 'hidden';
}

function closeLightbox(e) {
  if (e.target === lightbox || e.target.id === 'lb-close') {
    lightbox.style.opacity = '0';
    setTimeout(() => {
      lightbox.style.display = 'none';
      document.body.style.overflow = '';
    }, 300);
  }
}

galeriaItems.forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    if (img) openLightbox(img.src, img.alt);
  });
  item.style.cursor = 'pointer';
});

// ── 12. PRICE STRIKE ANIMATION ─────────────────────────
const precioOriginalEl = document.querySelector('.precio-original');

if (precioOriginalEl) {
  const strikeObs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      precioOriginalEl.style.animation = 'none';
      // Trigger reflow
      void precioOriginalEl.offsetWidth;
      strikeObs.disconnect();
    }
  }, { threshold: 0.8 });
  strikeObs.observe(precioOriginalEl);
}

// ── 13. CONSOLE BRANDING ───────────────────────────────
console.log('%c🌿 Terrenos cerca del Badén', 'color:#f5c518;background:#0f2410;font-size:16px;font-weight:bold;padding:8px 16px;border-radius:4px;');
console.log('%cInvertí hoy en tu futuro. Naturaleza, tranquilidad y crecimiento.', 'color:#4a8c3f;font-size:12px;');
