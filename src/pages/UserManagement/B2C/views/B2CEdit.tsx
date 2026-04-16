import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "@/component/Breadcrumb";
import PageWrapper from "@/component/PageWrapper";
import { DynamicForm } from "@/component/form/DynamicForm";
import { Pathname } from "@/utils/pathname";
import {
  editB2CSchema,
  b2cEditFormSections,
  type EditB2CFormValues,
} from "../config/b2c.form";
import { mockB2CUsers } from "../mocks/b2c.mock";

export default function B2CEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = useMemo(() => mockB2CUsers.find((u) => u.id === id), [id]);

  const handleCancel = () =>
    navigate(`${Pathname.USER_MANAGEMENT}/b2c/${id}`);

  const handleSubmit = (data: EditB2CFormValues) => {
    console.log("Edit B2C User:", id, data);
    handleCancel();
  };

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "User Management", path: Pathname.USER_MANAGEMENT },
          { label: "B2C Users", path: Pathname.USER_MANAGEMENT },
          {
            label: user?.name ?? "User",
            path: `${Pathname.USER_MANAGEMENT}/b2c/${id}`,
          },
          { label: "Edit" },
        ]}
      />

      <PageWrapper
        title="Edit Details"
        showSearch={false}
        showFilter={false}
        titleClassName="heading-3-semibold"
        className="w-full"
      >
        <div className="mt-2">
          <DynamicForm
            schema={editB2CSchema}
            defaultValues={{
              driverName: user?.name ?? "",
              personalEmailId: user?.email ?? "",
              phoneNumber: user?.phoneNumber ?? "",
              location: user?.location ?? "",
              image: user?.avatarUrl ?? "",
            }}
            onSubmit={handleSubmit}
            sections={b2cEditFormSections}
            submitLabel="Save Changes"
            cancelLabel="Cancel"
            onCancel={handleCancel}
          />
        </div>
      </PageWrapper>
    </div>
  );
}
