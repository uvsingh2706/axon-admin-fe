import type { ReactNode } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTrigger,
} from "@/component/ui/alert-dialog";
import AlertCircleIcon from "@/assets/icons/AlertCircleIcon";

interface ModalProps {
    trigger?: ReactNode;
    description: ReactNode;
    onConfirm: () => void;
    confirmLabel?: string;
    cancelLabel?: string;
    icon?: ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export const Modal = ({
    trigger,
    description,
    onConfirm,
    open,
    onOpenChange,
    confirmLabel = "Delete",
    cancelLabel = "Cancel",
    icon = <AlertCircleIcon />,
}: ModalProps) => {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            {trigger && (
                <AlertDialogTrigger asChild>
                    {trigger}
                </AlertDialogTrigger>
            )}
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogMedia>
                        {icon}
                    </AlertDialogMedia>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{cancelLabel}</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>
                        {confirmLabel}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
