export const Role = {
  SUPER_ADMIN: "SUPER_ADMIN",
  "O&M": "O&M",
  FINANCE: "FINANCE",
  FLEET_MANAGER: "FLEET_MANAGER",
  TECH: "TECH",
  SUB_ADMIN: "SUB_ADMIN",
} as const;
export type RoleType = keyof typeof Role;
export type RoleValue = `${RoleType}` | (string & {});

