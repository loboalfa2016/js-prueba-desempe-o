export default function FunctionCard(movieFunction, currentUserRole) {
  const { id, movie, room, date, startHour, endHour, capacity, availableSeats, status } = movieFunction;
  const statusClass =
    status === "active"
      ? "bg-emerald-100 text-emerald-700"
      : "bg-rose-100 text-rose-700";

  return `
    <article class="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div class="flex items-start justify-between gap-4">
        <div>
          <h3 class="text-lg font-semibold text-slate-950">${movie}</h3>
          <p class="mt-1 text-sm text-slate-500">${room} · ${date} · ${startHour} - ${endHour}</p>
        </div>
        <span class="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${statusClass}">
          ${status}
        </span>
      </div>

      <div class="mt-5 space-y-2 text-sm text-slate-600">
        <p><span class="font-medium text-slate-800">Capacity:</span> ${capacity}</p>
        <p><span class="font-medium text-slate-800">Available seats:</span> ${availableSeats}</p>
      </div>

      ${currentUserRole === "admin" ? `
        <div class="mt-5 flex flex-wrap gap-2">
          <button data-function-action="edit" data-id="${id}" class="rounded-2xl border border-slate-300 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200">Edit</button>
          <button data-function-action="${status === "active" ? "cancel" : "activate"}" data-id="${id}" class="rounded-2xl bg-amber-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-400">
            ${status === "active" ? "Cancel" : "Activate"}
          </button>
          <button data-function-action="delete" data-id="${id}" class="rounded-2xl bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-400">Delete</button>
        </div>
      ` : ""}
    </article>
  `;
}
