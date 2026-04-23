import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Breadcrumb from "@/component/Breadcrumb";
import PageWrapper from "@/component/PageWrapper";
import { DynamicForm } from "@/component/form/DynamicForm";
import { Pathname } from "@/utils/pathname";
import {
  editDriverSchema,
  driverEditFormSections,
  type EditDriverFormValues,
} from "../config/driver.form";
import { useDriverById, useUpdateDriver } from "../services/drivers.hooks";
import { useFleetList } from "@/pages/FleetManagement/services/Fleet.hooks";
import { useVehicleList } from "@/pages/FleetManagement/views/Vehicles/services/Vehicle.hooks";

export default function DriverEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { mutateAsync: updateDriver, isPending } = useUpdateDriver();
  const stateDriver = location.state?.driver;
  const { data: driverRes, isLoading } = useDriverById(id ?? "", !stateDriver);
  const driver = stateDriver ?? driverRes?.data?.data;

  const [selectedFleetId, setSelectedFleetId] = useState("");

  const { data: fleetList } = useFleetList({ page: 1, limit: 100 });
  const { data: vehicleList } = useVehicleList(
    { fleetId: selectedFleetId, page: 1, limit: 100 },
    Boolean(selectedFleetId),
  );

  const fleetOptions =
    fleetList?.data?.map((f) => ({ label: f.name, value: f.id })) ?? [];

  const vehicleOptions =
    vehicleList?.data?.vehicles?.map((v) => ({
      label: [v.make, v.model, `(${v.registrationNumber})`].filter(Boolean).join(" ") || v.id,
      value: v.id,
    })) ?? [];

  // ── Pre-fill form from driver data ────────────────────────────────────────
  const [form, setForm] = useState<EditDriverFormValues>({
    driverName: "",
    image: undefined,
    personalEmailId: "",
    phoneNumber: "",
    gender: "",
    driverId: "",
    licenseNumber: "",
    licenseExpiryDate: "",
    organisationFleet: "",
    vehicleId: "",
  });

  useEffect(() => {
    if (!driver) return;

    setForm({
      driverName: driver.name ?? "",
      image: driver.profilePicture ?? undefined,
      personalEmailId: driver.email ?? "",
      phoneNumber: driver.mobileNumber ?? "",
      gender: driver.gender ?? "",
      driverId: driver.id ?? "",
      licenseNumber: driver.drivingLicense ?? "",
      licenseExpiryDate: driver.drivingLicenseExpiry ?? "",
      organisationFleet: driver.fleet?.id ?? "",
      vehicleId: driver.vehicle?.id ?? "",
    });

    if (driver.fleet?.id) {
      setSelectedFleetId(driver.fleet.id);
    }
  }, [driver]);

  const handleCancel = () => navigate(`${Pathname.USER_MANAGEMENT}/drivers/${id}`);

  const handleSubmit = async (data: EditDriverFormValues) => {
    if (!id) return;

    const payload = {
      driverName: data.driverName,
      email: data.personalEmailId,
      mobileNumber: data.phoneNumber,
      gender: data.gender,
      drivingLicense: data.licenseNumber,
      drivingLicenseExpiry: data.licenseExpiryDate,
      vehicleId: data.vehicleId ?? "",
    };

    try {
      await updateDriver({ id, data: payload });
      handleCancel();
    } catch (err) {
      console.error("Failed to update driver:", err);
    }
  };

  if (isLoading && !stateDriver) {
    return <div className="p-8 text-center text-text-500 subtitle-2-medium">Loading...</div>;
  }

  if (!driver) {
    return <div className="p-8 text-center text-text-500 subtitle-2-medium">Driver not found.</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "User Management", path: Pathname.USER_MANAGEMENT },
          { label: "Driver Details", path: `${Pathname.USER_MANAGEMENT}/drivers/${id}` },
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
        {form.driverId && (

          <div className="mt-2">
            <DynamicForm<EditDriverFormValues>
              schema={editDriverSchema}
              defaultValues={form}
              onSubmit={handleSubmit}
              sections={driverEditFormSections(
                fleetOptions,
                vehicleOptions,
                setSelectedFleetId,
                !selectedFleetId,
              )}
              submitLabel={isPending ? "Saving..." : "Save Changes"}
              cancelLabel="Cancel"
              onCancel={handleCancel}
            />
          </div>
        )}
      </PageWrapper>
    </div>
  );
}
