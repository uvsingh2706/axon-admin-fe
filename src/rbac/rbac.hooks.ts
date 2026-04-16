import { useMemo } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRbacStore } from "./rbac.store";
import type { ModuleKey, RbacAction, RbacPermissions } from "./rbac.types";
import { Role } from "@/types/role";

function getPermissionFromAliases(
  permissions: RbacPermissions,
  module: ModuleKey,
  action: RbacAction
): boolean {
  const rawKey = String(module);
  const upperKey = rawKey.toUpperCase();
  const slugKey = upperKey.replace(/\s+/g, "_");

  return (
    permissions?.[rawKey]?.[action] === true ||
    permissions?.[upperKey]?.[action] === true ||
    permissions?.[slugKey]?.[action] === true
  );
}

export function useCan(module: ModuleKey, action: RbacAction = "view"): boolean {
  const authRole = useAuthStore((s) => s.user?.role ?? null);
  const rbacRole = useRbacStore((s) => s.role);
  const permissions = useRbacStore((s) => s.permissions);

  return useMemo(() => {
    const role = (rbacRole ?? authRole) as string | null;
    if (role === Role.SUPER_ADMIN) return true;
    return getPermissionFromAliases(permissions, module, action);
  }, [action, authRole, module, permissions, rbacRole]);
}

export function useCanAny(modules: ModuleKey[], action: RbacAction = "view"): boolean {
  const authRole = useAuthStore((s) => s.user?.role ?? null);
  const rbacRole = useRbacStore((s) => s.role);
  const permissions = useRbacStore((s) => s.permissions);

  return useMemo(() => {
    const role = (rbacRole ?? authRole) as string | null;
    if (role === Role.SUPER_ADMIN) return true;
    return modules.some((module) => getPermissionFromAliases(permissions, module, action));
  }, [action, authRole, modules, permissions, rbacRole]);
}

export function useIsRbacLoaded(): boolean {
  return useRbacStore((s) => s.isLoaded);
}

