import { useNavigate } from "react-router-dom";
import Breadcrumb from "@/component/Breadcrumb";
import { DynamicForm } from "@/component/form/DynamicForm";
import PageWrapper from "@/component/PageWrapper";
import { Pathname } from "@/utils/pathname";
import { createFleetSchema, fleetFormSections } from "./FleetConfig";
import type { CreateFleetFormValues } from "./FleetConfig";

export default function FleetCreate() {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(Pathname.FLEET_MANAGEMENT);
  };

  const handleSubmit = (data: CreateFleetFormValues) => {
    console.log("Create fleet submitted:", data);
    // TODO: Add actual API call here
    navigate(Pathname.FLEET_MANAGEMENT);
  };

  return (
    <div className="flex flex-col gap-4">
        <Breadcrumb
        items={[
            {
                label: "Fleet Management",
                path: Pathname.FLEET_MANAGEMENT
            },
            {
                label: "Create Fleet",
            }
        ]}
        />
        <PageWrapper
        title="Create Fleet"
        showSearch={false}
        showFilter={false}
        titleClassName="heading-3-semibold"
        className="w-full"
        >
            <div className="mt-2">
                <DynamicForm
                  schema={createFleetSchema}
                  onSubmit={handleSubmit}
                  sections={fleetFormSections}
                  submitLabel="Create Fleet"
                  cancelLabel="Cancel"
                  onCancel={handleCancel}
                />
            </div>
        </PageWrapper>
    </div>
  );
}