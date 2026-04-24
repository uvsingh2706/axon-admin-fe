export interface DriverCustomerDTO {
  id: string;
  firstName: string;
  lastName: string | null;
  gender: string;
  email: string;
  mobileNumber: string;
  userStatus: string;
}

export interface DriverFleetDTO {
  id: string;
  name: string;
  contact_number: string;
  email: string;
}

export interface DriverVehicleDTO {
  id: string;
  registrationNumber: string;
  make?: string;
  model?: string;
  vehicleType?: string;
  connectorType?: string;
  batteryPack?: number;
  chargingRate?: string;
  status?: string;
}

export interface DriverDTO {
  id: string;
  createdAt: string;
  updatedAt: string;
  
  name?: string;
  email?: string;
  mobileNumber?: string;
  gender?: string;

  customer?: DriverCustomerDTO;
  fleet: DriverFleetDTO;
  vehicle: DriverVehicleDTO | null;
  drivingLicense: string;
  drivingLicenseExpiry: string;
  driverStatus: string;
}

export interface CreateDriverResponse {
  status: number;
  data: DriverDTO;
}

export interface DriverDetailResponse {
  status: number;
  data: DriverDTO;
}

export interface DriverListResponse {
  status: number;
  data: {
    data: DriverDTO[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export interface DriverListParams {
  page?: number;
  limit?: number;
  search?: string;
  fleetId?: string;
}

export interface DeleteDriverResponse {
  status: number;
  message: string;
}

export interface EditDriverFormValues {
  driverName: string;
  email: string;
  mobileNumber: string;
  gender: string;
  driverId: string;
  drivingLicense: string;
  drivingLicenseExpiry: string;
  organisationFleet: string;
  vehicleId: string;
}
