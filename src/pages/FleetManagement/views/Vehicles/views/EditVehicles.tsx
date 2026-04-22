import Breadcrumb from "@/component/Breadcrumb";
import { DynamicForm } from "@/component/form/DynamicForm";
import PageWrapper from "@/component/PageWrapper";
import { Pathname } from "@/utils/pathname";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFleetById } from "../../../services/Fleet.hooks";
import { useVehicleById, useUpdateVehicle } from "../services/Vehicle.hooks";
import {
  editVehicleSchema,
  vehicleEditFormSections,
  type EditVehicleFormValues,
} from "../config/vehicle.form";

export default function EditVehicles() {
  const { id, vehicleId } = useParams<{ id: string; vehicleId: string }>();
  const navigate = useNavigate();

  const { data: fleetDetail, isLoading: isFleetLoading } = useFleetById(id ?? "");
  const { data: vehicleDetail, isLoading: isVehicleLoading } = useVehicleById(vehicleId ?? "");
  const updateMutation = useUpdateVehicle(vehicleId ?? "");

  const fleet = fleetDetail?.data;
  const vehicle = vehicleDetail?.data;
  const [form, setForm] = useState<EditVehicleFormValues | null>(null);

  useEffect(() => {
    if (vehicle) {
      setForm({
        brand: vehicle.make || "",
        model: vehicle.model || "",
        vehicleType: vehicle.vehicleType || "",
        registrationNumber: vehicle.registrationNumber || "",
        connectorType: vehicle.connectorType || "",
        vehicleId: vehicle.id || "",
        batteryPack: String(vehicle.batteryPack || ""),
        chargingRate: vehicle.chargingRate || "",
      });
    }
  }, [vehicle]);

  if (isFleetLoading || isVehicleLoading) {
    return <div className="p-8 text-center text-text-500 subtitle-2-medium">Loading vehicle details...</div>;
  }

  if (!fleet || !vehicle || !id || !vehicleId || !form) {
    return <div className="p-8 text-center text-text-500 subtitle-2-medium">Vehicle not found.</div>;
  }

  const handleCancel = () => {
    navigate(`${Pathname.FLEET_MANAGEMENT}/${id}/vehicles/${vehicleId}`);
  };

  const handleSubmit = (data: EditVehicleFormValues) => {
    let payload = {
      ...data,
      make: data?.brand
    }
    updateMutation.mutate(payload, {
      onSuccess: () => {
        navigate(`${Pathname.FLEET_MANAGEMENT}/${id}/vehicles/${vehicleId}`);
      },
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Fleet Management", path: Pathname.FLEET_MANAGEMENT },
          { label: fleet.name, path: `${Pathname.FLEET_MANAGEMENT}/${id}` },
          { label: "Vehicles", path: `${Pathname.FLEET_MANAGEMENT}/${id}/vehicles` },
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
