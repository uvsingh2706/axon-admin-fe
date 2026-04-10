import { Outlet } from "react-router-dom";
import Breadcrumb, { type BreadcrumbItem } from "@/component/Breadcrumb";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ModuleLayoutProps {
  /**
   * Breadcrumb items to show above the content.
   * Pass an empty array (or omit) on the index/list route to hide breadcrumbs.
   */
  breadcrumbs?: BreadcrumbItem[];
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Shared layout shell for every module sub-route (create / detail / edit).
 *
 * Renders:
 * 1. Optional breadcrumb trail
 * 2. `<Outlet />` for the active child route
 *
 * Usage (inside a module's `<Routes>`):
 * ```tsx
 * <Route element={<ModuleLayout breadcrumbs={[...]} />}>
 *   <Route index element={<List />} />
 *   <Route path="create" element={<Create />} />
 * </Route>
 * ```
 *
 * For dynamic breadcrumbs (e.g. showing the item name), prefer
 * defining breadcrumbs inside each sub-page and passing them via
 * an <Outlet context> or a dedicated wrapper.
 */
export default function ModuleLayout({ breadcrumbs }: ModuleLayoutProps) {
  return (
    <div className="flex flex-col gap-4">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumb items={breadcrumbs} />
      )}
      <Outlet />
    </div>
  );
}
