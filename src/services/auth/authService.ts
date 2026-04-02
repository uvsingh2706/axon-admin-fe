import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "../../lib/axios";
import { useAuthStore } from "../../store/authStore";
import type { User } from "../../store/authStore";

// ── Types ───────────────────────────────────────────────────────────
export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

// ── API functions ───────────────────────────────────────────────────
const authApi = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const { data } = await apiClient.post<LoginResponse>("/auth/login", payload);
    return data;
  },

  getProfile: async (): Promise<User> => {
    const { data } = await apiClient.get<User>("/auth/profile");
    return data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post("/auth/logout");
  },
};

// ── Query Keys ──────────────────────────────────────────────────────
export const authKeys = {
  all: ["auth"] as const,
  profile: () => [...authKeys.all, "profile"] as const,
};

// ── Hooks ───────────────────────────────────────────────────────────

/**
 * Login mutation.
 * On success → stores token + user in Zustand (which persists to localStorage).
 */
export const useLogin = () => {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),
    onSuccess: ({ token, user }) => {
      setAuth(token, user);
    },
  });
};

/**
 * Fetch current user profile.
 * Only enabled when a token exists.
 */
export const useProfile = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: authKeys.profile(),
    queryFn: authApi.getProfile,
    enabled: isAuthenticated,
  });
};

/**
 * Logout mutation.
 * Clears Zustand store after the server acknowledges logout.
 */
export const useLogout = () => {
  const logout = useAuthStore((s) => s.logout);

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      logout();
    },
  });
};
