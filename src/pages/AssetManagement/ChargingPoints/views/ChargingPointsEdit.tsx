import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "@/component/Breadcrumb";
import PageWrapper from "@/component/PageWrapper";
import { DynamicForm } from "@/component/form/DynamicForm";
import { Pathname } from "@/utils/pathname";
import { editPointSchema, pointEditFormSections } from "./ChargingPointsEditConfig";
import { type EditPointFormValues } from "../types/ChargingPoints.types";

type PointEditData = {
  pointName: string;
  pointId: string;
  configurationUrl: string;
  station: EditPointFormValues["station"];
  oem: EditPointFormValues["oem"];
  model: EditPointFormValues["model"];
  commissionOn: string;
  tariff: EditPointFormValues["tariff"];
  connectionType: EditPointFormValues["connectionType"];
  isPublic: boolean;
};

const POINT_EDIT_MAP: Record<string, PointEditData> = {
  "CP-001": {
    pointName: "smart3.t3test",
    pointId: "smart3.t3test",
    configurationUrl: "ws://c-be-uel.ioncharge.tech/ocpp/smart3.t3test",
    station: "station-1",
    oem: "evre",
    model: "model-x1",
    commissionOn: "2026-03-10",
    tariff: "tariff-a",
    connectionType: "wifi",
    isPublic: true,
  },
};

export default function PointEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const pointId = id && POINT_EDIT_MAP[id] ? id : "CP-001";
  const point = POINT_EDIT_MAP[pointId];

  const [formValues, setFormValues] = useState<EditPointFormValues | null>(null);

  useEffect(() => {
    if (point) {
      setFormValues({
        name: point.pointName,
        id: point.pointId,
        configurationUrl: point.configurationUrl,
        station: point.station,
        oem: point.oem,
        model: point.model,
        commissionOn: point.commissionOn,
        tariff: point.tariff,
        connectionType: point.connectionType,
        isPublic: point.isPublic,
      });
    }
  }, [point]);

  const handleSubmit = (data: EditPointFormValues) => {
    console.log("Update point:", pointId, data);
    navigate(`${Pathname.ASSET_MANAGEMENT}/charging-points/${pointId}`);
  };

  const handleCancel = () => {
    navigate(`${Pathname.ASSET_MANAGEMENT}/charging-points/${pointId}`);
  };

  if (!point || !formValues) {
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
          { label: point.pointName, path: `${Pathname.ASSET_MANAGEMENT}/charging-points/${pointId}` },
          { label: "Edit" },
        ]}
      />

      <PageWrapper
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
            sections={pointEditFormSections}
            submitLabel="Save Changes"
            cancelLabel="Cancel"
            onCancel={handleCancel}
          />
        </div>
      </PageWrapper>
    </div>
  );
}
