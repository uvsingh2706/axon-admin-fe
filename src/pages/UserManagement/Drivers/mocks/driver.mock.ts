import type { DriverData } from "../types/driver.type";
import { mockFleets } from "@/pages/FleetManagement/mocks/fleet.mock";
import { mockVehicles } from "@/pages/FleetManagement/views/Vehicles/mocks/vehicles.mock";

const fleetById = new Map(mockFleets.map((f) => [f.id, f]));
const firstVehicleByFleetId = new Map<string, string>();
for (const v of mockVehicles) {
  if (!firstVehicleByFleetId.has(v.fleetId)) firstVehicleByFleetId.set(v.fleetId, v.vehicleName);
}

function fleetOrThrow(id: string) {
  const f = fleetById.get(id);
  if (!f) throw new Error(`Missing fleet mock for id: ${id}`);
  return f;
}

export const mockDriverList: DriverData[] = [
  {
    id: "d_1",
    name: "Aarav Sharma",
    avatarUrl:
      "https://images.unsplash.com/photo-1502767089025-6572583495b4?auto=format&fit=crop&w=128&h=128&q=80",
    fleetId: "1",
    organisationName: fleetOrThrow("1").organisationName,
    organisationLogo: fleetOrThrow("1").logo,
    pocPhone: "9876543210",
    assignedVehicle: firstVehicleByFleetId.get("1") ?? "—",
    driverPhone: "8721937813",
    email: "aarav.sharma@example.com",
  },
  {
    id: "d_2",
    name: "Ananya Patel",
    fleetId: "2",
    organisationName: fleetOrThrow("2").organisationName,
    organisationLogo: fleetOrThrow("2").logo,
    pocPhone: "9876543210",
    assignedVehicle: firstVehicleByFleetId.get("2") ?? "—",
    driverPhone: "8721937813",
    email: "ananya.patel@example.com",
  },
  {
    id: "d_3",
    name: "Rohan Verma",
    avatarUrl:
      "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=128&h=128&q=80",
    fleetId: "6",
    organisationName: fleetOrThrow("6").organisationName,
    organisationLogo: fleetOrThrow("6").logo,
    pocPhone: "9876543210",
    assignedVehicle: firstVehicleByFleetId.get("1") ?? "—",
    driverPhone: "8721937813",
    email: "rohan.v@example.com",
  },
];

