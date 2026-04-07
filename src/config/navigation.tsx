import { lazy } from "react";
import type { NavItem } from "../types/navigation";
import { DashboardIcon, StationIcon } from "../assets/icons";


// ── Lazy-loaded pages ──────────────────────────────────────────────
const Dashboard = lazy(() => import("../pages/Dashboard"));
const ChargingStation = lazy(() => import("../pages/ChargingStation"));
// const ChargingPoint = lazy(() => import("../pages/ChargingPoint"));


export const navItems: NavItem[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/",
    icon: DashboardIcon,
    component: Dashboard,
  },
  {
    key: "charging-stations",
    label: "Charging Stations",
    path: "/charging-stations",
    icon: StationIcon,
    component: ChargingStation,
  },
  // {
  //   key: "charging-points",
  //   label: "Charging points",
  //   path: "/charging-points",
  //   icon: StationIcon,
  //   component: ChargingPoint,
  // },
];
