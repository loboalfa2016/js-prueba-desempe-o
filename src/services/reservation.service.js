import { http } from "@/api/http";

export const getReservations = () => http.get("/reservations");
export const createReservation = (data) => http.post("/reservations", data);
export const updateReservation = (id, data) => http.patch(`/reservations/${id}`, data);
export const removeReservation = (id) => http.delete(`/reservations/${id}`);
