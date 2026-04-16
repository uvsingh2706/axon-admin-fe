import type { ReactNode } from "react";
import type { ModuleKey, RbacAction } from "./rbac.types";
import { useCan } from "./rbac.hooks";

export function Can(props: {
  module: ModuleKey;
  action?: RbacAction;
  fallback?: ReactNode;
  children: ReactNode;
}) {
  const allowed = useCan(props.module, props.action ?? "view");
  if (!allowed) return <>{props.fallback ?? null}</>;
  return <>{props.children}</>;
}

