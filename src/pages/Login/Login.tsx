import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
// import { toast } from "sonner";
import { useLogin } from "../../services/auth";
import { Pathname } from "../../utils/pathname";
import { Button } from "@/component/ui/button";
import { Input } from "@/component/ui/input";
import OnboardingImage from "@/assets/images/Onboardingimage.webp";
import { useWhiteLabel } from "@/whitelabel";
import { useAuthStore } from "@/store/authStore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  const setAuth = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();
  const { assets } = useWhiteLabel();
  const loginMutation = useLogin();
  

  const handleSubmit = async (e: FormEvent) => {
          navigate(Pathname.DASHBOARD);
              e.preventDefault();
    // setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setAuth("fake-jwt-token", {
      id: "1",
      name: "Admin User",
      email,
      role: "FINANCE",
    });
    // setIsLoading(false);
    navigate(Pathname.DASHBOARD);

    // e.preventDefault();
    // try {
    //   // await loginMutation.mutateAsync({ email, password });
    //   // toast.success("Login successful");
    //   navigate(Pathname.DASHBOARD);
    // } catch (error: any) {
    //   toast.error(error?.response?.data?.message || "Login failed");
    // }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-screen overflow-hidden bg-white">

      <div className="hidden lg:block lg:w-[55%] shrink-0 relative overflow-hidden bg-[#1E1E1E]">
        <img
          src={OnboardingImage}
          alt="onboarding-img"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <div className="flex w-full lg:w-[45%] min-w-0 flex-col h-full overflow-y-auto">
        <div className="flex flex-col justify-center min-h-full px-6 py-10 sm:px-8 lg:px-10 xl:px-14">
          <div className="w-full max-w-[384px] min-w-65 mx-auto flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">

            <div className="w-full mb-8 text-center sm:text-left">
              <h1 className="text-[1.75rem] leading-[1.35] font-semibold text-black-c1 mb-2 tracking-tight">
                Log in to your account
              </h1>
              <p className="text-[#475467] text-base leading-relaxed">
                Welcome back! Please enter your details.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="w-full">
              <div className="flex flex-col gap-5">

                <Input
                  id="login-email"
                  label="Email"
                  labelClassName="text-[#1e293b] text-sm mb-1.5 font-medium"
                  type="email"
                  required
                  value={email}
                  onChange={(e: any) => setEmail(e.target.value)}
                  placeholder="Enter Email Address"
                  className="h-11"
                />

                <div className="flex flex-col">
                  <Input
                    id="login-password"
                    label="Password"
                    labelClassName="text-[#1e293b] text-sm mb-1.5 font-medium"
                    type="password"
                    required
                    value={password}
                    onChange={(e: any) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="h-11"
                  />
                  <div className="flex w-full justify-end mt-2">
                    <Link
                      to={Pathname.FORGOT_PASSWORD}
                      className="text-sm font-semibold text-[#1e3a8a] underline hover:opacity-80 transition-opacity"
                    >
                      Forgot password
                    </Link>
                  </div>
                </div>

                <Button
                  id="login-submit"
                  type="submit"
                  className="w-full h-11 mt-1 text-base border border-[#EAECF0] font-semibold bg-[#F2F4F7] hover:bg-primary-700 text-[#98A2B3] hover:text-white shadow-none rounded-lg transition-all duration-200"
                  isIcon={false}
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? "Signing in…" : "Sign in"}
                </Button>
              </div>
            </form>

            <div className="mt-10 w-full flex flex-col items-center gap-5">
              <div className="flex items-center w-full gap-3">
                <div
                  className="flex-1 h-px"
                  style={{
                    borderTop: "1px solid",
                    borderImage:
                      "linear-gradient(90deg, rgba(128,128,128,0) 0%, #808080 100%) 1",
                  }}
                />
                <span className="text-sm font-semibold text-[#1B1B1B]/25 tracking-wide whitespace-nowrap">
                  Powered by
                </span>
                <div
                  className="flex-1 h-px"
                  style={{
                    borderTop: "1px solid",
                    borderImage:
                      "linear-gradient(270deg, rgba(128,128,128,0) 0%, #808080 100%) 1",
                  }}
                />
              </div>

              <img
                alt={assets.logoAlt}
                src={assets.logo}
                className="h-10 w-auto max-w-28 object-contain"
              />
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}