import type { RouteObject } from "react-router-dom";
import AssetList from "../AssetManagmentList";
import PointCreate from "../ChargingPoints/PointCreate";
import StationCreate from "../ChargingStations/StationCreate";

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
    path: "create-point",
    element: <PointCreate />,
  },
];
