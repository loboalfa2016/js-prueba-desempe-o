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

const loadReservations = async (user) => {
  try {
    const reservations = await getReservations();
    const filteredReservations =
      user.role === "admin"
        ? reservations
        : reservations.filter((reservation) => reservation.userId === user.id);

    renderSummary(reservations, user);
    renderList(filteredReservations, user);
    return { reservations, filteredReservations };
  } catch (error) {
    console.error("Error loading reservations:", error);
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
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      resetMessage();

      const workspace = form.workspace.value.trim();
      const date = form.date.value;
      const startHour = form.startHour.value;
      const endHour = form.endHour.value;
      const reason = form.reason.value.trim();

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
        await createReservation(payload);
        form.reset();
        showMessage("Solicitud enviada con éxito.");
        await loadReservations(user);
      } catch (error) {
        console.error(error);
        showMessage("No se pudo enviar la solicitud.", true);
      }
    });
  }

  try {
    await loadReservations(user);
  } catch (error) {
    console.error(error);
    showMessage("Error inesperado al cargar las reservas.", true);
  }
};
