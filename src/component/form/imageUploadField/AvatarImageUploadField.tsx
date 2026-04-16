import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import { Button } from "@/component/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/component/ui/avatar";
import { cn } from "@/lib/utils";
import AvatarIcon from "@/assets/icons/AvatarIcon";
import { DeleteIcon } from "@/assets/icons";

type DriverImageUploadFieldProps = {
  onChange: (file: File | null) => void;
  value?: File | string | null;
  error?: boolean;
  accept?: string;
};

export default function DriverImageUploadField({
  onChange,
  value,
  error,
  accept = "image/png,image/jpeg",
}: DriverImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const [forceCleared, setForceCleared] = useState(false);

  useEffect(() => {
    if (!(value instanceof File)) {
      setObjectUrl(null);
      return;
    }
    const url = URL.createObjectURL(value);
    setObjectUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [value]);

  useEffect(() => {
    // If parent provides a value again, re-enable preview.
    if (value) setForceCleared(false);
  }, [value]);

  const previewSrc = useMemo(() => {
    if (forceCleared) return null;
    if (typeof value === "string") return value;
    if (value instanceof File) return objectUrl;
    return null;
  }, [forceCleared, objectUrl, value]);

  // Keeping filename state for future UI needs (e.g. showing filename).
  // derivedFilename removed since it's not currently rendered.

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(file);
  };

  const handlePickFile = () => {
    inputRef.current?.click();
  };

  const handleDelete = () => {
    setObjectUrl(null);
    // setForceCleared(true);
    if (inputRef.current) inputRef.current.value = "";
    onChange(null);
  };

  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-lg bg-white px-4",
        error ? "border-danger" : "border-text-200"
      )}
    >
      <Avatar size="lg" className="bg-muted">
        {previewSrc ? <AvatarImage src={previewSrc} alt="Uploaded image" /> : null}
        <AvatarFallback className="bg-text-100 text-text-400">
          <AvatarIcon />
        </AvatarFallback>
      </Avatar>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="flex items-center gap-2">
        {previewSrc ? (
          <>


              <button onClick={handleDelete} className="cursor-pointer flex items-center gap-1">
               <DeleteIcon className="w-5 h-5 text-gray-c3" />
               Remove
               </button>
            <Button
              type="button"
              variant="secondary"
              className={cn(
                "h-10 rounded-md px-6",
                "border-text-200 text-text-700",
                "hover:border-text-200 hover:text-text-700",
                "focus-visible:ring-text-200"
              )}
              onClick={handlePickFile}
            >
              Replace
            </Button>
          </>
        ) : (
          <Button
            type="button"
            variant="secondary"
            className={cn(
              "h-10 rounded-md px-6",
              "border-text-200 text-text-700",
              "hover:border-text-200 hover:text-text-700",
              "focus-visible:ring-text-200"
            )}
            onClick={handlePickFile}
          >
            Upload
          </Button>
        )}
      </div>

      {/* <div className="subtitle-3-regular text-text-400">
        {derivedFilename || "PNG or JPG"}
      </div> */}
    </div>
  );
}

