# Cinema Booking SPA

Aplicación Single Page Application (SPA) construida con Vite, TailwindCSS y JSON Server para administrar funciones de cine y reservas de boletos.

## Características

- Autenticación de usuarios con datos de prueba
- Vistas basadas en roles (`admin` / `user`)
- Gestión de funciones de cine (crear, editar, cancelar, eliminar)
- Gestión de reservas de boletos
- Enrutamiento SPA en cliente
- Estructura modular con servicios, controladores, vistas y componentes

## Requisitos

- Node.js 16 o superior

## Instalación

```bash
npm install
```

## Ejecutar el proyecto

```bash
npm run dev
```

Este comando inicia:

- Vite frontend
- JSON Server mock backend en `http://localhost:3000`

## Ejecutar solo el backend simulado

```bash
npm run server
```

## Ejecutar solo el frontend

```bash
npm run client
```

## Endpoints de la API

La API simulada se sirve desde `db.json` con JSON Server.

- `GET /users`
- `GET /functions`
- `POST /functions`
- `PATCH /functions/:id`
- `DELETE /functions/:id`
- `GET /reservations`
- `POST /reservations`
- `PATCH /reservations/:id`
- `DELETE /reservations/:id`

## Usuarios de prueba

- Admin: `admin@test.com` / `A123456`
- Usuario: `user@test.com` / `A123456`
- Usuario 2: `user2@test.com` / `A123456`

## Permisos por rol

### Admin

- Ver todas las reservas
- Confirmar o cancelar reservas
- Crear, editar, cancelar y eliminar funciones de cine
- Ver todas las funciones y la disponibilidad de asientos

### Usuario

- Ver funciones disponibles
- Reservar boletos para una función
- Editar sus propias reservas antes de que empiece la función
- Cancelar sus propias reservas
- Ver solo sus propias reservas

## Estructura del proyecto

```
src/
  ├─ api/           # Cliente HTTP para la API
  ├─ components/    # Componentes reutilizables de UI
  ├─ controllers/   # Lógica de control de vistas
  ├─ router/        # Enrutamiento SPA y guardas
  ├─ services/      # Llamadas a la API y endpoints
  ├─ views/         # Plantillas de páginas
  ├─ main.js        # Entrada de la aplicación
  └─ style.css      # Tailwind y estilos personalizados

db.json             # Base de datos simulada para JSON Server
package.json        # Scripts y dependencias
vite.config.js      # Configuración de Vite y alias
```

## Decisiones técnicas

- La sesión de usuario se guarda en `localStorage` para persistencia entre recargas.
- El router protege la ruta `/home` y redirige a `/` si no hay sesión activa.
- `src/api/http.js` centraliza las llamadas HTTP y maneja errores de respuesta.
- `src/services/` encapsula los endpoints de funciones y reservas.
- Las funciones usan `availableSeats` para calcular la disponibilidad de asientos.
- El rol del usuario controla la visibilidad de acciones administrativas.

## Notas

- Si Vite arranca en otro puerto, usa la URL que muestra el terminal.
- Si el puerto `3000` está en uso, actualiza el puerto de JSON Server y `API_URL` en `src/api/http.js`.

## Uso básico

1. Instala dependencias: `npm install`
2. Inicia el proyecto: `npm run dev`
3. Abre la URL que muestra Vite en el navegador
