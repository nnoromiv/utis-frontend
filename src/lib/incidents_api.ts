import { api } from "./api";

export const getIncidentsCurrent = async () => {
  const res = await api.get("/api/incidents/current");
  return res.data;
};

export const getIncidentsActive = async () => {
  const res = await api.get("/api/incidents/active");
  return res.data;
};

export const getIncidentsSummary = async () => {
  const res = await api.get("/api/incidents/summary");
  return res.data;
};

export const getIncidentsById = async (id: string) => {
  const res = await api.get(`/api/incidents/${id}`);
  return res.data;
};
