import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Pathname } from "../../utils/pathname";

import Logo from "@/assets/images/logo.webp";
import OnboardingImage from "@/assets/images/Onboardingimage.webp";

import StepEnterEmail from "./components/StepEnterEmail";
import StepEmailSent from "./components/StepEmailSent";
import StepChangePassword from "./components/StepChangePassword";
import StepSuccess from "./components/StepSuccess";

export default function ForgetPassword() {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentStep === 2) {
      const timer = setTimeout(() => setCurrentStep(3), 2000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  // Step 1: Send reset email
  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    setIsLoading(false);
    setCurrentStep(2);
  };

  // Step 3: Update password
  const handlePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setConfirmPasswordError("");

    if (!password || !confirmPassword) return;

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsLoading(false);
    setCurrentStep(4);
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-screen overflow-hidden bg-white">
      {/* LEFT SIDE - IMAGE (constant across all steps) */}
      <div className="hidden lg:block lg:w-[55%] shrink-0 relative overflow-hidden bg-[#1E1E1E]">
        <img
          src={OnboardingImage}
          alt="onboarding-img"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      {/* RIGHT SIDE - CONTENT */}
      <div className="flex w-full lg:w-[45%] min-w-0 flex-col h-full overflow-y-auto relative">
        <div className="flex flex-col justify-center min-h-full px-6 py-10 sm:px-8 lg:px-10 xl:px-14">
          {(currentStep === 1 || currentStep === 3) && (
            <div className="absolute top-8 left-8 sm:top-12 sm:left-12">
              <Link
                to={currentStep === 1 ? Pathname.LOGIN : "#"}
                onClick={currentStep === 3 ? () => setCurrentStep(1) : undefined}
                className="flex items-center text-sm font-medium text-[#475467] hover:text-[#101828] transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Link>
            </div>
          )}

          {/* Step Content Area */}
          <div className="w-full max-w-[384px] min-w-65 mx-auto flex flex-col">
            {currentStep === 1 && (
              <StepEnterEmail
                email={email}
                setEmail={setEmail}
                isLoading={isLoading}
                onSubmit={handleEmailSubmit}
              />
            )}

            {currentStep === 2 && <StepEmailSent email={email} />}

            {currentStep === 3 && (
              <StepChangePassword
                password={password}
                setPassword={setPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                confirmPasswordError={confirmPasswordError}
                setConfirmPasswordError={setConfirmPasswordError}
                isLoading={isLoading}
                onSubmit={handlePasswordSubmit}
              />
            )}

            {currentStep === 4 && (
              <StepSuccess onContinue={() => navigate(Pathname.LOGIN)} />
            )}

            {/* FOOTER - POWERED BY (constant across all steps) */}
            <div className="mt-10 w-full flex flex-col items-center gap-5">
              <div className="flex items-center w-full gap-3">
                <div
                  className="flex-1 h-px"
                  style={{
                    borderTop: "1px solid",
                    borderImage: "linear-gradient(90deg, rgba(128,128,128,0) 0%, #808080 100%) 1",
                  }}
                />
                <span className="text-sm font-semibold text-[#1B1B1B]/25 tracking-wide whitespace-nowrap">
                  Powered by
                </span>
                <div
                  className="flex-1 h-px"
                  style={{
                    borderTop: "1px solid",
                    borderImage: "linear-gradient(270deg, rgba(128,128,128,0) 0%, #808080 100%) 1",
                  }}
                />
              </div>

              <img
                alt="axon energies"
                src={Logo}
                className="h-10 w-auto max-w-[112px] object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
