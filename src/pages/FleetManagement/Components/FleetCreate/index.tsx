
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "@/component/Breadcrumb";
import { DynamicForm } from "@/component/form/DynamicForm";
import PageWrapper from "@/component/PageWrapper";
import { Pathname } from "@/utils/pathname";
import { DeleteIcon } from "@/assets/icons";
import ImagePlaceholderIcon from "@/assets/icons/ImagePlaceholderIcon";
import {
  createFleetSchema,
  fleetFormSections,
} from "./FleetConfig";
import type { CreateFleetFormValues } from "./FleetConfig";

export default function FleetCreate() {
  const navigate = useNavigate();

  //  Local state for logo (since DynamicForm not handling it)
  const [logo, setLogo] = useState<File | null>(null);

  const handleCancel = () => {
    navigate(Pathname.FLEET_MANAGEMENT);
  };

  const handleSubmit = (data: CreateFleetFormValues) => {
    const finalData = {
      ...data,
      logo,
    };

    console.log("Create fleet submitted:", finalData);

    // TODO: API call here

    navigate(Pathname.FLEET_MANAGEMENT);
  };

  return (
    <div className="flex flex-col gap-4">
      {/*  Breadcrumb */}
      <Breadcrumb
        items={[
          {
            label: "Fleet Management",
            path: Pathname.FLEET_MANAGEMENT,
          },
          {
            label: "Add Fleet",
          },
        ]}
      />

      {/*  Page Wrapper */}
      <PageWrapper
        title="Add Fleet"
        showSearch={false}
        showFilter={false}
        titleClassName="heading-3-semibold"
        className="w-full"
      >
        <div className="mt-4 space-y-6">

          {/*  LOGO UPLOAD (Custom UI like image) */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-text-950">
              Organisation Logo

            </label>

            <div className="flex items-center gap-4">
              {/* Circle Preview */}
              <div className="w-[71px] h-[71px] rounded-full flex items-center justify-center overflow-hidden">
                {logo ? (
                  <img
                    src={URL.createObjectURL(logo)}
                    alt="logo"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImagePlaceholderIcon className="w-full h-full" />
                )}
              </div>

              {/* Conditional UI */}
              {logo ? (
                <div className="flex items-center gap-4">
                  {/* Remove */}
                  <button
                    className="flex items-center gap-1 text-sm text-text-700 hover:text-danger"
                    onClick={() => setLogo(null)}
                  >
                    <DeleteIcon className="w-4 h-4" />
                    Remove
                  </button>

                  {/* Replace */}
                  <label className="cursor-pointer">
                    <span className="px-4 py-2 border rounded-md text-sm bg-white hover:bg-gray-50">
                      Replace
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
                </div>
              ) : (
                <>
                  {/* Upload */}
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

                  <span className="text-sm text-gray-500">
                    PNG or JPG
                  </span>
                </>
              )}
            </div>
          </div>

          {/* 🔹 Dynamic Form */}
          <DynamicForm
            schema={createFleetSchema}
            sections={fleetFormSections}
            onSubmit={handleSubmit}
            submitLabel="Save"
            cancelLabel="Cancel"
            onCancel={handleCancel}
          />
        </div>
      </PageWrapper>
    </div>
  );
}