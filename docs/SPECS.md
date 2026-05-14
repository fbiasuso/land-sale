# SPECS.md — Especificaciones Técnicas: Landing Page Terrenos cerca del Badén

## Información del Proyecto

| Campo           | Valor                                          |
|-----------------|------------------------------------------------|
| Tipo            | Landing Page de venta (single page)            |
| Objetivo        | Capturar leads y cerrar ventas por WhatsApp    |
| Idioma          | Español (Argentina)                            |
| Tecnologías     | HTML5, CSS3 (custom properties), Vanilla JS    |
| Librerías       | Leaflet.js, AOS.js, Google Fonts               |
| Archivos        | `index.html`, `style.css`, `main.js`           |

---

## Contenido Real (extraído del flyer)

### Producto
- **Nombre**: Terrenos cerca del Badén
- **Cantidad disponible**: 3 terrenos
- **Dimensiones**: 10 × 30 metros cada uno
- **Ubicación**: Cerca del Baden / Puente del Baden, Ruta 308, Tucumán, Argentina

### Precios
- **Precio original**: $10.000.000
- **Precio con descuento**: $7.000.000
- **Descuento**: 30% por tiempo limitado

### Características
- ✅ Opciones de financiación (planes flexibles)
- ✅ Factibilidad de conexión de agua y luz
- 📍 Acceso por Camino Vecinal
- 📍 Cerca del Puente del Baden
- 📍 Sobre Ruta 308

### Contacto
- **Teléfono / WhatsApp**: 3865-430532
- **Sitio web**: https://terrenos-cerca-del-baden.netlify.app
- **WhatsApp link**: `https://wa.me/543865430532`

---

## Estructura de Archivos

```
land-sale/
├── src/                    # Código
|   ├── index.html        # Página principal (todo en uno)
|   ├── css/                # Estilos
|   |   ├── style.css       # Estilos principales
|   ├── js/                 # Javascript
|       ├── main.js         # Lógica JS: countdown, scroll, mapa, animaciones
├── docs/                   # estandares y especificaciones de desarrollo
    ├── DESIGN.md           # Guía de diseño
    └── SPECS.md            # Este archivo
```

---

## Estructura HTML (Secciones)

```html
<header id="navbar">          <!-- Sticky nav -->
<section id="hero">           <!-- Hero fullscreen -->
<section id="oferta">         <!-- Precio + countdown -->
<section id="beneficios">     <!-- 3 tarjetas -->
<section id="terrenos">       <!-- Características lotes -->
<section id="mapa">           <!-- Mapa Leaflet -->
<!--section id="galeria"-->   <!-- [COMENTADA] Placeholder para futuro -->
<!--section id="testimonios"--> <!-- [COMENTADA] Placeholder para futuro -->
<section id="cta-final">      <!-- CTA urgencia + WhatsApp -->
<footer id="contacto">        <!-- Footer -->

<!-- Botón flotante volver arriba (esquina inferior derecha) -->
```

---

## Especificaciones por Sección

### 1. NAVBAR (sticky)
- Logo texto: "🌳 Terrenos Badén" (hace scroll al inicio al clickear)
- Links: Oferta | Beneficios | Terrenos | Ubicación
- CTA derecha: botón WhatsApp verde
- Comportamiento: fondo transparente → verde oscuro al hacer scroll (JS: `window.scrollY > 80`)
- Z-index: 1000
- Botón flotante "volver arriba" (⬆︎ redondeado, esquina inferior derecha, visible al scrollear)

### 2. HERO
- Altura: `100vh` mínimo
- Background: imagen de paisaje natural (unsplash URL o gradiente fallback)
- Overlay: `rgba(10, 30, 10, 0.6)`
- Contenido centrado:
  - Eyebrow: "Oportunidad de Inversión" (Nunito 600, uppercase, amarillo)
  - H1: "Venta de Terrenos" (Playfair Display 900, blanco)
  - Subtitle: "cerca del Badén" (Dancing Script 700, amarillo suave)
  - Descripción breve
  - 2 botones: "Ver Oferta" (CTA amarillo) + "WhatsApp" (blanco outline)
- Scroll indicator animado (chevron rebotando)

### 3. BANDA DE OFERTA
- Clip-path diagonal sobre pseudo-elemento `::before`
- Fondo: verde oscuro
- LEFT: precio original tachado animado + precio final grande
- RIGHT: countdown timer (días, horas, minutos, segundos)
- Badge "30% OFF" rotado -5deg, fondo amarillo
- Nota: "Por tiempo limitado. ¡Últimos 3 terrenos!"

### 4. BENEFICIOS (3 tarjetas)
```
[Financiación]         [Agua y Luz]           [Escritura y Docs]
Íconos SVG             Íconos SVG             Íconos SVG
Planes flexibles       Factibilidad           Todo en regla
que se adaptan         de conexión            para tu compra
```
- Grid: `repeat(3, 1fr)` desktop, 1 col mobile
- Hover: translateY(-8px) + box-shadow amarillo

### 5. CARACTERÍSTICAS DEL TERRENO
- Mosaico de datos con íconos:
  - 📐 Dimensiones: 10 × 30 mts (300 m²)
  - 🏘️ Cantidad: 3 lotes disponibles
  - 🛣️ Acceso: Camino Vecinal + Ruta 308
  - 💡 Servicios: Factibilidad agua y luz
  - 💰 Precio: $7.000.000 (financiado)
  - 📍 Zona: Cerca Puente del Baden, Tucumán

