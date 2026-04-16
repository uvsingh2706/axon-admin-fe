import { apiClient } from "../../lib/axios";
import { ApiEndpoints } from "../../utils/apiEndpoints";
import type { LoginPayload, LoginResponse } from "./auth.types";
import type { User } from "../../store/authStore";

export const authApi = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    console.log('hello', payload);
    const { data } = await apiClient.post<LoginResponse>(ApiEndpoints.LOGIN, payload);
    return data;
  },

  getProfile: async (): Promise<User> => {
    const { data } = await apiClient.get<User>(ApiEndpoints.PROFILE);
    return data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post(ApiEndpoints.LOGOUT);
  },
};
