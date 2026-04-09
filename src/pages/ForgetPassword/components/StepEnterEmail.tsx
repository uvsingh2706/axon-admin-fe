import type { FormEvent } from "react";

import { Input } from "@/component/ui/input";
import { Button } from "@/component/ui/button";
import InfoCircleIcon from "@/assets/icons/InfoCircle";

interface StepEnterEmailProps {
  email: string;
  setEmail: (val: string) => void;
  isLoading: boolean;
  onSubmit: (e: FormEvent) => void;
}

export default function StepEnterEmail({
  email,
  setEmail,
  isLoading,
  onSubmit,
}: StepEnterEmailProps) {
  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6 flex flex-col items-center justify-center text-center pt-6">
        <div className="w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-6">
          <InfoCircleIcon className="text-[#292D32]" />
        </div>
        <h1 className="text-2xl font-semibold text-[#101828] mb-2 tracking-tight">
          Forgot Password
        </h1>
        <p className="text-[#475467] text-base text-center">
          Enter your registered email ID and we'll send you a link to reset your password
        </p>
      </div>

      <form onSubmit={onSubmit} className="w-full">
        <div className="flex flex-col gap-6">
          <Input
            id="forgot-email"
            label="Email"
            labelClassName="text-[#1e293b] text-sm mb-1.5 font-medium"
            type="email"
            required
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            placeholder="Enter Email Address"
            className="h-11"
          />

          <Button
            id="forgot-email-submit"
            type="submit"
            className="w-full py-6 mt-1 text-base border border-[#EAECF0] font-semibold bg-[#F2F4F7] hover:bg-primary-700 text-[#98A2B3] hover:text-[#FFFFFF] shadow-none rounded-lg transition-all"
            isIcon={false}
          >
            {isLoading ? "Sending…" : "Request New Password"}
          </Button>
        </div>
      </form>
    </div>
  );
}
