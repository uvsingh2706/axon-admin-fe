import type { RouteObject } from "react-router-dom";
import TariffDetail from "../Tariff/TariffDetail";
import TariffList from "../TariffManagementList";
import TariffCreate from "../Tariff/TariffCreate";
import TariffEdit from "../Tariff/TariffEdit";
import TaxCreate from "../Tax/TaxCreate";
import TaxDetails from "../Tax/TaxDetails";
import TaxEdit from "../Tax/TaxEdit";
// ─── Tariff Management Route Config ───────────────────────────────────────────
//
// All sub-routes for the Tariff Management module.
// These use RELATIVE paths — they're resolved against
// the module's base path (/tariff-management) automatically.
//
//   (index)   → TariffList    — PageWrapper + tabs + DataTable
//   create    → TariffCreate  — breadcrumb + create form
//   :id       → TariffDetail  — breadcrumb + detail card + edit/delete actions
//   :id/edit  → TariffEdit    — breadcrumb + pre-filled edit form
// ──────────────────────────────────────────────────────────────────────────────

export const tariffRoutes: RouteObject[] = [
  {
    index: true,
    element: <TariffList />,
  },
  {
    path: "create",
    element: <TariffCreate />,
  },
  {
    path: "create-tax",
    element: <TaxCreate />,
  },
  {
    path: "tarrif/:id",
    element: <TariffDetail />,
  },
  {
    path: "tarrif/:id/edit",
    element: <TariffEdit />,
  },
  {
    path: "tax/:id",
    element: <TaxDetails />,
  },
  {
    path: "tax/:id/edit",
    element: <TaxEdit />,
  },
];
