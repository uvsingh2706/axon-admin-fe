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
    <div className="flex h-screen w-full bg-white overflow-hidden">
      {/* LEFT SIDE - IMAGE (constant across all steps) */}
      <div className="hidden lg:block lg:w-[55%] xl:w-[60%] relative bg-[#1E1E1E]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${OnboardingImage})` }}
        ></div>
      </div>

      {/* RIGHT SIDE - CONTENT */}
      <div className="flex w-full lg:w-[45%] xl:w-[40%] flex-col overflow-y-auto p-6 sm:p-8 lg:p-12 h-full relative">

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
        <div className="w-full max-w-[384px] mx-auto my-auto flex flex-col py-10">

          {currentStep === 1 && (
            <StepEnterEmail
              email={email}
              setEmail={setEmail}
              isLoading={isLoading}
              onSubmit={handleEmailSubmit}
            />
          )}

          {currentStep === 2 && (
            <StepEmailSent email={email} />
          )}

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
          <div className="mt-16 w-full flex flex-col items-center gap-6">
            <div className="flex items-center w-full justify-center gap-4">
              <div
                className="flex-1 h-px max-w-[148.5px]"
                style={{
                  borderTop: "1px solid",
                  borderImage: "linear-gradient(90deg, rgba(128, 128, 128, 0) 0%, #808080 100%) 1",
                }}
              ></div>
              <span className="text-base font-semibold text-[#1B1B1B40] tracking-wide">
                Powered by
              </span>
              <div
                className="flex-1 h-px max-w-[148.5px]"
                style={{
                  borderTop: "1px solid",
                  borderImage: "linear-gradient(270deg, rgba(128, 128, 128, 0) 0%, #808080 100%) 1",
                }}
              ></div>
            </div>
            <div className="flex items-center gap-2">
              <img alt="axon energies" src={Logo} className="h-11 w-28 object-contain" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
