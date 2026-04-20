import React from "react";
import type { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/component/ui/tabs";
import { cn } from "@/lib/utils";

interface TabItem {
  label: ReactNode;
  value: string;
}

interface WrapperProps {
  tabs: TabItem[];
  children?: ReactNode;
  activeTab?: string;
  defaultTab?: string;
  onTabChange?: (value: string) => void;
  className?: string;
  searchNode?: ReactNode;
  actionsRight?: ReactNode;
}

const Wrapper = ({
  tabs,
  children,
  activeTab,
  defaultTab,
  onTabChange,
  className,
  searchNode,
  actionsRight,
}: WrapperProps) => {
  return (
    <div className={cn("flex flex-col gap-0 bg-white  border-text-100 border-2 p-6 rounded-lg! w-full  mt-2", className)}>
      <Tabs
        defaultValue={activeTab ?? defaultTab}
        value={activeTab}
        onValueChange={onTabChange}
        className="w-full gap-0 flex flex-col"
      >
        {/* Toolbar row: tabs left, search/filter/action right */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-text-200 mb-5 relative pb-0">
          <TabsList className="bg-transparent p-0 gap-6 h-auto self-start md:self-auto rounded-none w-full md:w-auto overflow-x-auto justify-start">
            {tabs?.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={cn(
                  "px-1 py-3 bg-transparent! shadow-none! rounded-none! border-b-3 border-transparent transition-colors",
                  // Inactive formatting
                  "text-text-500 font-medium",
                  // Active formatting overrides
                  "data-[state=active]:border-secondary-600 data-[state=active]:text-blue-c3! data-[state=active]:font-semibold"
                )}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="flex items-center gap-3 w-full md:w-auto pb-3 md:pb-0 relative top-[-6px]">
            {searchNode}
            {actionsRight}
          </div>
        </div>

        {/* Tab content — pages pass children as TabsContent blocks */}
        {children}
      </Tabs>
    </div>
  );
};

export default Wrapper;