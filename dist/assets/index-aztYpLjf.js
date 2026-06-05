(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=e=>{localStorage.setItem(`user`,JSON.stringify(e))},t=()=>JSON.parse(localStorage.getItem(`user`)),n=()=>{localStorage.removeItem(`user`)},r=()=>!!t(),i=`http://localhost:3000`,a=async(e,t={})=>{try{let n=await fetch(`${i}${e}`,{headers:{"Content-Type":`application/json`},...t});if(!n.ok)throw Error(`HTTP Error ${n.status}`);return await n.json()}catch(e){throw console.error(e),e}},o={get:e=>a(e),post:(e,t)=>a(e,{method:`POST`,body:JSON.stringify(t)}),put:(e,t)=>a(e,{method:`PUT`,body:JSON.stringify(t)}),patch:(e,t)=>a(e,{method:`PATCH`,body:JSON.stringify(t)}),delete:e=>a(e,{method:`DELETE`})},s=()=>{let t=document.querySelector(`#loginForm`),n=document.querySelector(`#loginError`),r=e=>{n&&(n.textContent=e,n.classList.remove(`hidden`))},i=()=>{n&&(n.textContent=``,n.classList.add(`hidden`))};t.addEventListener(`submit`,async n=>{n.preventDefault(),i();let a=t.email.value.trim(),s=t.password.value.trim();if(!a||!s){r(`Completa los campos para continuar.`);return}try{let t=await o.get(`/users?email=${encodeURIComponent(a)}&password=${encodeURIComponent(s)}`);if(!t.length){r(`Credenciales incorrectas.`);return}e({id:t[0].id,name:t[0].name,role:t[0].role}),E(`/home`)}catch(e){console.error(e),r(`No se pudo conectar con la API.`)}})};function c(){return setTimeout(()=>{s()}),`
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 px-4 py-8">
      <div class="w-full max-w-md rounded-[2rem] border border-slate-700/60 bg-slate-950/95 p-8 shadow-[0_35px_60px_-30px_rgba(0,0,0,0.7)] backdrop-blur-xl">
        <div class="mb-7">
          <span class="inline-flex items-center rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-semibold text-emerald-300">
            Sistema de reservas
          </span>
          <h1 class="mt-4 text-4xl font-bold tracking-tight text-white">Accede a tu espacio</h1>
          <p class="mt-3 text-slate-400">Inicia sesión para ver y gestionar tus reservas de sala.</p>
        </div>

        <form id="loginForm" class="space-y-5">
          <div>
            <label class="mb-2 block text-sm font-medium text-slate-300" for="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              name="email"
              required
              placeholder="usuario@empresa.com"
              class="w-full rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
            />
          </div>

          <div>
            <label class="mb-2 block text-sm font-medium text-slate-300" for="password">Contraseña</label>
            <input
              id="password"
              type="password"
              name="password"
              required
              placeholder="********"
              class="w-full rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
            />
          </div>

          <p id="loginError" class="hidden text-sm text-rose-400"></p>

          <button
            type="submit"
            class="w-full rounded-2xl bg-emerald-500 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
          >
            Iniciar sesión
          </button>
        </form>

        <div class="mt-8 rounded-[1.5rem] bg-slate-900/85 p-5 text-sm text-slate-400 shadow-inner shadow-slate-950/20">
          <p class="font-semibold text-slate-200">Credenciales de prueba</p>
          <ul class="mt-3 list-disc space-y-1 pl-5">
            <li>admin@test.com / A123456</li>
            <li>user@test.com / A123456</li>
          </ul>
        </div>
      </div>
    </div>
  `}function l(){return setTimeout(()=>{document.querySelector(`#logoutBtn`)?.addEventListener(`click`,()=>{n(),E(`/`)})}),`
    <aside class="w-72 min-h-screen bg-slate-950 text-white p-6 flex flex-col justify-between border-r border-slate-800">
      <div>
        <h2 class="text-3xl font-semibold tracking-tight text-emerald-300 mb-6">
          FlowDesk
        </h2>

        <p class="max-w-[14rem] text-sm leading-6 text-slate-400 mb-8">
          Gestiona reservas de espacios con un panel claro, rápido y ligero.
        </p>

        <nav class="flex flex-col gap-3">
          <a href="/home" data-link class="inline-flex h-12 items-center justify-center rounded-3xl bg-slate-800 px-5 text-sm font-semibold text-white transition hover:bg-slate-700">
            Dashboard
          </a>

          <button
            id="logoutBtn"
            class="inline-flex h-12 w-full items-center justify-center rounded-3xl border border-red-500 bg-slate-900 px-5 text-sm font-semibold text-red-300 transition hover:border-red-400 hover:bg-red-500 hover:text-white"
          >
            Cerrar sesión
          </button>
        </nav>
      </div>

      <div class="rounded-[1.5rem] border border-slate-800 bg-slate-900/90 p-5 text-sm text-slate-400">
        <p class="font-semibold text-slate-100">Consejo rápido</p>
        <p class="mt-3 leading-6">
          Usa el formulario para enviar solicitudes y gestiona cada reserva desde aquí.
        </p>
      </div>
    </aside>
  `}function u(e,t,n){let{id:r,workspace:i,date:a,startHour:o,endHour:s,reason:c,status:l,userId:u}=e,d=n===`admin`&&l===`pending`,f=n===`user`&&u===t&&l===`pending`;return`
    <article class="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div class="flex items-start justify-between gap-4">
        <div>
          <h3 class="text-lg font-semibold text-slate-950">${i}</h3>
          <p class="mt-1 text-sm text-slate-500">${a} · ${o} - ${s}</p>
        </div>
        <span class="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${l===`approved`?`bg-emerald-100 text-emerald-700`:l===`rejected`?`bg-rose-100 text-rose-700`:`bg-amber-100 text-amber-700`}">
          ${l}
        </span>
      </div>

      <div class="mt-5 space-y-3 text-sm text-slate-600">
        <p><span class="font-medium text-slate-800">Motivo:</span> ${c}</p>
        ${n===`admin`?`<p><span class="font-medium text-slate-800">Usuario ID:</span> ${u}</p>`:``}
      </div>

      <div class="mt-5 flex flex-wrap gap-2">
        ${d?`<button data-action="approve" data-id="${r}" class="rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500">Aprobar</button>`:``}
        ${d?`<button data-action="reject" data-id="${r}" class="rounded-2xl bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-400">Rechazar</button>`:``}
        ${f?`<button data-action="cancel" data-id="${r}" class="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200">Cancelar</button>`:``}
      </div>
    </article>
  `}var d=()=>o.get(`/reservations`),f=e=>o.post(`/reservations`,e),p=(e,t)=>o.patch(`/reservations/${e}`,t),m=e=>o.delete(`/reservations/${e}`),h=e=>new Date(`${e.date}T${e.startHour}`).getTime(),g=(e,t)=>{let n=document.querySelector(`#reservationsContainer`);if(n){if(!e.length){n.innerHTML=`
      <div class="w-full text-center py-10 col-span-2">
        <p class="text-slate-500">No hay reservas disponibles.</p>
      </div>
    `;return}n.innerHTML=e.map(e=>u(e,t.id,t.role)).join(``)}},_=(e,t)=>{let n=t.role===`admin`?e:e.filter(e=>e.userId===t.id),r=n.length,i=n.filter(e=>e.status===`pending`).length,a=n.filter(e=>e.status!==`rejected`).sort(h)[0],o=document.querySelector(`#totalReservations`),s=document.querySelector(`#pendingReservations`),c=document.querySelector(`#nextReservation`);o&&(o.textContent=r),s&&(s.textContent=i),c&&(c.textContent=a?`${a.workspace} • ${a.date}`:`Sin próximas`)},v=(e,t=!1)=>{let n=document.querySelector(`#formMessage`);n&&(n.textContent=e,n.classList.remove(`hidden`),n.classList.toggle(`text-rose-500`,t),n.classList.toggle(`text-emerald-600`,!t))},y=()=>{let e=document.querySelector(`#formMessage`);e&&(e.textContent=``,e.classList.add(`hidden`),e.classList.remove(`text-rose-500`,`text-emerald-600`))},b=async e=>{try{let t=await d(),n=e.role===`admin`?t:t.filter(t=>t.userId===e.id);return _(t,e),g(n,e),{reservations:t,filteredReservations:n}}catch(t){return console.error(`Error loading reservations:`,t),v(`No se pudieron cargar las reservas.`,!0),g([],e),_([],e),{reservations:[],filteredReservations:[]}}},x=async(e,t)=>{let n=e.target.closest(`button[data-action]`);if(!n)return;let r=n.dataset.action,i=n.dataset.id;if(i)try{r===`approve`&&(await p(i,{status:`approved`}),v(`Reserva aprobada correctamente.`)),r===`reject`&&(await p(i,{status:`rejected`}),v(`Reserva rechazada.`)),r===`cancel`&&(await m(i),v(`Reserva cancelada.`)),await b(t)}catch(e){console.error(e),v(`No se pudo actualizar la reserva.`,!0)}},S=async()=>{let e=t();if(!e)return;let n=document.querySelector(`#reservationForm`),r=document.querySelector(`#reservationsContainer`);r&&r.addEventListener(`click`,t=>x(t,e)),n&&n.addEventListener(`submit`,async t=>{t.preventDefault(),y();let r=n.workspace.value.trim(),i=n.date.value,a=n.startHour.value,o=n.endHour.value,s=n.reason.value.trim();if(!r||!i||!a||!o||!s){v(`Completa todos los campos para crear tu reserva.`,!0);return}if(a>=o){v(`La hora de fin debe ser mayor a la hora de inicio.`,!0);return}let c={userId:e.id,workspace:r,date:i,startHour:a,endHour:o,reason:s,status:`pending`};try{await f(c),n.reset(),v(`Solicitud enviada con éxito.`),await b(e)}catch(e){console.error(e),v(`No se pudo enviar la solicitud.`,!0)}});try{await b(e)}catch(e){console.error(e),v(`Error inesperado al cargar las reservas.`,!0)}};function C(){let e=t();return setTimeout(()=>{S()}),`
    <div class="flex min-h-screen bg-slate-100 text-slate-950">
      ${l()}

      <main class="flex-1 p-6 lg:p-10">
        <div class="mx-auto w-full max-w-7xl space-y-8">
          <section class="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
            <div class="rounded-[2rem] bg-white p-8 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.35)] border border-slate-200">
              <span class="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-700">
                Panel de reservas
              </span>
              <h1 class="mt-6 text-5xl font-bold tracking-tight text-slate-950">Hola, ${e?.name}</h1>
              <p class="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
                Visualiza el estado de tus espacios, crea nuevas solicitudes y gestiona cada reserva desde una experiencia clara y ordenada.
              </p>
            </div>

            <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
              <div class="rounded-[2rem] bg-white p-6 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.35)] border border-slate-200">
                <p class="text-sm uppercase tracking-[0.3em] text-slate-400">Total</p>
                <p id="totalReservations" class="mt-4 text-4xl font-semibold text-slate-950">0</p>
                <p class="mt-2 text-sm text-slate-500">Reservas visibles</p>
              </div>
              <div class="rounded-[2rem] bg-white p-6 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.35)] border border-slate-200">
                <p class="text-sm uppercase tracking-[0.3em] text-slate-400">Pendientes</p>
                <p id="pendingReservations" class="mt-4 text-4xl font-semibold text-amber-600">0</p>
                <p class="mt-2 text-sm text-slate-500">Solicitudes por revisar</p>
              </div>
              <div class="rounded-[2rem] bg-white p-6 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.35)] border border-slate-200">
                <p class="text-sm uppercase tracking-[0.3em] text-slate-400">Siguiente</p>
                <p id="nextReservation" class="mt-4 text-3xl font-semibold text-slate-950">Sin datos</p>
                <p class="mt-2 text-sm text-slate-500">Próxima reserva</p>
              </div>
            </div>
          </section>

          <section class="grid gap-6 xl:grid-cols-[380px_1fr]">
            <aside class="space-y-6">
              <div class="rounded-[2rem] bg-white p-6 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.35)] border border-slate-200">
                <h2 class="text-xl font-semibold text-slate-950">Nueva reserva</h2>
                <p class="mt-2 text-slate-600">Llena los datos y envía una solicitud para el espacio que necesites.</p>
                <form id="reservationForm" class="mt-6 space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-slate-700" for="workspace">Sala / oficina</label>
                    <input id="workspace" name="workspace" required class="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20" placeholder="Sala A" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-slate-700" for="date">Fecha</label>
                    <input id="date" type="date" name="date" required class="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20" />
                  </div>
                  <div class="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label class="block text-sm font-medium text-slate-700" for="startHour">Inicio</label>
                      <input id="startHour" type="time" name="startHour" required class="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-slate-700" for="endHour">Fin</label>
                      <input id="endHour" type="time" name="endHour" required class="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20" />
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-slate-700" for="reason">Motivo</label>
                    <textarea id="reason" name="reason" rows="3" required class="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20" placeholder="Reunión con el equipo"></textarea>
                  </div>
                  <p id="formMessage" class="hidden text-sm text-emerald-600"></p>
                  <button type="submit" class="mt-2 w-full rounded-2xl bg-emerald-600 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500">Enviar solicitud</button>
                </form>
              </div>
              
            </aside>

            <section class="space-y-6">
              <div class="rounded-[2rem] bg-white p-6 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.35)] border border-slate-200">
                <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 class="text-xl font-semibold text-slate-950">Reservas activas</h2>
                    <p class="mt-2 text-slate-600">Lista dinámica de tus solicitudes y del estado de cada espacio.</p>
                  </div>
                  <span class="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">${e?.role===`admin`?`Acceso total`:`Solo tus reservas`}</span>
                </div>
                <div id="reservationsContainer" class="mt-6 grid gap-4 md:grid-cols-2"></div>
              </div>
            </section>
          </section>
        </div>
      </main>
    </div>
  `}function w(){return`
    <div class="min-h-screen flex flex-col items-center justify-center bg-slate-100 px-4">
      <h1 class="text-8xl font-bold text-slate-800">404</h1>
      <h2 class="text-2xl font-semibold text-slate-700 mt-4">Página no encontrada</h2>
      <p class="text-slate-500 mt-2 text-center max-w-md">
        La ruta que intentas visitar no existe o fue movida.
      </p>
      <a href="/home" data-link class="mt-6 inline-flex rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700">
        Volver al inicio
      </a>
    </div>
  `}var T={"/":c,"/home":C},E=e=>{history.pushState({},``,e),D()},D=()=>{let e=document.querySelector(`#app`),t=window.location.pathname;t===`/home`&&!r()&&(t=`/`,history.replaceState({},``,`/`)),t===`/`&&r()&&(t=`/home`,history.replaceState({},``,`/home`)),e.innerHTML=(T[t]||w)(),window.scrollTo(0,0)};window.addEventListener(`popstate`,D),document.addEventListener(`DOMContentLoaded`,()=>{D(),document.body.addEventListener(`click`,e=>{let t=e.target.closest(`a[data-link]`);t&&(e.preventDefault(),E(new URL(t.href).pathname))})});