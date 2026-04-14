import type { RouteObject } from "react-router-dom";
import AssetList from "../AssetManagmentList";
import PointCreate from "../ChargingPoints/PointCreate";
import PointDetails from "../ChargingPoints/PointDetails";
import PointEdit from "../ChargingPoints/PointEdit";
import StationCreate from "../ChargingStations/StationCreate";
import StationDetails from "../ChargingStations/StationDetails";
import StationEdit from "../ChargingStations/StationEdit";

export const assetRoutes: RouteObject[] = [
  {
    path: "/",
    element: <AssetList />,
  },
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