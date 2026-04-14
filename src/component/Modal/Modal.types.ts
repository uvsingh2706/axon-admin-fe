import type { ReactNode } from "react";

export interface ModalProps {
  trigger?: ReactNode;
  description: ReactNode;
  mediaClassName?: string;
  onConfirm: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  icon?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}
