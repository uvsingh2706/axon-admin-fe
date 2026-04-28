import { useMutation } from "@tanstack/react-query";
import { forgetPassApi } from "./forgetpassword.api";
import type { IForgetPasswordParams, IResetPasswordParams, IForgetPasswordResponse } from "./forgetPass.type";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useForgetPassword = () => {
    return useMutation<IForgetPasswordResponse, AxiosError<{message: string}>, IForgetPasswordParams>({
        mutationFn: forgetPassApi.forgetPassword,
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to send reset link");
        }
    });
};

export const useResetPassword = () => {
    return useMutation<IForgetPasswordResponse, AxiosError<{message: string}>, IResetPasswordParams>({
        mutationFn: forgetPassApi.resetPassword,
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to reset password");
        }
    });
};