### 6. MAPA INTERACTIVO (Leaflet.js)
- Centro mapa: lat -27.630421, lng -65.693640 (zona Badén, Tucumán)
- Zoom inicial: 14
- Tile layer: OpenStreetMap
- Marcador custom: ícono pin verde con círculo pulsante
- Popup del marcador: "3 Terrenos 10×30 mts — ¡Disponibles!"
- Altura del contenedor: 450px
- Responsive: 100% ancho

### 7. GALERÍA
- **Estado**: [COMENTADA] — Placeholder para implementación futura
- Grid 2×3 con fotos de naturaleza tucumana
- Hover: zoom + overlay con texto
- Lightbox simple (CSS-only o JS básico)
- Imágenes: Unsplash URLs (naturaleza / bosque / montaña)

### 8. TESTIMONIOS
- **Estado**: [COMENTADA] — Placeholder para implementación futura
- 2-3 testimonios ficticios con foto, nombre y texto
- Estilo: tarjetas con borde izquierdo verde

### 9. CTA FINAL
- Fondo: textura de grano + color verde muy oscuro
- Badge: "¡Últimas 3 unidades disponibles!"
- H2: "¿Listo para invertir en tu futuro?"
- Subtext: "Naturaleza, tranquilidad y crecimiento. Financiación flexible. Escribinos hoy y asegurá tu lote antes de que se agoten."
- Botón WhatsApp grande con animación pulse
- Número de teléfono clickable: 3865-430532
- Garantía: "Operación segura · Documentación en regla · Sin costos ocultos"

### 10. FOOTER
- Logo + tagline
- Links de navegación
- Datos de contacto (tel, web, WhatsApp)
- Copyright: "© 2026 Terrenos cerca del Badén — Todos los derechos reservados" (centrado)

---

## Especificaciones JavaScript (main.js)

### Módulos funcionales

```js
// 1. Navbar scroll behavior
window.addEventListener('scroll', () => { ... })

// 2. Countdown timer
// Target: fecha fija 2026-08-15
function initCountdown(targetDate) { ... }
setInterval(updateCountdown, 1000)

// 3. AOS Initialization
AOS.init({ duration: 800, once: true, offset: 100 })

// 4. Leaflet Map
function initMap() {
  const map = L.map('mapa-container').setView([-27.630421, -65.693640], 14)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)
  // Marcador custom
  // Círculo de área
}

// 5. Counter animation (precio / m²)
function animateCounter(el, target, duration) { ... }
// Trigger on IntersectionObserver

// 6. Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(...)

// 7. WhatsApp tracking click
document.querySelectorAll('.whatsapp-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // gtag event opcional
    window.open('https://wa.me/543865430532?text=Hola!%20Me%20interesa%20un%20terreno%20cerca%20del%20Baden', '_blank')
  })
})
```

---

## Especificaciones CSS (style.css)

### Arquitectura CSS

```
1. Custom Properties (variables)
2. Reset & Base
3. Typography
4. Layout utilities
5. Components:
   - navbar
   - hero
   - oferta-banda
   - beneficios-grid
   - terreno-features
   - mapa-section
   - galeria-grid
   - cta-final
   - footer
6. Animations & Keyframes
7. Media Queries (mobile-first)
```

### Keyframes definidos

```css
@keyframes fadeSlideUp { ... }
@keyframes pulse { ... }
@keyframes bounce { ... }
@keyframes countIn { ... }
@keyframes shimmer { ... }
@keyframes blink { ... }
```

---

## Performance

- Imágenes: lazy loading (`loading="lazy"`)
- Fonts: `display=swap`
- CSS: una hoja de estilos, sin frameworks
- JS: sin bundler, módulo único
- Leaflet: cargado sólo cuando sección mapa entra en viewport (IntersectionObserver)

---

## Accesibilidad

- `alt` descriptivo en todas las imágenes
- Contraste AA mínimo en todos los textos
- Focus visible en todos los elementos interactivos
- `aria-label` en botones de íconos
- Headings jerarquizados (h1 → h2 → h3)

---

## SEO Básico

```html
<title>Venta de Terrenos cerca del Badén — Tucumán | 30% OFF</title>
<meta name="description" content="3 terrenos de 10×30 mts cerca del Puente del Baden, Tucumán. Precio $7.000.000 con 30% de descuento. Financiación disponible. ¡Últimas unidades!">
<meta property="og:title" content="Venta de Terrenos cerca del Badén">
<meta property="og:image" content="[imagen-hero]">
```

---

## Datos de Mapa

| Campo           | Valor                                    |
|-----------------|------------------------------------------|
| Coordenadas     | lat: -27.630421 / lng: -65.693640         |
| Zoom            | 14                                       |
| Tile provider   | OpenStreetMap (gratuito, sin API key)    |
| Marcador        | SVG custom verde + popup HTML            |
| Círculo área    | Radio 150m, color verde semitransparente |

---

## Checklist de entrega

- [x] DESIGN.md completo
- [x] SPECS.md completo  
- [ ] index.html funcional
- [ ] style.css completo
- [ ] main.js funcional
- [ ] Mapa Leaflet funcionando
- [ ] Countdown funcionando
- [ ] Responsive mobile
- [ ] Links WhatsApp correctos
