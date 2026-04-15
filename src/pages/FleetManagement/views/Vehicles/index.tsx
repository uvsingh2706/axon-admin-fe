import CarIcon from "@/assets/icons/CarIcon";
import SettingIcon from "@/assets/icons/SettingIcon";
import StoryIcon from "@/assets/icons/StoryIcon";
import AddIcon from "@/assets/icons/AddIcon";
import PageWrapper from "@/component/PageWrapper";
import { Pathname } from "@/utils/pathname";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "@/component/Breadcrumb";
import { getFleetById } from "../../mocks/fleet.mock";
import { getVehiclesByFleetId, mockVehicleStatsByFleetId } from "./mocks/vehicles.mock";
import type { VehicleSummaryStats } from "./types/vehicle.type";
import { TabsContent } from "@/component/ui/tabs";
import VehiclesList from "./views/VehiclesList"

function VehicleStatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl border border-text-100 p-5 flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <span className="subtitle-3-regular text-text-500">{title}</span>
        <span className="heading-2-semibold text-text-950">{value}</span>
      </div>
      <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
        {icon}
      </div>
    </div>
  );
}

type VehiclesProps = {
  fleetId?: string;
  embedded?: boolean;
};

export default function Vehicles({ fleetId, embedded = false }: VehiclesProps) {
  const { id: routeFleetId } = useParams<{ id: string }>();
  const id = fleetId ?? routeFleetId;
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const fleet = getFleetById(id);

  if (!fleet || !id) {
    return <div className="p-8 text-center text-text-500 subtitle-2-medium">Fleet not found.</div>;
  }

  const vehicles = useMemo(() => getVehiclesByFleetId(id), [id]);

  const stats: VehicleSummaryStats = mockVehicleStatsByFleetId[id] ?? {
    totalVehicles: String(vehicles.length),
    activeInUse: "0",
    underMaintenance: "0",
  };

  const content = (
    <div className="flex flex-col gap-4">
      {!embedded && (
        <Breadcrumb
          items={[
            { label: "Fleet Management", path: Pathname.FLEET_MANAGEMENT },
            { label: fleet.organisationName, path: `${Pathname.FLEET_MANAGEMENT}/${id}` },
          ]}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <VehicleStatCard
          title="Total Vehicles"
          value={stats.totalVehicles}
          icon={<CarIcon className="w-5 h-5 text-primary-600" />}
        />
        <VehicleStatCard
          title="Active In Use"
          value={stats.activeInUse}
          icon={<StoryIcon className="w-5 h-5 text-primary-600" />}
        />
        <VehicleStatCard
          title="Under maintenance"
          value={stats.underMaintenance}
          icon={<SettingIcon className="w-5 h-5 text-primary-600" />}
        />
      </div>

      <PageWrapper
        title="Vehicles Overview"
        titleClassName="heading-3-semibold"
        searchValue={search}
        searchPlaceholder="Search Vehicle"
        onSearchChange={setSearch}
        onFilterClick={() => console.log("filter clicked")}
        actionIcon={<AddIcon />}
        actionLabel="Add Vehicle"
        onActionClick={() => navigate(`${Pathname.FLEET_MANAGEMENT}/${id}/vehicles/create`)}
        isTable={true}
        isSearchRight={true}
      >
        <VehiclesList search={search} />
      </PageWrapper>
    </div>
  );

  if (embedded) {
    return <TabsContent value="vehicles">{content}</TabsContent>;
  }

  return content;
}
