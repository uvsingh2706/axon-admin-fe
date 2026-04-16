import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../store/authStore";
import { authApi } from "./auth.api";
import type { LoginPayload } from "./auth.types";
import { useRbacStore } from "../../rbac";

export const authKeys = {
  all: ["auth"] as const,
  profile: () => [...authKeys.all, "profile"] as const,
};

export const useLogin = () => {
  const setAuth = useAuthStore((s) => s.setAuth);
  const logout = useAuthStore((s) => s.logout);
  const resetRbac = useRbacStore((s) => s.resetRbac);
  const setPermissionsFromBackend = useRbacStore((s) => s.setPermissionsFromBackend);

  return useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),
    onSuccess: async (response) => {
      const token = response?.accessToken;
      if (!token) {
        throw new Error("Access token not found in login response");
      }

      // Set minimal auth first so profile call can use bearer token interceptor.
      setAuth(token, {
        id: response?.userId,
        role: response?.role,
      });

      try {
        const profile = await authApi.getProfile(response?.userId);

        setAuth(token, {
          id: profile.id,
          role: profile.role?.name ?? response?.role,
          name: profile.name,
          email: profile.email,
          profilePicture: profile.profilePicture,
          mobileNumber: profile.mobileNumber,
          address: profile.address,
          accountDisable: profile.accountDisable,
          fleetId: profile.fleetId,
        });

        setPermissionsFromBackend({
          role: profile.role?.name ?? response?.role,
          backendPermissions: profile.role?.permissions ?? [],
        });
      } catch (error) {
        // Avoid partial login state when profile/RBAC hydration fails.
        logout();
        resetRbac();
        throw error;
      }
    },

    onError: (error) => {
      console.error("Login Failed:", error);
    },
  });
};

export const useProfile = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: authKeys.profile(),
    queryFn: () => authApi.getProfile(),
    enabled: isAuthenticated,
  });
};

export const useLogout = () => {
  const logout = useAuthStore((s) => s.logout);
  const resetRbac = useRbacStore((s) => s.resetRbac);

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      logout();
      resetRbac();
    },
  });
};
