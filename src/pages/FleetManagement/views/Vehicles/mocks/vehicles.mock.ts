import type { VehicleData, VehicleSummaryStats } from "../types/vehicle.type";

export const mockVehicles: VehicleData[] = [
  {
    id: "v1",
    fleetId: "1",
    vehicleName: "Tata Nexon EV",
    brand: "Tata Nexon EV",
    model: "Tigor EV XE",
    vehicleId: "123-234-245",
    registrationNumber: "DL-33L-2453",
    connectorType: "CCS2",
  },
  {
    id: "v2",
    fleetId: "1",
    vehicleName: "Tata Nexon EV",
    brand: "Tata Nexon EV",
    model: "Tigor EV XE",
    vehicleId: "123-234-246",
    registrationNumber: "DL-33L-2454",
    connectorType: "CCS2",
  },
  {
    id: "v3",
    fleetId: "1",
    vehicleName: "Tata Nexon EV",
    brand: "Tata Nexon EV",
    model: "Tigor EV XE",
    vehicleId: "123-234-247",
    registrationNumber: "DL-33L-2455",
    connectorType: "CCS2",
  },
  {
    id: "v4",
    fleetId: "2",
    vehicleName: "Mahindra XUV400",
    brand: "Mahindra",
    model: "XUV400 EL",
    vehicleId: "223-234-245",
    registrationNumber: "KA-01-AB-1234",
    connectorType: "CCS2",
  },
];

export const mockVehicleStatsByFleetId: Record<string, VehicleSummaryStats> = {
  "1": { totalVehicles: "124", activeInUse: "86", underMaintenance: "38" },
  "2": { totalVehicles: "75", activeInUse: "51", underMaintenance: "24" },
};

export const brandOptions = [
  { label: "Tata Nexon EV", value: "Tata Nexon EV" },
  { label: "Mahindra", value: "Mahindra" },
  { label: "MG", value: "MG" },
];

export const modelOptions = [
  { label: "Tigor EV XE", value: "Tigor EV XE" },
  { label: "XUV400 EL", value: "XUV400 EL" },
  { label: "ZS EV", value: "ZS EV" },
];

export const connectorTypeOptions = [
  { label: "CCS2", value: "CCS2" },
  { label: "Type 2", value: "Type 2" },
  { label: "CHAdeMO", value: "CHAdeMO" },
];
export const chargingRateOptions = [
  { label: "CCS2", value: "CCS2" },
  { label: "Type 2", value: "Type 2" },
  { label: "CHAdeMO", value: "CHAdeMO" },
];

export const getVehiclesByFleetId = (fleetId?: string) =>
  mockVehicles.filter((vehicle) => vehicle.fleetId === fleetId);

export const getVehicleById = (fleetId?: string, vehicleId?: string) =>
  mockVehicles.find(
    (vehicle) => vehicle.fleetId === fleetId && vehicle.id === vehicleId
  );
