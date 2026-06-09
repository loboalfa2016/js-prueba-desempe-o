# Sustentación del proyecto: Cinema Booking SPA

## 1. Resumen
Esta aplicación es una Single Page Application (SPA) para administrar funciones de cine y reservas de boletos. Tiene dos roles principales:
- `admin`: gestiona funciones y reservas.
- `user`: reserva y administra sus propias reservas.

La solución se construyó con JavaScript moderno, Vite, TailwindCSS y JSON Server, y usa `localStorage` para mantener la sesión del usuario.

## 2. Cumplimiento de requerimientos (15%)
El proyecto cumple los requerimientos solicitados:
- Inicio de sesión con usuarios de prueba definidos en `db.json`.
- Gestión de funciones de cine por parte del administrador.
- Reserva de boletos por parte de usuarios regulares.
- Control de acceso basado en roles que modifica la UI y las opciones disponibles.
- Persistencia de sesión en el navegador para mantener al usuario conectado.

### Evidencia técnica
- `src/controllers/login.controller.js`: valida credenciales y guarda sesión.
- `src/router/router.js`: protege rutas y carga vistas sin recargar la página.
- `src/utils.js`: maneja `localStorage` y valida roles.
- `src/services/`: encapsula llamadas a la API a `db.json`.

#### Ejemplo de login en `src/controllers/login.controller.js`
```js
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = form.email.value.trim();
  const password = form.password.value.trim();
  const users = await http.get(
    `/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
  );
  if (!users.length) {
    showError("Credenciales incorrectas.");
    return;
  }
  saveSession({ id: users[0].id, name: users[0].name, role: users[0].role });
  navigateTo("/home");
});
```
Este código valida el formulario, consulta el backend simulado y, si el usuario existe, guarda la sesión y redirige a la vista principal.

## 3. Comprensión de JavaScript (10%)
El proyecto demuestra conocimientos de JavaScript con:
- Módulos ES6 y alias (`@`, `@services`, `@components`, etc.).
- `async/await` para manejar llamadas asíncronas a la API.
- Funciones puras y utilitarias para el renderizado y filtrado de datos.
- Uso de operadores lógicos, `?.` y manejo de valores `null`/`undefined`.
- Separación clara entre controlador, servicios, vistas y componentes.

## 4. Enrutamiento SPA (15%)
El enrutamiento usa el History API para cambiar la ruta sin recargar:
- `navigateTo(path)` actualiza la URL con `history.pushState()`.
- `router()` elige la vista correcta y renderiza en `#app`.
- Protege `/home` para usuarios no autenticados.
- Redirige a `/home` si un usuario con sesión intenta acceder a `/`.

#### Código de router en `src/router/router.js`
```js
const routes = {
  "/": loginView,
  "/home": homeView,
};

export const navigateTo = (path) => {
  history.pushState({}, "", path);
  router();
};

export const router = () => {
  const app = document.querySelector("#app");
  let path = window.location.pathname;

  if (path === "/home" && !isAuthenticated()) {
    path = "/";
    history.replaceState({}, "", "/");
  }

  if (path === "/" && isAuthenticated()) {
    path = "/home";
    history.replaceState({}, "", "/home");
  }

  app.innerHTML = (routes[path] || notFoundView)();
};
```
Este router asegura navegación SPA y guarda la seguridad básica de acceso a `/home`.

## 5. Persistencia y manejo de sesión (10%)
La sesión se guarda en `localStorage` para que el usuario permanezca autenticado tras recargar:
- `saveSession(user)`: guarda el usuario actual.
- `getSession()`: recupera el usuario de `localStorage`.
- `removeSession()`: cierra sesión.
- `isAuthenticated()`: detecta si hay sesión activa.
- `isAdmin()`: identifica el rol de administrador.

#### Código de sesión en `src/utils.js`
```js
export const saveSession = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getSession = () => JSON.parse(localStorage.getItem("user"));

export const removeSession = () => localStorage.removeItem("user");

export const isAuthenticated = () => !!getSession();

export const isAdmin = () => getSession()?.role === "admin";
```
Estas funciones permiten al frontend usar la información del usuario para proteger rutas y mostrar acciones según el rol.

