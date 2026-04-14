import AddIcon from "@/assets/icons/AddIcon";
import CopyIcon from "@/assets/icons/CopyIcon";
import EditIcon from "@/assets/icons/EditIcon";
import { DataTable, type ExtendedColumnDef } from "@/component/data-table";
import PageWrapper from "@/component/PageWrapper";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type FleetData = {
  id: string;
  logo: string;
  organisationName: string;
  vehicleType: string;
  flatRate: string;
  email: string;
  contact: string;
  totalDrivers: string;
  totalVehicles: string;
};

const handleCopy = (text: string) => {
  navigator.clipboard.writeText(text);
};

const columns: ExtendedColumnDef<FleetData, unknown>[] = [
  {
    accessorKey: "logo",
    header: "Logo",
    cell: ({ row }) => (
      <img
        src={row.original.logo}
        alt="logo"
        className="w-10 h-10 rounded-md object-contain"
      />
    ),
  },
  {
    accessorKey: "organisationName",
    header: "Organisation Name",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="font-sans font-semibold text-[14px] leading-none text-secondary-600 underline cursor-pointer hover:text-opacity-80">
        {row.original.organisationName}
      </span>
    ),
  },
  {
    accessorKey: "vehicleType",
    header: "Vehicle Type",
  },
  {
    accessorKey: "flatRate",
    header: "Flat Rate",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "contact",
    header: "Contact",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span
          className="cursor-pointer flex items-center"
          onClick={() => handleCopy(row.original.contact)}
        >
          <CopyIcon className="w-4 h-4" />
        </span>
        <span>{row.original.contact}</span>
      </div>
    ),
  },
  {
    accessorKey: "totalDrivers",
    header: "Total Drivers",
  },
  {
    accessorKey: "totalVehicles",
    header: "Total Vehicles",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <span
        className="cursor-pointer flex items-center"
        onClick={() => console.log("Edit clicked for", row.original.id)}
      >
        <EditIcon className="w-4 h-4" />
      </span>
    ),
  },
];

export const dummyData: FleetData[] = [
  {
    id: "1",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png",
    organisationName: "Uber Private Ltd",
    vehicleType: "Trucks",
    flatRate: "₹12",
    email: "info.uber@uber.com",
    contact: "8721937813",
    totalDrivers: "134",
    totalVehicles: "3000",
  },
  {
    id: "2",
    logo: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/78/d7/63/78d76320-1df8-3aee-0508-be9abae924cd/AppIcon-0-0-1x_U007ephone-0-0-0-1-0-0-85-220.png/1200x630wa.png",
    organisationName: "Blue Smart Pvt. Ltd.",
    vehicleType: "Buses",
    flatRate: "₹12",
    email: "info@bluesmart.com",
    contact: "8721937813",
    totalDrivers: "98",
    totalVehicles: "1200",
  },
  {
    id: "3",
    logo: "https://www.svgrepo.com/show/303255/ola-cabs-logo.svg",
    organisationName: "Station 2",
    vehicleType: "3-Wheelers",
    flatRate: "₹12",
    email: "info.ola@ola.com",
    contact: "8721937813",
    totalDrivers: "76",
    totalVehicles: "800",
  },
  {
    id: "4",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIi382lTLbczOvcE-J7POXzEcmgQtqxI6r2g&s",
    organisationName: "Rapido Pvt. Ltd.",
    vehicleType: "Electric Cars",
    flatRate: "₹12",
    email: "info@rapido.com",
    contact: "8721937813",
    totalDrivers: "150",
    totalVehicles: "950",
  },
  {
    id: "5",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-JWeX3pOOeDI7R2NKD0Cwizf3_P6QoTJf_w&s",
    organisationName: "Yulu Pvt. Ltd",
    vehicleType: "Trucks",
    flatRate: "₹12",
    email: "info@yulu.com",
    contact: "8721937813",
    totalDrivers: "45",
    totalVehicles: "400",
  },
  {
    id: "6",
    logo: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
    organisationName: "Cab Rentals Services",
    vehicleType: "4-Wheelers",
    flatRate: "₹12",
    email: "rajeev@gmail.com",
    contact: "8721937813",
    totalDrivers: "60",
    totalVehicles: "500",
  },
];

function FleetManagementList() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  return (
    <PageWrapper
      searchPlaceholder="Search Fleet"
      searchValue={search}
      onSearchChange={setSearch}
      onFilterClick={() => console.log("filter clicked")}
      actionLabel="Add Fleet"
      actionIcon={<AddIcon />}
      onActionClick={() => navigate("create")}
      isTable={true}
    >
      <DataTable
        columns={columns}
        data={dummyData}
        search={search}
        isLink={true}
        link={(row) => row.id}
      />
    </PageWrapper>
  );
}

export default FleetManagementList;