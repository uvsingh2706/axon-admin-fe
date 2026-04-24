import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "@/component/Breadcrumb";
import PageWrapper from "@/component/PageWrapper";
import { DynamicForm } from "@/component/form/DynamicForm";
import { Pathname } from "@/utils/pathname";
import {
  createDriverSchema,
  driverCreateFormSections,
  type CreateDriverFormValues,
} from "../config/driver.form";
import { useFleetList } from "@/pages/FleetManagement/services/Fleet.hooks";
import { useVehicleList } from "@/pages/FleetManagement/views/Vehicles/services/Vehicle.hooks";
import { useCreateDriver } from "../services/drivers.hooks";

export default function DriverCreate() {
  const navigate = useNavigate();
  const [selectedFleetId, setSelectedFleetId] = useState("");

  const { mutateAsync: createDriver, isPending } = useCreateDriver();
  const { data: fleetList } = useFleetList({ page: 1, limit: 100 });
  const { data: vehicleList } = useVehicleList(
    { fleetId: selectedFleetId, page: 1, limit: 100 },
    Boolean(selectedFleetId),
  );


  const fleetOptions = fleetList?.data?.map((fleet) => ({ label: fleet.name, value: fleet.id })) ?? [];

  const vehicleOptions =
    vehicleList?.data?.vehicles?.map((vehicle) => ({
      label: [vehicle.make, vehicle.model, `(${vehicle.registrationNumber})`].filter(Boolean).join(" ") || vehicle.id,
      value: vehicle.id,
    })) ?? [];

  const handleCancel = () => navigate(Pathname.USER_MANAGEMENT);

  const handleSubmit = async (data: CreateDriverFormValues) => {
    const payload = {
      driverName: data.driverName,
      email: data.personalEmailId,
      mobileNumber: data.phoneNumber,
      gender: data.gender,
      drivingLicense: data.licenseNumber,
      drivingLicenseExpiry: data.licenseExpiryDate,
      vehicleId: data.vehicleId

    };
    await createDriver({ fleetId: data.organisationFleet, data: payload });
    handleCancel();
  };

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "User Management", path: Pathname.USER_MANAGEMENT },
          { label: "Create Driver" },
        ]}
      />

      <PageWrapper
        title="Create Driver"
        showSearch={false}
        showFilter={false}
        titleClassName="heading-3-semibold"
        className="w-full"
      >
        <div className="mt-2">
          <DynamicForm<CreateDriverFormValues>
            schema={createDriverSchema}
            // defaultValues={driverCreateDefaultValues}
            onSubmit={handleSubmit}
            sections={driverCreateFormSections(
              fleetOptions,
              vehicleOptions,
              setSelectedFleetId,
              !selectedFleetId,
            )}
            submitLabel={isPending ? "Creating..." : "Create Driver"}
            cancelLabel="Cancel"
            onCancel={handleCancel}
          />
        </div>
      </PageWrapper>
    </div>
  );
}

