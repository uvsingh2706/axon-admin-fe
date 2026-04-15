import { useMemo } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRbacStore } from "./rbac.store";
import type { ModuleKey, RbacAction } from "./rbac.types";
import { Role } from "@/types/role";

export function useCan(module: ModuleKey, action: RbacAction = "view"): boolean {
  const authRole = useAuthStore((s) => s.user?.role ?? null);
  const rbacRole = useRbacStore((s) => s.role);
  const permissions = useRbacStore((s) => s.permissions);

  return useMemo(() => {
    const role = (rbacRole ?? authRole) as string | null;
    if (role === Role.SUPER_ADMIN) return true;
    return permissions?.[module]?.[action] === true;
  }, [action, authRole, module, permissions, rbacRole]);
}

export function useIsRbacLoaded(): boolean {
  return useRbacStore((s) => s.isLoaded);
}

