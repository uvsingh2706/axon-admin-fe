import Breadcrumb from "@/component/Breadcrumb";
import { DynamicForm } from "@/component/form/DynamicForm";
import PageWrapper from "@/component/PageWrapper";
import { Pathname } from "@/utils/pathname";
import { useNavigate, useParams } from "react-router-dom";
import { useFleetById } from "../../../services/Fleet.hooks";
import { useCreateDriver } from "../services/driver.hooks";
import {
  createDriverSchema,
  getDriverFormSections,
  type CreateDriverFormValues,
} from "../config/driver.form";
import { useVehicleList, useVehiclerByFleetId } from "../../Vehicles/services/Vehicle.hooks";
import type { VehicleDTO } from "../../Vehicles/services/Vehicle.types";
import { useMemo } from "react";

export default function CreateDrivers() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();


  const { data: fleetDetail, isLoading: isFleetLoading } = useFleetById(id ?? "");

  const fleet = fleetDetail?.data;


  const { mutate: createDriver, isPending: isAdding } = useCreateDriver(id ?? "");


  const { data: vehicleData } = useVehicleList({ fleetId: id, limit: 50 });

  const vehicles = vehicleData?.data?.vehicles || [];


  const vehicleOptions = vehicles.map((v: VehicleDTO) => {
    const label = `${v.make || ""} ${v.model || ""} (${v.registrationNumber || "No Reg No"})`.trim();
    return {
      label: label || "Unknown Vehicle",
      value: v.id,
    };
  });


  const updatedSections = useMemo(() => {
    return getDriverFormSections(vehicleOptions);
  }, [vehicleOptions]);

  const handleCancel = () => {
    navigate(`${Pathname.FLEET_MANAGEMENT}/${id}/drivers`);
  };

  const handleSubmit = (data: CreateDriverFormValues) => {
    console.log("3. Payload being sent to Backend:", data);
    createDriver(data, {
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
          { label: "Drivers", path: `${Pathname.FLEET_MANAGEMENT}/${id}/drivers` },
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
          <DynamicForm
            schema={createDriverSchema}
            sections={updatedSections}
            defaultValues={{ organisationFleet: fleet.name, mobileNumber: "", email: "", driverName: "" } as any}
            onSubmit={handleSubmit}
            submitLabel={isAdding ? "Adding..." : "Add Driver"}
            cancelLabel="Cancel"
            onCancel={handleCancel}
          />
        </div>
      </PageWrapper>
    </div>
  );
}