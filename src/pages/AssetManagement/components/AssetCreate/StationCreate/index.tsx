import { useNavigate } from "react-router-dom";
import PageWrapper from "@/component/PageWrapper";
import Breadcrumb from "@/component/Breadcrumb";
import { Pathname } from "@/utils/pathname";
import { DynamicForm } from "@/component/form/DynamicForm";
import { createStationSchema, stationFormSections, type CreateStationFormValues } from "./StationCreateConfig";

export default function StationCreate() {
  const navigate = useNavigate();

  const handleSubmit = (data: CreateStationFormValues) => {
    console.log("Form submitted", data);
    navigate(Pathname.ASSET_MANAGEMENT);
  };

  const handleCancel = () => {
    navigate(Pathname.ASSET_MANAGEMENT);
  };

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Asset Management", path: Pathname.ASSET_MANAGEMENT },
          { label: "Charging Stations", path: Pathname.ASSET_MANAGEMENT },
          { label: "Add Charging Station" },
        ]}
      />

      <PageWrapper
        title="Add Charging Station"
        showSearch={false}
        showFilter={false}
        titleClassName="heading-3-semibold"
        className="w-full"
      >
        <div className="mt-2 text-left">
          <DynamicForm<CreateStationFormValues>
            schema={createStationSchema}
            sections={stationFormSections}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitLabel="Save"
            cancelLabel="Cancel"
          />
        </div>
      </PageWrapper>
    </div>
  );
}
