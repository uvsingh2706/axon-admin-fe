import { apiClient } from "../../lib/axios";
import { ApiEndpoints } from "../../utils/apiEndpoints";
import type { AuthProfile, LoginPayload, LoginResponse, ProfileResponse } from "./auth.types";

export const authApi = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const { data } = await apiClient.post<LoginResponse>(ApiEndpoints.LOGIN, payload);
    return data;
  },

  getProfile: async (userId?: string): Promise<AuthProfile> => {
    const { data } = await apiClient.get<ProfileResponse>(ApiEndpoints.PROFILE, {
      params: userId ? { id: userId } : undefined,
    });
    return data.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post(ApiEndpoints.LOGOUT);
  },
};
