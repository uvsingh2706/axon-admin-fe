import { apiClient } from "@/lib/axios";

export interface IForgetPasswordParams {
    email: string;
}

export interface IResetPasswordParams {
    token: string;
    password: string;
}

export interface IForgetPasswordResponse {
    message: string;
}
