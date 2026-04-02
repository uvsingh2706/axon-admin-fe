export default function ChargingStation() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-2">Charging Stations</h1>
      <p className="text-sm text-gray-400">
        Manage all charging stations across locations.
      </p>

      {/* Placeholder table */}
      <div className="mt-8 bg-surface-2 rounded-xl border border-white/5 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/5 text-gray-400">
              <th className="px-6 py-4 font-medium">Station Name</th>
              <th className="px-6 py-4 font-medium">Location</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Points</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            {[
              { name: "Hub Alpha", location: "Delhi", status: "Active", points: 12 },
              { name: "Hub Beta", location: "Mumbai", status: "Active", points: 8 },
              { name: "Hub Gamma", location: "Bangalore", status: "Maintenance", points: 6 },
            ].map((s) => (
              <tr key={s.name} className="border-b border-white/5 last:border-0">
                <td className="px-6 py-4 font-medium text-white">{s.name}</td>
                <td className="px-6 py-4">{s.location}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                      s.status === "Active"
                        ? "bg-primary/10 text-primary"
                        : "bg-warning/10 text-warning"
                    }`}
                  >
                    {s.status}
                  </span>
                </td>
                <td className="px-6 py-4">{s.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
