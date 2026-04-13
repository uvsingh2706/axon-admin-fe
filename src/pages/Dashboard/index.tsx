


export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
      <p className="text-sm text-gray-400">
        Overview of your EV charging network.
      </p>

      {/* Placeholder stat cards */}
      <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Stations", value: "24", accent: "text-primary" },
          { label: "Active Points", value: "186", accent: "text-primary" },
          { label: "Sessions Today", value: "1,204", accent: "text-warning" },
          { label: "Revenue (₹)", value: "48,320", accent: "text-primary" },
        ].map((card) => (
          <div
            key={card.label}
            className="bg-surface-2 rounded-xl p-6 border border-white/5"
          >
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
              {card.label}
            </p>
            <p className={`text-3xl font-bold ${card.accent}`}>{card.value}</p>
          </div>
        ))}
      </div>
<div className="flex flex-col items-center gap-2 mt-">

</div>
    </div>
  );
}
