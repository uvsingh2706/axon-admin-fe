import { apiClient } from "@/lib/axios";
import { ApiEndpoints } from "@/utils/apiEndpoints";
import type { IForgetPasswordParams, IForgetPasswordResponse, IResetPasswordParams } from "./forgetPass.type";

export const forgetPassApi = {
    forgetPassword: async(data: IForgetPasswordParams) => {
        const response = await apiClient.post<IForgetPasswordResponse>(ApiEndpoints.FORGET_PASS, data);
        return response.data;
    },
    resetPassword: async(data: IResetPasswordParams) => {
        const response = await apiClient.post<IForgetPasswordResponse>(ApiEndpoints.RESET_PASS, data);
        return response.data;
    }
}