import { Outlet } from "react-router-dom";
import Breadcrumb, { type BreadcrumbItem } from "@/component/Breadcrumb";

export interface ModuleLayoutProps {
  breadcrumbs?: BreadcrumbItem[];
}

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
