import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import { useSidebarStore } from "../../store/sidebarStore";

export default function AdminLayout() {
  const isCollapsed = useSidebarStore((s) => s.isCollapsed);

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />

      {/* Main content area — shifts based on sidebar width */}
      <div
        className={`flex flex-col min-h-screen transition-all duration-300 ${
          isCollapsed ? "ml-20" : "ml-[300px]"
        }`}
      >
        {/* Header */}
        <Header />

        {/* Page content */}
        <main className="flex-1 p-4 bg-secondary-00">
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-2 border-primary-700 border-t-transparent rounded-full animate-spin" />
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
