export default function ReservationCard(reservation, currentUserId, currentUserRole) {
  const { id, workspace, date, startHour, endHour, reason, status, userId } = reservation;
  const showApproveReject = currentUserRole === "admin" && status === "pending";
  const showCancel = currentUserRole === "user" && userId === currentUserId && status === "pending";
  const badgeClass =
    status === "approved"
      ? "bg-emerald-100 text-emerald-700"
      : status === "rejected"
      ? "bg-rose-100 text-rose-700"
      : "bg-amber-100 text-amber-700";

  return `
    <article class="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div class="flex items-start justify-between gap-4">
        <div>
          <h3 class="text-lg font-semibold text-slate-950">${workspace}</h3>
          <p class="mt-1 text-sm text-slate-500">${date} · ${startHour} - ${endHour}</p>
        </div>
        <span class="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${badgeClass}">
          ${status}
        </span>
      </div>

      <div class="mt-5 space-y-3 text-sm text-slate-600">
        <p><span class="font-medium text-slate-800">Motivo:</span> ${reason}</p>
        ${currentUserRole === "admin" ? `<p><span class="font-medium text-slate-800">Usuario ID:</span> ${userId}</p>` : ""}
      </div>

      <div class="mt-5 flex flex-wrap gap-2">
        ${showApproveReject ? `<button data-action="approve" data-id="${id}" class="rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500">Aprobar</button>` : ""}
        ${showApproveReject ? `<button data-action="reject" data-id="${id}" class="rounded-2xl bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-400">Rechazar</button>` : ""}
        ${showCancel ? `<button data-action="cancel" data-id="${id}" class="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200">Cancelar</button>` : ""}
      </div>
    </article>
  `;
}
