import type { ComponentType, LazyExoticComponent } from "react";
import type { ModuleKey, RbacAction } from "@/rbac";

export type RbacMode = "any" | "all";

export interface NavRbacMeta {
  /**
   * Backend permission resources that should be checked for this navigation item.
   * Example: "Tariff Management" -> ["TAX", "TARIFF"].
   */
  modules: ModuleKey[];
  /** CRUD action to check on those modules (defaults to "view"). */
  action?: RbacAction;
  /**
   * If "any": show nav item when user has action on any module.
   * If "all": show nav item only when user has action on all modules.
   */
  mode?: RbacMode;
}

export interface NavItem {
  key: string;
  label: string;
  path: string;
  /** SVG icon rendered inside the sidebar */
  icon: ComponentType<{ className?: string }>;
  /** Lazy-loaded page component */
  component: LazyExoticComponent<ComponentType>;
  /** Sub-items for nested routes (future use) */
  children?: NavItem[];
  /** Optional RBAC rule used to show/hide this sidebar route. */
  rbac?: NavRbacMeta;
}
