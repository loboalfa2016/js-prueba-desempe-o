import { loginController } from "@/controllers/login.controller";

export default function loginView() {
  setTimeout(() => {
    loginController();
  });

  return `
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
  `;
}
