import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "@/component/Breadcrumb";
import PageWrapper from "@/component/PageWrapper";
import { DynamicForm } from "@/component/form/DynamicForm";
import { Pathname } from "@/utils/pathname";
import {
  editStationSchema,
  stationEditFormSections,
  type EditStationFormValues,
} from "../config/station.form";
import { useStationById, useUpdateStation } from "../services/stations.hooks";
import { toast } from "sonner";

export default function StationEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const stateStation = location.state?.station;

  const { data: stationRes, isLoading } = useStationById(id || "", !stateStation && !!id);
  const station = stateStation || stationRes?.data;
  const { mutateAsync: updateStation, isPending: isUpdating } = useUpdateStation();

  const [formValues, setFormValues] = useState<EditStationFormValues | null>(null);

  useEffect(() => {
    if (station) {
      setFormValues({
        stationName: station.name,
        stationImage: undefined,
        addressLine1: station.firstStreet,
        addressLine2: station.secondStreet || "",
        pincode: station.pinCode?.toString(),
        city: station.city,
        state: station.state,
        latitude: station.latitude?.toString() || "",
        longitude: station.longitude?.toString() || "",
        commissionOn: station.commissionedOn,
        supportPersonName: station.supportPersonName,
        contactNumber: station.supportPersonNumber,
        emailId: station.supportPersonEmail,
        supportImage: undefined,
        solar: station.solarPanel,
        bess: station.bess,
        nonSolarGeneration: station.nonSolarGeneration,
        totalChargingCapacity: station.chargingCapacity,
        totalOnSiteLoad: station.totalLoad,
      });
    }
  }, [station]);

  const handleSubmit = async (data: EditStationFormValues) => {
    if (!id || isUpdating) return;
    try {
      await updateStation({
        id,
        data: {
          name: data.stationName,
          // image: data.stationImage,
          firstStreet: data.addressLine1,
          secondStreet: data.addressLine2 || "",
          city: data.city,
          state: data.state,
          pinCode: Number(data.pincode),
          latitude: Number(data.latitude),
          longitude: Number(data.longitude),
          commissionedOn: data.commissionOn,
          // supportPersonImage: data.supportImage,
          supportPersonName: data.supportPersonName,
          supportPersonNumber: Number(data.contactNumber),
          supportPersonEmail: data.emailId,
          solarPanel: data.solar,
          bess: data.bess,
          nonSolarGeneration: data.nonSolarGeneration,
          chargingCapacity: data.totalChargingCapacity,
          totalLoad: data.totalOnSiteLoad,
          isActive: true,
        },
      });
      toast.success("Station Updated", { description: "The charging station has been updated successfully." });
      navigate(`${Pathname.ASSET_MANAGEMENT}/charging-stations/${id}`);
    } catch (error) {
      toast.error("Failed to Update", { description: "An error occurred while updating the station." });
      console.error(error);
    }
  };

  const handleCancel = () => {
    navigate(`${Pathname.ASSET_MANAGEMENT}/charging-stations/${id}`);
  };

  if (isLoading) {
    return <div className="p-8 text-center text-text-500 subtitle-2-medium">Loading...</div>;
  }

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
          { label: "Charging Stations", path: `${Pathname.ASSET_MANAGEMENT}/charging-stations` },
          { label: station.name, path: `${Pathname.ASSET_MANAGEMENT}/charging-stations/${id}` },
          { label: "Edit" },
        ]}
      />

      <PageWrapper
        title="Edit Charging Station"
        isChargerSpecifications={false}
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
            submitLabel={isUpdating ? "Saving..." : "Save Changes"}
            cancelLabel="Cancel"
            onCancel={handleCancel}
          />
        </div>
      </PageWrapper>
    </div>
  );
}
