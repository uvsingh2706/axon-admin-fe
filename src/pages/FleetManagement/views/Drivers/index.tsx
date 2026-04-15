import AddIcon from "@/assets/icons/AddIcon";
import Breadcrumb from "@/component/Breadcrumb";
import PageWrapper from "@/component/PageWrapper";
import { TabsContent } from "@/component/ui/tabs";
import { Pathname } from "@/utils/pathname";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFleetById } from "../../mocks/fleet.mock";
import { DRIVERS_ACTION_LABEL, DRIVERS_SEARCH_PLACEHOLDER } from "./constant";
import DriverList from "./views/DriverList";

type DriversProps = {
  fleetId?: string;
  embedded?: boolean;
};

export default function Drivers({ fleetId, embedded = false }: DriversProps) {
  const { id: routeFleetId } = useParams<{ id: string }>();
  const id = fleetId ?? routeFleetId;
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  // const [isOpen, setIsOpen] = useState(false);

  const fleet = getFleetById(id);

  // const handleAddDriverClick = () => {
  //       setIsOpen(!isOpen);

  //       if(addnew){
  //               navigate(`${Pathname.FLEET_MANAGEMENT}/${id}/drivers/create`);

  //       }
  //       else {
  //         //openmodal
  //       }
  
  // }

  if (!fleet || !id) {
    return (
      <div className="p-8 text-center text-text-500 subtitle-2-medium">
        Fleet not found.
      </div>
    );
  }

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

      <PageWrapper
        title="Drivers Overview"
        titleClassName="heading-3-semibold"
        searchValue={search}
        searchPlaceholder={DRIVERS_SEARCH_PLACEHOLDER}
        onSearchChange={setSearch}
        onFilterClick={() => console.log("filter clicked")}
        actionIcon={<AddIcon />}
        actionLabel={DRIVERS_ACTION_LABEL}
        onActionClick={() => navigate(`${Pathname.FLEET_MANAGEMENT}/${id}/drivers/create`)}
        isTable={true}
        isSearchRight={true}
        className="w-full"
      >
        <DriverList search={search} fleetId={id} />
      </PageWrapper>
    </div>
  );
  


  if (embedded) {
    return <TabsContent value="drivers">{content}</TabsContent>;
  }

  return content;
}
