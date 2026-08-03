# Dulce Atelier

Sitio estático de React + TypeScript + Vite para una pastelería boutique. El carrito persiste en `localStorage` y la solicitud se abre en WhatsApp; no hay pagos online ni backend.

## Ejecutar y compilar

```bash
npm install
npm run dev
npm run build
```

Para Cloudflare Pages: conectá el repositorio, usá `npm run build` como comando de compilación y `dist` como directorio de salida. No requiere variables de entorno.

## Personalización

- Datos del negocio, WhatsApp, envío, Instagram y agencia: `src/config/business.ts`.
- Productos, categorías, precios, opciones, extras y anticipación: `src/data/products.ts`.
- Paleta, tipografías y apariencia: `src/index.css`.
- Textos del hero, proceso, FAQ y contacto: `src/App.tsx`.
- Mensaje de WhatsApp: `src/utils/whatsapp.ts`.

Reemplazá `ACÁ_PONÉ_TU_NÚMERO_DE_WHATSAPP` por números con código de país y sin signos, por ejemplo `5491112345678`.

## Imágenes

Las rutas quedan centralizadas en `src/data/products.ts` y `src/App.tsx`. Los recursos deben estar en `public/images/hero`, `public/images/products` y `public/images/gallery`. Consultá `IMAGE_PROMPTS.md` para generar o reemplazar las imágenes manteniendo la dirección artística.
