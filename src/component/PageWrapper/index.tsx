import { Button } from "@/component/ui/button";
import FilterIcon from "@/assets/icons/FilterIcon";
import DebouncedInput from "@/component/debounce-input";
import { Tabs, TabsList, TabsTrigger } from "@/component/ui/tabs";
import { cn } from "@/lib/utils";
import type { PageWrapperProps } from "./PageWrapper.types";
import { useAuthStore } from "@/store/authStore";
import { useRbacStore } from "@/rbac";
import { canByRbacMeta } from "@/rbac/rbac.guard";
export type { PageWrapperProps, TabConfig } from "./PageWrapper.types";

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
  titleClassName,
  isTable,
  className,
  headerActions,
  isSearchRight = false,
  searchClassName,
  actionRbac,
}: PageWrapperProps) {
  const defaultTab = tabs?.[0]?.value;
  const authRole = useAuthStore((s) => s.user?.role ?? null);
  const rbacRole = useRbacStore((s) => s.role);
  const permissions = useRbacStore((s) => s.permissions);

  const role = rbacRole ?? authRole;
  const canShowPrimaryAction = actionRbac
    ? canByRbacMeta({
        role,
        permissions,
        modules: actionRbac.modules,
        action: actionRbac.action ?? "create",
        mode: actionRbac.mode ?? "any",
      })
    : true;
   console.log(canShowPrimaryAction, 'showmethedata');
  // Decide whether to use Tabs container or just a plain wrapper
  const hasTabs = tabs && tabs.length > 0;

  // Search input node — reused in both layouts
  const searchNode = showSearch && onSearchChange && (
    <DebouncedInput
      value={searchValue}
      onChange={onSearchChange}
      placeholder={searchPlaceholder}
      className={searchClassName}
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
      {actionLabel && onActionClick && canShowPrimaryAction && (
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
              {tabs?.map((tab) => (
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

  // ── Search-right layout: title left, search + actions right (no tabs) ──────
  if (isSearchRight) {
    return (
      <div className={cn("flex flex-col gap-0 bg-white p-6 rounded-lg", className)}>
        <div className="flex items-center justify-between w-full mb-5">
          {title && (
            <h1 className={cn("heading-2-semibold text-text-950", titleClassName)}>
              {title}
            </h1>
          )}
          <div className="flex items-center gap-3">
            {searchNode}
            {actionsRight}
            {headerActions && <div>{headerActions}</div>}
          </div>
        </div>
        {children}
      </div>
    );
  }

  // ── Wrapper without tabs — search LEFT, filter + action RIGHT ─────────────
  return (
    <div className={cn("flex flex-col gap-0 bg-white p-6 rounded-lg", className)}>
      {(title || headerActions) && (
        <div className="flex items-center justify-between w-full mb-1">
          {title && (
            <h1 className={cn("heading-2-semibold text-text-950", titleClassName)}>
              {title}
            </h1>
          )}
          {headerActions && <div>{headerActions}</div>}
        </div>
      )}

      {!isTable && <div className="w-full border-b h-2 border-text-200" />}

      <div className="flex items-center justify-between gap-4 mb-5">
        {searchNode || <div />}
        {actionsRight}
      </div>

      {children}
    </div>
  );
}
