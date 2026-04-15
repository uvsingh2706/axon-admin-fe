import type { RoleValue } from "@/types/role";

export type ModuleKey = string;

export type RbacAction = "view" | "create" | "update" | "delete";

export type ModulePermission = Record<RbacAction, boolean>;

export type RbacPermissions = Record<ModuleKey, ModulePermission>;

export interface RbacState {
  isLoaded: boolean;
  role: RoleValue | null;
  permissions: RbacPermissions;
}

export interface RbacActions {
  resetRbac: () => void;
  setRbac: (next: { role: RoleValue | null; permissions: RbacPermissions }) => void;
  setPermissionsFromBackend: (args: {
    role: RoleValue | null;
    backendPermissions: unknown;
  }) => void;
}

export type RbacStore = RbacState & RbacActions;

