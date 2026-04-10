import type { ReactNode } from "react";
import { Button } from "@/component/ui/button";
import FilterIcon from "@/assets/icons/FilterIcon";
import DebouncedInput from "@/component/debounce-input";
import { Tabs, TabsList, TabsTrigger } from "@/component/ui/tabs";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TabConfig {
  value: string;
  label: string;
}

export interface PageWrapperProps {
  title?: string;

  // ── Tabs ──────────────────────────────────
  tabs?: TabConfig[];
  activeTab?: string;
  onTabChange?: (value: string) => void;

  // ── Search ────────────────────────────────
  /** Placeholder text for the search input */
  searchPlaceholder?: string;
  /** Controlled search value */
  searchValue?: string;
  /** Callback when search value changes */
  onSearchChange?: (value: string) => void;
  /** Set false to hide the search input. Defaults true. */
  showSearch?: boolean;

  // ── Filter ────────────────────────────────
  /** Callback when Filter button is clicked */
  onFilterClick?: () => void;
  /** Set false to hide the filter button. Defaults true. */
  showFilter?: boolean;

  // ── Primary action button ─────────────────
  /** Label for the primary CTA button */
  actionLabel?: string;
  /** Icon node rendered inside the CTA button */
  actionIcon?: ReactNode;
  /** Callback when CTA button is clicked */
  onActionClick?: () => void;

  // ── Content ───────────────────────────────
  /** Page body — usually a DataTable or tab-driven content */
  children: ReactNode;

  /** Additional className on the outer wrapper */
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PageWrapper({
  title,
  tabs,
  activeTab,
  onTabChange,
  searchPlaceholder = "Search",
  searchValue,
  onSearchChange,
  showSearch = true,
  onFilterClick,
  showFilter = true,
  actionLabel,
  actionIcon,
  onActionClick,
  children,
  className,
}: PageWrapperProps) {
  const defaultTab = tabs?.[0]?.value;

  // Decide whether to use Tabs container or just a plain wrapper
  const hasTabs = tabs && tabs.length > 0;

  // Search input node — reused in both layouts
  const searchNode = showSearch && onSearchChange && (
    <DebouncedInput
      value={searchValue}
      onChange={onSearchChange}
      placeholder={searchPlaceholder}
    />
  );

  // Filter + action buttons — always on the right
  const actionsRight = (
    <div className="flex items-center gap-3">
      {/* Filter button */}
      {showFilter && onFilterClick && (
        <Button
          variant="secondary"
          isIcon={<FilterIcon />}
          onClick={onFilterClick}
          className="border-text-200 text-text-700 hover:text-primary-700 hover:border-primary-700"
        >
          Filter
        </Button>
      )}

      {/* Primary action */}
      {actionLabel && onActionClick && (
        <Button
          variant="primary"
          isIcon={actionIcon}
          onClick={onActionClick}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );

  // ── Wrapper with tabs ──────────────────────────────────────────────────────
  if (hasTabs) {
    return (
      <div className={cn("flex flex-col gap-0 bg-white p-6 rounded-lg", className)}>
        <Tabs
          defaultValue={activeTab ?? defaultTab}
          onValueChange={onTabChange}
          className="gap-0"
        >
          {/* Toolbar row: tabs left, search/filter/action right */}
          <div className="flex items-center justify-between gap-4 mb-5">
            <TabsList>
              {tabs.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="flex items-center gap-3">
              {searchNode}
              {actionsRight}
            </div>
          </div>

          {/* Tab content — pages pass children as TabsContent blocks */}
          {children}
        </Tabs>
      </div>
    );
  }

  // ── Wrapper without tabs — search LEFT, filter + action RIGHT ─────────────
  return (
    <div className={cn("flex flex-col gap-0 bg-white p-6 rounded-lg", className)}>
      {title && <h1 className="heading-2-semibold text-text-950 mb-4">{title}</h1>}

      <div className="flex items-center justify-between gap-4 mb-5">
        {searchNode || <div />}
        {actionsRight}
      </div>

      {children}
    </div>
  );
}
