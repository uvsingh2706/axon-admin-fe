import { Button } from "@/component/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/component/ui/alert-dialog";
import { Input } from "@/component/ui/input";
import { useState, useEffect } from "react";
import { useCreateOEM, useUpdateOEM, useOEMById } from "../services/oem.hooks";
import { Loader2 } from "lucide-react";

type AddOemModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editId?: string | null;
};

export default function AddOemModal({
  open,
  onOpenChange,
  editId,
}: AddOemModalProps) {
  const [oemName, setOemName] = useState("");
  const { mutateAsync: createOEM, isPending: isCreating } = useCreateOEM();
  const { mutateAsync: updateOEM, isPending: isUpdating } = useUpdateOEM();
  const { data: oemRes, isLoading: isFetching } = useOEMById(editId || "", !!editId);

  const isSaving = isCreating || isUpdating;

  useEffect(() => {
    if (editId && oemRes?.data && 'oemName' in oemRes.data) {
      setOemName((oemRes.data as any).oemName || "");
    }
  }, [oemRes, editId]);

  useEffect(() => {
    if (!open) {
      setOemName("");
    }
  }, [open]);

  const handleClose = () => {
    onOpenChange(false);
    setOemName("");
  };

  const handleSave = () => {
    if (editId) {
      updateOEM(
        { id: editId, data: { oem_name: oemName } },
        {
          onSuccess: () => {
            handleClose();
          },
        }
      );
    } else {
      createOEM(
        { oem_name: oemName },
        {
          onSuccess: () => {
            handleClose();
          },
        }
      );
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="h-auto w-[40vw] max-w-[425px] rounded-[1.5rem] px-0 pt-0 pb-0 border-0 shadow-lg">
        {/* Header */}
        <div className="px-8 pt-8 pb-4">
          <AlertDialogHeader className="items-start text-left w-full h-auto mx-0 gap-1 border-0">
            <AlertDialogTitle className="text-2xl font-medium text-black-c1">
              {editId ? "Edit OEM" : "Add OEM"}
            </AlertDialogTitle>
          </AlertDialogHeader>
        </div>

        {/* Body */}
        <div className="px-8 pb-8 pt-2">
          {isFetching ? (
            <div className="flex justify-center p-4">
              <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
            </div>
          ) : (
            <Input 
              label="OEM Name" 
              required 
              placeholder="e.g. Axon Energies" 
              value={oemName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOemName(e.target.value)}
            />
          )}
        </div>

        {/* Footer */}
        <AlertDialogFooter className="w-full h-auto mx-0 justify-center px-8 pb-8 gap-4 sm:space-x-0">
          <Button 
            type="button" 
            variant="secondary" 
            onClick={handleClose} 
            className="flex-1 rounded-[10px] py-6 text-[16px] font-medium"
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button 
            type="button" 
            variant="primary" 
            onClick={handleSave} 
            disabled={!oemName.trim() || isFetching || isSaving}
            className="flex-1 rounded-[10px] py-6 text-[16px] font-medium"
          >
            Save Changes
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
