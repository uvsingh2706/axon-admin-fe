// Central mapping between frontend feature/module names and backend permission resource keys.
// Use these constants everywhere you call `useCan` / `useCanAny` so the keys stay consistent.
export const MODULE = {
  DASHBOARD: "DASHBOARD",
  CHARGING_POINT: "CHARGING_POINT",
  CHARGING_STATION: "CHARGING_STATION",
  FLEET_MANAGEMENT: "FLEET_MANAGEMENT",
  VEHICLE_MANAGEMENT: "VEHICLE_MANAGEMENT",
  B2B: "B2B",
  B2C: "B2C",
  TRANSACTION: "TRANSACTION",
  ACTIVE_SESSION: "ACTIVE_SESSION",
  TAX: "TAX",
  TARIFF: "TARIFF",
  HELP_SUPPORT: "HELP_SUPPORT",
  ROLE_PERMISSION: "ROLE_PERMISSION",
} as const;

export type BackendModuleKey = (typeof MODULE)[keyof typeof MODULE];

