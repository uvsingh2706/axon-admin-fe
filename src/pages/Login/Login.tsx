import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { Pathname } from "../../utils/pathname";
import { Button } from "@/component/ui/button";
import { LeftArrowIcon } from "@/assets/icons";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const setAuth = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Replace with real useLogin() mutation when API is ready
    await new Promise((r) => setTimeout(r, 800));
    setAuth("fake-jwt-token", {
      id: "1",
      name: "Admin User",
      email,
      role: "admin",
    });
    setIsLoading(false);
    navigate(Pathname.DASHBOARD);
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Axon <span className="text-primary">EV</span>
          </h1>
          <p className="text-gray-400 text-sm mt-2">Admin Console</p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-surface-2 rounded-2xl p-8 border border-white/5 shadow-xl"
        >
          <h2 className="text-xl font-semibold text-white mb-6">Sign in</h2>

          {/* Email */}
          <label className="block mb-4">
            <span className="text-sm text-gray-400 mb-1.5 block">Email</span>
            <input
              id="login-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@axon-ev.com"
              className="w-full bg-surface rounded-lg border border-white/10 px-4 py-2.5 text-white text-sm placeholder-gray-500 outline-none focus:border-primary transition-colors"
            />
          </label>

          {/* Password */}
          <label className="block mb-6">
            <span className="text-sm text-gray-400 mb-1.5 block">Password</span>
            <input
              id="login-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-surface rounded-lg border border-white/10 px-4 py-2.5 text-white text-sm placeholder-gray-500 outline-none focus:border-primary transition-colors"
            />
          </label>

          {/* Submit */}
          <Button
            id="login-submit"
            variant="primary"
            className="w-full text-lg"
            isIcon={false}
          >
            {isLoading ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
}
