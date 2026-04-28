import type { FormEvent } from "react";

import { Input } from "@/component/ui/input";
import { Button } from "@/component/ui/button";

interface StepChangePasswordProps {
  password: string;
  setPassword: (val: string) => void;
  confirmPassword: string;
  setConfirmPassword: (val: string) => void;
  confirmPasswordError: string;
  setConfirmPasswordError: (val: string) => void;
  isLoading: boolean;
  onSubmit: (e: FormEvent) => void;
}

export default function StepChangePassword({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  confirmPasswordError,
  setConfirmPasswordError,
  isLoading,
  onSubmit,
}: StepChangePasswordProps) {
  const isFormValid = password.length > 0 && password === confirmPassword;

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 text-left pt-6">
        <h1 className="text-3xl font-semibold text-[#101828] mb-2 tracking-tight">
          Change Password
        </h1>
        <p className="text-[#475467] text-base">Enter new password</p>
      </div>

      <form onSubmit={onSubmit} className="w-full">
        <div className="flex flex-col gap-6">
          <Input
            id="forgot-new-password"
            label="New Password"
            labelClassName="text-[#1e293b] text-sm mb-1.5 font-medium"
            type="password"
            required
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="h-11"
          />

          <Input
            id="forgot-confirm-password"
            label="Confirm New Password"
            labelClassName="text-[#1e293b] text-sm mb-1.5 font-medium"
            type="password"
            required
            value={confirmPassword}
            onChange={(e: any) => {
              setConfirmPassword(e.target.value);
              if (confirmPasswordError) setConfirmPasswordError("");
            }}
            placeholder="••••••••"
            className="h-11"
            error={!!confirmPasswordError}
            errorMessage={confirmPasswordError}
          />

          <Button
            id="forgot-password-submit"
            type="submit"
            disabled={!isFormValid || isLoading}
            className={`w-full py-6 mt-1 text-base font-semibold shadow-none rounded-lg transition-all ${
              isFormValid && !isLoading
                ? "bg-primary-700 hover:bg-primary-800 text-white border-0"
                : "border border-[#EAECF0] bg-[#F2F4F7] text-[#98A2B3] cursor-not-allowed"
            }`}
            isIcon={false}
          >
            {isLoading ? "Updating…" : "Update Password"}
          </Button>
        </div>
      </form>
    </div>
  );
}
