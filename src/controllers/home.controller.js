import ReservationCard from "@components/ReservationCard";
import FunctionCard from "@components/FunctionCard";
import {
  createReservation,
  getReservations,
  removeReservation,
  updateReservation,
} from "@services/reservation.service";
import {
  createFunction,
  getFunctions,
  removeFunction,
  updateFunction,
} from "@services/function.service";
import { getSession } from "@/utils";

const sortByDateTime = (reservation) => {
  const functionItem = getFunctionById(reservation.functionId);
  const date = functionItem?.date || reservation.date;
  const startHour = functionItem?.startHour || reservation.startHour;
  return new Date(`${date}T${startHour}`).getTime();
};

let reservationsCache = [];
let functionsCache = [];

const getFunctionById = (id) =>
  functionsCache.find((item) => String(item.id) === String(id));

const isFutureFunction = (movieFunction) => {
  if (!movieFunction?.date || !movieFunction?.startHour) return false;
  return new Date(`${movieFunction.date}T${movieFunction.startHour}`).getTime() > Date.now();
};

const renderList = (reservations, user) => {
  const container = document.querySelector("#reservationsContainer");
  if (!container) return;

  if (!reservations.length) {
    container.innerHTML = `
      <div class="w-full text-center py-10 col-span-2">
        <p class="text-slate-500">No reservations found.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = reservations
    .map((reservation) =>
      ReservationCard(
        reservation,
        user.id,
        user.role,
        getFunctionById(reservation.functionId),
      ),
    )
    .join("");
};

const renderFunctions = (movieFunctions, user) => {
  const container = document.querySelector("#functionsContainer");
  if (!container) return;

  if (!movieFunctions.length) {
    container.innerHTML = `
      <div class="w-full text-center py-10">
        <p class="text-slate-500">No functions registered yet.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = movieFunctions
    .sort((a, b) => new Date(`${a.date}T${a.startHour}`) - new Date(`${b.date}T${b.startHour}`))
    .map((movieFunction) => FunctionCard(movieFunction, user.role))
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
    .filter((reservation) => reservation.status !== "canceled")
    .filter((reservation) => {
      const movieFunction = getFunctionById(reservation.functionId);
      return movieFunction && isFutureFunction(movieFunction);
    })
    .sort(sortByDateTime)[0];

  const totalNode = document.querySelector("#totalReservations");
  const pendingNode = document.querySelector("#pendingReservations");
  const nextNode = document.querySelector("#nextReservation");

  if (totalNode) totalNode.textContent = total;
  if (pendingNode) pendingNode.textContent = pending;
  if (nextNode)
    nextNode.textContent = next
      ? `${getFunctionById(next.functionId)?.movie || "Unknown"} • ${getFunctionById(next.functionId)?.date || next.date}`
      : "No upcoming shows";
};

const showMessage = (selector, message, isError = false) => {
  const element = document.querySelector(`#${selector}`);
  if (!element) return;
  element.textContent = message;
  element.classList.remove("hidden");
  element.classList.toggle("text-rose-500", isError);
  element.classList.toggle("text-emerald-600", !isError);
};

const resetMessage = (selector) => {
  const element = document.querySelector(`#${selector}`);
  if (!element) return;
  element.textContent = "";
  element.classList.add("hidden");
  element.classList.remove("text-rose-500", "text-emerald-600");
};

const resetReservationFormState = (form) => {
  const editingReservationId = document.querySelector("#editingReservationId");
  const submitButton = document.querySelector("#submitReservationButton");
  const cancelEditBtn = document.querySelector("#cancelEditBtn");

  if (editingReservationId) editingReservationId.value = "";
  if (submitButton) submitButton.textContent = "Submit reservation";
  if (cancelEditBtn) cancelEditBtn.classList.add("hidden");
  if (form) form.reset();
  resetMessage("reservationMessage");
};

const resetFunctionFormState = (form) => {
  const editingFunctionId = document.querySelector("#editingFunctionId");
  const submitButton = document.querySelector("#submitFunctionButton");
  const cancelEditBtn = document.querySelector("#cancelFunctionEditBtn");

  if (editingFunctionId) editingFunctionId.value = "";
  if (submitButton) submitButton.textContent = "Save function";
  if (cancelEditBtn) cancelEditBtn.classList.add("hidden");
  if (form) form.reset();
  resetMessage("functionMessage");
};

const startReservationEditMode = (reservation) => {
  const form = document.querySelector("#reservationForm");
  const editingReservationId = document.querySelector("#editingReservationId");
  const submitButton = document.querySelector("#submitReservationButton");
  const cancelEditBtn = document.querySelector("#cancelEditBtn");
  const functionSelect = document.querySelector("#functionId");
  const quantityInput = document.querySelector("#quantity");

  if (!form || !editingReservationId || !submitButton || !cancelEditBtn || !functionSelect || !quantityInput) return;

  const functionItem = getFunctionById(reservation.functionId);

  functionSelect.value = reservation.functionId;
  quantityInput.value = reservation.quantity;
  editingReservationId.value = reservation.id;
  submitButton.textContent = "Update reservation";
  cancelEditBtn.classList.remove("hidden");
  renderFunctionInfo();
};

const startFunctionEditMode = (movieFunction) => {
  const form = document.querySelector("#functionForm");
  const editingFunctionId = document.querySelector("#editingFunctionId");
  const submitButton = document.querySelector("#submitFunctionButton");
  const cancelEditBtn = document.querySelector("#cancelFunctionEditBtn");

  if (!form || !editingFunctionId || !submitButton || !cancelEditBtn) return;

  form.movie.value = movieFunction.movie;
  form.room.value = movieFunction.room;
  form.functionDate.value = movieFunction.date;
  form.startHour.value = movieFunction.startHour;
  form.endHour.value = movieFunction.endHour;
  form.capacity.value = movieFunction.capacity;
  editingFunctionId.value = movieFunction.id;
  submitButton.textContent = "Update function";
  cancelEditBtn.classList.remove("hidden");
  resetMessage("functionMessage");
};

const renderFunctionOptions = () => {
  const select = document.querySelector("#functionId");
  if (!select) return;

  const activeFunctions = functionsCache.filter((movieFunction) => movieFunction.status === "active");

  if (!activeFunctions.length) {
    select.innerHTML = `<option value="" disabled selected>No active functions available</option>`;
    return;
  }

  select.innerHTML = `
    <option value="" disabled selected>Select a function</option>
    ${activeFunctions
      .sort((a, b) => new Date(`${a.date}T${a.startHour}`) - new Date(`${b.date}T${b.startHour}`))
      .map(
        (movieFunction) =>
          `<option value="${movieFunction.id}">${movieFunction.movie} — ${movieFunction.room} | ${movieFunction.date} ${movieFunction.startHour} • ${movieFunction.availableSeats} seats left</option>`,
      )
      .join("")}
  `;
};

const renderFunctionInfo = () => {
  const select = document.querySelector("#functionId");
  const info = document.querySelector("#functionInfo");
  if (!select || !info) return;

  const movieFunction = getFunctionById(select.value);

  if (!movieFunction) {
    info.textContent = "Select a function to see the available seats.";
    return;
  }

  const statusText = movieFunction.status !== "active" ? " (cancelled)" : "";
  info.textContent = `${movieFunction.room} • ${movieFunction.date} ${movieFunction.startHour} - ${movieFunction.endHour} • ${movieFunction.availableSeats} seats left${statusText}`;
};

const changeFunctionAvailableSeats = async (functionId, delta) => {
  const movieFunction = getFunctionById(functionId);
  if (!movieFunction) return;

  const updatedSeats = movieFunction.availableSeats + delta;
  await updateFunction(functionId, { availableSeats: updatedSeats });
};

const loadFunctions = async (user) => {
  try {
    const movieFunctions = await getFunctions();
    functionsCache = movieFunctions;
    renderFunctions(movieFunctions, user);
    renderFunctionOptions();
    renderFunctionInfo();
    return movieFunctions;
  } catch (error) {
    console.error("Error loading functions:", error);
    showMessage("functionMessage", "Could not load functions.", true);
    renderFunctions([], user);
    return [];
  }
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
    console.error("Error loading reservations:", error);
    showMessage("reservationMessage", "Could not load reservations.", true);
    renderList([], user);
    renderSummary([], user);
    return { reservations: [], filteredReservations: [] };
  }
};

