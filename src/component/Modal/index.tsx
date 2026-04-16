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
import type { ModalProps } from "./Modal.types";
export type { ModalProps } from "./Modal.types";

export const Modal = ({
    trigger,
    description,
    onConfirm,
    open,
    onOpenChange,
    mediaClassName,
    confirmLabel = "Delete",
    cancelLabel = "Cancel",
    icon = <AlertCircleIcon />,
    confirmClassName,
    cancelClassName,
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
                    <AlertDialogMedia className={mediaClassName}>
                        {icon}
                    </AlertDialogMedia>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className={cancelClassName}>{cancelLabel}</AlertDialogCancel>
                    <AlertDialogAction className={confirmClassName} onClick={onConfirm}>
                        {confirmLabel}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
