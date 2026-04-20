import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "@/component/PageWrapper";
import Breadcrumb from "@/component/Breadcrumb";
import { Pathname } from "@/utils/pathname";
import { DynamicForm } from "@/component/form/DynamicForm";
import ImagePlaceholderIcon from "@/assets/icons/ImagePlaceholderIcon";
import {
  createFleetSchema,
  fleetFormSections,
  type CreateFleetFormValues,
} from "../config/fleet.form";
import type {
  FleetCreateSubmitPayload,
  FleetFormLogoValue,
} from "../types/fleet.type";
import { useCreateFleet } from "../services/Fleet.hooks";

export default function FleetCreate() {
  const navigate = useNavigate();
  const [logo, setLogo] = useState<FleetFormLogoValue>(null);
  const { mutate: createFleet, isPending } = useCreateFleet();

  const formSectionsWithoutLogo = useMemo(
    () =>
      fleetFormSections.filter(
        (section) => !section.fields.some((field) => field.name === "logo")
      ),
    []
  );

  const handleSubmit = (data: CreateFleetFormValues) => {
    // Map frontend keys to backend keys
    const payload: FleetCreateSubmitPayload = {
      name: data.name,
      email: data.email,
      contact_number: data.contact,
      vehicle_type: data.vehicleType,
      // Sending logo as a string (using the file name or a default if no file)
      logo: logo instanceof File ? logo.name : (typeof logo === "string" ? logo : ""),
    };
    
    console.log("Submitting payload:", payload);
    createFleet(payload);
  };


  const handleCancel = () => {
    navigate(Pathname.FLEET_MANAGEMENT);
  };

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Fleet Management", path: Pathname.FLEET_MANAGEMENT },
          { label: "Add Fleet" },
        ]}
      />

      <PageWrapper
        title="Add Fleet"
        showSearch={false}
        showFilter={false}
        titleClassName="heading-3-semibold"
        className="w-full"
      >
        <div className="mt-4 space-y-6 text-left">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-text-950">
              Organisation Logo
            </label>

            <div className="flex items-center gap-4">
              <div className="w-[71px] h-[71px] rounded-full flex items-center justify-center overflow-hidden">
                {logo ? (
                  <img
                    src={
                      typeof logo === "string" ? logo : URL.createObjectURL(logo)
                    }
                    alt="Organisation logo"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImagePlaceholderIcon className="w-full h-full" />
                )}
              </div>

              <label className="cursor-pointer">
                <span className="px-4 py-2 border rounded-md text-sm bg-white hover:bg-gray-50">
                  Upload
                </span>
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setLogo(file);
                  }}
                />
              </label>

              <span className="text-sm text-gray-500">PNG or JPG</span>
            </div>
          </div>

          <DynamicForm<CreateFleetFormValues>
            schema={createFleetSchema}
            sections={formSectionsWithoutLogo}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitLabel="Add Fleet"
            cancelLabel="Cancel"
            isSubmitting={isPending}
          />

        </div>
      </PageWrapper>
    </div>
  );
}
