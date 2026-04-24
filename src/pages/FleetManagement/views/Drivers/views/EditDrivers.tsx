import { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "@/component/Breadcrumb";
import { DynamicForm } from "@/component/form/DynamicForm";
import PageWrapper from "@/component/PageWrapper";
import { Pathname } from "@/utils/pathname";
import { useFleetById } from "../../../services/Fleet.hooks";
import { useDriverById, useEditDriver } from "../services/driver.hooks";
import {
  editDriverSchema,
  getDriverFormSections,
  type EditDriverFormValues,
} from "../config/driver.form";
import { useVehicleList } from "../../Vehicles/services/Vehicle.hooks";
import type { VehicleDTO } from "../../Vehicles/services/Vehicle.types";

export default function EditDrivers() {
  const { id, driverId } = useParams<{ id: string; driverId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  
  const stateDriver = location.state?.driverData ?? null;

 
  const { data: driverApiData, isLoading: isLoadingDriver } = useDriverById(
    driverId || "",
    !stateDriver 
  );

  const driver = stateDriver ?? (driverApiData?.data as any)?.data ?? null;

  const { data: fleetData, isLoading: isLoadingFleet } = useFleetById(id || "");
  const { mutate: editDriver, isPending } = useEditDriver();

  const fleet = fleetData?.data;

  
  const { data: vehicleData } = useVehicleList({ fleetId: id, limit: 100 });
  const vehicles = vehicleData?.data?.vehicles || [];

  
  const vehicleOptions = useMemo(() => {
    return vehicles.map((v: VehicleDTO) => ({
      label: `${v.make} ${v.model} (${v.registrationNumber})`,
      value: v.id,
    }));
  }, [vehicles]);

  
  const updatedSections = useMemo(() => {
    return getDriverFormSections(vehicleOptions);
  }, [vehicleOptions]);

  console.log(driverApiData)
  console.log(fleet)

  const [form, setForm] = useState<EditDriverFormValues | null>(null);

  useEffect(() => {
    if (driver) {

      setForm({
        driverName: driver.name || "",
        email: driver.email || "",
        mobileNumber: driver.mobileNumber || "",
        gender: driver.gender ? driver.gender.toLowerCase() : "",
        driverId: driver.id || "",
        drivingLicense: driver.drivingLicense || "",
        drivingLicenseExpiry: driver.drivingLicenseExpiry || "",
        organisationFleet: driver.fleet?.name || fleet?.name || "",
        vehicleId: driver.vehicle?.id || "",
        image: undefined,
      });
    }
  }, [driver, fleet]);

  if (isLoadingFleet || isLoadingDriver) {
    return (
      <div className="p-8 text-center text-text-500 subtitle-2-medium">
        Loading driver details...
      </div>
    );
  }

  if (!fleet || !driver || !id || !driverId || !form) {
    return (
      <div className="p-8 text-center text-text-500 subtitle-2-medium">
        Driver not found.
      </div>
    );
  }

  const handleSubmit = (data: EditDriverFormValues) => {
    editDriver(
      { driverId, data },
      {
        onSuccess: () => {
          navigate(`${Pathname.FLEET_MANAGEMENT}/${id}/drivers/${driverId}`);
        },
      }
    );
  };

  const handleCancel = () => {
    navigate(`${Pathname.FLEET_MANAGEMENT}/${id}/drivers/${driverId}`);
  };

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Fleet Management", path: Pathname.FLEET_MANAGEMENT },
          { label: fleet.name || "Fleet", path: `${Pathname.FLEET_MANAGEMENT}/${id}` },
          { label: "Drivers", path: `${Pathname.FLEET_MANAGEMENT}/${id}` },
          {
            label: driver.name || "Driver",
            path: `${Pathname.FLEET_MANAGEMENT}/${id}/drivers/${driverId}`,
          },
          { label: "Edit Driver" },
        ]}
      />

      <PageWrapper
        title="Edit Driver"
        showSearch={false}
        showFilter={false}
        titleClassName="heading-3-semibold"
        className="w-full"
      >
        <div className="mt-2">
          <DynamicForm<EditDriverFormValues>
            schema={editDriverSchema}
            defaultValues={form}
            sections={updatedSections}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitLabel={isPending ? "Saving..." : "Save Changes"}
            cancelLabel="Cancel"
          />
        </div>
      </PageWrapper>
    </div>
  );
}

