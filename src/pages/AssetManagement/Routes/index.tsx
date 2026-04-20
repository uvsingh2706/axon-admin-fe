import type { RouteObject } from "react-router-dom";
import { PointCreate, PointDetails, PointEdit } from "../ChargingPoints";
import { StationCreate, StationDetails, StationEdit } from "../ChargingStations";
import ChargergerSpecificatoins from "../ChargerSpecifications";
import ModelCreate from "../ChargerSpecifications/Model/views/ModelCreate";
import ModelDetails from "../ChargerSpecifications/Model/views/ModelDetails";
import ModelEdit from "../ChargerSpecifications/Model/views/ModelEdit";
import ConnectorCreate from "../ChargerSpecifications/Connector/views/ConnectorCreate";
import ConnectorDetails from "../ChargerSpecifications/Connector/views/ConnectorDetails";
import ConnectorEdit from "../ChargerSpecifications/Connector/views/ConnectorEdit";
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
  {
    path: 'charger-specifications',
    element: (
      <Can module={MODULE.CHARGER_SPECIFICATION} action="view" fallback={<NoAccess />}>
        <ChargergerSpecificatoins/>
      </Can>
    )
  },
  {
    path: 'charger-specifications/model/create',
    element: (
      <Can module={MODULE.CHARGER_SPECIFICATION} action="create" fallback={<NoAccess />}>
        <ModelCreate />
      </Can>
    )
  },
  {
    path: 'charger-specifications/model/:id',
    element: (
      <Can module={MODULE.CHARGER_SPECIFICATION} action="view" fallback={<NoAccess />}>
        <ModelDetails />
      </Can>
    )
  },
  {
    path: 'charger-specifications/model/:id/edit',
    element: (
      <Can module={MODULE.CHARGER_SPECIFICATION} action="update" fallback={<NoAccess />}>
        <ModelEdit />
      </Can>
    )
  },
  {
    path: 'charger-specifications/connector/create',
    element: (
      <Can module={MODULE.CHARGER_SPECIFICATION} action="create" fallback={<NoAccess />}>
        <ConnectorCreate />
      </Can>
    )
  },
  {
    path: 'charger-specifications/connector/:id',
    element: (
      <Can module={MODULE.CHARGER_SPECIFICATION} action="view" fallback={<NoAccess />}>
        <ConnectorDetails />
      </Can>
    )
  },
  {
    path: 'charger-specifications/connector/:id/edit',
    element: (
      <Can module={MODULE.CHARGER_SPECIFICATION} action="update" fallback={<NoAccess />}>
        <ConnectorEdit />
      </Can>
    )
  }
];