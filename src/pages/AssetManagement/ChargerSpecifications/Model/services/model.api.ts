import { apiClient } from "@/lib/axios";
import { ApiEndpoints } from "@/utils/apiEndpoints";
import type { CreateModelRequest, CreateModelResponse, ModelByIdResponse, ModelListParams, ModelListResponse } from "./model.types";

export const modelApi = {

    getModelList: async (params: ModelListParams): Promise<ModelListResponse> => {
        const response = await apiClient.get(ApiEndpoints.MODEL, { params });
        return response.data;
    },
    createModel: async (data: CreateModelRequest): Promise<CreateModelResponse> => {
        const response = await apiClient.post(ApiEndpoints.MODEL, data);
        return response.data;
    },
    updateModel: async (id: string, data: CreateModelRequest): Promise<CreateModelResponse> => {
        const response = await apiClient.put(`${ApiEndpoints.MODEL}/${id}`, data);
        return response.data;
    },
    getModelById: async (id: string): Promise<ModelByIdResponse> => {
        const response = await apiClient.get(`${ApiEndpoints.MODEL}/${id}`);
        return response.data;
    },

}