import { Routes, Route, Navigate } from "react-router-dom";
import { navItems } from "../config/navigation";
import AdminLayout from "../component/Layout/AdminLayout";
import ProtectedRoute from "../component/ProtectedRoute/ProtectedRoute";
import Login from "../pages/Login/Login";
import { useAuthStore } from "../store/authStore";

export default function AppRoutes() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return (
    <Routes>
      {/* Public route — redirect to "/" if already logged in */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
      />

      {/* Protected admin shell — all module routes live inside */}
      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        {/* Auto-generate routes from navItems config */}
        {navItems.map((item) => (
          <Route
            key={item.key}
            path={item.path}
            element={<item.component />}
          />
        ))}
      </Route>

      {/* Catch-all → redirect to dashboard */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
