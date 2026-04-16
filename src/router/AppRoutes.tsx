import { Routes, Route, Navigate } from "react-router-dom";
import { navItems } from "../config/navigation";
import { Pathname } from "../utils/pathname";
import AdminLayout from "../component/Layout/AdminLayout";
import ProtectedRoute from "../component/ProtectedRoute/ProtectedRoute";
import Login from "../pages/Login/Login";
import ForgetPassword from "../pages/ForgetPassword";
import ComponentsShowcase from "../pages/ComponentsShowcase";
import { useAuthStore } from "../store/authStore";
import { useRbacStore } from "@/rbac";
import { Role } from "@/types/role";
import { canByRbacMeta } from "@/rbac/rbac.guard";

export default function AppRoutes() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const authRole = useAuthStore((s) => s.user?.role ?? null);
  const rbacRole = useRbacStore((s) => s.role);
  const permissions = useRbacStore((s) => s.permissions);
  const isRbacLoaded = useRbacStore((s) => s.isLoaded);

  const role = rbacRole ?? authRole;

  const visibleNavItems = navItems.filter((item) => {
    if (!item.rbac) return true;

    const action = item.rbac.action ?? "view";
    const mode = item.rbac.mode ?? "any";

    if (!isRbacLoaded) {
      if (role === Role.SUPER_ADMIN) return true;
      return item.key === "dashboard";
    }

    return canByRbacMeta({
      role,
      permissions,
      modules: item.rbac.modules,
      action,
      mode,
    });
  });

  return (
    <Routes>
      {/* Public route — redirect to dashboard if already logged in */}

      <Route
        path={Pathname.LOGIN}
        element={isAuthenticated ? <Navigate to={Pathname.DASHBOARD} replace /> : <Login />}
      />
      <Route
        path={Pathname.FORGOT_PASSWORD}
        element={<ForgetPassword />}
      />
      <Route path={Pathname.COMPONENTS} element={<ComponentsShowcase />} />

      {/* Protected admin shell — all module routes live inside */}
      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
      
        {/* Auto-generate routes from navItems config with RBAC filtering */}
        {visibleNavItems.map((item) => (
          <Route
            key={item.key}
            path={`${item.path}/*`}
            element={<item.component />}
          />
        ))}

        
      </Route>

      {/* Catch-all → redirect to dashboard */}
      <Route path="*" element={<Navigate to={Pathname.DASHBOARD} replace />} />
    </Routes>
  );
}
