import { http } from "@/api/http";

export const getFunctions = () => http.get("/functions");
export const createFunction = (data) => http.post("/functions", data);
export const updateFunction = (id, data) => http.patch(`/functions/${id}`, data);
export const removeFunction = (id) => http.delete(`/functions/${id}`);
