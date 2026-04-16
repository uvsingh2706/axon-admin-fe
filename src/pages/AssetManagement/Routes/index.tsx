import type { RouteObject } from "react-router-dom";
import { PointCreate, PointDetails, PointEdit } from "../ChargingPoints";
import { StationCreate, StationDetails, StationEdit } from "../ChargingStations";
import { Can } from "@/rbac";
import { MODULE } from "@/rbac/modules";

function NoAccess() {
  return (
    <div className="p-8 text-center text-text-500 subtitle-2-medium">
      You do not have permission for this action.
    </div>
  );
}

export const assetRoutes: RouteObject[] = [
  {
    path: "create-station",
    element: (
      <Can module={MODULE.CHARGING_STATION} action="create" fallback={<NoAccess />}>
        <StationCreate />
      </Can>
    ),
  },
  {
    path: "charging-stations/:id",
    element: (
      <Can module={MODULE.CHARGING_STATION} action="view" fallback={<NoAccess />}>
        <StationDetails />
      </Can>
    ),
  },
  {
    path: "charging-stations/:id/edit",
    element: (
      <Can module={MODULE.CHARGING_STATION} action="update" fallback={<NoAccess />}>
        <StationEdit />
      </Can>
    ),
  },
  {
    path: "create-point",
    element: (
      <Can module={MODULE.CHARGING_POINT} action="create" fallback={<NoAccess />}>
        <PointCreate />
      </Can>
    ),
  },
  {
    path: "charging-points/:id",
    element: (
      <Can module={MODULE.CHARGING_POINT} action="view" fallback={<NoAccess />}>
        <PointDetails />
      </Can>
    ),
  },
  {
    path: "charging-points/:id/edit",
    element: (
      <Can module={MODULE.CHARGING_POINT} action="update" fallback={<NoAccess />}>
        <PointEdit />
      </Can>
    ),
  },
];