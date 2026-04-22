import Breadcrumb from "@/component/Breadcrumb";
import PageWrapper from "@/component/PageWrapper";
import EditIcon from "@/assets/icons/EditIcon";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import { Modal } from "@/component/Modal";
import { Pathname } from "@/utils/pathname";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useCan } from "@/rbac";
import { MODULE } from "@/rbac/modules";
import { useFleetById } from "../../../services/Fleet.hooks";
import { useVehicleById, useDeleteVehicle } from "../services/Vehicle.hooks";

export default function VehiclesDetails() {
  const { id, vehicleId } = useParams<{ id: string; vehicleId: string }>();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const canEditVehicle = useCan(MODULE.VEHICLE_MANAGEMENT, "update");
  const canDeleteVehicle = useCan(MODULE.VEHICLE_MANAGEMENT, "delete");

  const { data: fleetDetail, isLoading: isFleetLoading } = useFleetById(id ?? "");
  const { data: vehicleDetail, isLoading: isVehicleLoading } = useVehicleById(vehicleId ?? "");
  const deleteMutation = useDeleteVehicle();

  const fleet = fleetDetail?.data;
  const vehicle = vehicleDetail?.data;

  if (isFleetLoading || isVehicleLoading) {
    return <div className="p-8 text-center text-text-500 subtitle-2-medium">Loading vehicle details...</div>;
  }

  if (!fleet || !vehicle) {
    return <div className="p-8 text-center text-text-500 subtitle-2-medium">Vehicle not found.</div>;
  }

  const handleDelete = () => {
    deleteMutation.mutate(vehicleId ?? "", {
      onSuccess: () => {
        navigate(`${Pathname.FLEET_MANAGEMENT}/${id}/vehicles`);
      },
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Fleet Management", path: Pathname.FLEET_MANAGEMENT },
          { label: fleet.name || fleet.name, path: `${Pathname.FLEET_MANAGEMENT}/${id}` },
          { label: "Vehicles", path: `${Pathname.FLEET_MANAGEMENT}/${id}/vehicles` },
          { label: vehicle.registrationNumber || "Vehicle Details" },
        ]}
      />

      <PageWrapper
        title={vehicle.registrationNumber || "Vehicle Details"}
        showSearch={false}
        showFilter={false}
        titleClassName="heading-3-semibold"
        className="w-full"
        headerActions={
          <div className="flex items-center gap-3">
            {canEditVehicle && (
              <button
                onClick={() =>
                  navigate(`${Pathname.FLEET_MANAGEMENT}/${id}/vehicles/${vehicleId}/edit`)
                }
                className="p-2 rounded-lg hover:bg-secondary-50 transition-colors cursor-pointer"
                aria-label="Edit vehicle"
              >
                <EditIcon className="w-5 h-5" />
              </button>
            )}
            {canDeleteVehicle && (
              <>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="p-2 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                  aria-label="Delete vehicle"
                >
                  <DeleteIcon className="w-5 h-5" />
                </button>
                <Modal
                  open={isModalOpen}
                  onOpenChange={setIsModalOpen}
                  description="Are you sure you want to delete this vehicle?"
                  onConfirm={handleDelete}
                  confirmLabel="Delete"
                  cancelLabel="Cancel"
                />
              </>
            )}
          </div>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          <DetailField label="Brand" value={vehicle.make || "NA"} />
          <DetailField label="Model" value={vehicle.model || "NA"} />
          <DetailField label="Registration Number" value={vehicle.registrationNumber || "NA"} />
          <DetailField label="Connector Type" value={vehicle.connectorType || "NA"} />
          <DetailField label="Vehicle ID" value={vehicle.id || "NA"} />
          <DetailField label="Battery Pack" value={vehicle.batteryPack || "NA"} />
          <DetailField label="Charging Rate" value={vehicle.chargingRate || "NA"} />


        </div>
      </PageWrapper>
    </div>
  );
}

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="subtitle-3-regular text-text-500">{label}</span>
      <span className="subtitle-2-semibold text-text-950">{value}</span>
    </div>
  );
}
