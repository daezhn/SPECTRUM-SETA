# SAETA - Producción y Live Streaming

Sitio web corporativo premium para SAETA, empresa especializada en producción audiovisual y streaming en vivo.

## 🚀 Tecnologías

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Express.js + Node.js  
- **Estilos**: Tailwind CSS + Shadcn/ui
- **Animaciones**: Framer Motion
- **Almacenamiento**: En memoria (listo para PostgreSQL)

## 🎨 Características de Diseño

- Diseño continuo estilo Accenture con contenedores translúcidos
- Paleta de colores: Rojo (0°), Violeta (270°), Negro
- Micro-animaciones premium (iconos, gradientes, carruseles)
- Modo oscuro optimizado con efectos backdrop-blur
- Carruseles auto-rotativos para testimonios y casos de éxito

## 📦 Instalación Local

```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Build de producción
npm run build

# Ejecutar build de producción localmente
npm start
```

## 🌐 Deployment a Vercel

### Paso 1: Conectar a GitHub desde Replit

1. **Abrir la pestaña de Git en Replit**
   - Haz clic en el icono de Git en la barra lateral izquierda
   - Si no ves el icono, ve a Tools → Git

2. **Conectar tu cuenta de GitHub**
   - Haz clic en "Connect to GitHub"
   - Autoriza a Replit para acceder a tu cuenta

3. **Crear repositorio nuevo**
   - Haz clic en "Create a new GitHub repository"
   - Nombre sugerido: `saeta-website`
   - Descripción: "Sitio web corporativo SAETA - Producción y Live Streaming"
   - Elige si quieres que sea público o privado

4. **Confirmar y subir archivos**
   - Replit automáticamente hará el commit inicial
   - Todos los archivos se subirán a tu nuevo repositorio en GitHub

### Paso 2: Deployment en Vercel

1. **Ir a Vercel** → [vercel.com](https://vercel.com)
   - Inicia sesión con tu cuenta de GitHub

2. **Importar proyecto**
   - Haz clic en "Add New..." → "Project"
   - Selecciona el repositorio `saeta-website` de GitHub
   - Haz clic en "Import"

3. **Configurar el proyecto**
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build` (ya está configurado)
   - **Output Directory**: `dist` (ya está configurado)
   - **Install Command**: `npm install` (ya está configurado)

4. **Variables de entorno** (opcional)
   - Si necesitas variables de entorno, agrégalas en esta sección
   - Por ahora, solo se necesita `SESSION_SECRET` si planeas usar el backend de sesiones
   - Puedes agregar: `SESSION_SECRET=tu_secreto_aqui_generado_aleatoriamente`

5. **Deploy**
   - Haz clic en "Deploy"
   - Espera 2-3 minutos mientras Vercel construye tu proyecto
   - ¡Listo! Tu sitio estará en vivo en una URL tipo `saeta-website.vercel.app`

### Paso 3: Dominio Personalizado (Opcional)

1. En el dashboard de Vercel, ve a tu proyecto
2. Haz clic en "Settings" → "Domains"
3. Agrega tu dominio personalizado (ej: `saeta.com`)
4. Sigue las instrucciones para configurar los DNS

## 🔄 Actualizaciones Automáticas

Cada vez que hagas cambios y los subas a GitHub:
1. Haz commit en Replit o directamente en GitHub
2. Vercel automáticamente detectará los cambios
3. Construirá y desplegará la nueva versión
4. En 2-3 minutos, los cambios estarán en vivo

## 📁 Estructura del Proyecto

```
saeta-website/
├── client/              # Frontend React
│   ├── src/
│   │   ├── components/  # Componentes reutilizables
│   │   ├── pages/       # Páginas de la aplicación
│   │   └── lib/         # Utilidades y configuración
│   └── index.html
├── server/              # Backend Express
│   ├── index.ts         # Punto de entrada del servidor
│   ├── routes.ts        # Rutas API
│   └── storage.ts       # Capa de almacenamiento
├── shared/              # Código compartido
│   └── schema.ts        # Esquemas y validaciones
└── dist/                # Build de producción (generado)
```

## 🎯 Secciones del Sitio

- **Video Demo Reel** - Showcase de trabajos destacados
- **Hero** - Presentación principal con estadísticas
- **¿Por qué contratar?** - 6 diferenciadores clave
- **Valor 360** - Casos de éxito y transformación
- **Servicios** - Catálogo completo de servicios
- **Galería** - Portfolio de proyectos
- **Nosotros** - Historia y certificaciones (ISO 9001:2015 en proceso)
- **Aliados Comerciales** - Meta, Google, Sony, OpenAI
- **Equipo** - Perfiles profesionales
- **Clientes** - Testimonios y carrusel
- **Contacto** - Formulario de contacto

## 🔧 Comandos Útiles

```bash
# Verificar TypeScript
npm run check

# Limpiar y reinstalar
rm -rf node_modules dist && npm install

# Ver logs de build
npm run build --verbose
```

## 📝 Notas Técnicas

- El proyecto usa almacenamiento en memoria por defecto
- La configuración de base de datos PostgreSQL está lista pero no activada
- Para activar PostgreSQL: descomentar código en `server/storage.ts` y configurar `DATABASE_URL`
- Las animaciones están optimizadas con `will-change` para mejor rendimiento

## 🆘 Solución de Problemas

### Error de build en Vercel
- Verifica que todas las dependencias estén en `dependencies` (no en `devDependencies`)
- Revisa los logs de build en el dashboard de Vercel

### Sitio en blanco después de deploy
- Asegúrate de que `vercel.json` esté en la raíz del proyecto
- Verifica que el build command sea `npm run build`

### Formulario de contacto no funciona
- Agrega la variable de entorno `SESSION_SECRET` en Vercel
- Revisa que la API esté respondiendo en `/api/contact`

## 📧 Contacto

Para soporte técnico del sitio, contacta al equipo de desarrollo SAETA.
