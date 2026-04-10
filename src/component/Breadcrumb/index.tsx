import { useNavigate } from "react-router-dom";
import { Breadcrumbs, type BreadcrumbItemProps } from "@/component/ui/breadcrumb";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BreadcrumbItem {
  /** Display label */
  label: string;
  /** Route path — omit for the last (current) item */
  path?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Thin wrapper around the shadcn `Breadcrumbs` primitive that
 * integrates with React Router navigation.
 *
 * Usage stays the same:
 * ```tsx
 * <Breadcrumb items={[
 *   { label: "Tariff Management", path: "/tariff-management" },
 *   { label: "Create Tariff" },  // last item — rendered as active page
 * ]} />
 * ```
 */
export default function Breadcrumb({ items, className }: BreadcrumbProps) {
  const navigate = useNavigate();

  if (!items.length) return null;

  // Map our simple items → shadcn BreadcrumbItemProps
  const breadcrumbItems: BreadcrumbItemProps[] = items.map((item, index) => ({
    name: item.label,
    href: item.path,
    active: index === items.length - 1,
  }));

  // Navigate via React Router when a breadcrumb link is clicked
  const handleItemClick = (index: number) => {
    const target = items[index];
    if (target?.path) {
      navigate(target.path);
    }
  };

  return (
    <Breadcrumbs
      items={breadcrumbItems}
      className={className}
      separator="/"
      onItemClick={handleItemClick}
    />
  );
}
