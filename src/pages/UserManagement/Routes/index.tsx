import type { RouteObject } from "react-router-dom";
import {
  DriverCreate,
  DriverDetails,
  DriverEdit,
  DriversList,
} from "../Drivers";
import { B2CCreate, B2CDetails, B2CEdit, B2CList } from "../B2C";

export const userManagementRoutes: RouteObject[] = [
  { path: "drivers", element: <DriversList /> },
  { path: "drivers/create", element: <DriverCreate /> },
  { path: "drivers/:id", element: <DriverDetails /> },
  { path: "drivers/:id/edit", element: <DriverEdit /> },

  { path: "b2c", element: <B2CList /> },
  { path: "b2c/create", element: <B2CCreate /> },
  { path: "b2c/:id", element: <B2CDetails /> },
  { path: "b2c/:id/edit", element: <B2CEdit /> },
];

