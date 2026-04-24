import React, { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRbacStore } from "@/rbac";
import { toast } from "sonner";

export const LocalStorageGuard = ({ children }: { children: React.ReactNode }) => {
  const logout = useAuthStore((s) => s.logout);
  const resetRbac = useRbacStore((s) => s.resetRbac);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      // Check for our specific storage keys
      if (event.key === "t_x7a91_meta" || event.key === "r0l3_x7a91_meta") {
        // If the value was changed, removed, or cleared
        if (event.oldValue !== event.newValue) {
          toast.error("Security alert: Unauthorized changes to local storage detected. Logging out for your safety.", {
            duration: 5000,
          });
          
          logout();
          resetRbac();
          
          // Force a small delay then redirect to ensure state is cleared
          setTimeout(() => {
            window.location.href = "/login";
          }, 500);
        }
      } else if (event.key === null) {
        // localStorage.clear() was called
        logout();
        resetRbac();
        window.location.href = "/login";
      }
    };

    window.addEventListener("storage", handleStorageChange);
    
    // Also catch manual changes in the SAME tab if possible (some browsers might not fire 'storage' for same tab)
    // but DevTools edits usually don't fire events. 
    // We can add a periodic check or check on focus.
    const handleFocus = () => {
        // This is a simple way to check if someone edited something while the tab was hidden/focused
        // but it's hard to compare without a backup.
    };
    
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("focus", handleFocus);
    };
  }, [logout, resetRbac]);

  return <>{children}</>;
};
export default LocalStorageGuard;