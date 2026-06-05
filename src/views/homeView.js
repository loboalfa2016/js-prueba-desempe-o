import Sidebar from "@/components/Sidebar";
import { getSession } from "@/utils";
import { homeController } from "@/controllers/home.controller";

export default function homeView() {
  const user = getSession();

  setTimeout(() => {
    homeController();
  });

  return `
    <div class="flex min-h-screen bg-slate-100 text-slate-950">
      ${Sidebar()}

      <main class="flex-1 p-6 lg:p-10">
        <div class="mx-auto w-full max-w-7xl space-y-8">
          <section class="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
            <div class="rounded-[2rem] bg-white p-8 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.35)] border border-slate-200">
              <span class="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-700">
                Panel de reservas
              </span>
              <h1 class="mt-6 text-5xl font-bold tracking-tight text-slate-950">Hola, ${user?.name}</h1>
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
                  <span class="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">${user?.role === "admin" ? "Acceso total" : "Solo tus reservas"}</span>
                </div>
                <div id="reservationsContainer" class="mt-6 grid gap-4 md:grid-cols-2"></div>
              </div>
            </section>
          </section>
        </div>
      </main>
    </div>
  `;
}
