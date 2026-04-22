import { useNavigate } from "react-router-dom";
import { DynamicForm } from "@/component/form/DynamicForm";
import PageWrapper from "@/component/PageWrapper";
import {
  createPointSchema,
  pointCreateFormSections,
  type CreatePointFormValues,
} from "../config/point.form";
import Breadcrumb from "@/component/Breadcrumb";
import { Pathname } from "@/utils/pathname";
import { useStationList } from "../../ChargingStations/services/stations.hooks";

export default function PointCreate() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(Pathname.ASSET_MANAGEMENT);
  };

  const handleSubmit = (data: CreatePointFormValues) => {
    console.log("Form Submitted:", data);
    handleBack();
  };

  const { data: stationData } = useStationList({ limit: 50, page: 1 });

  const dynamicSections = pointCreateFormSections.map((section) => ({
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
          { label: "Add Charging Point" },
        ]}
      />

      <PageWrapper
        isChargerSpecifications={false}
        title="Add Charging Point"
        showSearch={false}
        showFilter={false}
        titleClassName="heading-3-semibold"
        className="w-full"
      >
        <div className="mt-2 text-left">
          <DynamicForm
            schema={createPointSchema}
            onSubmit={handleSubmit}
            sections={dynamicSections}
            submitLabel="Save"
            cancelLabel="Cancel"
            onCancel={handleBack}
          // defaultValues={{ isPublic: true }}
          />
        </div>
      </PageWrapper>
    </div>
  );
}
