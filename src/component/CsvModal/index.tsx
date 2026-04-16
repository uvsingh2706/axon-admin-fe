import { DownloadIcon } from "@/assets/icons/DownloadIcon";
import FileUpload from "@/assets/icons/FileUpload";
import { Button } from "@/component/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/component/ui/alert-dialog";
import { useRef, useState, type ChangeEvent } from "react";
import TickIcon from "@/assets/icons/TickIcon";

//for specifyling file size
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

type ImportCsvModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
};

export default function CsvModal({
  open,
  onOpenChange,
  title,
  description,
}: ImportCsvModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setSelectedFile(file);
  };

  const handleClose = () => {
    onOpenChange(false);
    setSelectedFile(null);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="h-auto w-lg rounded-2xl px-0 pt-0 pb-0">
        {/* ── Header ── */}
        <div className="px-6 pt-5 pb-4">
          <AlertDialogHeader className="items-start text-left w-full h-auto mx-0 gap-1">
            <AlertDialogTitle className="heading-4-semibold text-text-950">
              {title}
            </AlertDialogTitle>
            <AlertDialogDescription className="w-full h-auto m-0 text-left subtitle-3-regular text-text-600">
              {description}
            </AlertDialogDescription>
          </AlertDialogHeader>
        </div>

        <div className="px-4 pb-4 space-y-3">
          <div className="flex items-center justify-between rounded-md bg-primary-50 px-3 py-3">
            <span className="text-sm font-semibold text-text-900">
              Download Accepted Format
            </span>
            <Button
              type="button"
              variant="primary"
              isIcon={<DownloadIcon className="brightness-0 invert" />}
              // onClick={() => console.log("Download CSV format clicked")}
            >
              Download CSV
            </Button>
          </div>

          {/* Drag & Drop zone */}
          <div className="rounded-lg border border-dashed border-gray-300 bg-gray-c4 px-4 py-5">
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.xlsx"
              className="hidden"
              onChange={handleFileChange}
            />

            {selectedFile ? (
              /* ── File selected state ── */
              <div className="flex items-center gap-3">
                <FileUpload className="h-9 w-9 shrink-0" />
                <div className="flex-1 text-left">
                  <p className="subtitle-3-medium text-text-950 truncate">
                    {selectedFile.name}
                  </p>
                  <p className="subtitle-3-medium text-text-950">
                    {formatFileSize(selectedFile.size)}
                  </p>
                </div>
                <TickIcon className="h-7 w-7" />
              </div>
            ) : (
              
              /* ── Default drag & drop state ── */
              <div className="flex flex-col items-center justify-center text-center gap-2 py-2">
                <FileUpload className="h-8 w-8" />
                <p className="subtitle-3-regular text-text-800">
                  Drag &amp; Drop files here
                </p>
                <p className="caption-medium text-text-500">
                  Accepted formats: CSV &amp; xlsx
                </p>
                <Button
                  type="button"
                  variant="secondary"
                  className="h-8 border-text-200 text-(--color-primary)"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Select File
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* ── Footer ── */}
        <AlertDialogFooter className="w-full h-auto mx-0 justify-end px-4 pb-4 gap-2">
          <Button type="button" variant="secondary" onClick={handleClose}>
            Discard
          </Button>
          <Button type="button" disabled={!selectedFile}>
            Add
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
