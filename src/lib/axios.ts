import axios from "axios";
import type { AxiosInstance } from "axios";
import { useAuthStore } from "../store/authStore";

// ── All base URLs from environment ──────────────────────────────────
// Add new service URLs here as your backend grows.
const API_URLS = {
  default: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  auth: import.meta.env.VITE_AUTH_API_URL || "http://localhost:3001/api",
  stations: import.meta.env.VITE_STATIONS_API_URL || "http://localhost:3002/api",
  sessions: import.meta.env.VITE_SESSIONS_API_URL || "http://localhost:3003/api",
} as const;

export type ApiServiceKey = keyof typeof API_URLS;

// ── Shared interceptors (applied to every client) ───────────────────

function attachInterceptors(instance: AxiosInstance): AxiosInstance {
  // Request: attach auth token
  instance.interceptors.request.use(
    (config) => {
      const token = useAuthStore.getState().token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response: handle 401 globally
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        useAuthStore.getState().logout();
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );

  return instance;
}

// ── Factory: create a configured axios instance ─────────────────────

function createApiClient(serviceKey: ApiServiceKey): AxiosInstance {
  const instance = axios.create({
    baseURL: API_URLS[serviceKey],
    timeout: 15000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return attachInterceptors(instance);
}

// ── Cache created instances (singleton per service) ─────────────────
const clientCache = new Map<ApiServiceKey, AxiosInstance>();

export function getApiClient(serviceKey: ApiServiceKey = "default"): AxiosInstance {
  if (!clientCache.has(serviceKey)) {
    clientCache.set(serviceKey, createApiClient(serviceKey));
  }
  return clientCache.get(serviceKey)!;
}

// ── Default export for backward compatibility ───────────────────────
// Existing code using `import apiClient from "./axios"` keeps working.
export const apiClient = getApiClient("default");
// export default apiClient;
