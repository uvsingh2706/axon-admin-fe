

function StationIcon({ className }: { className?: string }){
  return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="2" width="12" height="20" rx="2" />
      <path d="M9 18h0" />
      <path d="M15 6h2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-1" />
      <path d="M18 10h1" />
    </svg>
  )
}

export default StationIcon