import { Routes, Route, Navigate } from "react-router-dom";
import { navItems } from "../config/navigation";
import { Pathname } from "../utils/pathname";
import AdminLayout from "../component/Layout/AdminLayout";
import ProtectedRoute from "../component/ProtectedRoute/ProtectedRoute";
import Login from "../pages/Login/Login";
import ForgetPassword from "../pages/ForgetPassword";
import ComponentsShowcase from "../pages/ComponentsShowcase";
import { useAuthStore } from "../store/authStore";

export default function AppRoutes() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return (
    <Routes>
      {/* Public route — redirect to dashboard if already logged in */}

      <Route
        path={Pathname.LOGIN}
        element={isAuthenticated ? <Navigate to={Pathname.DASHBOARD} replace /> : <Login />}
      />
      <Route
        path={Pathname.FORGOT_PASSWORD}
        element={isAuthenticated ? <Navigate to={Pathname.DASHBOARD} replace /> : <ForgetPassword />}
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
      
        {/* Auto-generate routes from navItems config (Sidebar visible) */}
        {navItems.map((item) => (
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
