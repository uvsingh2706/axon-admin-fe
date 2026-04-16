import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "@/component/Breadcrumb";
import PageWrapper from "@/component/PageWrapper";
import { DynamicForm } from "@/component/form/DynamicForm";
import { Pathname } from "@/utils/pathname";
import {
  editDriverSchema,
  driverEditFormSections,
  type EditDriverFormValues,
} from "../config/driver.form";
import { mockDriverList } from "../mocks/driver.mock";

export default function DriverEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const driver = mockDriverList.find((d) => d.id === id);

  const handleCancel = () => navigate(Pathname.USER_MANAGEMENT);

  const handleSubmit = (data: EditDriverFormValues) => {
    console.log("Edit Driver:", id, data);
    handleCancel();
  };

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
        <div className="mt-2">
          <DynamicForm<EditDriverFormValues>
            schema={editDriverSchema}
            defaultValues={{
              driverName: driver?.name ?? "",
              image: undefined,
              personalEmailId: driver?.email ?? "",
              phoneNumber: driver?.driverPhone ?? "",
              gender: "Male",
              driverId: driver?.id ?? "",
              licenseNumber: "-",
              licenseExpiryDate: "",
              organisationFleet: driver?.organisationName ?? "",
              vehicleId: "",
            }}
            onSubmit={handleSubmit}
            sections={driverEditFormSections}
            submitLabel="Save Changes"
            cancelLabel="Cancel"
            onCancel={handleCancel}
          />
        </div>
      </PageWrapper>
    </div>
  );
}

