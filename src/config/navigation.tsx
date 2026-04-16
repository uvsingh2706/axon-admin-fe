import { lazy } from "react";
import type { NavItem } from "../types/navigation";
import { CardIcon, GridIcon, LightningIcon, TruckIcon, WalletIcon } from "../assets/icons";
import { Pathname } from "../utils/pathname";
import GasStation from "@/assets/icons/GasStation";
import ProfileUserIcon from "@/assets/icons/ProfileUserIcon";
import { MODULE } from "@/rbac/modules";



// ── Lazy-loaded pages ──────────────────────────────────────────────
const Dashboard = lazy(() => import("../pages/Dashboard"));
const TariffManagement = lazy(() => import("../pages/TariffManagement"));
const ActiveChargingSession = lazy(() => import("../pages/ActiveChargingSession"));
const AssetManagement = lazy(() => import("../pages/AssetManagement"));
const FleetManagement = lazy(() => import("../pages/FleetManagement"));
const UserManagement = lazy(() => import("../pages/UserManagement"));
const Transactions = lazy(() => import("../pages/Transactions"));




export const navItems: NavItem[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: Pathname.DASHBOARD,
    icon: GridIcon,
    component: Dashboard,
    rbac: { modules: [MODULE.DASHBOARD], action: "view", mode: "any" },
  },
  {
    key: "tariff-management",
    label: "Tariff Management",
    path: Pathname.TARIFF_MANAGEMENT,
    icon: CardIcon,
    component: TariffManagement,
    rbac: { modules: [MODULE.TAX, MODULE.TARIFF], action: "view", mode: "any" },
  },
  {
    key: "asset-management",
    label: "Asset Management",
    path: Pathname.ASSET_MANAGEMENT,
    icon: GasStation,
    component: AssetManagement,
    rbac: {
      modules: [MODULE.CHARGING_POINT, MODULE.CHARGING_STATION],
      action: "view",
      mode: "any",
    },
  },
  {
    key: "fleet-management",
    label: "Fleet Management",
    path: Pathname.FLEET_MANAGEMENT,
    icon: TruckIcon,
    component: FleetManagement,
    rbac: {
      modules: [MODULE.FLEET_MANAGEMENT, MODULE.VEHICLE_MANAGEMENT],
      action: "view",
      mode: "any",
    },
  },
  {
    key: "user-management",
    label: "User Management",
    path: Pathname.USER_MANAGEMENT,
    icon: ProfileUserIcon,
    component: UserManagement,
    rbac: {
      // Driver/vehicle management is controlled by VEHICLE_MANAGEMENT in the backend.
      modules: [MODULE.B2B, MODULE.B2C, MODULE.VEHICLE_MANAGEMENT],
      action: "view",
      mode: "any",
    },
  },
  {
    key: "transactions",
    label: "Transactions",
    path: Pathname.TRANSACTIONS,
    icon: WalletIcon,
    component: Transactions,
    rbac: { modules: [MODULE.TRANSACTION], action: "view", mode: "any" },
  },
  {
    key: "active-charging-sessions",
    label: "Active Charging Sessions",
    path: Pathname.ACTIVE_CHARGING_SESSIONS,
    icon: LightningIcon,
    component: ActiveChargingSession,
    rbac: { modules: [MODULE.ACTIVE_SESSION], action: "view", mode: "any" },
  },
];
