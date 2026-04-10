import { useLocation } from "react-router-dom";
import { navItems } from "@/config/navigation";
import NotificationIcon from "@/assets/icons/NotificationIcon";
import UsersIcon from "@/assets/icons/UserIcon";

/**
 * Derives the current page title from navItems config
 * by matching the current pathname.
 */
function usePageTitle(): string {
  const { pathname } = useLocation();
  const matched = navItems.find((item) => pathname.startsWith(item.path));
  return matched?.label ?? "Dashboard";
}

export default function Header() {
  const pageTitle = usePageTitle();

  return (
    <header className="h-26 border-b border-gray-c1 bg-white flex items-center justify-between px-8  shrink-0">
      {/* ── Page Title ───────────────────────────────── */}
      <h1 className="text-2xl font-semibold heading-3-semibold  text-text-950">{pageTitle}</h1>

      {/* ── Right Section: Notification + Profile ───── */}
      <div className="flex items-center gap-5">
        {/* Notification bell */}
        <button
          id="header-notification"
          className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-text-50 transition-colors text-text-700"
          aria-label="Notifications"
        >
          <NotificationIcon className="w-6 h-6" />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-c2" />

        {/* Profile */}
        <button
          id="header-profile"
          className="flex items-center gap-3 hover:opacity-90 transition-opacity cursor-pointer"
          aria-label="User profile"
          onClick={()=>{}}
        >
          {/* Avatar circle */}
        <UsersIcon className="h-8 w-8"/>

          {/* User info */}
          <div className="text-left">
            <p className="subtitle-3-semibold text-black-c1 leading-tight">Admin User</p>
            <p className="subtitle-3-5-regular text-text-500 leading-tight">admin@evcharge.com</p>
          </div>
        </button>
      </div>
    </header>
  );
}
