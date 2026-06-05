import ReservationCard from "@components/ReservationCard";
import {
  createReservation,
  getReservations,
  removeReservation,
  updateReservation,
} from "@services/reservation.service";
import { getSession } from "@/utils";

const sortByDateTime = (reservation) =>
  new Date(`${reservation.date}T${reservation.startHour}`).getTime();

const renderList = (reservations, user) => {
  const container = document.querySelector("#reservationsContainer");
  if (!container) return;

  if (!reservations.length) {
    container.innerHTML = `
      <div class="w-full text-center py-10 col-span-2">
        <p class="text-slate-500">No hay reservas disponibles.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = reservations
    .map((reservation) => ReservationCard(reservation, user.id, user.role))
    .join("");
};

const renderSummary = (reservations, user) => {
  const filteredReservations =
    user.role === "admin"
      ? reservations
      : reservations.filter((reservation) => reservation.userId === user.id);

  const total = filteredReservations.length;
  const pending = filteredReservations.filter((reservation) => reservation.status === "pending").length;
  const next = filteredReservations
    .filter((reservation) => reservation.status !== "rejected")
    .sort(sortByDateTime)[0];

  const totalNode = document.querySelector("#totalReservations");
  const pendingNode = document.querySelector("#pendingReservations");
  const nextNode = document.querySelector("#nextReservation");

  if (totalNode) totalNode.textContent = total;
  if (pendingNode) pendingNode.textContent = pending;
  if (nextNode)
    nextNode.textContent = next
      ? `${next.workspace} • ${next.date}`
      : "Sin próximas";
};

const showMessage = (message, isError = false) => {
  const element = document.querySelector("#formMessage");
  if (!element) return;
  element.textContent = message;
  element.classList.remove("hidden");
  element.classList.toggle("text-rose-500", isError);
  element.classList.toggle("text-emerald-600", !isError);
};

const resetMessage = () => {
  const element = document.querySelector("#formMessage");
  if (!element) return;
  element.textContent = "";
  element.classList.add("hidden");
  element.classList.remove("text-rose-500", "text-emerald-600");
};

let reservationsCache = [];

const resetFormState = (form) => {
  const editingReservationId = document.querySelector("#editingReservationId");
  const submitButton = document.querySelector("#submitReservationButton");
  const cancelEditBtn = document.querySelector("#cancelEditBtn");

  if (editingReservationId) editingReservationId.value = "";
  if (submitButton) submitButton.textContent = "Enviar solicitud";
  if (cancelEditBtn) cancelEditBtn.classList.add("hidden");
  if (form) form.reset();
};

const startEditMode = (reservation) => {
  const form = document.querySelector("#reservationForm");
  const editingReservationId = document.querySelector("#editingReservationId");
  const submitButton = document.querySelector("#submitReservationButton");
  const cancelEditBtn = document.querySelector("#cancelEditBtn");

  if (!form || !editingReservationId || !submitButton || !cancelEditBtn) return;

  form.workspace.value = reservation.workspace;
  form.date.value = reservation.date;
  form.startHour.value = reservation.startHour;
  form.endHour.value = reservation.endHour;
  form.reason.value = reservation.reason;
  editingReservationId.value = reservation.id;
  submitButton.textContent = "Guardar cambios";
  cancelEditBtn.classList.remove("hidden");
};

const loadReservations = async (user) => {
  try {
    const reservations = await getReservations();
    reservationsCache = reservations;
    const filteredReservations =
      user.role === "admin"
        ? reservations
        : reservations.filter((reservation) => reservation.userId === user.id);

    renderSummary(reservations, user);
    renderList(filteredReservations, user);
    return { reservations, filteredReservations };
  } catch (error) {
    console.error("Error loading reservas:", error);
    showMessage("No se pudieron cargar las reservas.", true);
    renderList([], user);
    renderSummary([], user);
    return { reservations: [], filteredReservations: [] };
  }
};

const handleAction = async (event, user) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const action = button.dataset.action;
  const reservationId = button.dataset.id;
  if (!reservationId) return;

  try {
    if (action === "edit") {
      const reservation = reservationsCache.find((item) => String(item.id) === String(reservationId));
      if (!reservation) return;
      startEditMode(reservation);
      return;
    }

    if (action === "approve") {
      await updateReservation(reservationId, { status: "approved" });
      showMessage("Reserva aprobada correctamente.");
    }

    if (action === "reject") {
      await updateReservation(reservationId, { status: "rejected" });
      showMessage("Reserva rechazada.");
    }

    if (action === "cancel") {
      await removeReservation(reservationId);
      showMessage("Reserva cancelada.");
    }

    await loadReservations(user);
    resetFormState(document.querySelector("#reservationForm"));
  } catch (error) {
    console.error(error);
    showMessage("No se pudo actualizar la reserva.", true);
  }
};

export const homeController = async () => {
  const user = getSession();
  if (!user) return;

  const form = document.querySelector("#reservationForm");
  const container = document.querySelector("#reservationsContainer");

  if (container) {
    container.addEventListener("click", (event) => handleAction(event, user));
  }

  if (form) {
    const cancelEditBtn = document.querySelector("#cancelEditBtn");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      resetMessage();

      const workspace = form.workspace.value.trim();
      const date = form.date.value;
      const startHour = form.startHour.value;
      const endHour = form.endHour.value;
      const reason = form.reason.value.trim();
      const editingReservationId = document.querySelector("#editingReservationId")?.value;

      if (!workspace || !date || !startHour || !endHour || !reason) {
        showMessage("Completa todos los campos para crear tu reserva.", true);
        return;
      }

      if (startHour >= endHour) {
        showMessage("La hora de fin debe ser mayor a la hora de inicio.", true);
        return;
      }

      const payload = {
        userId: user.id,
        workspace,
        date,
        startHour,
        endHour,
        reason,
        status: "pending",
      };

      try {
        if (editingReservationId) {
          await updateReservation(editingReservationId, payload);
          showMessage("Reserva actualizada correctamente.");
          resetFormState(form);
        } else {
          await createReservation(payload);
          showMessage("Solicitud enviada con éxito.");
          form.reset();
        }

        await loadReservations(user);
      } catch (error) {
        console.error(error);
        showMessage("No se pudo guardar la reserva.", true);
      }
    });

    if (cancelEditBtn) {
      cancelEditBtn.addEventListener("click", () => resetFormState(form));
    }
  }

  try {
    await loadReservations(user);
  } catch (error) {
    console.error(error);
    showMessage("Error inesperado al cargar las reservas.", true);
  }
};
