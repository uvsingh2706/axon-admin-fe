import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Breadcrumb from "@/component/Breadcrumb";
import { Pathname } from "@/utils/pathname";

// ─── Component ────────────────────────────────────────────────────────────────

export default function TariffCreate() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    value: "",
    serviceFee: "",
    tax: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API call to create tariff
    console.log("Create tariff:", form);
    navigate(Pathname.TARIFF_MANAGEMENT);
  };

  const handleCancel = () => {
    navigate(Pathname.TARIFF_MANAGEMENT);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Tariff Management", path: Pathname.TARIFF_MANAGEMENT },
          { label: "Create Tariff" },
        ]}
      />

      {/* Form Card */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="heading-4-semibold text-text-950 mb-6">Create Tariff</h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex flex-col gap-1.5">
              <label className="subtitle-3-medium text-text-700">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Systematic services"
                className="h-12 px-4 border border-text-200 rounded-lg subtitle-3-regular text-text-950 placeholder:text-text-400 focus:outline-none focus:border-primary-700 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="subtitle-3-medium text-text-700">
                Value (per Kwh)
              </label>
              <input
                type="text"
                value={form.value}
                onChange={(e) => handleChange("value", e.target.value)}
                placeholder="₹23.25"
                className="h-12 px-4 border border-text-200 rounded-lg subtitle-3-regular text-text-950 placeholder:text-text-400 focus:outline-none focus:border-primary-700 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="subtitle-3-medium text-text-700">
                Service Fee
              </label>
              <input
                type="text"
                value={form.serviceFee}
                onChange={(e) => handleChange("serviceFee", e.target.value)}
                placeholder="₹12"
                className="h-12 px-4 border border-text-200 rounded-lg subtitle-3-regular text-text-950 placeholder:text-text-400 focus:outline-none focus:border-primary-700 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="subtitle-3-medium text-text-700">Tax</label>
              <select
                value={form.tax}
                onChange={(e) => handleChange("tax", e.target.value)}
                className="h-12 px-4 border border-text-200 rounded-lg subtitle-3-regular text-text-950 focus:outline-none focus:border-primary-700 transition-colors appearance-none bg-white cursor-pointer"
              >
                <option value="" disabled>
                  Select Type
                </option>
                <option value="tax-type-1">Tax type 1</option>
                <option value="tax-type-2">Tax type 2</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-text-100">
            <button
              type="button"
              onClick={handleCancel}
              className="h-10 px-6 rounded-lg border border-primary-700 text-primary-700 subtitle-3-semibold hover:bg-primary-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-10 px-6 rounded-lg bg-text-950 text-white subtitle-3-semibold hover:bg-text-800 transition-colors cursor-pointer"
            >
              Create Tariff
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
