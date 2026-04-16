import { useNavigate } from "react-router-dom";
import Breadcrumb from "@/component/Breadcrumb";
import PageWrapper from "@/component/PageWrapper";
import { DynamicForm } from "@/component/form/DynamicForm";
import { Pathname } from "@/utils/pathname";
import {
  createB2CSchema,
  b2cCreateFormSections,
  type CreateB2CFormValues,
} from "../config/b2c.form";

export default function B2CCreate() {
  const navigate = useNavigate();

  const handleCancel = () => navigate(Pathname.USER_MANAGEMENT);

  const handleSubmit = (data: CreateB2CFormValues) => {
    console.log("Create B2C User:", data);
    handleCancel();
  };

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "User Management", path: Pathname.USER_MANAGEMENT },
          { label: "Create B2C User" },
        ]}
      />

      <PageWrapper
        title="Create B2C User"
        showSearch={false}
        showFilter={false}
        titleClassName="heading-3-semibold"
        className="w-full"
      >
        <div className="mt-2">
          <DynamicForm
            schema={createB2CSchema}
            defaultValues={{
              driverName: "",
              personalEmailId: "",
              phoneNumber: "",
              location: "",
              image: "",
            }}
            onSubmit={handleSubmit}
            sections={b2cCreateFormSections}
            submitLabel="Create User"
            cancelLabel="Cancel"
            onCancel={handleCancel}
          />
        </div>
      </PageWrapper>
    </div>
  );
}

