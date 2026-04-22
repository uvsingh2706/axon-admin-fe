export type ModelListParams = {
    page: number;
    limit: number;
    search?: string;
};

export interface ConnectorMetaModel {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    connectorMetaId: string;
    connectorMeta: {
        id: string;
        createdAt: string;
        updatedAt: string;
        deletedAt: string | null;
        standard: string;
        ioType: string;
        outputKw: string;
        name: string;
        isActive: boolean;
    };
    modelId: string;
    isActive: boolean;
}

export interface ModelDTO {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    oemId: string;
    oem: {
        id: string;
        createdAt: string;
        updatedAt: string;
        deletedAt: string | null;
        oemName: string;
        isActive: boolean;
    };
    chargerModelName: string;
    chargerModelType: string;
    currentType: string;
    phase: string;
    outputMax: string;
    chargerOutputPower: string;
    isActive: boolean;
    connectorMetaModels: ConnectorMetaModel[];
    updatedBy?: string;
    updatedByName?: string;
}

export interface ModelListResponse {
    data: {
        chargerModels: ModelDTO[];
        totalCount: number;
        page: number;
        limit: number;
    };
}

export interface ModelByIdResponse {
    data: ModelDTO & { updatedByName: string };
}
export interface CreateModelRequest {
  oem_id: string;
  charger_model_name: string;
  charger_model_type: string;
  current_type: string;
  phase: string;
  output_max: number;
  charger_output_power: number;
  connector_ids: string[];
  manual_pdf?: any;
  spec_pdf?: any;
}
export interface CreateModelResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    oem_id: string;
    charger_model_name: string;
    charger_model_type: string;
    current_type: string;
    phase: string;
    output_max: number;
    charger_output_power: number;
    connector_ids: string[];
    created_at: string;
    updated_at: string;
  };
}