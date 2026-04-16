import { useLocation, useNavigate } from "react-router-dom";
import { navItems } from "@/config/navigation";
import NotificationIcon from "@/assets/icons/NotificationIcon";
import UsersIcon from "@/assets/icons/UserIcon";
import KeyIcon from "@/assets/icons/KeyIcon";
import LogoutIcon from "@/assets/icons/LogoutIcon";
import { Popover, PopoverContent, PopoverTrigger } from "@/component/ui/popover";
import { useAuthStore } from "@/store/authStore";
import { Pathname } from "@/utils/pathname";
import { useState } from "react";
import { Modal } from "@/component/Modal";

function usePageTitle(): string {
  const { pathname } = useLocation();
  const matched = navItems.find((item) => pathname.startsWith(item.path));
  return matched?.label ?? "Dashboard";
}

export default function Header() {
  const pageTitle = usePageTitle();
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChangePassword = () => {
    setOpen(false);
    // Defer logout until after we navigate so ProtectedRoute doesn't intercept
    // the jump and force a redirect to /login
    navigate(Pathname.FORGOT_PASSWORD);
    // setTimeout(() => {
    //   logout();
    // }, 2000);
  };

  const handleSignOut = () => {
    setOpen(false);
    setIsModalOpen(true);
  };

  const confirmSignOut = () => {
    setIsModalOpen(false);
    logout();
    navigate(Pathname.LOGIN, { replace: true });
  };

  return (
    <header className="h-26 border-b border-gray-c1 bg-white flex items-center justify-between px-8 shrink-0">
      <h1 className="text-2xl font-semibold heading-3-semibold text-text-950">{pageTitle}</h1>

      <div className="flex items-center gap-5">
        <button
          id="header-notification"
          className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-text-50 transition-colors text-text-700"
          aria-label="Notifications"
        >
          <NotificationIcon className="w-6 h-6" />
        </button>

        <div className="w-px h-6 bg-gray-c2" />

        {/* Profile */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button
              id="header-profile"
              className="flex items-center gap-3 hover:opacity-90 transition-opacity cursor-pointer"
              aria-label="User profile"
            >
              <UsersIcon className="h-8 w-8" />
              <div className="text-left">
                <p className="subtitle-3-semibold text-black-c1 leading-tight capitalize">
                  {user?.name || user?.role || "Admin User"}
                </p>
                <p className="subtitle-3-5-regular text-text-500 leading-tight">
                  {user?.email || "admin@evcharge.com"}
                </p>
              </div>
            </button>
          </PopoverTrigger>

          <PopoverContent
            align="end"
            sideOffset={12}
            className="w-56 p-2 rounded-xl"
          >
            <button
              onClick={handleChangePassword}
              className="flex items-center font-semibold gap-3 w-full px-4 py-3 rounded-lg subtitle-3-medium text-text-700 hover:bg-secondary-00 transition-colors cursor-pointer"
            >
              <KeyIcon className="w-4 h-4 shrink-0" />
              Change Password
            </button>
            <button
              onClick={handleSignOut}
              className="flex items-center font-semibold gap-3 w-full px-4 py-3 rounded-lg subtitle-3-medium text-red-c1 hover:bg-secondary-00 transition-colors cursor-pointer"
            >
              <LogoutIcon className="w-4 h-4 shrink-0" />
              Sign out
            </button>
          </PopoverContent>
        </Popover>
        <Modal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          description="Are you sure you want to Logout?"
          confirmLabel="Logout"
          onConfirm={confirmSignOut}
          icon={<LogoutIcon className="w-9 h-9" />}
          mediaClassName="w-[4.4375rem] h-[4.4375rem] rounded-full shrink-0"
        />
      </div>
    </header>
  );
}
