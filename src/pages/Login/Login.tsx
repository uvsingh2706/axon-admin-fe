import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { Pathname } from "../../utils/pathname";
import { Button } from "@/component/ui/button";
import { Input } from "@/component/ui/input";
import Logo from '@/assets/images/logo.webp'
import OnboardingImage from '@/assets/images/Onboardingimage.webp'

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
    <div className="flex min-h-dvh w-full bg-white lg:h-dvh lg:overflow-hidden">
      <div className="hidden lg:block lg:w-[55%] xl:w-[55%] relative bg-[#1E1E1E]">
        <div className="absolute inset-0">
          <img src={OnboardingImage} alt="onboarding-img" className="h-full w-full object-cover" />
        </div>
      </div>

      {/* RIGHT SIDE - FORM */}
      <div className="flex w-full lg:w-[45%] xl:w-[45%] flex-col lg:h-full lg:overflow-y-auto relative">
        <div className="flex flex-col justify-center min-h-full p-6 sm:p-8 lg:p-12">
          <div className="w-full max-w-[384px] mx-auto flex flex-col py-10">
          
          <div className="w-full mb-10 text-center sm:text-left">
            <h1 className="text-3xl font-semibold text-[#101828] mb-2 tracking-tight">Log in to your account</h1>
            <p className="text-[#475467] text-base">Welcome back! Please enter your details.</p>
          </div>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex flex-col gap-6">
              
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

              <div className="relative">
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
                  <Link to={Pathname.FORGOT_PASSWORD} className="text-sm font-semibold text-[#1e3a8a] py-1 underline hover:underline">
                    Forgot password
                  </Link>
                </div>
              </div>

              <Button
                id="login-submit"
                type="submit"
                className="w-full py-6 mt-1 text-base border border-[#EAECF0] font-semibold bg-[#F2F4F7] hover:bg-primary-700 text-[#98A2B3] hover:text-[#FFFFFF] shadow-none rounded-lg transition-all"
                isIcon={false}
              >
                {isLoading ? "Signing in…" : "Sign in"}
              </Button>
            </div>
          </form>

          <div className="mt-16 w-full flex flex-col items-center gap-6">
            <div className="flex items-center w-full justify-center gap-4">
               <div 
                 className="flex-1 h-px max-w-[148.5px]" 
                 style={{ 
                   borderTop: "1px solid",
                   borderImage: "linear-gradient(90deg, rgba(128, 128, 128, 0) 0%, #808080 100%) 1" 
                 }}
               ></div>
               <span className="text-base font-semibold text-[#1B1B1B40] tracking-wide">Powered by</span>
               <div 
                 className="flex-1 h-px max-w-[148.5px]" 
                 style={{ 
                   borderTop: "1px solid",
                   borderImage: "linear-gradient(270deg, rgba(128, 128, 128, 0) 0%, #808080 100%) 1" 
                 }}
               ></div>
            </div>
            
            <div>
               <div className="flex items-center gap-2">
               <img alt="axon energies" src={Logo} className="h-11 w-28 object-contain"/>
              </div>
            </div>
          </div>

        </div>
        </div>
      </div>
    </div>
  );
}
