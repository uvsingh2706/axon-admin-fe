import { Role } from "@/types/role";
import type { ModuleKey, RbacAction, RbacPermissions } from "./rbac.types";

function normalizeKeyAliases(key: ModuleKey): ModuleKey[] {
  const raw = String(key);
  const upper = raw.toUpperCase();
  const slugUpper = upper.replace(/\s+/g, "_");

  // Preserve order: raw -> uppercase -> slug
  return [raw, upper, slugUpper];
}

export function hasCan(
  opts: {
    role: string | null | undefined;
    permissions: RbacPermissions;
    module: ModuleKey;
    action: RbacAction;
  }
): boolean {
  const { role, permissions, module, action } = opts;

  if (!permissions) return false;

  if (role === Role.SUPER_ADMIN) return true;

  for (const alias of normalizeKeyAliases(module)) {
    if (permissions?.[alias]?.[action] === true) return true;
  }

  return false;
}

export function hasAnyCan(
  opts: {
    role: string | null | undefined;
    permissions: RbacPermissions;
    modules: ModuleKey[];
    action: RbacAction;
  }
): boolean {
  const { role, permissions, modules, action } = opts;
  return modules.some((m) => hasCan({ role, permissions, module: m, action }));
}

export function hasAllCan(
  opts: {
    role: string | null | undefined;
    permissions: RbacPermissions;
    modules: ModuleKey[];
    action: RbacAction;
  }
): boolean {
  const { role, permissions, modules, action } = opts;
  return modules.every((m) => hasCan({ role, permissions, module: m, action }));
}

export function canByRbacMeta(opts: {
  role: string | null | undefined;
  permissions: RbacPermissions;
  modules: ModuleKey[];
  action: RbacAction;
  mode: "any" | "all";
}): boolean {
  const { role, permissions, modules, action, mode } = opts;
  if (mode === "all") {
    return hasAllCan({ role, permissions, modules, action });
  }
  return hasAnyCan({ role, permissions, modules, action });
}

