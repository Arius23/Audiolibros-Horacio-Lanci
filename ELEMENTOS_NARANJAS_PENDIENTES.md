# Elementos Naranjas - Pendientes de Modificación

## Ubicaciones de Elementos Naranjas/Dorados en el Código

### 1. Variables CSS - src/index.css
**Líneas 23-28:**
```css
--primary: 28 80% 52%;                  /* #d97706 - Dorado vintage */
--secondary: 25 60% 45%;                /* #a16207 - Bronce oscuro */
--accent: 15 75% 55%;                   /* #dc6316 - Cobre */
--ring: 28 80% 52%;                     /* #d97706 - Anillos de foco (dorado) */
--sidebar-primary: 28 80% 52%;         /* #d97706 */
--sidebar-ring: 28 80% 52%;            /* #d97706 */
```

### 2. Componentes que Usan Colores Naranjas/Dorados

#### HeroSection.tsx
- **Línea ~80:** `bg-gradient-to-r from-amber-400 to-orange-500` - Badge "Completamente Gratuito"
- **Línea ~83:** `from-amber-400 via-orange-500 to-purple-400` - Texto "Dominio Público"
- **Línea ~87:** `text-amber-400` - Nombre "Maestro Horacio Lanci"
- **Línea ~101:** `border-amber-400/20` - Borde de estadísticas
- **Línea ~106:** `text-amber-300` - Texto activo en estadísticas
- **Línea ~119:** `from-amber-400 via-orange-500 to-amber-600` - Botón "Explorar Audioteca"
- **Línea ~139:** `border-2 border-amber-400` - Avatar de Horacio

#### Footer.tsx
- **Línea 14:** `from-amber-400 to-orange-500` - Ícono del logo
- **Líneas 43, 75:** `text-amber-300` - Títulos de secciones
- **Línea 112:** `border-amber-400/30` - Borde de separación
- **Líneas 115, 119, 123, 127:** `text-amber-300` - Números en estadísticas
- **Líneas 114, 118, 122, 126:** `border-primary/20` - Bordes de cajas

#### Header.tsx
- **Línea 77:** `focus:ring-amber-400` - Anillo de foco en buscador
- **Línea 125:** `border-amber-400/30` - Bordes de botones
- **Líneas 99, 121, 131, 137:** `bg-amber-500` - Botones activos

#### AudiolibroCard.tsx
- **Línea 103:** `border-primary` - Borde de imagen destacada
- **Línea 138:** `text-primary` - Texto de duración
- **Línea 162:** `bg-primary` - Background de botón reproducir

#### Páginas de Biblioteca
- **BibliotecaTodos.tsx:** Múltiples elementos amber en filtros y controles de vista
- **Colecciones.tsx:** Iconos y gradientes con colores primary/secondary

## Acción Requerida

**NOTA IMPORTANTE:** La imagen proporcionada para el color naranja no muestra claramente el texto 'Horacio Lanci' en naranja como se esperaba. 

### Próximos Pasos:
1. **Confirmar el color exacto** que debe usarse para reemplazar los elementos naranjas/dorados
2. **Determinar si se mantiene el esquema dorado vintage** o se cambia completamente
3. **Especificar qué elementos específicos** necesitan cambio de color

### Elementos Principales a Cambiar:
- Variables CSS principales (`--primary`, `--secondary`, `--accent`)
- Gradientes en HeroSection
- Bordes y elementos de acento
- Texto destacado del nombre "Horacio Lanci"
- Botones principales

## Estado Actual
- ✅ Background de header en Sobre Horacio agregado
- ✅ Limpieza del header en Inicio completada
- ⏳ **Cambio de color naranja PENDIENTE de confirmación**