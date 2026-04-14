import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "@/component/Breadcrumb";
import PageWrapper from "@/component/PageWrapper";
import { DynamicForm } from "@/component/form/DynamicForm";
import { Pathname } from "@/utils/pathname";
import {
  editStationSchema,
  stationEditFormSections,
  type EditStationFormValues,
} from "../config/station.form";
import { mockStationEditById } from "../mocks/station.mock";

export default function StationEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // For demonstration, default to "CS-001" if ID is not found
  const stationId = id && mockStationEditById[id] ? id : "CS-001";
  const station = mockStationEditById[stationId];

  const [formValues, setFormValues] = useState<EditStationFormValues | null>(null);

  useEffect(() => {
    if (station) {
      setFormValues({
        stationName: station.stationName,
        stationImage: station.stationImage,
        addressLine1: station.addressLine1,
        addressLine2: station.addressLine2,
        pincode: station.pincode,
        city: station.city,
        state: station.state,
        latitude: station.latitude,
        longitude: station.longitude,
        commissionOn: station.commissionOn,
        supportPersonName: station.supportPersonName,
        contactNumber: station.contactNumber,
        emailId: station.emailId,
        solar: station.solar,
        bess: station.bess,
        nonSolarGeneration: station.nonSolarGeneration,
        totalChargingCapacity: station.totalChargingCapacity,
        totalOnSiteLoad: station.totalOnSiteLoad,
      });
    }
  }, [station]);

  const handleSubmit = (data: EditStationFormValues) => {
    console.log("Update station:", stationId, data);
    // TODO: API call to update station
    navigate(`${Pathname.ASSET_MANAGEMENT}/charging-stations/${stationId}`);
  };

  const handleCancel = () => {
    navigate(`${Pathname.ASSET_MANAGEMENT}/charging-stations/${stationId}`);
  };

  if (!station || !formValues) {
    return (
      <div className="p-8 text-center text-text-500 subtitle-2-medium">
        Station not found.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Asset Management", path: Pathname.ASSET_MANAGEMENT },
          { label: "Charging Stations", path: Pathname.ASSET_MANAGEMENT },
          { label: station.stationName, path: `${Pathname.ASSET_MANAGEMENT}/charging-stations/${stationId}` },
          { label: "Edit" },
        ]}
      />

      <PageWrapper
        title="Edit Charging Station"
        showSearch={false}
        showFilter={false}
        titleClassName="heading-3-semibold"
        className="w-full"
      >
        <div className="mt-2">
          <DynamicForm<EditStationFormValues>
            schema={editStationSchema}
            defaultValues={formValues}
            onSubmit={handleSubmit}
            sections={stationEditFormSections}
            submitLabel="Save Changes"
            cancelLabel="Cancel"
            onCancel={handleCancel}
          />
        </div>
      </PageWrapper>
    </div>
  );
}
