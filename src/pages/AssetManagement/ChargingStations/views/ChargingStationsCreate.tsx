import { useNavigate } from "react-router-dom";
import PageWrapper from "@/component/PageWrapper";
import Breadcrumb from "@/component/Breadcrumb";
import { Pathname } from "@/utils/pathname";
import { DynamicForm } from "@/component/form/DynamicForm";
import {
  createStationSchema,
  stationCreateFormSections,
  type CreateStationFormValues,
} from "../config/station.form";
import { useCreateStation } from "../services/stations.hooks";
import { toast } from "sonner";

export default function StationCreate() {
  const navigate = useNavigate();
  const { mutateAsync: createStation, isPending: isCreating } = useCreateStation();

  const handleSubmit = async (data: CreateStationFormValues) => {
    try {
      await createStation({
        name: data.stationName,
        firstStreet: data.addressLine1,
        secondStreet: data.addressLine2 || "",
        // image: data.stationImage,
        city: data.city,
        state: data.state,
        pinCode: Number(data.pincode),
        latitude: Number(data.latitude),
        longitude: Number(data.longitude),
        commissionedOn: data.commissionOn,
        // supportPersonImage: data.supportPersonImage,
        supportPersonName: data.supportPersonName,
        supportPersonNumber: Number(data.contactNumber),
        supportPersonEmail: data.emailId,
        solarPanel: data.solar,
        bess: data.bess,
        nonSolarGeneration: data.nonSolarGeneration,
        chargingCapacity: data.totalChargingCapacity,
        totalLoad: data.totalOnSiteLoad,
        isActive: true,
      });
      toast.success("Station Created", { description: "The charging station has been added successfully." });
      navigate(Pathname.ASSET_MANAGEMENT);
    } catch (error) {
      toast.error("Failed to Create", { description: "An error occurred while creating the station." });
      console.error(error);
    }
  };

  const handleCancel = () => {
    navigate(Pathname.ASSET_MANAGEMENT);
  };

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Asset Management", path: Pathname.ASSET_MANAGEMENT },
          { label: "Charging Stations", path: `${Pathname.ASSET_MANAGEMENT}/charging-stations` },
          { label: "Add Station" },
        ]}
      />

      <PageWrapper
        isChargerSpecifications={false}
        title="Add Station"
        showSearch={false}
        showFilter={false}
        titleClassName="heading-3-semibold"
        className="w-full"
      >
        <div className="mt-2 text-left">
          <DynamicForm<CreateStationFormValues>
            schema={createStationSchema}
            sections={stationCreateFormSections}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitLabel={isCreating ? "Creating..." : "Add Station"}
            cancelLabel="Cancel"
          />
        </div>
      </PageWrapper>
    </div>
  );
}
