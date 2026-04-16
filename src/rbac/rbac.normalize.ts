import type { ModuleKey, ModulePermission, RbacAction, RbacPermissions } from "./rbac.types";

const ACTIONS: readonly RbacAction[] = ["view", "create", "update", "delete"] as const;

function emptyPerm(): ModulePermission {
  return { view: false, create: false, update: false, delete: false };
}

function asBool(v: unknown): boolean {
  return v === true || v === 1 || v === "1" || v === "true";
}

function normalizeActions(actions: unknown): ModulePermission {
  const base = emptyPerm();

  // array: ["VIEW","CREATE"] or ["view","create"]
  if (Array.isArray(actions)) {
    for (const a of actions) {
      if (typeof a !== "string") continue;
      const key = a.trim().toLowerCase();
      if (key === "read") base.view = true;
      if ((ACTIONS as readonly string[]).includes(key)) (base as any)[key] = true;
      if (key === "c") base.create = true;
      if (key === "u") base.update = true;
      if (key === "d") base.delete = true;
      if (key === "v") base.view = true;
    }
    return base;
  }

  // object: { view: true, create: false, ... } or { canView: true, ... }
  if (actions && typeof actions === "object") {
    const obj = actions as Record<string, unknown>;
    for (const a of ACTIONS) {
      if (a in obj) base[a] = asBool(obj[a]);
    }
    if ("read" in obj) base.view = base.view || asBool(obj.read);
    if ("canView" in obj) base.view = base.view || asBool(obj.canView);
    if ("canCreate" in obj) base.create = base.create || asBool(obj.canCreate);
    if ("canUpdate" in obj) base.update = base.update || asBool(obj.canUpdate);
    if ("canDelete" in obj) base.delete = base.delete || asBool(obj.canDelete);
    return base;
  }

  return base;
}

function setModulePermission(
  out: RbacPermissions,
  moduleName: string,
  permission: ModulePermission
) {
  const module = moduleName.trim();
  if (!module) return;

  const normalizedKey = module.toUpperCase();
  const slugKey = normalizedKey.replace(/\s+/g, "_");

  out[module] = permission;
  out[normalizedKey] = permission;
  out[slugKey] = permission;
}

/**
 * Accepts multiple backend shapes and returns:
 * { [moduleKey]: { view, create, update, delete } }
 *
 * Supported common shapes:
 * - Array<{ module: string, actions: string[] }>
 * - Array<{ module: string, permissions: { view/create/update/delete booleans } }>
 * - Record<module, string[]>
 * - Record<module, { view/create/update/delete booleans }>
 */
export function normalizeBackendPermissions(input: unknown): RbacPermissions {
  const out: RbacPermissions = {};

  if (!input) return out;

  // Record form
  if (typeof input === "object" && !Array.isArray(input)) {
    const rec = input as Record<ModuleKey, unknown>;
    for (const [module, value] of Object.entries(rec)) {
      setModulePermission(out, module, normalizeActions(value));
    }
    return out;
  }

  // Array form
  if (Array.isArray(input)) {
    for (const row of input) {
      if (!row || typeof row !== "object") continue;
      const obj = row as Record<string, unknown>;
      const resource = obj.resource as Record<string, unknown> | undefined;
      const resourceName = typeof resource?.name === "string" ? resource.name : null;
      const module = obj.module ?? obj.key ?? obj.moduleKey ?? obj.name;
      const moduleName = typeof module === "string" ? module : resourceName;
      if (typeof moduleName !== "string" || !moduleName.trim()) continue;

      const permissions =
        obj.permissions ??
        obj.actions ??
        obj.action ??
        obj.permission ?? {
          create: obj.create,
          read: obj.read,
          update: obj.update,
          delete: obj.delete,
        };

      setModulePermission(out, moduleName, normalizeActions(permissions));
    }
  }

  return out;
}

