import AddIcon from "@/assets/icons/AddIcon";
import { DataTable, type ExtendedColumnDef } from "@/component/data-table";
import PageWrapper from "@/component/PageWrapper";
import { TabsContent } from "@/component/ui/tabs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ─── Types ────────────────────────────────────────────────────────────────────

type TariffData = {
  id: string;
  name: string;
  dateCreated: string;
  updatedAt: string;
  updatedBy: string;
};

// ─── Columns ──────────────────────────────────────────────────────────────────

const columns: ExtendedColumnDef<TariffData, unknown>[] = [
  {
    accessorKey: "name",
    header: "Tariff Name",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="font-semibold text-sm text-secondary-600 underline cursor-pointer hover:text-opacity-80">
        {row.original.name}
      </span>
    ),
  },
  {
    accessorKey: "dateCreated",
    header: "Date Created",
    enableSorting: true,
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    enableSorting: true,
  },
  {
    accessorKey: "updatedBy",
    header: "Updated By",
    enableSorting: true,
  },
];

// ─── Dummy Data ───────────────────────────────────────────────────────────────

const dummyTariffs: TariffData[] = [
  { id: "1", name: "Zaptec tariff", dateCreated: "May 18, 2023 1:27:08 PM", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "standard client 12062025" },
  { id: "2", name: "Systematic services", dateCreated: "May 18, 2023 1:27:08 PM", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "admin" },
  { id: "3", name: "Systematic services", dateCreated: "May 18, 2023 1:27:08 PM", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "admin" },
  { id: "4", name: "Systematic services", dateCreated: "May 18, 2023 1:27:08 PM", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "admin" },
  { id: "5", name: "Systematic services", dateCreated: "May 18, 2023 1:27:08 PM", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "operation" },
  { id: "6", name: "Systematic services", dateCreated: "May 18, 2023 1:27:08 PM", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "admin" },
  { id: "7", name: "Systematic services", dateCreated: "May 18, 2023 1:27:08 PM", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "admin" },
];

// ─── Tabs Configuration ───────────────────────────────────────────────────────

const TABS = [
  { value: "tariff", label: "Tariff" },
  { value: "tax", label: "Tax" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function TariffList() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  return (
    <PageWrapper
      tabs={TABS}
      searchPlaceholder="Search Tariff"
      searchValue={search}
      onSearchChange={setSearch}
      onFilterClick={() => console.log("filter clicked")}
      actionLabel="Create Tariff"
      actionIcon={<AddIcon />}
      onActionClick={() => navigate("create")}
    >
      <TabsContent value="tariff">
        <DataTable
          columns={columns}
          data={dummyTariffs}
          search={search}
          isLink
          link={(row) => row.id}
        />
      </TabsContent>

      <TabsContent value="tax">
          <DataTable columns={columns} data={dummyTariffs} />
      </TabsContent>
    </PageWrapper>
  );
}
