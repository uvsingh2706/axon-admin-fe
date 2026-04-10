import type { RouteObject } from "react-router-dom";
import TariffList from "../TarrifList";
import TariffCreate from "../TarriffCreate";
import TariffDetail from "../TarrifDetail";
import TariffEdit from "../TarrifEdit";

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
    path: ":id",
    element: <TariffDetail />,
  },
  {
    path: ":id/edit",
    element: <TariffEdit />,
  },
];
