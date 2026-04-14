import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "@/component/Breadcrumb";
import PageWrapper from "@/component/PageWrapper";
import { DynamicForm } from "@/component/form/DynamicForm";
import { Pathname } from "@/utils/pathname";
import {
  editPointSchema,
  pointEditFormSections,
  type EditPointFormValues,
} from "../config/point.form";
import { mockPointEditById } from "../mocks/point.mock";

export default function PointEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const pointId = id && mockPointEditById[id] ? id : "CP-001";
  const point = mockPointEditById[pointId];

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
