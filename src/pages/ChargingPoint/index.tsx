export default function ChargingPoint() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-2">Charging Points</h1>
      <p className="text-sm text-gray-400">
        Monitor and manage individual charging points.
      </p>

      {/* Placeholder grid */}
      <div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { id: "CP-001", station: "Hub Alpha", type: "CCS2", status: "Online" },
          { id: "CP-002", station: "Hub Alpha", type: "Type 2", status: "Charging" },
          { id: "CP-003", station: "Hub Beta", type: "CHAdeMO", status: "Offline" },
          { id: "CP-004", station: "Hub Beta", type: "CCS2", status: "Online" },
          { id: "CP-005", station: "Hub Gamma", type: "Type 2", status: "Online" },
          { id: "CP-006", station: "Hub Gamma", type: "CCS2", status: "Maintenance" },
        ].map((cp) => (
          <div
            key={cp.id}
            className="bg-surface-2 rounded-xl p-5 border border-white/5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-white font-semibold">{cp.id}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded font-medium ${
                  cp.status === "Online"
                    ? "bg-primary/10 text-primary"
                    : cp.status === "Charging"
                    ? "bg-primary/20 text-primary"
                    : cp.status === "Offline"
                    ? "bg-danger/10 text-danger"
                    : "bg-warning/10 text-warning"
                }`}
              >
                {cp.status}
              </span>
            </div>
            <p className="text-sm text-gray-400">Station: {cp.station}</p>
            <p className="text-sm text-gray-400">Connector: {cp.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
