import type { ComponentType, LazyExoticComponent } from "react";

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
}
