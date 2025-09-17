# Horacio Lanci Audiolibros - Sitio Web Completo

## 🌐 URL del Sitio en Vivo
**URL Principal:** https://6reovv9o34zr.space.minimax.io

✅ **Estado:** Funcional y completamente operativo
✅ **Integración YouTube:** Activa y sincronizando
✅ **Diseño Original:** Mantenido íntegramente

---

## 📁 Estructura del Proyecto

### Archivos Principales
- **`src/`** - Código fuente de React/TypeScript
- **`public/`** - Archivos estáticos (imágenes, datos)
- **`dist/`** - Build de producción listo para deployment
- **`node_modules/`** - Dependencias npm (incluidas en el paquete)
- **`supabase/`** - Configuración de backend y funciones edge

### Integración YouTube Implementada
- ✅ Tablas de Supabase: `youtube_videos` y `youtube_statistics`
- ✅ Función Edge: `sync-youtube` (sincronización automática)
- ✅ Cron Job: Ejecuta diariamente para actualizar datos
- ✅ Frontend: Consumo dinámico de datos desde Supabase
- ✅ Filtrado: Excluye videos con "un viaje al interior de la música"

---

## 🚀 Instrucciones de Instalación Local

### Opción 1: Usar Build de Producción (Recomendado)
```bash
# 1. Extraer archivos del paquete
# 2. Navegar a la carpeta dist/
cd horacio-lanci-audiolibros/dist

# 3. Servir archivos estáticos (elegir una opción)
# Con Python:
python -m http.server 8000

# Con Node.js:
npx serve .

# Con PHP:
php -S localhost:8000

# 4. Abrir en navegador: http://localhost:8000
```

### Opción 2: Modo Desarrollo
```bash
# 1. Navegar al directorio principal
cd horacio-lanci-audiolibros

# 2. Instalar dependencias (si node_modules no está incluido)
npm install
# o
pnpm install

# 3. Ejecutar servidor de desarrollo
npm run dev
# o
pnpm dev

# 4. Abrir en navegador: http://localhost:5173
```

---

## 📤 Subida al Hosting/FTP

### Para subir al hosting:
1. **Usar archivos de la carpeta `dist/`** (build de producción)
2. **Subir toda la carpeta `dist/` al directorio raíz del hosting**
3. **Asegurar que `index.html` esté en la raíz del hosting**

### Estructura en el servidor:
```
tu-hosting.com/
├── index.html
├── assets/
│   ├── index-*.css
│   └── index-*.js
├── images/
├── data/
└── charts/
```

---

## 🔧 Características Técnicas

### Frontend
- **Framework:** React 18 + TypeScript
- **Styling:** TailwindCSS
- **Build Tool:** Vite
- **Estado:** Context API + Custom Hooks
- **Routing:** React Router DOM

### Backend (Supabase)
- **Base de Datos:** PostgreSQL
- **API:** Supabase REST API
- **Funciones:** Supabase Edge Functions (Deno)
- **Cron Jobs:** pg_cron para sincronización automática

### APIs Externas
- **YouTube Data API v3:** Para obtener datos del canal
- **Filtrado Automático:** Excluye contenido no deseado

---

## 📊 Estadísticas Actuales (Dinámicas)

- **📚 Audiolibros:** 45+ (actualizado automáticamente)
- **⏰ Horas de Contenido:** 238+ (sincronizado diariamente)
- **👀 Reproducciones:** 1M+ (datos en tiempo real)
- **✍️ Autores:** 24 (catálogo dinámico)

---

## 🛠️ Mantenimiento y Soporte

### Sincronización Automática
- **Frecuencia:** Diaria (automática)
- **Filtrado:** Automático de contenido no deseado
- **Actualizaciones:** Sin intervención manual requerida

### Estructura de Datos
- **Videos:** Almacenados en `youtube_videos`
- **Estadísticas:** Calculadas en `youtube_statistics`
- **Backup:** Datos locales como fallback

### Resolución de Problemas
1. **Si no cargan estadísticas:** Verificar conexión a Supabase
2. **Si faltan videos:** Revisar filtros de contenido
3. **Si hay errores de consola:** Revisar configuración de API keys

---

## 📋 Notas Importantes

1. **Diseño Original Preservado:** Toda la estética y funcionalidad original se mantiene intacta
2. **Solo Mejoras de Datos:** Los únicos cambios son las estadísticas dinámicas y enlaces a YouTube
3. **Compatible con Hosting:** Funciona en cualquier servidor web estándar
4. **SEO Optimizado:** Mantiene todas las optimizaciones SEO existentes
5. **Responsive:** Completamente adaptado a móviles y escritorio

---

## ✅ Lista de Verificación Post-Instalación

- [ ] Sitio carga correctamente en localhost
- [ ] Estadísticas muestran datos dinámicos
- [ ] Enlaces a YouTube funcionan
- [ ] Navegación entre páginas operativa
- [ ] Diseño responsive en móvil
- [ ] No hay errores críticos en consola

**¡El sitio está listo para producción!** 🎉