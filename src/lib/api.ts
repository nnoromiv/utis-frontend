import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL as string;

export const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// Summary

export const getDataSummary = async () => {
  const res = await api.get("/api/summary");
  return res.data;
};

export const getWeatherTrafficCorrelation = async () => {
  const res = await api.get("/api/summary/weather-traffic");
  return res.data;
};

// Visuals

export const getWeatherTrend = async () => {
  const res = await api.get("/api/visuals/weather-trend");
  return res.data;
};

// System

export const getExportData = async () => {
  const res = await api.get(`/api/data/export}`);
  return res.data;
};

export const getSystemHealth = async () => {
  const res = await api.get(`/api/system/health}`);
  return res.data;
};

export const getSystemStats = async () => {
  const res = await api.get(`/api/system/stats}`);
  return res.data;
};
