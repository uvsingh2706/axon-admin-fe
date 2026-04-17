import Breadcrumb from "@/component/Breadcrumb";
import { DynamicForm } from "@/component/form/DynamicForm";
import PageWrapper from "@/component/PageWrapper";
import { Pathname } from "@/utils/pathname";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFleetById } from "../../../mocks/fleet.mock";
import { getVehicleById } from "../mocks/vehicles.mock";
import {
  editVehicleSchema,
  vehicleEditFormSections,
  type EditVehicleFormValues,
} from "../config/vehicle.form";

export default function EditVehicles() {
  const { id, vehicleId } = useParams<{ id: string; vehicleId: string }>();
  const navigate = useNavigate();
  const fleet = getFleetById(id);
  const vehicle = getVehicleById(id, vehicleId);
  const [form, setForm] = useState<EditVehicleFormValues | null>(null);

  useEffect(() => {
    if (vehicle) {
      setForm({
        brand: vehicle.brand,
        model: vehicle.model,
        registrationNumber: vehicle.registrationNumber,
        connectorType: vehicle.connectorType,
        vehicleId: vehicle.vehicleId,
        batteryPack: "",
        chargingRate: "",
      });
    }
  }, [vehicle]);

  if (!fleet || !vehicle || !id || !vehicleId || !form) {
    return <div className="p-8 text-center text-text-500 subtitle-2-medium">Vehicle not found.</div>;
  }

  const handleCancel = () => {
    navigate(`${Pathname.FLEET_MANAGEMENT}/${id}/vehicles/${vehicleId}`);
  };

  const handleSubmit = (data: EditVehicleFormValues) => {
    console.log("Update vehicle:", vehicleId, data);
    handleCancel();
  };

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Fleet Management", path: Pathname.FLEET_MANAGEMENT },
          { label: fleet.organisationName, path: `${Pathname.FLEET_MANAGEMENT}/${id}` },
          { label: "Vehicles", path: `${Pathname.FLEET_MANAGEMENT}/${id}` },
          { label: "Edit" },
        ]}
      />

      <PageWrapper
        title="Edit Vehicle"
        showSearch={false}
        showFilter={false}
        titleClassName="heading-3-semibold"
        className="w-full"
      >
        <div className="mt-2">
          <DynamicForm
            schema={editVehicleSchema}
            defaultValues={form}
            sections={vehicleEditFormSections}
            onSubmit={handleSubmit}
            submitLabel="Save Changes"
            cancelLabel="Cancel"
            onCancel={handleCancel}
          />
        </div>
      </PageWrapper>
    </div>
  );
}
