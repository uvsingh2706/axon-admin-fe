import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "@/component/Breadcrumb";
import PageWrapper from "@/component/PageWrapper";
import { DynamicForm } from "@/component/form/DynamicForm";
import { Pathname } from "@/utils/pathname";
import {
  editPointSchema,
  pointEditFormSections,
  type EditPointFormValues,
} from "../config/point.form";
import { useStationList } from "../../ChargingStations/services/stations.hooks";
import { useChargingPointById } from "../services/chargingpoints.hooks";

export default function PointEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const statePoint = location.state?.point;

  const { data: pointResponse, isLoading } = useChargingPointById(
    id || "",
    !statePoint && !!id
  );

  const point = statePoint || pointResponse?.data;
  const { data: stationData } = useStationList({ limit: 50, page: 1 });

  const [formValues, setFormValues] = useState<EditPointFormValues | null>(null);

  useEffect(() => {
    if (point) {
      setFormValues({
        name: point.chargingPointName,
        id: point.chargingPointId,
        configurationUrl: point.configurationUrl || "",
        station: point.chargingStationId,
        oem: point.oemId,
        model: point.chargerModelId,
        commissionOn: point.commissionedOn ? new Date(point.commissionedOn).toISOString().split('T')[0] : "",
        tariff: point.tariffId,
        connectionType: point.connectionType,
        isPublic: point.isPublished,
      });
    }
  }, [point]);

  const handleSubmit = (data: EditPointFormValues) => {
    console.log("Update point:", id, data);
    navigate(`${Pathname.ASSET_MANAGEMENT}/charging-points/${id}`);
  };

  const handleCancel = () => {
    navigate(`${Pathname.ASSET_MANAGEMENT}/charging-points/${id}`);
  };

  if (!point || !formValues) {
    return (
      <div className="p-8 text-center text-text-500 subtitle-2-medium">
        Charging point not found.
      </div>
    );
  }

  const dynamicSections = pointEditFormSections.map((section) => ({
    ...section,
    fields: section.fields.map((field) => {
      if (field.name === "station") {
        return {
          ...field,
          options:
            stationData?.data?.data?.map((station: any) => ({
              label: station.name,
              value: station.id,
            })) || [],
        };
      }
      return field;
    }),
  }));

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Asset Management", path: Pathname.ASSET_MANAGEMENT },
          { label: "Charging Points", path: Pathname.ASSET_MANAGEMENT },
          { label: point.chargingPointName, path: `${Pathname.ASSET_MANAGEMENT}/charging-points/${id}` },
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
            sections={dynamicSections}
            submitLabel="Save Changes"
            cancelLabel="Cancel"
            onCancel={handleCancel}
          />
        </div>
      </PageWrapper>
    </div>
  );
}
