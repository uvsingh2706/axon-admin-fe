export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: number;
  message: string;
  accessToken: string;
  userId: string;
  // role: string;
}

export interface ProfileResource {
  id: string;
  name: string;
}

export interface ProfilePermission {
  id: string;
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
  root?: boolean;
  resource: ProfileResource;
}

export interface ProfileRole {
  id: string;
  name: string;
  description: string | null;
  permissions: ProfilePermission[];
}

export interface AuthProfile {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
  name: string;
  profilePicture?: string | null;
  mobileNumber?: string;
  email: string;
  address?: string | null;
  accountDisable?: boolean;
  role?: ProfileRole;
  fleetId?: string | null;
}

export interface ProfileResponse {
  status: number;
  message: string;
  data: AuthProfile;
}