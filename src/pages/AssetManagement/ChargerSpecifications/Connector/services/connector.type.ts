export type CreateConnectorPayload = {
    name: string;
    standard: string;
    io_type: string;
    output_kw: number;
};

export type ConnectorListParams = {
    page: number;
    limit: number;
    search?: string;
};

export interface ConnectorDTO {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    standard: string;
    ioType: string;
    outputKw: string;
    name: string;
    isActive: boolean;
}

export interface ConnectorListResponse {
    data: {
        connectorMetas: ConnectorDTO[];
        totalCount: number;
        page: number;
        limit: number;
    };
}

export interface ConnectorByIdResponse {
    data: ConnectorDTO;
}
