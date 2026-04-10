import type { RouteObject } from "react-router-dom";
import AssetList from "../AssetManagmentList";
import PointCreate from "../AssetCreate/PointCreate";
import StationCreate from "../AssetCreate/StationCreate";

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
