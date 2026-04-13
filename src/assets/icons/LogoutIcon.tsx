

// function LogoutIcon({className} : {className?: string}) {
//   return (
//     <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path d="M5.93335 5.03991C6.14002 2.63991 7.37335 1.65991 10.0733 1.65991H10.16C13.14 1.65991 14.3334 2.85325 14.3334 5.83325V10.1799C14.3334 13.1599 13.14 14.3532 10.16 14.3532H10.0733C7.39335 14.3532 6.16002 13.3866 5.94002 11.0266" stroke="#E25B53" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
// <path d="M10 8H2.41333" stroke="#E25B53" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
// <path d="M3.89996 5.7666L1.66663 7.99994L3.89996 10.2333" stroke="#E25B53" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
// </svg>

//   )
// }

// export default LogoutIcon

import React from "react";

function LogoutIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10.3833 8.82003C10.745 4.62003 12.9033 2.90503 17.6283 2.90503H17.78C22.995 2.90503 25.0833 4.99336 25.0833 10.2084V17.815C25.0833 23.03 22.995 25.1184 17.78 25.1184H17.6283C12.9383 25.1184 10.78 23.4267 10.395 19.2967" stroke="#E25B53" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M17.5001 14H4.22339" stroke="#E25B53" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M6.82508 10.0916L2.91675 13.9999L6.82508 17.9082" stroke="#E25B53" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  );
}

export default LogoutIcon;