const handleReservationAction = async (event, user) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const action = button.dataset.action;
  const reservationId = button.dataset.id;
  if (!reservationId) return;

  const reservation = reservationsCache.find((item) => String(item.id) === String(reservationId));
  if (!reservation) return;

  try {
    if (action === "edit") {
      const movieFunction = getFunctionById(reservation.functionId);
      if (!movieFunction || !isFutureFunction(movieFunction)) {
        showMessage("reservationMessage", "This reservation cannot be edited after the show starts.", true);
        return;
      }
      if (reservation.status === "canceled") {
        showMessage("reservationMessage", "Canceled reservations cannot be edited.", true);
        return;
      }
      startReservationEditMode(reservation);
      return;
    }

    if (action === "approve") {
      await updateReservation(reservationId, { status: "confirmed" });
      showMessage("reservationMessage", "Reservation confirmed.");
    }

    if (action === "reject") {
      await updateReservation(reservationId, { status: "canceled" });
      await changeFunctionAvailableSeats(reservation.functionId, reservation.quantity);
      showMessage("reservationMessage", "Reservation canceled.");
    }

    if (action === "cancel") {
      await updateReservation(reservationId, { status: "canceled" });
      await changeFunctionAvailableSeats(reservation.functionId, reservation.quantity);
      showMessage("reservationMessage", "Reservation canceled.");
    }

    if (action === "delete") {
      if (reservation.status !== "canceled") {
        await changeFunctionAvailableSeats(reservation.functionId, reservation.quantity);
      }
      await removeReservation(reservationId);
      showMessage("reservationMessage", "Reservation deleted.");
    }

    await loadReservations(user);
    resetReservationFormState(document.querySelector("#reservationForm"));
  } catch (error) {
    console.error(error);
    showMessage("reservationMessage", "Could not update the reservation.", true);
  }
};

