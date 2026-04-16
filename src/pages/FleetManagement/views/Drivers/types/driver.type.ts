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
  invoiceId?: string;
  stationName: string;
  chargingPointName: string;
  vehicleMake?: string;
  dateTime: string;
  connectorId?: string;
  ocppTxnId?: string;
  durationHours: number;
  energyConsumptionKwh: number;
  amount: string;
  cpStop?: string;
  closedBy?: string;
  status?: string;
};

export type DriverDetailsData = DriverData & {
  organisationName: string;
  personalEmailId: string;
  licenseNumber: string;
  licenseExpiryDate: string;
  vehicleInfo: DriverVehicleInfo;
  chargingHistory: ChargingHistoryRow[];
};
export type DriverStatCard = {
  title: string;
  value: string;
  icon: React.ReactNode;
  bgColor: string;
};

