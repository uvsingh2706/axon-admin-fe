import { useRoutes } from "react-router-dom";
import { tariffRoutes } from "./Components/Routes";

// ─── Tariff Management Module ─────────────────────────────────────────────────
//
// Module root — renders the matching sub-route from tariffRoutes.
//
// Folder structure:
//   TariffManagement/
//     index.tsx                        ← this file (module entry)
//     Components/
//       Routes/index.tsx               ← route config (single source of truth)
//       TarrifList/index.tsx           ← list view (PageWrapper + DataTable)
//       TarriffCreate/index.tsx        ← create form
//       TarrifDetail/index.tsx         ← detail view + edit/delete actions
//       TarrifEdit/index.tsx           ← pre-filled edit form
//
// Route map:
//   /tariff-management              → TarrifList     (index)
//   /tariff-management/create       → TarriffCreate
//   /tariff-management/:id          → TarrifDetail
//   /tariff-management/:id/edit     → TarrifEdit
// ──────────────────────────────────────────────────────────────────────────────

const TariffManagement = () => {
  const element = useRoutes(tariffRoutes);
  return element;
};

export default TariffManagement;