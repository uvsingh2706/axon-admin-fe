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

export default function DriverCreate() {
  const navigate = useNavigate();

  const handleCancel = () => navigate(Pathname.USER_MANAGEMENT);

  const handleSubmit = (data: CreateDriverFormValues) => {
    console.log("Create Driver:", data);
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
            defaultValues={{
              driverName: "",
              image: undefined,
              personalEmailId: "",
              phoneNumber: "",
              gender: "Male",
              driverId: "",
              licenseNumber: "",
              licenseExpiryDate: "",
              organisationFleet: "",
              vehicleId: "",
            }}
            onSubmit={handleSubmit}
            sections={driverCreateFormSections}
            submitLabel="Create Driver"
            cancelLabel="Cancel"
            onCancel={handleCancel}
          />
        </div>
      </PageWrapper>
    </div>
  );
}

