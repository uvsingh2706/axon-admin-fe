import { apiClient } from "@/lib/axios";
import { ApiEndpoints } from "@/utils/apiEndpoints";
import type { ConnectorByIdResponse, ConnectorListParams, ConnectorListResponse, CreateConnectorPayload } from "./connector.type";


export const connectorApi = {
    
    getConnectorList: async (params: ConnectorListParams): Promise<ConnectorListResponse> => {
        const response = await apiClient.get(ApiEndpoints.CONNECTOR, { params });
        return response.data;
    },
    createConnector: async (data: CreateConnectorPayload): Promise<void> => {
        const response = await apiClient.post(ApiEndpoints.CONNECTOR, data);
        return response.data;
    },
    getConnectorById: async (id: string): Promise<ConnectorByIdResponse> => {
        const response = await apiClient.get(`${ApiEndpoints.CONNECTOR}/${id}`);
        return response.data;
    },
    updateConnectorById: async (id: string, data: CreateConnectorPayload): Promise<void> => {
        const response = await apiClient.put(`${ApiEndpoints.CONNECTOR}/${id}`, data);
        return response.data;
    }

}