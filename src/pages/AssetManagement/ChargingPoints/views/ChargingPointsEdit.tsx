import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "@/component/Breadcrumb";
import PageWrapper from "@/component/PageWrapper";
import { DynamicForm } from "@/component/form/DynamicForm";
import { Pathname } from "@/utils/pathname";
import {
  editPointSchema,
  getPointFormSections,
  type EditPointFormValues,
} from "../config/point.form";
import { useStationList } from "../../ChargingStations/services/stations.hooks";
import { useChargingPointById, useUpdateChargingPoint } from "../services/chargingpoints.hooks";
import { useOEMList } from "../../ChargerSpecifications/OEM/services/oem.hooks";
import { useModelList } from "../../ChargerSpecifications/Model/services/model.hooks";
import { useTariffList } from "@/pages/TariffManagement/Tariff/services/tarrif.hooks";

export default function PointEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const statePoint = location.state?.point;
  console.log(statePoint, 'statepoints');

  const { data: pointResponse, isLoading } = useChargingPointById(
    id || "",
    !statePoint && !!id
  );

  const point = statePoint || pointResponse?.data;
  const { data: stationData } = useStationList({ limit: 50, page: 1 });
  const { data: oemData } = useOEMList({ limit: 50, page: 1 });
  const { data: modelData } = useModelList({ limit: 50, page: 1 });
  const { data: tariffData } = useTariffList({ limit: 50, page: 1 });

  const updatePoint = useUpdateChargingPoint();

  const [formValues, setFormValues] = useState<EditPointFormValues | null>(null);

  const stationOptions = stationData?.data?.data?.map((station: any) => ({
    label: station.name,
    value: station.name,
  })) || [];

  const oemOptions = oemData?.data?.oems?.map((oem: any) => ({
    label: oem.oemName,
    value: oem.oemName,
  })) || [];

  const modelOptions = modelData?.data?.chargerModels?.map((model: any) => ({
    label: model.chargerModelName,
    value: model.chargerModelName,
  })) || [];

  const tariffOptions = tariffData?.data?.tariffs?.map((tariff: any) => ({
    label: tariff.tariffName,
    value: tariff.tariffName,
  })) || [];

  useEffect(() => {
    if (point) {
      setFormValues({
        name: point?.chargingPointName,
        id: point?.chargingPointId,
        configurationUrl: point?.configurationUrl || "",
        station: point?.chargingStation?.name || "",
        oem: point?.oem?.oemName || "",
        model: point?.chargerModel?.chargerModelName || "",
        commissionOn: point?.commissionedOn ? new Date(point.commissionedOn).toISOString().split('T')[0] : "",
        tariff: point?.tariff?.tariffName || "",
        connectionType: point?.connectionType,
        isPublic: point?.isPublished,
      });
    }
  }, [point]);

  const handleSubmit = (data: EditPointFormValues) => {
    if (!id) return;
    updatePoint.mutate({
      id,
      data: {
        chargingPointName: data.name,
        chargingPointId: data.id,
        chargingLocation: data.station,
        oemName: data.oem,
        modelName: data.model,
        tariffName: data.tariff,
        commissionedOn: data.commissionOn,
        configurationUrl: data.configurationUrl || "",
        connectionType: data.connectionType,
        isPublished: data.isPublic,
      }
    }, {
      onSuccess: () => {
        navigate(`${Pathname.ASSET_MANAGEMENT}/charging-points/${id}`);
      }
    });
  };

  const handleCancel = () => {
    navigate(`${Pathname.ASSET_MANAGEMENT}/charging-points/${id}`);
  };

  if (isLoading || !formValues) {
    return (
      <div className="p-8 text-center text-text-500 subtitle-2-medium">
        Loading charging point details...
      </div>
    );
  }

  if (!point) {
    return (
      <div className="p-8 text-center text-text-500 subtitle-2-medium">
        Charging point not found.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Asset Management", path: Pathname.ASSET_MANAGEMENT },
          { label: "Charging Points", path: Pathname.ASSET_MANAGEMENT },
          { label: point?.chargingPointName, path: `${Pathname.ASSET_MANAGEMENT}/charging-points/${id}` },
          { label: "Edit" },
        ]}
      />

      <PageWrapper
        isChargerSpecifications={false}
        title="Edit Charging Point"
        showSearch={false}
        showFilter={false}
        titleClassName="heading-3-semibold"
        className="w-full"
      >
        <div className="mt-2 text-left">
          <DynamicForm<EditPointFormValues>
            schema={editPointSchema}
            defaultValues={formValues}
            onSubmit={handleSubmit}
            sections={getPointFormSections({
              stationOptions,
              oemOptions,
              modelOptions,
              tariffOptions,
            })}
            submitLabel="Save Changes"
            cancelLabel="Cancel"
            onCancel={handleCancel}
          />
        </div>
      </PageWrapper>
    </div>
  );
}
