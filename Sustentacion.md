# Sustentación del proyecto: Cinema Booking SPA

## 1. Resumen
Esta aplicación es una Single Page Application (SPA) que permite la gestión de funciones de cine y reservas de boletos con dos roles: administrador y usuario estándar. Está construida con JavaScript moderno, Vite, JSON Server y `localStorage` para persistencia de sesión.

## 2. Cumplimiento de requerimientos (15%)
Este proyecto implementa los requerimientos solicitados de forma directa:
- Login y autenticación de usuarios con datos de prueba en `db.json`.
- Gestión de funciones de cine: creación, edición, cancelación y eliminación por el administrador.
- Reserva de boletos por parte del usuario, incluyendo edición y cancelación de reservas propias.
- Control de acceso basado en roles para mostrar solo acciones válidas según el usuario.
- Visualización de funciones y reservas con datos reales desde un backend simulado.

### Evidencia
- Archivos clave: `src/controllers/login.controller.js`, `src/controllers/home.controller.js`, `src/services/function.service.js`, `src/services/reservation.service.js`.
- Backend simulado: `db.json` y `json-server` en los scripts de `package.json`.
- Funcionalidad de reservas actualiza el inventario de asientos disponibles en cada función.

#### Ejemplo de login en `src/controllers/login.controller.js`
```js
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = form.email.value.trim();
  const password = form.password.value.trim();
  const users = await http.get(
    `/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
  );
  if (!users.length) throw new Error("Credenciales incorrectas.");
  saveSession({ id: users[0].id, name: users[0].name, role: users[0].role });
  navigateTo("/home");
});
```
Este bloque captura el evento `submit` del formulario de login y evita la recarga de página con `e.preventDefault()`. Luego lee los valores de email y contraseña, los encadena en una consulta segura con `encodeURIComponent`, y pide al backend simulado `json-server` los usuarios que coincidan.
Si no hay coincidencias, lanza un error de credenciales; si el login es válido, guarda el usuario en sesión mediante `saveSession()` y navega a `/home` con `navigateTo()`.

## 3. Comprensión de JavaScript (10%)
El código demuestra comprensión de conceptos centrales de JavaScript:
- Módulos ES6 y import/export en `src/main.js`, `src/router/router.js`, `src/utils.js`, componentes y servicios.
- Manejo de promesas con `async/await` en los controladores y en el cliente HTTP.
- Uso de funciones puras y utilitarias en `src/controllers/home.controller.js` para filtrar, ordenar y renderizar datos.
- Acceso condicional, operadores lógicos y manejo de nullish (`?.`) en `src/utils.js` y vistas.
- Separación de responsabilidades entre renderizado, lógica de negocio y llamadas a API.

## 4. Enrutamiento SPA (15%)
El enrutamiento del proyecto es un router cliente simple pero efectivo:
- `src/router/router.js` define rutas para `/` y `/home`.
- SPA usando `history.pushState()` para cambiar la URL sin recargar la página.
- `window.onpopstate` permite navegar con los botones de retroceso y avance.
- Protección de ruta: si el usuario intenta acceder a `/home` sin sesión activa, la aplicación redirige a `/`.
- Si el usuario autenticado vuelve a `/`, se redirige automáticamente a `/home`.

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
Este router define el mapa de rutas de la SPA. `navigateTo()` cambia la URL sin recargar la página usando `history.pushState()`, y luego vuelve a ejecutar la función `router()` para renderizar la vista adecuada.
La función `router()` obtiene la ruta actual y aplica guardas de acceso: si se intenta ir a `/home` sin estar autenticado se redirige a `/`, y si un usuario autenticado accede a `/` se le redirige a `/home`. Finalmente imprime la vista en el elemento `#app`.

## 5. Persistencia y manejo de sesión (10%)
La sesión se maneja con `localStorage` y utilidades especiales:
- `src/utils.js` implementa `saveSession()`, `getSession()`, `removeSession()`, `isAuthenticated()` e `isAdmin()`.
- En `src/controllers/login.controller.js` se guarda el usuario autenticado después de validar credenciales.
- El estado de sesión persiste entre recargas del navegador mientras el usuario no cierre la sesión.
- La aplicación usa el rol guardado en sesión para decidir qué acciones debe mostrar y cuáles debe ocultar.

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
`saveSession()` almacena el objeto de usuario en `localStorage` como JSON para que sea persistente entre recargas. `getSession()` recupera y convierte ese JSON de nuevo a objeto JavaScript. `removeSession()` elimina el usuario cuando se cierra sesión.
`isAuthenticated()` devuelve `true` si hay un usuario guardado, y `isAdmin()` comprueba el rol del usuario para habilitar o deshabilitar funciones de administrador.

