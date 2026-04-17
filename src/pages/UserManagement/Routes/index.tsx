import type { RouteObject } from "react-router-dom";
import {
  DriverCreate,
  DriverDetails,
  DriverEdit,
  DriversList,
} from "../Drivers";
import { B2CCreate, B2CDetails, B2CEdit, B2CList } from "../B2C";
import { Can } from "@/rbac";
import { MODULE } from "@/rbac/modules";

function NoAccess() {
  return (
    <div className="p-8 text-center text-text-500 subtitle-2-medium">
      You do not have permission for this action.
    </div>
  );
}

export const userManagementRoutes: RouteObject[] = [
  {
    path: "drivers",
    element: (
      <Can module={MODULE.B2B} action="view" fallback={<NoAccess />}>
        <DriversList />
      </Can>
    ),
  },
  {
    path: "drivers/create",
    element: (
      <Can module={MODULE.B2B} action="create" fallback={<NoAccess />}>
        <DriverCreate />
      </Can>
    ),
  },
  {
    path: "drivers/:id",
    element: (
      <Can module={MODULE.B2B} action="view" fallback={<NoAccess />}>
        <DriverDetails />
      </Can>
    ),
  },
  {
    path: "drivers/:id/edit",
    element: (
      <Can module={MODULE.B2B} action="update" fallback={<NoAccess />}>
        <DriverEdit />
      </Can>
    ),
  },

  {
    path: "b2c",
    element: (
      <Can module={MODULE.B2C} action="view" fallback={<NoAccess />}>
        <B2CList />
      </Can>
    ),
  },
  {
    path: "b2c/create",
    element: (
      <Can module={MODULE.B2C} action="create" fallback={<NoAccess />}>
        <B2CCreate />
      </Can>
    ),
  },
  {
    path: "b2c/:id",
    element: (
      <Can module={MODULE.B2C} action="view" fallback={<NoAccess />}>
        <B2CDetails />
      </Can>
    ),
  },
  {
    path: "b2c/:id/edit",
    element: (
      <Can module={MODULE.B2C} action="update" fallback={<NoAccess />}>
        <B2CEdit />
      </Can>
    ),
  },
];

