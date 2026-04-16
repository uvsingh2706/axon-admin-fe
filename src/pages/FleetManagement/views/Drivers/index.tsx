import AddIcon from "@/assets/icons/AddIcon";
import Breadcrumb from "@/component/Breadcrumb";
import CsvModal from "@/component/CsvModal";
import PageWrapper from "@/component/PageWrapper";
import { Button } from "@/component/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/component/ui/popover";
import { TabsContent } from "@/component/ui/tabs";
import { cn } from "@/lib/utils";
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
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const fleet = getFleetById(id);

  const handleAddNew = () => {
    setPopoverOpen(false);
    navigate(`${Pathname.FLEET_MANAGEMENT}/${id}/drivers/create`);
  };

  const handleOpenImportModal = () => {
    setPopoverOpen(false);
    setIsImportModalOpen(true);
  };

  if (!fleet || !id) {
    return (
      <div className="p-8 text-center text-text-500 subtitle-2-medium">
        Fleet not found.
      </div>
    );
  }

  const addDriverTrigger = (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="primary"
          isIcon={<AddIcon />}
          onClick={() => setPopoverOpen((prev) => !prev)}
        >
          {DRIVERS_ACTION_LABEL}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-52 p-2 rounded-xl gap-0"
      >
        <button
          type="button"
          className={cn(
            "flex items-center font-semibold gap-3 w-full px-4 py-3 rounded-lg subtitle-3-medium text-text-700 hover:bg-secondary-00 transition-colors cursor-pointer"
          )}
          onClick={handleAddNew}
        >
          Add New
        </button>
        <button
          type="button"
          className={cn(
            "flex items-center font-semibold gap-3 w-full px-4 py-3 rounded-lg subtitle-3-medium text-text-700 hover:bg-secondary-00 transition-colors cursor-pointer"

          )}
          onClick={handleOpenImportModal}
        >
          Import From CSV Or xlsx
        </button>
      </PopoverContent>
    </Popover>
  );

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
        headerActions={addDriverTrigger}
        isTable={true}
        isSearchRight={true}
        className="w-full"
      >
        <DriverList search={search} fleetId={id} />
      </PageWrapper>

      <CsvModal
        open={isImportModalOpen}
        onOpenChange={setIsImportModalOpen}
        title="Add Drivers"
        description="Import from CSV or xlsx"
      />
    </div>
  );

  if (embedded) {
    return <TabsContent value="drivers">{content}</TabsContent>;
  }

  return content;
}
