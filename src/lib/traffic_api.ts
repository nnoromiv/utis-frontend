import { api } from "./api";

export const getTrafficCurrent = async () => {
  const res = await api.get("/api/traffic/current");
  return res.data;
};

export const getTrafficHistory = async () => {
  const res = await api.get("/api/traffic/history");
  return res.data;
};

export const getTrafficSummary = async () => {
  const res = await api.get("/api/traffic/summary");
  return res.data;
};


export const getTrafficHeatMap = async () => {
  const res = await api.get("/api/traffic/heatmap");
  return res.data;
};

export const postRefreshTraffic = async () => {
  const res = await api.post("/api/traffic/refresh");
  return res.data;
};

export const getTrafficByCity = async (origin: string, destination : string) => {
  const res = await api.get(`/api/traffic/${origin}/${destination}`);
  return res.data;
};
