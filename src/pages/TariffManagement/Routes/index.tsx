import type { RouteObject } from "react-router-dom";
import { TariffCreate, TariffDetail, TariffEdit } from "../Tariff";
import { TaxCreate, TaxDetails, TaxEdit } from "../Tax";


export const tariffRoutes: RouteObject[] = [
  {
    path: "create-tariff",
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
