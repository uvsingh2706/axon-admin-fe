import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// ── Types ───────────────────────────────────────────────────────────
export interface User {
  id: string;
  name?: string;
  email?: string;
  role: string;
  profilePicture?: string | null;
  mobileNumber?: string;
  address?: string | null;
  accountDisable?: boolean;
  fleetId?: string | null;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

interface AuthActions {
  setAuth: (token: string, user: User) => void;
  logout: () => void;
}

type AuthStore = AuthState & AuthActions;

// ── Store ───────────────────────────────────────────────────────────
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // State
      token: null,
      user: null,
      isAuthenticated: false,

      // Actions
      setAuth: (token, user) =>
        set({ token, user, isAuthenticated: true }),

      logout: () =>
        set({ token: null, user: null, isAuthenticated: false }),
    }),
    {
      name: "axon-admin-auth",
      storage: createJSONStorage(() => localStorage),
      // Only persist token and user — isAuthenticated is derived on hydration
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
