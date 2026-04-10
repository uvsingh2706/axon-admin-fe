import type { RouteObject } from "react-router-dom";
import FleetManagementList from "../FleetManagmentList";
import FleetCreate from "../FleetCreate";
import FleetEdit from "../FleetEdit";
import FleetDetail from "../FleetDetail";




export const fleetRoutes: RouteObject[] = [
    {
        index: true,
        element: <FleetManagementList />
    },
    {
        path: "create",
        element: <FleetCreate />
    },
    {
        path: ':id',
        element: <FleetDetail/>

    },
    {
        path: ':id/edit',
        element: <FleetEdit/>
    }
]
    