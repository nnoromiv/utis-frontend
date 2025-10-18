import { api } from "./api";

export const getWeatherCurrent = async () => {
  const res = await api.get("/api/weather/current");
  return res.data;
};

export const getWeatherHistory = async () => {
  const res = await api.get("/api/weather/history");
  return res.data;
};

export const getWeatherSummary = async () => {
  const res = await api.get("/api/weather/summary");
  return res.data;
};

export const getAllCity = async () => {
  const res = await api.get(`/api/weather/cities`);
  return res.data;
};

export const getWeatherByCity = async (city: string) => {
  const res = await api.get(`/api/weather/${city}`);
  return res.data;
};

export const postRefreshWeather = async () => {
  const res = await api.post("/api/weather/refresh");
  return res.data;
};
