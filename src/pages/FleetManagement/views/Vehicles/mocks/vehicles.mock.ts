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

export const vehicleTypeOptions = [
  { label: "E2W", value: "E2W" },
  { label: "E4W", value: "E4W" },
  { label: "BUS", value: "BUS" },
];

export const connectorTypeOptions = [
  { label: "CCS_DC", value: "CCS_DC" },
  { label: "CHAdeMO_DC", value: "CHAdeMO_DC" },
  { label: "GBT_DC", value: "GBT_DC" },
  { label: "IEC60309_AC", value: "IEC60309_AC" },
  { label: "TYPE_2_AC", value: "TYPE_2_AC" },
];
export const chargingRateOptions = [
  { label: "level_1", value: "level_1" },
  { label: "level_2", value: "level_2" },

];

export const getVehiclesByFleetId = (fleetId?: string) =>
  mockVehicles.filter((vehicle) => vehicle.fleetId === fleetId);

export const getVehicleById = (fleetId?: string, vehicleId?: string) =>
  mockVehicles.find(
    (vehicle) => vehicle.fleetId === fleetId && vehicle.id === vehicleId
  );
