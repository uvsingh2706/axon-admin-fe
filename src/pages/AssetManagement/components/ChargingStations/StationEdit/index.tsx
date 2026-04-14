import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "@/component/Breadcrumb";
import PageWrapper from "@/component/PageWrapper";
import { DynamicForm } from "@/component/form/DynamicForm";
import { Pathname } from "@/utils/pathname";
import { editStationSchema, stationEditFormSections } from "./StationEditConfig";
import type { EditStationFormValues } from "./StationEditConfig";

// ─── Dummy data lookup (matching StationDetails structure) ──────────────────
const STATION_MAP: Record<string, any> = {
  "CS-001": {
    name: "My Home Tarkshya",
    sessions: "4",
    revenue: "₹1,200",
    energy: "1.75",
    address: "Sector 15, Petrol Pump Station",
    addressLine2: "-",
    pincode: "110015",
    city: "new-delhi",
    state: "delhi",
    latLng: "28.6139, 77.2090",
    commissionOn: "2021-06-26",
    areaManager: {
      name: "Rahul Sharma",
      email: "rahul123@gmail.com",
      phone: "+91 98765 43210"
    },
    onSiteExecutive: {
      name: "Arjun Mehta",
      email: "arjun123@gmail.com",
      phone: "+91 87 0008 6088"
    },
    energyCapacity: {
      solar: "50 KWp",
      bess: "100 KWh",
      nonSolar: "100 KW",
      totalCapacity: "100 KW",
      totalLoad: "100 KW"
    }
  }
};

export default function StationEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // For demonstration, default to "CS-001" if ID is not found
  const stationId = id && STATION_MAP[id] ? id : "CS-001";
  const station = STATION_MAP[stationId];

  const [formValues, setFormValues] = useState<EditStationFormValues | null>(null);

  useEffect(() => {
    if (station) {
      const [lat, lng] = (station.latLng || "").split(",").map((s: string) => s.trim());
      
      setFormValues({
        stationName: station.name,
        stationImage: null, // Image typically handled separately/requires manual re-upload or showing current
        addressLine1: station.address,
        addressLine2: station.addressLine2 === "-" ? "" : station.addressLine2,
        pincode: station.pincode,
        city: station.city,
        state: station.state,
        latitude: lat || "",
        longitude: lng || "",
        commissionOn: station.commissionOn,
        supportPersonName: station.areaManager.name,
        contactNumber: station.areaManager.phone,
        emailId: station.areaManager.email,
        solar: station.energyCapacity.solar,
        bess: station.energyCapacity.bess,
        nonSolarGeneration: station.energyCapacity.nonSolar,
        totalChargingCapacity: station.energyCapacity.totalCapacity,
        totalOnSiteLoad: station.energyCapacity.totalLoad,
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
          { label: station.name, path: `${Pathname.ASSET_MANAGEMENT}/charging-stations/${stationId}` },
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
