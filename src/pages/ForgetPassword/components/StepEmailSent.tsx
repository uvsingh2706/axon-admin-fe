import tickIcon from "@/assets/images/tick.webp";

interface StepEmailSentProps {
  email: string;
}

export default function StepEmailSent({ email }: StepEmailSentProps) {
  return (
    <div className="w-full text-center animate-in fade-in zoom-in-95 duration-500">
      <div className="w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-6">
        <img src={tickIcon} alt="tick" />
      </div>
      <h1 className="text-3xl font-semibold text-[#101828] mb-3 tracking-tight">
        Email Sent
      </h1>
      <p className="text-[#475467] text-base mb-8">
        An email resent password has been sent to{" "}
        <span className="text-[#101828]">{email}</span>. Please open the link
        from the mail to reset your password.
      </p>
    </div>
  );
}
