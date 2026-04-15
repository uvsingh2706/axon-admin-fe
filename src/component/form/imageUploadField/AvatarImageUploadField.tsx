import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import { Button } from "@/component/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/component/ui/avatar";
import { cn } from "@/lib/utils";
import AvatarIcon from "@/assets/icons/AvatarIcon";

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
  const [filename, setFilename] = useState<string>("");
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!(value instanceof File)) {
      setObjectUrl(null);
      return;
    }
    const url = URL.createObjectURL(value);
    setObjectUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [value]);

  const previewSrc = useMemo(() => {
    if (typeof value === "string") return value;
    if (value instanceof File) return objectUrl;
    return null;
  }, [objectUrl, value]);

  const derivedFilename = useMemo(() => {
    if (filename) return filename;
    if (value instanceof File) return value.name;
    if (typeof value === "string") return value.split("/").pop() || "";
    return "";
  }, [filename, value]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFilename(file?.name ?? "");
    onChange(file);
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

      <Button
        type="button"
        variant="secondary"
        className={cn(
          "h-10 rounded-md px-6",
          "border-text-200 text-text-700",
          "hover:border-text-200 hover:text-text-700",
          "focus-visible:ring-text-200"
        )}
        onClick={() => inputRef.current?.click()}
      >
        Upload
      </Button>

      <div className="subtitle-3-regular text-text-400">
        {derivedFilename || "PNG or JPG"}
      </div>
    </div>
  );
}

