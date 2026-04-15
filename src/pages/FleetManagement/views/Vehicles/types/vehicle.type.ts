export type VehicleData = {
  id: string;
  fleetId: string;
  vehicleName: string;
  brand: string;
  model: string;
  vehicleId: string;
  registrationNumber: string;
  connectorType: string;
};

export type VehicleSummaryStats = {
  totalVehicles: string;
  activeInUse: string;
  underMaintenance: string;
};

export type VehiclesListProps = {
  fleetId: string;
};
