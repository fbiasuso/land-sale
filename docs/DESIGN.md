# DESIGN.md — Landing Page: Venta de Terrenos cerca del Badén

## Concepto Visual

**Dirección estética**: Orgánica / Natural con toques de urgencia comercial  
**Tono**: Aspiracional-terrateniente. La página debe evocar la promesa de invertir en naturaleza: tierra real, aire fresco, tranquilidad. Al mismo tiempo, comunicar urgencia de venta con energía visual fuerte.  
**Diferenciador**: Un hero inmersivo con paisaje natural (video o imagen de fondo con efecto parallax), secciones con máscara diagonal que rompen la grilla convencional, y un contador de urgencia visible.

---

## Paleta de Colores

```css
:root {
  /* Primarios - tomados del flyer */
  --color-verde-oscuro:   #1a3a1a;   /* verde bosque profundo */
  --color-verde-medio:    #2d5a27;   /* verde principal */
  --color-verde-claro:    #4a7c3f;   /* verde hoja */
  --color-amarillo:       #f5c518;   /* amarillo acento vibrante */
  --color-amarillo-suave: #fde87a;   /* amarillo claro para texto sobre oscuro */

  /* Neutros */
  --color-crema:          #f5f0e8;   /* fondo claro cálido */
  --color-tierra:         #c4a882;   /* tierra / arena */
  --color-blanco:         #ffffff;
  --color-negro:          #0d1a0d;

  /* Semánticos */
  --color-precio:         #f5c518;
  --color-urgencia:       #e63946;   /* rojo para CTA de urgencia */
  --color-sombra:         rgba(0,0,0,0.35);

  /* Gradientes */
  --grad-hero:    linear-gradient(180deg, rgba(10,30,10,0.55) 0%, rgba(26,58,26,0.80) 100%);
  --grad-seccion: linear-gradient(135deg, #1a3a1a 0%, #2d5a27 60%, #4a7c3f 100%);
  --grad-cta:     linear-gradient(90deg, #f5c518 0%, #fde87a 100%);
}
```

---

## Tipografía

| Rol              | Familia                   | Peso    | Uso                              |
|------------------|---------------------------|---------|----------------------------------|
| Display / Hero   | **Playfair Display**      | 900     | Títulos grandes, "TERRENOS"      |
| Script / Elegante| **Dancing Script**        | 700     | "cerca del Badén", subtítulos    |
| Body / UI        | **Nunito**                | 400/600/700 | Cuerpo, etiquetas, botones   |
| Precio / Énfasis | **Oswald**                | 700     | Números de precio, % descuento   |

Fuentes via Google Fonts:
```
https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Dancing+Script:wght@700&family=Nunito:wght@400;600;700;800&family=Oswald:wght@700&display=swap
```

---

## Estructura de Secciones

```
1. HEADER / NAV          — Sticky, logo + WhatsApp CTA
2. HERO                  — Fullscreen, imagen parallax, título principal
3. OFERTA PRECIO         — Banda diagonal, precio tachado → precio descuento + countdown
4. BENEFICIOS            — 3 tarjetas: Financiación / Agua y Luz / Escritura
5. CARACTERÍSTICAS       — Detalles de los terrenos: 3 lotes 10×30 mts
6. MAPA INTERACTIVO      — Leaflet.js con marcador en la ubicación real
7. GALERÍA               — Fotos del lugar (placeholder con imágenes de naturaleza)
8. TESTIMONIOS           — 2-3 testimonios ficticios / placeholder
9. CTA FINAL             — Banner de urgencia con WhatsApp + contador de lotes
10. FOOTER               — Contacto, teléfono, web
```

---

## Layouts y Composición

### Hero (Sección 1)
- Imagen de fondo a pantalla completa con `background-attachment: fixed` (parallax CSS)
- Overlay degradado verde oscuro de abajo
- Texto centrado con animación de entrada (fade + slide up)
- Botón CTA "Ver Oferta" con scroll suave hacia precio

### Banda de Precio (Sección 2)
- Fondo verde oscuro con borde amarillo
- Clip-path diagonal en bordes superior e inferior: `polygon(0 5%, 100% 0, 100% 95%, 0 100%)`
- Precio original tachado con animación de "rayado"
- Precio final grande en amarillo con sombra de texto
- Countdown timer al lado derecho

### Tarjetas de Beneficios (Sección 3)
- 3 tarjetas en grid horizontal
- Hover: elevación + borde amarillo
- Íconos SVG custom (no Font Awesome — dibujados inline)

### Mapa (Sección 6)
- Leaflet.js centrado en: lat -26.8950, lng -65.2340 (aproximación Tucumán)
- Marcador custom con ícono de árbol/pin verde
- Popup con info del lote

### CTA Final
- Fondo con textura de grano (CSS noise filter o SVG feTurbulence)
- Botón WhatsApp verde brillante con pulso animado
- Contador de lotes restantes: "¡ÚLTIMOS 3 DISPONIBLES!"

---

## Animaciones

| Efecto                | Trigger        | Librería / Técnica              |
|-----------------------|----------------|---------------------------------|
| Hero fade-in title    | Page load      | CSS keyframes + animation-delay |
| Scroll reveal cards   | IntersectionObserver | CSS classes + JS toggle  |
| Precio tachado        | Scroll into view | CSS animation stroke-dashoffset |
| Countdown             | Continuo       | JS setInterval                  |
| WhatsApp pulse        | Continuo       | CSS keyframes @keyframes pulse  |
| Número precio up-count| Scroll into view | JS counter animation           |
| Parallax hero         | Scroll         | CSS background-attachment: fixed|
| Hover tarjetas        | Mouse hover    | CSS transform + box-shadow      |

---

## Iconografía

Íconos SVG inline para:
- 🤝 Financiación
- ⚡💧 Agua y Luz  
- 📋 Escritura/Documentación
- 📍 Ubicación
- 📞 Teléfono
- 🌳 Logo/marca

---

## Responsive Breakpoints

```
Mobile:  < 768px   — columnas únicas, hero 100vh
Tablet:  768-1024px — grids 2 columnas
Desktop: > 1024px  — layout completo
```

---

## Librerías Externas

| Librería       | Versión | CDN                                         | Uso               |
|----------------|---------|---------------------------------------------|-------------------|
| Leaflet.js     | 1.9.4   | `https://unpkg.com/leaflet@1.9.4/`          | Mapa interactivo  |
| AOS.js         | 2.3.4   | `https://cdn.jsdelivr.net/npm/aos@2.3.4/`   | Scroll animations |
| Google Fonts   | —       | `https://fonts.googleapis.com/`             | Tipografía        |

---

## Filosofía de Diseño

> La página debe sentirse como entrar a una inmobiliaria de lujo natural —  
> no una panfleto de feria. Confianza + urgencia + naturaleza.

