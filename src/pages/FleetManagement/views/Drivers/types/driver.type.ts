export type DriverData = {
  id: string;
  fleetId: string;
  name: string;
  contact: string;
  driverId: string;
  assignedVehicle: string;
  email: string;
  gender: "Male" | "Female" | "Other";
  updatedBy: string;
  avatarUrl?: string;
};

export type DriverVehicleInfo = {
  vehicleName: string;
  model: string;
  connectorType: string;
  registrationNumber: string;
};

export type ChargingHistoryRow = {
  id: string;
  stationName: string;
  chargingPointName: string;
  dateTime: string;
  durationHours: number;
  energyConsumptionKwh: number;
  amount: string;
};

export type DriverDetailsData = DriverData & {
  organisationName: string;
  personalEmailId: string;
  licenseNumber: string;
  licenseExpiryDate: string;
  vehicleInfo: DriverVehicleInfo;
  chargingHistory: ChargingHistoryRow[];
};

