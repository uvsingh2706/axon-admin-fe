import { useNavigate } from "react-router-dom";
import PageWrapper from "@/component/PageWrapper";
import Breadcrumb from "@/component/Breadcrumb";
import { Pathname } from "@/utils/pathname";
import { DynamicForm } from "@/component/form/DynamicForm";
import {
  createStationSchema,
  stationCreateFormSections,
  type CreateStationFormValues,
} from "../config/station.form";

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
          { label: "Add Station" },
        ]}
      />

      <PageWrapper
        title="Add Station"
        showSearch={false}
        showFilter={false}
        titleClassName="heading-3-semibold"
        className="w-full"
      >
        <div className="mt-2 text-left">
          <DynamicForm<CreateStationFormValues>
            schema={createStationSchema}
            sections={stationCreateFormSections}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitLabel="Add Station"
            cancelLabel="Cancel"
          />
        </div>
      </PageWrapper>
    </div>
  );
}
