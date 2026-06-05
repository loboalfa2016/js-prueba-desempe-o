export default function NotFoundView() {
  return `
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
  `;
}
