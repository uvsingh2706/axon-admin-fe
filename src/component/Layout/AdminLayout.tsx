import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { useSidebarStore } from "../../store/sidebarStore";

export default function AdminLayout() {
  const isCollapsed = useSidebarStore((s) => s.isCollapsed);

  return (
    <div className="min-h-screen bg-surface">
      <Sidebar />

      {/* Main content area — shifts based on sidebar width */}
      <main
        className={`transition-all duration-300 min-h-screen ${
          isCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        {/* Top bar */}
        <header className="h-16 border-b border-white/5 flex items-center px-8">
          <h2 className="text-sm font-medium text-gray-400">
            Axon EV Admin
          </h2>
        </header>

        {/* Page content */}
        <div className="p-8">
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
