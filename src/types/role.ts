export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  "O&M" = "O&M",
  FINANCE = "FINANCE",
  FLEET_MANAGER = "FLEET_MANAGER",
  TECH = "TECH",
  SUB_ADMIN = "SUB_ADMIN",
}

export type RoleValue = `${Role}` | (string & {});

