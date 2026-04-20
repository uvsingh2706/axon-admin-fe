import type { ReactNode } from "react";
import type { ModuleKey, RbacAction } from "@/rbac";

export interface TabConfig {
  value: string;
  label: string;
}

export interface PageWrapperProps {
  title?: ReactNode;
  tabs?: TabConfig[];
  activeTab?: string;
  onTabChange?: (value: string) => void;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  showSearch?: boolean;
  onFilterClick?: () => void;
  showFilter?: boolean;
  actionLabel?: string;
  isTable?: boolean;
  actionIcon?: ReactNode;
  onActionClick?: () => void;
  children: ReactNode;
  titleClassName?: string;
  className?: string;
  headerActions?: ReactNode;
  isSearchRight?: boolean;
  searchClassName?: string;
  isChargerSpecifications: boolean,
  actionRbac?: {
    modules: ModuleKey[];
    action?: RbacAction;
    mode?: "any" | "all";
  };
}
