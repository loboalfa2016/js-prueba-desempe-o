import { removeSession } from "@/utils";
import { navigateTo } from "@/router/router";

export default function Sidebar() {
  setTimeout(() => {
    document
      .querySelector("#logoutBtn")
      ?.addEventListener("click", () => {
        removeSession();
        navigateTo("/");
      });
  });

  return `
    <aside class="w-72 min-h-screen bg-slate-950 text-white p-6 flex flex-col justify-between border-r border-slate-800">
      <div>
        <h2 class="text-3xl font-semibold tracking-tight text-emerald-300 mb-6">
          Trello
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
  `;
}