## 6. Documentación (10%)
Este repositorio incluye:
- `README.md`: instalación, ejecución, estructura y permisos de rol.
- `Sustentacion.md`: explicación técnica, ejemplos de código y criterios de evaluación.
- `package.json`: scripts para `dev`, `client` y `server`.
- `db.json`: datos de usuarios, funciones y reservas.

## 7. Sustentación técnica (40%)
### Arquitectura
El proyecto usa una arquitectura modular:
- `src/api/http.js`: cliente HTTP centralizado.
- `src/services/`: acceso a datos de funciones y reservas.
- `src/controllers/`: lógica de interacción y validación.
- `src/views/`: plantillas HTML de las páginas.
- `src/components/`: tarjetas reutilizables y barra lateral.

### Flujo de autenticación
1. El usuario ingresa correo y contraseña.
2. `login.controller.js` consulta `GET /users` en JSON Server.
3. Si coincide, guarda sesión y navega a `/home`.
4. El router bloquea `/home` si no hay sesión.

### Manejo de datos y API
- `src/api/http.js` usa `fetch()` y maneja errores de respuesta.
- Los servicios exponen `get`, `post`, `patch` y `delete`.
- Los recursos se guardan en `db.json` con JSON Server.

#### Código de cliente HTTP en `src/api/http.js`
```js
const request = async (endpoint, options = {}) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
  return response.json();
};

export const http = {
  get: (endpoint) => request(endpoint),
  post: (endpoint, data) => request(endpoint, { method: "POST", body: JSON.stringify(data) }),
  patch: (endpoint, data) => request(endpoint, { method: "PATCH", body: JSON.stringify(data) }),
  delete: (endpoint) => request(endpoint, { method: "DELETE" }),
};
```
Esto centraliza las peticiones y evita duplicar lógica.

#### Código de servicio de funciones y reservas
```js
export const getFunctions = () => http.get("/functions");
export const createFunction = (data) => http.post("/functions", data);
export const updateFunction = (id, data) => http.patch(`/functions/${id}`, data);
export const removeFunction = (id) => http.delete(`/functions/${id}`);
```
```js
export const getReservations = () => http.get("/reservations");
export const createReservation = (data) => http.post("/reservations", data);
export const updateReservation = (id, data) => http.patch(`/reservations/${id}`, data);
export const removeReservation = (id) => http.delete(`/reservations/${id}`);
```
Los servicios abstraen las rutas y hacen el código más mantenible.

### Gestión de reservas y funciones
- `home.controller.js` carga y renderiza funciones y reservas.
- Los usuarios solo ven sus reservas; el admin ve todas.
- Las funciones muestran asientos disponibles actualizados.
- Las reservas se pueden editar, cancelar o eliminar según el rol.

### Control de roles
- `isAdmin()` permite acciones exclusivas de administrador.
- Los botones de editar/reservar se muestran según el rol.
- El sistema evita accesos no autorizados en la UI.

### Consideraciones de robustez
- Validación de formularios en login, función y reserva.
- Manejo de errores en las llamadas a API.
- Mensajes de estado para el usuario.

## 8. Retos y soluciones
- Protección de ruta: se implementó en el router para `/home`.
- Sincronización de asientos: se actualiza `availableSeats` al crear/cancelar reservas.
- Código modular: separar services, controllers, views y components mejoró el mantenimiento.

## 9. Conclusión
El proyecto está actualizado y cumple con los criterios de una SPA funcional con enrutamiento, persistencia de sesión y control de roles. La implementación muestra un uso efectivo de JavaScript moderno y una estructura modular.

## 10. Mejoras futuras
- Migrar JSON Server a un backend real con autenticación segura.
- Validar mejor formularios y errores de negocio.
- Añadir filtros de búsqueda por película, fecha o sala.
- Agregar notificaciones o correo para confirmaciones.
