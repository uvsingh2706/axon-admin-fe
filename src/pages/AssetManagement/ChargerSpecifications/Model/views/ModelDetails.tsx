import React from 'react';
import Breadcrumb from "@/component/Breadcrumb";
import PageWrapper from "@/component/PageWrapper";
import { Pathname } from "@/utils/pathname";
import { useNavigate, useParams } from "react-router-dom";
import { EditIcon, DownloadIcon } from "@/assets/icons";
import { Button } from "@/component/ui/button";
import ConnectorImage from '@/assets/images/connectors.png';
import QrIcon from '@/assets/icons/QrIcon';
import { useModelById } from '../services/model.hooks';
import type { ConnectorMetaModel } from '../services/model.types';

const ModelDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: modelResponse, isLoading } = useModelById(id);
  const model = modelResponse?.data;

  const data = {
    modelName: model?.chargerModelName || "NA",
    oemName: model?.oem?.oemName || "NA",
    outputMax: model?.outputMax ? `${model.outputMax} A` : "NA",
    currentType: model?.currentType?.toUpperCase() || "NA",
    chargingModelType: model?.chargerModelType?.toUpperCase() || "NA",
    phaseType: model?.phase || "NA",
    documents: [
      { id: 1, title: "User Manual PDF", size: "NA", uploadedAt: model?.createdAt ? new Date(model.createdAt).toLocaleDateString() : "NA" },
      { id: 2, title: "Specification PDF", size: "NA", uploadedAt: model?.createdAt ? new Date(model.createdAt).toLocaleDateString() : "NA" },
    ],
    connectors: model?.connectorMetaModels || []
  };

  const DetailField = ({ label, value }: { label: string; value: string }) => (
    <div className="flex flex-col gap-2">
      <span className="text-text-500 text-sm">{label}</span>
      <span className="text-text-950 font-medium">{value}</span>
    </div>
  );

  if (isLoading) {
    return <div className="p-8 text-center text-text-500">Loading model details...</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Asset Management", path: Pathname.ASSET_MANAGEMENT },
          { label: "Charger Specifications", path: `${Pathname.ASSET_MANAGEMENT}` },
          { label: "Model", path: `${Pathname.ASSET_MANAGEMENT}` },
          { label: data.modelName },
        ]}
      />

      <PageWrapper
        title="Model Details"
        titleClassName="text-2xl font-semibold"
        isChargerSpecifications={true}
        showSearch={false}
        className="w-full"
        headerActions={
          <Button 
            variant="secondary" 
            className="border-none hover:bg-gray-100 p-2 min-w-0" 
            onClick={() => navigate('edit', { state: { modelData: model } })}
          >
            <EditIcon />
          </Button>
        }
      >
        <div className="flex flex-col gap-8 bg-white mt-1 pt-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
            <DetailField label="Model Name" value={data.modelName} />
            <DetailField label="OEM Name" value={data.oemName} />
            <DetailField label="Output Max (A)" value={data.outputMax} />
            <DetailField label="Current Type" value={data.currentType} />
            <DetailField label="Charging ModelType" value={data.chargingModelType} />
            <DetailField label="Phase Type" value={data.phaseType} />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <h3 className="text-lg font-semibold text-text-950 whitespace-nowrap">Documents</h3>
              <div className="w-full h-px bg-gray-100" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-lg w-10 h-10 shadow-sm relative pt-1">
                      <span className="text-[10px] text-gray-400 font-bold leading-none -mb-1">PDF</span>
                      <div className="bg-red-500 rounded-[2px] mt-1 px-[2px] py-px">
                         <span className="text-[6px] text-white font-bold leading-none block">PDF</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium text-text-950">{doc.title}</span>
                      <span className="text-xs text-text-500">{doc.size} • Uploaded: {doc.uploadedAt}</span>
                    </div>
                  </div>
                  <Button variant="secondary" className="border-none bg-transparent shadow-none p-2 min-w-0 text-primary-500 hover:text-primary-700 hover:bg-primary-50 rounded-full">
                    <DownloadIcon />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <h3 className="text-lg font-semibold text-text-950 whitespace-nowrap">Connectors</h3>
              <div className="w-full h-px bg-gray-100" />
            </div>
            
            <div className="flex flex-wrap gap-4">
              {data.connectors.length > 0 ? data.connectors.map((cm: ConnectorMetaModel) => (
                <div key={cm.id} className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-100 rounded-xl w-64">
                  <div className="w-16 h-16 bg-white border border-gray-200 rounded-lg flex items-center justify-center p-2 text-gray-400">
                    <img src={ConnectorImage} alt="connector-img" className="object-contain" />
                  </div>
                  <div className="flex flex-col gap-3 flex-1">
                    <span className="text-sm font-semibold text-text-950">{cm.connectorMeta?.name || "NA"}</span>
                    {/* <div className="w-8 h-8 bg-white border border-gray-200 rounded shadow-sm flex items-center justify-center">
                       <QrIcon className='w-4 h-4'/>
                    </div> */}
                  </div>
                </div>
              )) : <div className="text-text-500 text-sm italic">No connectors linked to this model.</div>}
            </div>
          </div>

        </div>
      </PageWrapper>
    </div>
  );
};

export default ModelDetails;