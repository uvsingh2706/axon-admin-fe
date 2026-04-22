import Breadcrumb from "@/component/Breadcrumb";
import { DynamicForm } from "@/component/form/DynamicForm";
import PageWrapper from "@/component/PageWrapper";
import { Pathname } from "@/utils/pathname";
import { useNavigate, useParams } from "react-router-dom";
import { useFleetById } from "../../../services/Fleet.hooks";
import { useCreateVehicle } from "../services/Vehicle.hooks";
import {
  createVehicleSchema,
  vehicleCreateFormSections,
  type CreateVehicleFormValues,
} from "../config/vehicle.form";

export default function AddVehicles() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Live API hook for fleet data (for breadcrumbs)
  const { data: fleetDetail, isLoading: isFleetLoading } = useFleetById(id ?? "");
  const fleet = fleetDetail?.data;

  // Mutation hook for creating vehicles
  const { mutate: createVehicle, isPending: isAdding } = useCreateVehicle(id ?? "");

  const handleCancel = () => {
    navigate(`${Pathname.FLEET_MANAGEMENT}/${id}/vehicles`);
  };

  const handleSubmit = (data: CreateVehicleFormValues) => {
    let payload = {
      ...data,
      make: data.brand
    }
    createVehicle(payload, {
      onSuccess: () => {
        handleCancel();
      },
    });
  };

  if (isFleetLoading) {
    return <div className="p-8 text-center text-text-500">Loading...</div>;
  }

  if (!fleet) {
    return <div className="p-8 text-center text-text-500 subtitle-2-medium">Fleet not found.</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Fleet Management", path: Pathname.FLEET_MANAGEMENT },
          { label: fleet.name, path: `${Pathname.FLEET_MANAGEMENT}/${id}` },
          { label: "Vehicles", path: `${Pathname.FLEET_MANAGEMENT}/${id}/vehicles` },
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
