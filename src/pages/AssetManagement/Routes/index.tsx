import type { RouteObject } from "react-router-dom";
import { PointCreate, PointDetails, PointEdit } from "../ChargingPoints";
import { StationCreate, StationDetails, StationEdit } from "../ChargingStations";

export const assetRoutes: RouteObject[] = [
  {
    path: "create-station",
    element: <StationCreate />,
  },
  {
    path: "charging-stations/:id",
    element: <StationDetails />,
  },
  {
    path: "charging-stations/:id/edit",
    element: <StationEdit />,
  },
  {
    path: "create-point",
    element: <PointCreate />,
  },
  {
    path: "charging-points/:id",
    element: <PointDetails />,
  },
  {
    path: "charging-points/:id/edit",
    element: <PointEdit />,
  },
];