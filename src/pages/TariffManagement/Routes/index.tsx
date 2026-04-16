import type { RouteObject } from "react-router-dom";
import { TariffCreate, TariffDetail, TariffEdit } from "../Tariff";
import { TaxCreate, TaxDetails, TaxEdit } from "../Tax";
import { Can } from "@/rbac";
import { MODULE } from "@/rbac/modules";

function NoAccess() {
  return (
    <div className="p-8 text-center text-text-500 subtitle-2-medium">
      You do not have permission for this action.
    </div>
  );
}

export const tariffRoutes: RouteObject[] = [
  {
    path: "create-tariff",
    element: (
      <Can module={MODULE.TARIFF} action="create" fallback={<NoAccess />}>
        <TariffCreate />
      </Can>
    ),
  },
  {
    path: "create-tax",
    element: (
      <Can module={MODULE.TAX} action="create" fallback={<NoAccess />}>
        <TaxCreate />
      </Can>
    ),
  },
  {
    path: "tarrif/:id",
    element: (
      <Can module={MODULE.TARIFF} action="view" fallback={<NoAccess />}>
        <TariffDetail />
      </Can>
    ),
  },
  {
    path: "tarrif/:id/edit",
    element: (
      <Can module={MODULE.TARIFF} action="update" fallback={<NoAccess />}>
        <TariffEdit />
      </Can>
    ),
  },
  {
    path: "tax/:id",
    element: (
      <Can module={MODULE.TAX} action="view" fallback={<NoAccess />}>
        <TaxDetails />
      </Can>
    ),
  },
  {
    path: "tax/:id/edit",
    element: (
      <Can module={MODULE.TAX} action="update" fallback={<NoAccess />}>
        <TaxEdit />
      </Can>
    ),
  },
];
