import { Button } from "@/component/ui/button";
import tickIcon from "@/assets/images/tick.webp";

interface StepSuccessProps {
  onContinue: () => void;
}

export default function StepSuccess({ onContinue }: StepSuccessProps) {
  return (
    <div className="w-full text-center animate-in fade-in zoom-in-95 duration-500">
      <div className="w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-6">
        <img src={tickIcon} alt="tick" />
      </div>
      <h1 className="text-2xl font-semibold text-[#101828] mb-3 tracking-tight">
        Password Changed
      </h1>
      <p className="text-[#475467] text-base mb-8">
        Your password has been successfully changed
      </p>
      <Button
        id="forgot-continue-login"
        onClick={onContinue}
        className="w-full py-6 mt-1 text-base border border-[#EAECF0] font-semibold bg-[#F2F4F7] hover:bg-primary-700 text-[#98A2B3] hover:text-[#FFFFFF] shadow-none rounded-lg transition-all"
        isIcon={false}
      >
        Continue to Login
      </Button>
    </div>
  );
}
