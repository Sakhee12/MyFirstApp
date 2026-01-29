import { API } from "./apis";

export const createEventRequest = (data: any) =>
  API.post("/event-requests/request", data);

export const getMyEventRequests = () =>
  API.get("/event-requests/my-requests");
