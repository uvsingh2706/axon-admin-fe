export interface DriverDTO {
  id: string;
  createdAt: string;
  updatedAt: string;
  // Detail API fields (flat)
  name?: string;
  email?: string;
  mobileNumber?: string;
  gender?: string;
  // List API fields (nested)
  customer?: {
    id: string;
    firstName: string;
    lastName: string | null;
    gender: string;
    email: string;
    mobileNumber: string;
    userStatus: string;
  };
  fleet: {
    id: string;
    name: string;
    contact_number: string;
    email: string;
  };
  vehicle: {
    id: string;
    registrationNumber: string;
  } | null;
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

export type DriverListParams = {
  page?: number;
  limit?: number;
  search?: string;
  fleetId?: string;
};
