import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { RbacStore } from "./rbac.types";
import { normalizeBackendPermissions } from "./rbac.normalize";

export const useRbacStore = create<RbacStore>()(
  persist(
    (set) => ({
      isLoaded: false,
      role: null,
      permissions: {},

      resetRbac: () => set({ isLoaded: true, role: null, permissions: {} }),

      setRbac: (next) => set({ isLoaded: true, role: next.role, permissions: next.permissions }),

      setPermissionsFromBackend: ({ role, backendPermissions }) => {
        const permissions = normalizeBackendPermissions(backendPermissions);
        set({ isLoaded: true, role, permissions });
      },
    }),
    {
      name: "axon-admin-rbac",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isLoaded: state.isLoaded,
        role: state.role,
        permissions: state.permissions,
      }),
    }
  )
);

