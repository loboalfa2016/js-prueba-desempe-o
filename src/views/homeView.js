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
                Cinema booking panel
              </span>
              <h1 class="mt-6 text-5xl font-bold tracking-tight text-slate-950">Welcome, ${user?.name}</h1>
              <p class="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
                Manage movie functions, seat availability, and tickets with a clear role-based workflow.
              </p>
            </div>

            <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
              <div class="rounded-[2rem] bg-white p-6 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.35)] border border-slate-200">
                <p class="text-sm uppercase tracking-[0.3em] text-slate-400">Total</p>
                <p id="totalReservations" class="mt-4 text-4xl font-semibold text-slate-950">0</p>
                <p class="mt-2 text-sm text-slate-500">Visible reservations</p>
              </div>
              <div class="rounded-[2rem] bg-white p-6 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.35)] border border-slate-200">
                <p class="text-sm uppercase tracking-[0.3em] text-slate-400">Pending</p>
                <p id="pendingReservations" class="mt-4 text-4xl font-semibold text-amber-600">0</p>
                <p class="mt-2 text-sm text-slate-500">Requests awaiting review</p>
              </div>
              <div class="rounded-[2rem] bg-white p-6 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.35)] border border-slate-200">
                <p class="text-sm uppercase tracking-[0.3em] text-slate-400">Next</p>
                <p id="nextReservation" class="mt-4 text-3xl font-semibold text-slate-950">No upcoming shows</p>
                <p class="mt-2 text-sm text-slate-500">Next reservation</p>
              </div>
            </div>
          </section>

          <section class="grid gap-6 xl:grid-cols-[380px_1fr]">
            <aside class="space-y-6">
              <div class="rounded-[2rem] bg-white p-6 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.35)] border border-slate-200">
                <h2 class="text-xl font-semibold text-slate-950">Available functions</h2>
                <p class="mt-2 text-slate-600">Browse movie showtimes and review seat availability before booking.</p>
                <div id="functionsContainer" class="mt-6 grid gap-4"></div>
              </div>

              ${user?.role === "user" ? `
                <div class="rounded-[2rem] bg-white p-6 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.35)] border border-slate-200">
                  <h2 class="text-xl font-semibold text-slate-950">New ticket reservation</h2>
                  <p class="mt-2 text-slate-600">Choose a function, select the number of tickets, and request your seats.</p>
                  <form id="reservationForm" class="mt-6 space-y-4">
                    <div>
                      <label class="block text-sm font-medium text-slate-700" for="functionId">Movie function</label>
                      <select id="functionId" name="functionId" required class="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"></select>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-slate-700" for="quantity">Tickets</label>
                      <input id="quantity" name="quantity" type="number" value="1" min="1" required class="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20" />
                    </div>
                    <p id="functionInfo" class="text-sm text-slate-500">Select a function to see the available seats.</p>
                    <input type="hidden" id="editingReservationId" name="editingReservationId" />
                    <p id="reservationMessage" class="hidden text-sm text-emerald-600"></p>
                    <button id="submitReservationButton" type="submit" class="mt-2 w-full rounded-2xl bg-emerald-600 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500">Submit reservation</button>
                    <button id="cancelEditBtn" type="button" class="hidden mt-2 w-full rounded-2xl border border-slate-300 bg-white py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">Cancel edit</button>
                  </form>
                </div>
              ` : `
                <div class="rounded-[2rem] bg-white p-6 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.35)] border border-slate-200">
                  <h2 class="text-xl font-semibold text-slate-950">Manage functions</h2>
                  <p class="mt-2 text-slate-600">Create and update movie showtimes with seat capacity and status.</p>
                  <form id="functionForm" class="mt-6 space-y-4">
                    <div>
                      <label class="block text-sm font-medium text-slate-700" for="movie">Movie title</label>
                      <input id="movie" name="movie" required class="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20" placeholder="The Great Premiere" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-slate-700" for="room">Room</label>
                      <input id="room" name="room" required class="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20" placeholder="Sala 1" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-slate-700" for="functionDate">Date</label>
                      <input id="functionDate" type="date" name="functionDate" required class="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20" />
                    </div>
                    <div class="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label class="block text-sm font-medium text-slate-700" for="startHour">Start</label>
                        <input id="startHour" type="time" name="startHour" required class="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20" />
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-slate-700" for="endHour">End</label>
                        <input id="endHour" type="time" name="endHour" required class="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20" />
                      </div>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-slate-700" for="capacity">Seat capacity</label>
                      <input id="capacity" name="capacity" type="number" min="1" value="20" required class="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20" />
                    </div>
                    <input type="hidden" id="editingFunctionId" name="editingFunctionId" />
                    <p id="functionMessage" class="hidden text-sm text-emerald-600"></p>
                    <button id="submitFunctionButton" type="submit" class="mt-2 w-full rounded-2xl bg-emerald-600 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500">Save function</button>
                    <button id="cancelFunctionEditBtn" type="button" class="hidden mt-2 w-full rounded-2xl border border-slate-300 bg-white py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">Cancel edit</button>
                  </form>
                </div>
              `}
            </aside>

            <section class="space-y-6">
              <div class="rounded-[2rem] bg-white p-6 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.35)] border border-slate-200">
                <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 class="text-xl font-semibold text-slate-950">Reservation list</h2>
                    <p class="mt-2 text-slate-600">Monitor bookings for movie functions and manage tickets.</p>
                  </div>
                  <span class="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">${user?.role === "admin" ? "Admin access" : "My reservations"}</span>
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
