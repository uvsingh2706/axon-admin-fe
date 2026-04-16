import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "@/component/Breadcrumb";
import { DynamicForm } from "@/component/form/DynamicForm";
import PageWrapper from "@/component/PageWrapper";
import { Pathname } from "@/utils/pathname";
import { getFleetById } from "../../../mocks/fleet.mock";
import {
  editDriverSchema,
  driverCreateFormSections,
  type EditDriverFormValues,
} from "../config/driver.form";
import { getDriverById, getDriverEditDefaultValues } from "../mocks/driver.mock";

export default function EditDrivers() {
  const { id, driverId } = useParams<{ id: string; driverId: string }>();
  const navigate = useNavigate();

  const fleet = getFleetById(id);
  const driver = id && driverId ? getDriverById(id, driverId) : undefined;
  const defaults = id && driverId ? getDriverEditDefaultValues(id, driverId) : null;

  // Keep ALL sections including image-upload — identical to CreateDrivers
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const formSections = useMemo(() => driverCreateFormSections, []);

  if (!fleet || !driver || !id || !driverId || !defaults) {
    return (
      <div className="p-8 text-center text-text-500 subtitle-2-medium">
        Driver not found.
      </div>
    );
  }

  const handleSubmit = (data: EditDriverFormValues) => {
    console.log("Edit driver submitted:", data);
    navigate(`${Pathname.FLEET_MANAGEMENT}/${id}/drivers/${driverId}`);
  };

  const handleCancel = () => {
    navigate(`${Pathname.FLEET_MANAGEMENT}/${id}/drivers/${driverId}`);
  };

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Fleet Management", path: Pathname.FLEET_MANAGEMENT },
          { label: fleet.organisationName, path: `${Pathname.FLEET_MANAGEMENT}/${id}` },
          { label: "Drivers", path: `${Pathname.FLEET_MANAGEMENT}/${id}` },
          {
            label: driver.name,
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
            defaultValues={defaults as EditDriverFormValues}
            sections={formSections}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitLabel="Save Changes"
            cancelLabel="Cancel"
          />
        </div>
      </PageWrapper>
    </div>
  );
}
