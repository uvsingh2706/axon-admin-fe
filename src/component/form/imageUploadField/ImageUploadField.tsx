import { useState, type ChangeEvent } from "react";
import { cn } from "@/lib/utils";

interface ImageUploadFieldProps {
  onChange: (file: File | null) => void;
  value?: File | string | null;
  error?: boolean;
}

export default function ImageUploadField({
  onChange,
  value,
  error,
}: ImageUploadFieldProps) {
  const [preview, setPreview] = useState<string | null>(
    typeof value === "string" ? value : null
  );

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
    onChange(file);
  };

  return (
    <div className="flex w-full flex-col justify-center">
      <div
        className={cn(
          "relative flex h-40 w-40 flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed mx-auto",
          error ? "border-danger bg-danger/5" : "border-border bg-gray-50",
          "transition-colors hover:bg-gray-100"
        )}
      >
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
          onChange={handleFileChange}
        />
        {preview ? (
          <img src={preview} alt="Preview" className="h-full w-full object-cover" />
        ) : (
          <div className="flex flex-col items-center justify-center">
            <span className="text-3xl font-light text-text-400">+</span>
            <span className="mt-1 text-xs text-text-500">Upload Image</span>
          </div>
        )}
      </div>
    </div>
  );
}
