import type { RouteObject } from "react-router-dom";
import FleetCreate from "../views/FleetCreate";
import FleetEdit from "../views/FleetEdit";
import FleetDetail from "../views/FleetDetails";
import Vehicles from "../views/Vehicles";
import AddVehicles from "../views/Vehicles/views/AddVehicles";
import VehiclesDetails from "../views/Vehicles/views/VehiclesDetails";
import EditVehicles from "../views/Vehicles/views/EditVehicles";


export const fleetRoutes: RouteObject[] = [
    {
        path: "create",
        element: <FleetCreate />
    },
    {
        path: ':id',
        element: <FleetDetail />

    },
    {
        path: ':id/edit',
        element: <FleetEdit />
    },
    
    {
        path: ":id/vehicles",
        element: <Vehicles />
    },
    {
        path: ":id/vehicles/create",
        element: <AddVehicles />
    },
    {
        path: ":id/vehicles/:vehicleId",
        element: <VehiclesDetails />
    },
    {
        path: ":id/vehicles/:vehicleId/edit",
        element: <EditVehicles />
    },
]
