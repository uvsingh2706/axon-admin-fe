
function EyeIcon({className} : {className?: string}) {
  return (
   <svg
  className={className}
  width="20"
  height="20"
  viewBox="0 0 20 20"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  {/* Eye outer shape */}
  <path
    d="M2.40833 7.84167C4.31666 4.84167 7.05833 3.10834 10 3.10834C12.9417 3.10834 15.6833 4.84167 17.5917 7.84167C18.3417 9.01667 18.3417 10.9917 17.5917 12.1667C15.6833 15.1667 12.9417 16.8917 10 16.8917C7.05833 16.8917 4.31666 15.1667 2.40833 12.1667C1.65833 10.9917 1.65833 9.01667 2.40833 7.84167Z"
    stroke="#808080"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  />

  {/* Pupil */}
  <path
    d="M12.1083 10C12.1083 11.15 11.15 12.1083 10 12.1083C8.85 12.1083 7.89166 11.15 7.89166 10C7.89166 8.85 8.85 7.89166 10 7.89166C11.15 7.89166 12.1083 8.85 12.1083 10Z"
    stroke="#808080"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>
  )
}

export default EyeIcon