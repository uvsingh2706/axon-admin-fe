import Breadcrumb from "@/component/Breadcrumb";
import { DynamicForm } from "@/component/form/DynamicForm";
import PageWrapper from "@/component/PageWrapper";
import { Pathname } from "@/utils/pathname";
import { useNavigate, useParams } from "react-router-dom";
import { getFleetById } from "../../../mocks/fleet.mock";
import {
  createVehicleSchema,
  vehicleCreateFormSections,
  type CreateVehicleFormValues,
} from "../config/vehicle.form";

export default function AddVehicles() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const fleet = getFleetById(id);

  if (!fleet || !id) {
    return <div className="p-8 text-center text-text-500 subtitle-2-medium">Fleet not found.</div>;
  }

  const handleCancel = () => {
    navigate(`${Pathname.FLEET_MANAGEMENT}/${id}/vehicles`);
  };

  const handleSubmit = (data: CreateVehicleFormValues) => {
    console.log("Create vehicle:", data);
    handleCancel();
  };

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Fleet Management", path: Pathname.FLEET_MANAGEMENT },
          { label: fleet.organisationName, path: `${Pathname.FLEET_MANAGEMENT}/${id}` },
          { label: "Vehicles", path: `${Pathname.FLEET_MANAGEMENT}/${id}` },
          { label: "Add Vehicle" },
        ]}
      />

      <PageWrapper
        title="Add Vehicle"
        showSearch={false}
        showFilter={false}
        titleClassName="heading-3-semibold"
        className="w-full"
      >
        <div className="mt-2">
          <DynamicForm
            schema={createVehicleSchema}
            sections={vehicleCreateFormSections}
            onSubmit={handleSubmit}
            submitLabel="Add Vehicle"
            cancelLabel="Cancel"
            onCancel={handleCancel}
          />
        </div>
      </PageWrapper>
    </div>
  );
}