const handleFunctionAction = async (event, user) => {
  const button = event.target.closest("button[data-function-action]");
  if (!button) return;

  const action = button.dataset.functionAction;
  const functionId = button.dataset.id;
  if (!functionId) return;

  const movieFunction = getFunctionById(functionId);
  if (!movieFunction) return;

  try {
    if (action === "edit") {
      startFunctionEditMode(movieFunction);
      return;
    }

    if (action === "cancel") {
      await updateFunction(functionId, { status: "canceled" });
      showMessage("functionMessage", "Function canceled.");
    }

    if (action === "activate") {
      await updateFunction(functionId, { status: "active" });
      showMessage("functionMessage", "Function reactivated.");
    }

    if (action === "delete") {
      const activeReservations = reservationsCache.filter(
        (reservation) =>
          String(reservation.functionId) === String(functionId) && reservation.status !== "canceled",
      );
      if (activeReservations.length) {
        showMessage("functionMessage", "Cannot delete a function with active reservations.", true);
        return;
      }
      await removeFunction(functionId);
      showMessage("functionMessage", "Function removed.");
    }

    await loadFunctions(user);
    await loadReservations(user);
  } catch (error) {
    console.error(error);
    showMessage("functionMessage", "Could not update the function.", true);
  }
};

export const homeController = async () => {
  const user = getSession();
  if (!user) return;

  const reservationForm = document.querySelector("#reservationForm");
  const functionForm = document.querySelector("#functionForm");
  const contentElement = document.querySelector("main");

  if (contentElement) {
    contentElement.addEventListener("click", (event) => {
      handleReservationAction(event, user);
      handleFunctionAction(event, user);
    });
  }

  if (reservationForm) {
    const cancelEditBtn = document.querySelector("#cancelEditBtn");
    const functionSelect = document.querySelector("#functionId");

    reservationForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      resetMessage("reservationMessage");

      const functionId = reservationForm.functionId.value;
      const quantity = Number(reservationForm.quantity.value);
      const editingReservationId = document.querySelector("#editingReservationId")?.value;

      if (!functionId || !quantity || quantity <= 0) {
        showMessage("reservationMessage", "Choose a function and a valid ticket quantity.", true);
        return;
      }

      const movieFunction = getFunctionById(functionId);
      if (!movieFunction) {
        showMessage("reservationMessage", "Selected function is not available.", true);
        return;
      }

      if (movieFunction.status !== "active") {
        showMessage("reservationMessage", "Cannot reserve tickets for a cancelled function.", true);
        return;
      }

      const existingReservation = editingReservationId
        ? reservationsCache.find((item) => String(item.id) === String(editingReservationId))
        : null;
      const currentQuantity = existingReservation ? Number(existingReservation.quantity) : 0;
      const isSameFunction = existingReservation && String(existingReservation.functionId) === String(functionId);
      const availableSeats = movieFunction.availableSeats + (isSameFunction ? currentQuantity : 0);

      if (quantity > availableSeats) {
        showMessage("reservationMessage", "Not enough seats available for this function.", true);
        return;
      }

      const payload = {
        userId: user.id,
        functionId,
        quantity,
        reservedAt: existingReservation?.reservedAt || new Date().toISOString(),
        status: existingReservation ? existingReservation.status : "pending",
      };

      try {
        if (editingReservationId) {
          if (!existingReservation) return;

          await updateReservation(editingReservationId, payload);

          if (isSameFunction) {
            const seatDelta = currentQuantity - quantity;
            if (seatDelta !== 0) {
              await changeFunctionAvailableSeats(functionId, seatDelta);
            }
          } else {
            await changeFunctionAvailableSeats(existingReservation.functionId, existingReservation.quantity);
            await changeFunctionAvailableSeats(functionId, -quantity);
          }

          showMessage("reservationMessage", "Reservation updated successfully.");
          resetReservationFormState(reservationForm);
        } else {
          await createReservation(payload);
          await changeFunctionAvailableSeats(functionId, -quantity);
          showMessage("reservationMessage", "Reservation request submitted.");
          reservationForm.reset();
        }

        await loadFunctions(user);
        await loadReservations(user);
      } catch (error) {
        console.error(error);
        showMessage("reservationMessage", "Could not save the reservation.", true);
      }
    });

    if (cancelEditBtn) {
      cancelEditBtn.addEventListener("click", () => resetReservationFormState(reservationForm));
    }

    if (functionSelect) {
      functionSelect.addEventListener("change", renderFunctionInfo);
    }
  }

  if (functionForm) {
    const cancelFunctionEditBtn = document.querySelector("#cancelFunctionEditBtn");

    functionForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      resetMessage("functionMessage");

      const editingFunctionId = document.querySelector("#editingFunctionId")?.value;
      const movie = functionForm.movie.value.trim();
      const room = functionForm.room.value.trim();
      const date = functionForm.functionDate.value;
      const startHour = functionForm.startHour.value;
      const endHour = functionForm.endHour.value;
      const capacity = Number(functionForm.capacity.value);

      if (!movie || !room || !date || !startHour || !endHour || !capacity) {
        showMessage("functionMessage", "Complete all fields before saving the function.", true);
        return;
      }

      if (startHour >= endHour) {
        showMessage("functionMessage", "End time must be later than start time.", true);
        return;
      }

      try {
        if (editingFunctionId) {
          const existingFunction = getFunctionById(editingFunctionId);
          if (!existingFunction) return;
          const reservedSeats = existingFunction.capacity - existingFunction.availableSeats;
          if (capacity < reservedSeats) {
            showMessage(
              "functionMessage",
              "Capacity cannot be smaller than already reserved seats.",
              true,
            );
            return;
          }

          await updateFunction(editingFunctionId, {
            movie,
            room,
            date,
            startHour,
            endHour,
            capacity,
            availableSeats: capacity - reservedSeats,
          });
          showMessage("functionMessage", "Function updated successfully.");
          resetFunctionFormState(functionForm);
        } else {
          await createFunction({
            movie,
            room,
            date,
            startHour,
            endHour,
            capacity,
            availableSeats: capacity,
            status: "active",
          });
          showMessage("functionMessage", "Function created successfully.");
          functionForm.reset();
        }

        await loadFunctions(user);
        await loadReservations(user);
      } catch (error) {
        console.error(error);
        showMessage("functionMessage", "Could not save the function.", true);
      }
    });

    if (cancelFunctionEditBtn) {
      cancelFunctionEditBtn.addEventListener("click", () => resetFunctionFormState(functionForm));
    }
  }

  try {
    await loadFunctions(user);
    await loadReservations(user);
  } catch (error) {
    console.error(error);
    showMessage("reservationMessage", "Unexpected error while loading data.", true);
  }
};

