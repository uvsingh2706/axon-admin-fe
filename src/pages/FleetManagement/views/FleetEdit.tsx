import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageWrapper from "@/component/PageWrapper";
import Breadcrumb from "@/component/Breadcrumb";
import { Pathname } from "@/utils/pathname";
import { DynamicForm } from "@/component/form/DynamicForm";
import ImagePlaceholderIcon from "@/assets/icons/ImagePlaceholderIcon";
import {
  editFleetSchema,
  fleetFormSections,
  type EditFleetFormValues,
} from "../config/fleet.form";
import { getFleetById, getFleetEditDefaultValues } from "../mocks/fleet.mock";
import type {
  FleetEditDefaultValues,
  FleetEditSubmitPayload,
  FleetFormLogoValue,
} from "../types/fleet.type";

export default function FleetEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fleet = getFleetById(id);
  const [formValues, setFormValues] = useState<FleetEditDefaultValues>(null);
  const [logo, setLogo] = useState<FleetFormLogoValue>(null);

  const formSectionsWithoutLogo = useMemo(
    () =>
      fleetFormSections.filter(
        (section) => !section.fields.some((field) => field.name === "logo")
      ),
    []
  );

  useEffect(() => {
    const defaults = getFleetEditDefaultValues(id);
    if (defaults) {
      setFormValues(defaults);
      setLogo(defaults.logo ?? null);
    }
  }, [id]);

  const handleSubmit = (data: EditFleetFormValues) => {
    const payload: FleetEditSubmitPayload = { ...data, logo };
    console.log("Form submitted", payload);
    navigate(`${Pathname.FLEET_MANAGEMENT}/${id}`);
  };

  const handleCancel = () => {
    navigate(`${Pathname.FLEET_MANAGEMENT}/${id}`);
  };

  if (!fleet || !formValues) {
    return (
      <div className="p-8 text-center text-text-500 subtitle-2-medium">
        Fleet not found.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Fleet Management", path: Pathname.FLEET_MANAGEMENT },
          { label: fleet.organisationName, path: `${Pathname.FLEET_MANAGEMENT}/${fleet.id}` },
          { label: "Edit" },
        ]}
      />

      <PageWrapper
        title="Edit Organization Details"
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
                    src={typeof logo === "string" ? logo : URL.createObjectURL(logo)}
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

          <DynamicForm<EditFleetFormValues>
            schema={editFleetSchema}
            defaultValues={formValues}
            sections={formSectionsWithoutLogo}
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
