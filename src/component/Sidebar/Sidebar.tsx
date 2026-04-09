// import { NavLink } from "react-router-dom";
// import { navItems } from "../../config/navigation";
// import { useSidebarStore } from "../../store/sidebarStore";
// import { useAuthStore } from "../../store/authStore";

// export default function Sidebar() {
//   const { isCollapsed, toggleSidebar } = useSidebarStore();
//   const { user, logout } = useAuthStore();

//   return (
//     <aside
//       className={`fixed top-0 left-0 z-30 h-screen bg-surface-2 border-r border-white/5 flex flex-col transition-all duration-300 ${
//         isCollapsed ? "w-20" : "w-64"
//       }`}
//     >
//       {/* ── Header ───────────────────────────────────── */}
//       <div className="flex items-center justify-between px-5 h-16 border-b border-white/5 shrink-0">
//         {!isCollapsed && (
//           <span className="text-lg font-bold text-white tracking-tight whitespace-nowrap">
//             Axon <span className="text-primary">EV</span>
//           </span>
//         )}

//         <button
//           id="sidebar-toggle"
//           onClick={toggleSidebar}
//           className={`text-gray-400 hover:text-white transition-colors ${isCollapsed ? "mx-auto" : ""}`}
//           aria-label="Toggle sidebar"
//         >
//           <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//             {isCollapsed ? (
//               <>
//                 <line x1="3" y1="6" x2="21" y2="6" />
//                 <line x1="3" y1="12" x2="21" y2="12" />
//                 <line x1="3" y1="18" x2="21" y2="18" />
//               </>
//             ) : (
//               <>
//                 <line x1="3" y1="6" x2="21" y2="6" />
//                 <line x1="3" y1="12" x2="15" y2="12" />
//                 <line x1="3" y1="18" x2="21" y2="18" />
//               </>
//             )}
//           </svg>
//         </button>
//       </div>

//       {/* ── Nav Links ────────────────────────────────── */}
//       <nav className="flex-1 overflow-y-auto py-4 px-3">
//         <ul className="space-y-1">
//           {navItems.map((item) => (
//             <li key={item.key}>
//               <NavLink
//                 to={item.path}
//                 end={item.path === "/"}
//                 className={({ isActive }) =>
//                   `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
//                     isActive
//                       ? "bg-primary/10 text-primary"
//                       : "text-gray-400 hover:text-white hover:bg-white/5"
//                   } ${isCollapsed ? "justify-center" : ""}`
//                 }
//               >
//                 <item.icon className="w-5 h-5 shrink-0" />
//                 {!isCollapsed && <span className="truncate">{item.label}</span>}
//               </NavLink>
//             </li>
//           ))}
//         </ul>
//       </nav>

//       {/* ── Footer / User ────────────────────────────── */}
//       <div className="border-t border-white/5 px-3 py-4 shrink-0">
//         {!isCollapsed && user && (
//           <div className="mb-3 px-3">
//             <p className="text-sm text-white font-medium truncate">{user.name}</p>
//             <p className="text-xs text-gray-500 truncate">{user.email}</p>
//           </div>
//         )}
//         <button
//           id="sidebar-logout"
//           onClick={logout}
//           className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-danger hover:bg-danger/10 transition-colors ${
//             isCollapsed ? "justify-center" : ""
//           }`}
//         >
//           <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//             <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
//             <polyline points="16 17 21 12 16 7" />
//             <line x1="21" y1="12" x2="9" y2="12" />
//           </svg>
//           {!isCollapsed && <span>Logout</span>}
//         </button>
//       </div>
//     </aside>
//   );
// }

import { NavLink } from "react-router-dom";
import { navItems } from "../../config/navigation";
import { useSidebarStore } from "../../store/sidebarStore";
import logo from "../../assets/images/logo.webp";

export default function Sidebar() {
  const { isCollapsed, toggleSidebar } = useSidebarStore();

  return (
    <aside
      className={`fixed top-0 left-0 z-30 h-screen bg-white border-r flex flex-col transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-[300px]"
      }`}
    >
      {/* ── Header ───────────────────────────────────── */}
      <div className="relative w-full h-[96px] border-b flex flex-col items-center justify-center px-5 py-4 gap-2 shrink-0">
        {!isCollapsed && (
          <>
            <img src={logo} alt="logo" className="h-10 w-auto" />
            <span className="text-sm text-gray-500">
              Administrator Panel
            </span>
          </>
        )}

        <button
          id="sidebar-toggle"
          onClick={toggleSidebar}
          className="absolute right-4 top-4 text-gray-400 hover:text-black transition-colors"
          aria-label="Toggle sidebar"
        >
        </button>
      </div>

      {/* ── Nav Links ────────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto py-6 px-4">
        <ul className="space-y-3">
          {navItems.map((item) => (
            <li key={item.key}>
              <NavLink
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                                   `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 [&_path]:stroke-current ${
                    isActive
                      ? "bg-orange-100 text-primary-700"
                      : "text-gray-500 hover:text-black hover:bg-gray-100"
                  } ${isCollapsed ? "justify-center" : ""}`

                }
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {!isCollapsed && (
                  <span className="truncate">{item.label}</span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
