import Breadcrumb from "@/component/Breadcrumb";
import { DynamicForm } from "@/component/form/DynamicForm";
import PageWrapper from "@/component/PageWrapper";
import { Pathname } from "@/utils/pathname";
import { useNavigate, useParams } from "react-router-dom";
import { getFleetById } from "../../../mocks/fleet.mock";
import {
  createDriverSchema,
  driverCreateFormSections,
  type CreateDriverFormValues,
} from "../config/driver.form";

export default function CreateDrivers() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const fleet = getFleetById(id);

  if (!fleet || !id) {
    return <div className="p-8 text-center text-text-500 subtitle-2-medium">Fleet not found.</div>;
  }

  const handleCancel = () => {
    navigate(`${Pathname.FLEET_MANAGEMENT}/${id}`);
  };

  const handleSubmit = (data: CreateDriverFormValues) => {
    console.log("Create driver:", data);
    handleCancel();
  };

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Fleet Management", path: Pathname.FLEET_MANAGEMENT },
          { label: fleet.organisationName, path: `${Pathname.FLEET_MANAGEMENT}/${id}` },
          { label: "Drivers", path: `${Pathname.FLEET_MANAGEMENT}/${id}` },
          { label: "Add Driver" },
        ]}
      />

      <PageWrapper
        title="Add Driver"
        showSearch={false}
        showFilter={false}
        titleClassName="heading-3-semibold"
        className="w-full"
      >
        <div className="mt-2">
          <DynamicForm<CreateDriverFormValues>
            schema={createDriverSchema}
            sections={driverCreateFormSections}
            defaultValues={{ organisationFleet: fleet.organisationName }}
            onSubmit={handleSubmit}
            submitLabel="Add Driver"
            cancelLabel="Cancel"
            onCancel={handleCancel}
          />
        </div>
      </PageWrapper>
    </div>
  );
}