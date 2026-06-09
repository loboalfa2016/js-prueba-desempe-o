export default function ReservationCard(reservation, currentUserId, currentUserRole, movieFunction = {}) {
  const { id, quantity, status, userId, reservedAt } = reservation;
  const { movie, room, date, startHour, endHour, status: functionStatus } = movieFunction;
  const showApproveReject = currentUserRole === "admin" && status === "pending";
  const showDelete = currentUserRole === "admin";
  const showEdit =
    currentUserRole === "user" && userId === currentUserId && status !== "canceled";

  const showCancel =
    currentUserRole === "user" &&
    userId === currentUserId &&
    status !== "canceled" &&
    functionStatus !== "canceled";

  const badgeClass =
    status === "confirmed"
      ? "bg-emerald-100 text-emerald-700"
      : status === "canceled"
      ? "bg-rose-100 text-rose-700"
      : "bg-amber-100 text-amber-700";

  const functionLabel = movie ? `${movie} (${room})` : "Unknown function";
  const dateLabel = date ? `${date} · ${startHour} - ${endHour}` : "No schedule";
  const reservedAtLabel = reservedAt ? new Date(reservedAt).toLocaleString() : "Unknown date";

  return `
    <article class="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div class="flex items-start justify-between gap-4">
        <div>
          <h3 class="text-lg font-semibold text-slate-950">${functionLabel}</h3>
          <p class="mt-1 text-sm text-slate-500">${dateLabel}</p>
        </div>
        <span class="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${badgeClass}">
          ${status}
        </span>
      </div>

      <div class="mt-5 space-y-3 text-sm text-slate-600">
        <p><span class="font-medium text-slate-800">Tickets:</span> ${quantity}</p>
        <p><span class="font-medium text-slate-800">Reserved at:</span> ${reservedAtLabel}</p>
        ${currentUserRole === "admin" ? `<p><span class="font-medium text-slate-800">User ID:</span> ${userId}</p>` : ""}
      </div>

      <div class="mt-5 flex flex-wrap gap-2">
        ${showEdit ? `<button data-action="edit" data-id="${id}" class="rounded-2xl border border-slate-300 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200">Edit</button>` : ""}
        ${showApproveReject ? `<button data-action="approve" data-id="${id}" class="rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500">Confirm</button>` : ""}
        ${showApproveReject ? `<button data-action="reject" data-id="${id}" class="rounded-2xl bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-400">Cancel</button>` : ""}
        ${showCancel ? `<button data-action="cancel" data-id="${id}" class="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200">Cancel</button>` : ""}
        ${showDelete ? `<button data-action="delete" data-id="${id}" class="rounded-2xl bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-400">Delete</button>` : ""}
      </div>
    </article>
  `;
}
