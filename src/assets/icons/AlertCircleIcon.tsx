

function AlertCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="24" cy="24" r="24" fill="#FBEAE9"/>
      <path d="M24.4999 35.6668C30.9166 35.6668 36.1666 30.4168 36.1666 24.0002C36.1666 17.5835 30.9166 12.3335 24.4999 12.3335C18.0833 12.3335 12.8333 17.5835 12.8333 24.0002C12.8333 30.4168 18.0833 35.6668 24.4999 35.6668Z" stroke="#E25B53" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M24.5 19.3335V25.1668" stroke="#E25B53" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M24.4937 28.6665H24.5041" stroke="#E25B53" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );
}

export default AlertCircleIcon;