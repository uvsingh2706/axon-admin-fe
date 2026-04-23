export type DriverListParams = {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
};

export interface DriverFleetDTO {
  id: string;
  createdAt: string;
  createdBy: string | null;
  updatedAt: string;
  deletedAt: string | null;
  deletedBy: string | null;
  name: string;
  logo: string | null;
  contact_number: string | null;
  email: string;
  vehicle_type: string;
}

export interface DriverCustomerDTO {
  id: string;
  createdAt: string;
  createdBy: string | null;
  updatedAt: string;
  deletedAt: string | null;
  deletedBy: string | null;
  userName: string | null;
  firstName: string | null;
  lastName: string | null;
  gender: string | null;
  profilePicture: string | null;
  email: string;
  address: string | null;
  userStatus: string;
  mobileNumber: string;
  isLogin: boolean;
  panNumber: string | null;
}

export interface DriverVehicleDTO {
  id: string;
  createdAt?: string;
  createdBy?: string | null;
  updatedAt?: string;
  deletedAt?: string | null;
  deletedBy?: string | null;
  registrationNumber: string;
  vehicleType: string;
  make: string;
  model: string;
  connectorType: string;
  batteryPack: number;
  chargingRate: string;
  status: string;
}

export interface DriverListItemDTO {
  id: string;
  createdAt: string;
  createdBy: string | null;
  updatedAt: string;
  deletedAt: string | null;
  deletedBy: string | null;
  fleet: DriverFleetDTO;
  customer: DriverCustomerDTO;
  vehicle: DriverVehicleDTO | null;
  drivingLicense: string;
  drivingLicenseExpiry: string;
  driverStatus: string;
  updatedBy: {
    name: string;
  }
}

export interface DriverListResponse {
  status: number;
  data: {
    data: DriverListItemDTO[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}



export interface DriverDetailResponse {
  status: number;
  data: {
    data: DriverDetailDTO;
  };
}

export interface DriverDetailDTO {
  id: string;
  name: string;
  mobileNumber: string;
  email: string;
  gender: string | null;
  profilePicture: string | null;
  drivingLicense: string;
  drivingLicenseExpiry: string;
  status: string;
  fleetName: string | null;
  vehicle: DriverVehicleDTO | null;
  fleet: DriverFleetDTO | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDriverRequest {
  driverName: string;
  email: string;
  mobileNumber: string;
  gender: string;
  drivingLicense: string;
  drivingLicenseExpiry: string;
  vehicleId?: string;
}

export interface DriverEditRequest {
  driverName?: string;
  email?: string;
  mobileNumber?: string;
  gender?: string;
  drivingLicense?: string;
  drivingLicenseExpiry?: string;
  vehicleId?: string;
}

export interface DriverCreateResponseDTO {
  id: string;
  createdAt: string;
  createdBy: string | null;
  updatedAt: string;
  deletedAt: string | null;
  deletedBy: string | null;
  fleet: { id: string };
  customer: { id: string };
  vehicle: { id: string };
  drivingLicense: string;
  drivingLicenseExpiry: string;
  driverStatus: string;
}

export interface CreateDriverResponse {
  status: number;
  message: string;
  data: DriverCreateResponseDTO;
}
