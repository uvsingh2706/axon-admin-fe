export type OEMListParams = {
    page: number;
    limit: number;
    search?: string;
};
export interface OEMDTO {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

export interface OEMListResponse {
      data: {
        oems: OEMDTO[];
        count: number;
        page: number;
        limit: number;
      };
}

export interface CreateOEMRequest {
    oem_name: string;
}
    
