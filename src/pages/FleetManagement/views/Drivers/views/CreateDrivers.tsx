import Breadcrumb from "@/component/Breadcrumb";
import { DynamicForm } from "@/component/form/DynamicForm";
import PageWrapper from "@/component/PageWrapper";
import { Pathname } from "@/utils/pathname";
import { useNavigate, useParams } from "react-router-dom";
import { useFleetById } from "../../../services/Fleet.hooks";
import { useCreateDriver } from "../services/driver.hooks";
import {
  createDriverSchema,
  driverCreateFormSections,
  type CreateDriverFormValues,
} from "../config/driver.form";
import { useVehicleList } from "../../Vehicles/services/Vehicle.hooks";
import type { VehicleDTO } from "../../Vehicles/services/Vehicle.types";

export default function CreateDrivers() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Live API hook for fleet data (for breadcrumbs)
  const { data: fleetDetail, isLoading: isFleetLoading } = useFleetById(id ?? "");
  const fleet = fleetDetail?.data;

  // Mutation hook for creating a driver
  const { mutate: createDriver, isPending: isAdding } = useCreateDriver(id ?? "");

  // Fetch vehicles for the dropdown
  const { data: vehicleData } = useVehicleList({ limit: 50 });
  const vehicles = vehicleData?.data?.vehicles || [];

  // Map vehicles to options for the dropdown (Vehicle Name only, deduplicated)
  const vehicleOptions = vehicles.map((v: VehicleDTO) => {
    const label = v.make;
    return {
      label: label || "Unknown Vehicle",
      value: v.id,
    };
  });

  // Inject dynamic options into the form sections
  const updatedSections = driverCreateFormSections.map((section) => {
    if (section.title === "Assign Vehicle") {
      return {
        ...section,
        fields: section.fields.map((field) =>
          field.name === "vehicleId"
            ? { ...field, options: vehicleOptions }
            : field
        ),
      };
    }
    return section;
  });

  const handleCancel = () => {
    navigate(`${Pathname.FLEET_MANAGEMENT}/${id}`);
  };

  const handleSubmit = (data: CreateDriverFormValues) => {
    const [firstName, ...lastNameParts] = data.driverName ? data.driverName.split(" ") : ["", ""];
    const payload = {
      driverName: data.driverName,
      // lastName: lastNameParts.join(" ") || ".",
      email: data.personalEmailId,
      mobileNumber: String(data.phoneNumber || ""),
      gender: data.gender ? data.gender.toUpperCase() : "MALE",
      drivingLicense: data.licenseNumber,
      drivingLicenseExpiry: data.licenseExpiryDate,
      vehicleId: data.vehicleId,
    };

    console.log("Submitting payload:", payload);
    createDriver(payload, {
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
          <DynamicForm
            schema={createDriverSchema}
            sections={updatedSections}
            defaultValues={{ organisationFleet: fleet.name } as any}
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