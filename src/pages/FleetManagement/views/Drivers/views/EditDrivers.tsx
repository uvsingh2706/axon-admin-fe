import Breadcrumb from "@/component/Breadcrumb";
import PageWrapper from "@/component/PageWrapper";
import { Pathname } from "@/utils/pathname";
import { useParams } from "react-router-dom";
import { getFleetById } from "../../../mocks/fleet.mock";
import { getDriverById } from "../mocks/driver.mock";

export default function EditDrivers() {
  const { id, driverId } = useParams<{ id: string; driverId: string }>();
  const fleet = getFleetById(id);
  const driver = id && driverId ? getDriverById(id, driverId) : undefined;

  if (!fleet || !driver || !id || !driverId) {
    return <div className="p-8 text-center text-text-500 subtitle-2-medium">Driver not found.</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Fleet Management", path: Pathname.FLEET_MANAGEMENT },
          { label: fleet.organisationName, path: `${Pathname.FLEET_MANAGEMENT}/${id}` },
          { label: "Drivers", path: `${Pathname.FLEET_MANAGEMENT}/${id}` },
          { label: driver.name, path: `${Pathname.FLEET_MANAGEMENT}/${id}/drivers/${driverId}` },
          { label: "Edit" },
        ]}
      />

      <PageWrapper
        title="Edit Driver"
        showSearch={false}
        showFilter={false}
        titleClassName="heading-3-semibold"
        className="w-full"
      >
        <div className="h-40 flex flex-col items-center justify-center text-text-500 border-2 border-dashed border-secondary-00 rounded-xl bg-secondary-00/10">
          <span className="subtitle-2-medium">Edit action</span>
        </div>
      </PageWrapper>
    </div>
  );
}

