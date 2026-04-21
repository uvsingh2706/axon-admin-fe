export type OEMListParams = {
    page: number;
    limit: number;
    search?: string;
};
export interface OEMDTO {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    oemName: string;
    isActive: boolean;
    updatedBy: string | null;
    updatedByName: string | null;
    chargerModels: {
        id: string;
        chargerModelName: string;
        chargerModelType: string;
        currentType: string;
        phase: string;
        outputMax: string;
        chargerOutputPower: string;
        updatedByName: string | null;
        updatedAt: string;
    }[];
}

export interface OEMListResponse {
    data: {
        oems: OEMDTO[];
        totalCount: number;
        page: number;
        limit: number;
    };
}

export interface CreateOEMRequest {
    oem_name: string;
}

