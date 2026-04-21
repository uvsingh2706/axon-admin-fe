import Breadcrumb from "@/component/Breadcrumb";
import PageWrapper from "@/component/PageWrapper";
import { Pathname } from "@/utils/pathname";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { EditIcon } from "@/assets/icons";
import { Button } from "@/component/ui/button";
import { useConnectorById } from "../services/connector.hook";

const ConnectorDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const connectorData = location.state?.connectorData;
  const { id } = useParams();
  const { data: connectorResponse } = useConnectorById(id);
  const connector = connectorResponse?.data;

  const data = {
    id: connector?.id ?? id,
    connectorName: connector?.name ?? "",
    ioType: connector?.ioType === 'ac' ? 'AC' : 'DC',
    connectorStandard: connector?.standard ?? "",
    connectorOutput: connector?.outputKw ?? "",
    updatedAt: connector?.updatedAt ?? "",
    updatedBy: "admin",
  };

  const DetailField = ({ label, value }: { label: string; value: string }) => (
    <div className="flex flex-col gap-2">
      <span className="text-text-500 text-sm">{label}</span>
      <span className="text-text-950 font-medium">{value}</span>
    </div>
  );

  const TypeBadge = ({ type }: { type: string }) => {
    if (type === "AC") {
      return (
        <span className="bg-pink-50 text-[#AD336D] px-3 py-1 rounded-md text-xs font-semibold">
          {type}
        </span>
      );
    }
    return (
      <span className="bg-[#FCF5E3] text-[#F3A218] px-3 py-1 rounded-md text-xs font-semibold">
        {type}
      </span>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Asset Management", path: Pathname.ASSET_MANAGEMENT },
          { label: "Charger Specifications", path: `${Pathname.ASSET_MANAGEMENT}` },
          { label: "Connector", path: `${Pathname.ASSET_MANAGEMENT}` },
          { label: data.connectorName },
        ]}
      />

      <PageWrapper
        title="Connector Details"
        titleClassName="text-2xl font-semibold"
        isChargerSpecifications={true}
        showSearch={false}
        className="w-full"
        headerActions={
          <Button
            variant="secondary"
            className="border-none hover:bg-gray-100 p-2 min-w-0"
            onClick={() => navigate('edit', { state: { connectorData: data } })}
          >
            <EditIcon />
          </Button>
        }
      >
        <div className="flex flex-col gap-8 bg-white mt-1 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
            <DetailField label="Connector Name" value={data.connectorName} />
            <div className="flex flex-col gap-2">
              <span className="text-text-500 text-sm">I/O Type</span>
              <TypeBadge type={data.ioType} />
            </div>
            <DetailField label="Connector Standard" value={data.connectorStandard} />
            <DetailField label="Connector Output (A)" value={data.connectorOutput} />
          </div>
        </div>
      </PageWrapper>
    </div>
  );
};

export default ConnectorDetails;
