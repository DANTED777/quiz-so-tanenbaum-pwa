# 📱 Quiz Sistemas Operativos - PWA

Una Progressive Web App (PWA) interactiva sobre Sistemas Operativos basada en el libro de Tanenbaum.

## 🚀 Características

- ✅ **Instalable**: Se puede instalar como app nativa en móviles y escritorio
- ✅ **Offline**: Funciona sin conexión a internet
- ✅ **Responsive**: Optimizada para todos los dispositivos
- ✅ **Animaciones**: Efectos visuales con estética pixel art
- ✅ **Progresiva**: Mejora automáticamente según las capacidades del dispositivo

## 📦 Despliegue en GitHub Pages

### Paso 1: Crear repositorio en GitHub
1. Ve a [GitHub](https://github.com) y crea una cuenta si no tienes
2. Crea un nuevo repositorio público
3. Nombra el repositorio (ej: `quiz-sistemas-operativos`)

### Paso 2: Subir archivos
Sube todos estos archivos a tu repositorio:
- `quiz-app.html`
- `styles.css`
- `quiz-script.js`
- `quiz-data.js`
- `manifest.json`
- `sw.js`
- `*.svg` (todos los iconos)

### Paso 3: Activar GitHub Pages
1. Ve a Settings → Pages en tu repositorio
2. En "Source" selecciona "Deploy from a branch"
3. Selecciona "main" branch y "/ (root)"
4. Haz clic en "Save"

### Paso 4: Acceder a tu app
- Tu app estará disponible en: `https://tu-usuario.github.io/nombre-repositorio/quiz-app.html`
- Ejemplo: `https://juanperez.github.io/quiz-sistemas-operativos/quiz-app.html`

## 📱 Instalación en Móvil

### Android (Chrome/Edge)
1. Abre la URL en Chrome o Edge
2. Aparecerá un banner "Agregar a pantalla de inicio"
3. Toca "Agregar" o ve a Menú → "Instalar app"

### iOS (Safari)
1. Abre la URL en Safari
2. Toca el botón "Compartir" (cuadrado con flecha)
3. Selecciona "Agregar a pantalla de inicio"
4. Toca "Agregar"

### Escritorio (Chrome/Edge)
1. Abre la URL en Chrome o Edge
2. Verás un ícono de instalación en la barra de direcciones
3. Haz clic en "Instalar"

## 🌐 Alternativas de Despliegue Gratuitas

### Netlify
1. Ve a [netlify.com](https://netlify.com)
2. Arrastra la carpeta del proyecto a Netlify
3. Tu app estará disponible en una URL automática

### Vercel
1. Ve a [vercel.com](https://vercel.com)
2. Conecta tu repositorio de GitHub
3. Despliegue automático

### Firebase Hosting
1. Instala Firebase CLI: `npm install -g firebase-tools`
2. `firebase login`
3. `firebase init hosting`
4. `firebase deploy`

## 🔧 Desarrollo Local

```bash
# Servidor local simple
python -m http.server 8000

# O con Node.js
npx serve .

# Accede a: http://localhost:8000/quiz-app.html
```

## 📊 Funcionalidades

- **Quiz Interactivo**: 20 preguntas sobre Sistemas Operativos
- **Explicaciones**: Justificaciones detalladas para cada respuesta
- **Puntuación**: Sistema de scoring con umbral de aprobación
- **Revisión**: Repaso completo de respuestas al final
- **Animaciones**: Transiciones suaves y efectos visuales
- **Tema Retro**: Estética de sistemas operativos clásicos

## 🎯 Uso

1. **Inicio**: Presiona "INICIAR QUIZ"
2. **Responder**: Selecciona una opción y lee la explicación
3. **Continuar**: Presiona "CONTINUAR" para la siguiente pregunta
4. **Resultados**: Ve tu puntuación final y estado de aprobación
5. **Revisar**: Opcional - revisa todas las preguntas y respuestas

## 🛠️ Tecnologías

- **HTML5**: Estructura semántica
- **CSS3**: Animaciones y diseño responsive
- **JavaScript**: Lógica del quiz y PWA
- **Service Worker**: Funcionamiento offline
- **Web App Manifest**: Instalación como app nativa

## 📄 Licencia

Este proyecto es de uso educativo libre.

---

¡Disfruta aprendiendo Sistemas Operativos! 🎓