import { lazy } from "react";
import type { NavItem } from "../types/navigation";
import { CardIcon, GridIcon, LightningIcon, TruckIcon, WalletIcon } from "../assets/icons";
import { Pathname } from "../utils/pathname";
import GasStation from "@/assets/icons/GasStation";
import ProfileUserIcon from "@/assets/icons/ProfileUserIcon";



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
  },
  {
    key: "tariff-management",
    label: "Tariff Management",
    path: Pathname.TARIFF_MANAGEMENT,
    icon: CardIcon,
    component: TariffManagement,
  },
  {
    key: "asset-management",
    label: "Asset Management",
    path: Pathname.ASSET_MANAGEMENT,
    icon: GasStation,
    component: AssetManagement,
  },
  {
    key: "fleet-management",
    label: "Fleet Management",
    path: Pathname.FLEET_MANAGEMENT,
    icon: TruckIcon,
    component: FleetManagement,
  },
  {
    key: "user-management",
    label: "User Management",
    path: Pathname.USER_MANAGEMENT,
    icon: ProfileUserIcon,
    component: UserManagement,
  },
  {
    key: "transactions",
    label: "Transactions",
    path: Pathname.TRANSACTIONS,
    icon: WalletIcon,
    component: Transactions,
  },
  {
    key: "active-charging-sessions",
    label: "Active Charging Sessions",
    path: Pathname.ACTIVE_CHARGING_SESSIONS,
    icon: LightningIcon,
    component: ActiveChargingSession,
  },
];