## 6. Documentación (10%)
Este repositorio cuenta con documentación clara y ordenada:
- `README.md` describe la instalación, ejecución, estructura de carpetas, endpoints API y usuarios de prueba.
- `Sustentacion.md` documenta la arquitectura, las decisiones técnicas y la evidencia del cumplimiento de los criterios.
- El código está organizado en carpetas con propósito definido: `api`, `components`, `controllers`, `router`, `services`, `views`.
- `package.json` incluye scripts claros para desarrollo y servidor de mock API.

## 7. Sustentación técnica (40%)
### Arquitectura
La aplicación sigue un patrón modular:
- `src/api/http.js` centraliza las llamadas HTTP a `http://localhost:3000`.
- `src/services/` encapsula los endpoints de funciones y reservas.
- `src/controllers/` coordina el flujo entre vistas, servicios y utilidades.
- `src/views/` genera los templates HTML para cada página.
- `src/components/` contiene fragmentos reutilizables como tarjetas de función y reserva.

### Flujo de autenticación
1. El usuario ingresa correo y contraseña en el formulario de login.
2. `login.controller.js` llama a `http.get('/users?...')` para validar credenciales.
3. Si la validación es correcta, guarda la sesión con `saveSession()` y navega a `/home`.
4. El router protege `/home` mediante `isAuthenticated()`.

### Manejo de datos y API
- `src/api/http.js` usa `fetch()` con cabeceras JSON y lanza errores si la respuesta no es `ok`.
- Los servicios usan `GET`, `POST`, `PATCH` y `DELETE` para manipular datos en `db.json`.
- Aunque el backend es simulado, la lógica del frontend se diseña como si fuera una API REST real.

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
`request()` es la función base que construye la petición `fetch()` hacia el backend simulado. Añade siempre el encabezado `Content-Type: application/json` para indicar que se envían y reciben datos JSON. Si la respuesta tiene un estado distinto de `ok`, la función lanza un error para consolidar el manejo de fallos en un solo lugar.

La variable `http` expone métodos `get`, `post`, `patch` y `delete` para simplificar el uso de la API desde los servicios. Cada método transforma los datos a JSON cuando es necesario.

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
Los servicios encapsulan llamadas a rutas concretas del backend. Esto evita repetir URLs en varias partes del proyecto y hace que la lógica de acceso a datos sea fácil de reutilizar. `getFunctions()` y `getReservations()` obtienen listas, mientras que `create*`, `update*` y `remove*` modifican los recursos en `db.json`.

### Gestión de reservas y funciones
- `home.controller.js` carga funciones y reservas desde la API y mantiene caches locales.
- Los usuarios solo ven sus reservas; los administradores ven todas.
- La selección de función muestra asientos disponibles y actualiza el estado en tiempo real.
- La aplicación permite editar reservas, cambiar status y cancelar reservas con cambios reflejados en el backend.

### Control de roles
- El rol del usuario se guarda en la sesión.
- Acciones administrativas (crear o editar funciones, ver todas las reservas) solo se muestran si `isAdmin()` es true.
- Usuarios regulares no pueden acceder a endpoints de administrador desde la interfaz.

### Consideraciones de robustez
- La aplicación valida campos del formulario de login.
- Muestra errores de conexión a la API cuando fallan las peticiones.
- Protege rutas y mantiene el estado correcto después de recargas o retrocesos del navegador.

## 8. Retos y soluciones
- Control de acceso: se resolvió con protección de rutas y validación de sesión antes de renderizar `/home`.
- Alimentación de datos en tiempo real: se sincroniza `availableSeats` de funciones cuando se crea, actualiza o elimina una reserva.
- Organización del proyecto: separar servicios, controladores y vistas ayudó a mantener el código legible y extensible.

## 9. Conclusión
El proyecto cumple con los criterios de evaluación al implementar un SPA con enrutamiento, persistencia de sesión, gestión de roles y documentación suficiente. La evidencia técnica muestra que se usó JavaScript moderno y una arquitectura modular adecuada para el caso de uso.

## 10. Mejoras futuras
- Sustituir JSON Server por un backend real con autenticación segura.
- Añadir validaciones más completas en los formularios y manejo de errores de negocio.
- Incluir filtros de búsqueda por película, fecha y sala.
- Agregar notificaciones visuales o por correo al confirmar reservas.
