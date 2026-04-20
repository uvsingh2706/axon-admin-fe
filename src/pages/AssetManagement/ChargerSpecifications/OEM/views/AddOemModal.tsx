import { Button } from "@/component/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/component/ui/alert-dialog";
import { Input } from "@/component/ui/input";
import { useState } from "react";
import { useCreateOEM } from "../services/oem.hooks";

type AddOemModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function AddOemModal({
  open,
  onOpenChange,
}: AddOemModalProps) {
  const [oemName, setOemName] = useState("");
  const { mutateAsync: createOEM } = useCreateOEM();

  const handleClose = () => {
    onOpenChange(false);
    setOemName("");
  };

  const handleSave = () => {
    createOEM(
      { oem_name: oemName },
      {
        onSuccess: () => {
          handleClose();
        },
      }
    );
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="h-auto w-[40vw] max-w-[425px] rounded-[1.5rem] px-0 pt-0 pb-0 border-0 shadow-lg">
        {/* Header */}
        <div className="px-8 pt-8 pb-4">
          <AlertDialogHeader className="items-start text-left w-full h-auto mx-0 gap-1 border-0">
            <AlertDialogTitle className="text-2xl font-medium text-black-c1">
              OEM Name
            </AlertDialogTitle>
          </AlertDialogHeader>
        </div>

        {/* Body */}
        <div className="px-8 pb-8 pt-2">
          <Input 
            label="OEM Name" 
            required 
            placeholder="e.g. Axon Energies" 
            value={oemName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOemName(e.target.value)}
          />
        </div>

        {/* Footer */}
        <AlertDialogFooter className="w-full h-auto mx-0 justify-center px-8 pb-8 gap-4 sm:space-x-0">
          <Button 
            type="button" 
            variant="secondary" 
            onClick={handleClose} 
            className="flex-1 rounded-[10px] py-6 text-[16px] font-medium"
          >
            Cancel
          </Button>
          <Button 
            type="button" 
            variant="primary" 
            onClick={handleSave} 
            disabled={!oemName.trim()}
            className="flex-1 rounded-[10px] py-6 text-[16px] font-medium"
          >
            Save Changes
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
