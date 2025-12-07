# Gotcha - Networking Speed-Dating App

**Demo funcional**

Conecta con propósito.

---

## Inicio Rápido

### Opción 1: Abrir directamente (Recomendado)
1. Navega a la carpeta `gotcha/`
2. Abre `index.html` en tu navegador (Chrome, Firefox, o Safari)
3. ¡Listo! El demo está funcionando

### Opción 2: Servidor Local (Opcional)
```bash
cd gotcha
python3 -m http.server 8000
# Luego abre: http://localhost:8000
```

---

## Estructura del Proyecto

```
gotcha/
├── index.html          # Página de inicio con selección de usuario
├── dashboard.html      # Dashboard del usuario con perfil y XP
├── group.html          # Pantalla de identificación con color de grupo
├── app.js              # Lógica: datos, matching, navegación
├── styles.css          # Design system y estilos custom
└── README.md           # Este archivo
```

---

## Cómo Usar el Demo

### Flujo Completo (3 minutos)

1. **Inicio** → Selecciona un usuario (ej: Ana García)
2. **Dashboard** → Revisa el perfil, nivel y XP actual
3. **Ver Grupo** → Click en "Ver mi Grupo Asignado"
4. **Identificación** → Pantalla se vuelve de un color único (ej: Coral)
5. **Ver Miembros** → Expande la lista para ver tu grupo (3 personas con alta afinidad)
6. **Confirmar Conexión** → Click en el botón flotante
7. **¡Éxito!** → Modal muestra +100 XP ganados (y posible level up)

---

## Algoritmo de Matching

El sistema calcula **afinidad** entre usuarios basándose en:

- **50%** - Intereses (Conocer talento, Colaboración, etc.)
- **30%** - Capacidades (Full-stack, Diseño, Backend, etc.)
- **20%** - Gustos (Gaming, Tecnología, Deportes, etc.)

**Resultado:** Grupos de 4 personas con máxima compatibilidad.

### Ejemplo Real (visible en consola del navegador):

```
Matching for Ana García:
  - María López: 75% affinity
  - Carlos Mendoza: 60% affinity
  - Laura Torres: 55% affinity
  - Diego Ramírez: 30% affinity
```

Ana es agrupada con las top 3 personas de mayor afinidad.

---

## Sistema de Colores

Cada grupo recibe un **color único** para identificación visual:

- 🟥 Grupo Coral (#FF6B6B)
- 🟧 Grupo Naranja (#F39C12)
- 🟨 Grupo Amarillo (#F4D03F)
- 🟩 Grupo Verde (#48C774)
- 🔵 Grupo Sage (#A8CDCD)
- 🔷 Grupo Cielo (#4FC3F7)

El color se asigna automáticamente basado en el primer miembro del grupo.

---

## Sistema de Gamificación

### Niveles
- **Nivel 1-5**: Basado en XP acumulado
- **1000 XP** = 1 nivel
- Sube de nivel = confetti celebration 🎉

### Ganar XP
- **+100 XP** por confirmar conexión con grupo
- Barra de progreso visual en dashboard
- Modal celebratorio al ganar XP

### Persistencia
- Los datos se guardan en `localStorage`
- No necesitas recargar para mantener progreso
- Botón "Reiniciar Demo" para resetear todo

---

## Perfiles Pre-cargados

El demo incluye 5 perfiles hardcoded:

1. **Ana García** 👩‍💻 - Full-stack Developer (Nivel 3, 1500 XP)
2. **Carlos Mendoza** 👨‍🎨 - UX Designer (Nivel 2, 800 XP)
3. **María López** 👩‍🔬 - Data Scientist (Nivel 4, 2100 XP)
4. **Diego Ramírez** 👨‍💼 - Inversionista (Nivel 1, 500 XP)
5. **Laura Torres** 👩‍💻 - Backend Developer (Nivel 2, 1200 XP)

---

## Puntos Clave para la Presentación

### El Problema
"En eventos de networking con 50+ personas, es imposible hablar con todos. Perdemos oportunidades valiosas por falta de tiempo y organización."

### La Solución
"Gotcha hace matching inteligente **antes del evento** basado en objetivos reales, y usa **identificación visual por color** durante el evento para que encuentres a tu grupo al instante."

### El Diferenciador
"Somos los únicos que combinan:
- Algoritmo de afinidad basado en objetivos específicos
- Identificación visual instantánea (color de pantalla)
- Gamificación con recompensas tangibles"

### Demo en Vivo
1. Muestra selección de usuario
2. Explica el dashboard y sistema de XP
3. Muestra la pantalla de grupo con color fullscreen
4. Demuestra la confirmación de conexión con animación
5. Destaca el algoritmo en consola (F12)

---

## Tecnologías Usadas

- **HTML5** - Estructura semántica
- **CSS3** - Design system custom + Tailwind CDN
- **JavaScript (Vanilla)** - Lógica y algoritmo de matching
- **localStorage** - Persistencia sin backend
- **canvas-confetti** - Animaciones celebratorias

### ¿Por qué sin framework?
✅ **Velocidad** - Setup en segundos, no minutos
✅ **Portabilidad** - Funciona en cualquier navegador, incluso con `file://`
✅ **Demo-friendly** - Sin build process, sin dependencies
✅ **Foco en concepto** - La lógica de matching es lo importante

---

## Extensiones Futuras (Post-Hackathon)

### Corto Plazo (1-2 semanas)
- [ ] Autenticación con Firebase/Supabase
- [ ] Base de datos real para perfiles
- [ ] QR codes para check-in en eventos
- [ ] Múltiples eventos activos

### Medio Plazo (1-2 meses)
- [ ] Chat in-app post-evento
- [ ] Sistema de recompensas reales (descuentos, bebidas gratis)
- [ ] Push notifications para alertas de grupo
- [ ] Dashboard para organizadores de eventos

### Largo Plazo (3-6 meses)
- [ ] App móvil nativa (React Native / Flutter)
- [ ] Integración con Eventbrite/Meetup
- [ ] Analytics y métricas de conexión
- [ ] White label para empresas
- [ ] Sistema de referidos y viralidad

---

### Q&A Preparado
**P: ¿Cómo manejan privacidad?**
R: Los datos solo son visibles durante eventos activos. Opt-in para compartir info de contacto.

**P: ¿Qué pasa si hay más de 200 personas?**
R: El algoritmo escala. Grupos de 4-5 optimizan tiempo vs. conexiones de calidad.

**P: ¿Por qué gamificación?**
R: Estudios muestran que gamificación aumenta engagement 40% en eventos de networking.

**P: ¿Modelo de negocio?**
R: B2B (licencia por evento) + B2C (freemium con beneficios premium).

---

## Troubleshooting

### El demo no carga
- Verifica que todos los archivos estén en la misma carpeta
- Abre la consola del navegador (F12) para ver errores
- Prueba en Chrome/Firefox si Safari da problemas

### Los colores no se ven bien
- El algoritmo asigna colores basados en el ID del primer miembro
- Prueba con diferentes usuarios para ver todos los colores

### El XP no persiste
- Verifica que localStorage esté habilitado en tu navegador
- Si estás en modo incógnito, los datos se borran al cerrar
- Usa el botón "Reiniciar Demo" si algo se corrompe

### El confetti no aparece
- Verifica conexión a internet (CDN de canvas-confetti)
- Abre la consola para ver si hay errores de red

