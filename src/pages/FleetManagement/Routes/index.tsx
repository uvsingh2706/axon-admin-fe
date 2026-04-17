import type { RouteObject } from "react-router-dom";
import FleetCreate from "../views/FleetCreate";
import FleetEdit from "../views/FleetEdit";
import FleetDetail from "../views/FleetDetails";
import Vehicles from "../views/Vehicles";
import AddVehicles from "../views/Vehicles/views/AddVehicles";
import VehiclesDetails from "../views/Vehicles/views/VehiclesDetails";
import EditVehicles from "../views/Vehicles/views/EditVehicles";
import Drivers from "../views/Drivers";
import DriverDetails from "../views/Drivers/views/DriverDetails";
import CreateDrivers from "../views/Drivers/views/CreateDrivers";
import EditDrivers from "../views/Drivers/views/EditDrivers";
import { Can } from "@/rbac";
import { MODULE } from "@/rbac/modules";

function NoAccess() {
  return (
    <div className="p-8 text-center text-text-500 subtitle-2-medium">
      You do not have permission for this action.
    </div>
  );
}

export const fleetRoutes: RouteObject[] = [
    {
        path: "create",
        element: (
          <Can module={MODULE.FLEET_MANAGEMENT} action="create" fallback={<NoAccess />}>
            <FleetCreate />
          </Can>
        )
    },
    {
        path: ':id',
        element: (
          <Can module={MODULE.FLEET_MANAGEMENT} action="view" fallback={<NoAccess />}>
            <FleetDetail />
          </Can>
        )

    },
    {
        path: ':id/edit',
        element: (
          <Can module={MODULE.FLEET_MANAGEMENT} action="update" fallback={<NoAccess />}>
            <FleetEdit />
          </Can>
        )
    },
    
    {
        path: ":id/vehicles",
        element: (
          <Can module={MODULE.VEHICLE_MANAGEMENT} action="view" fallback={<NoAccess />}>
            <Vehicles />
          </Can>
        )
    },
    {
        path: ":id/vehicles/create",
        element: (
          <Can module={MODULE.VEHICLE_MANAGEMENT} action="create" fallback={<NoAccess />}>
            <AddVehicles />
          </Can>
        )
    },
    {
        path: ":id/vehicles/:vehicleId",
        element: (
          <Can module={MODULE.VEHICLE_MANAGEMENT} action="view" fallback={<NoAccess />}>
            <VehiclesDetails />
          </Can>
        )
    },
    {
        path: ":id/vehicles/:vehicleId/edit",
        element: (
          <Can module={MODULE.VEHICLE_MANAGEMENT} action="update" fallback={<NoAccess />}>
            <EditVehicles />
          </Can>
        )
    },
    {
        path: ":id/drivers",
        element: (
          <Can module={MODULE.VEHICLE_MANAGEMENT} action="view" fallback={<NoAccess />}>
            <Drivers />
          </Can>
        )
    },
    {
        path: ":id/drivers/create",
        element: (
          <Can module={MODULE.VEHICLE_MANAGEMENT} action="create" fallback={<NoAccess />}>
            <CreateDrivers />
          </Can>
        )
    },
    {
        path: ":id/drivers/:driverId",
        element: (
          <Can module={MODULE.VEHICLE_MANAGEMENT} action="view" fallback={<NoAccess />}>
            <DriverDetails />
          </Can>
        )
    },
    {
        path: ":id/drivers/:driverId/edit",
        element: (
          <Can module={MODULE.VEHICLE_MANAGEMENT} action="update" fallback={<NoAccess />}>
            <EditDrivers />
          </Can>
        )
    },
]
