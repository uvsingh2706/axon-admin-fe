import { NavLink, useLocation } from "react-router-dom";
import { navItems } from "../../config/navigation";
import { useSidebarStore } from "../../store/sidebarStore";
import logo from "../../assets/images/logo.webp";

export default function Sidebar() {
  const { isCollapsed, toggleSidebar } = useSidebarStore();
  const location = useLocation();

  return (
    <aside
      className={`fixed top-0 left-0 z-30 h-screen bg-white-c1 border-r border-gray-c1 flex flex-col transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-[300px]"
      }`}
    >
      {/* ── Logo / Brand ───────────────────────────────── */}
      <div className="relative w-full border-b border-gray-c1 flex flex-col items-center justify-center px-5 py-5 gap-1.5 shrink-0">
        {!isCollapsed && (
          <>
            <img src={logo} alt="Axon Energies" className="h-10 w-auto" />
            <span className="text-xs font-medium text-text-700">
              Administrator Panel
            </span>
          </>
        )}

        <button
          id="sidebar-toggle"
          onClick={toggleSidebar}
          className="absolute right-4 top-4 text-text-400 hover:text-text-950 transition-colors"
          aria-label="Toggle sidebar"
        >
        </button>
      </div>

      {/* ── Nav Links ────────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto py-6 px-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <li key={item.key}>
                <NavLink
                  to={item.path}
                  end={item.path === "/"}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-primary-50 font-semibold"
                      : "text-text-600 font-normal text-base hover:bg-text-50 hover:text-text-950"
                  } ${isCollapsed ? "justify-center" : ""}`}
                >
                  <item.icon className={`w-5 h-5 shrink-0 [&_path]:stroke-current ${isActive ? "text-primary-700" : ""}`} />
                  {!isCollapsed && (
                    <span className={`truncate text-base ${isActive ? "font-semibold text-text-950" : "font-normal"}`}>{item.label}</span>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
