import { useEffect, useState } from "react";
import { Input } from "@/component/ui/input";

interface DebouncedInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value?: string;
  onChange: (value: string) => void;
  debounceMs?: number;
}

export default function DebouncedInput({
  value: externalValue = "",
  onChange,
  debounceMs = 300,
  ...props
}: DebouncedInputProps) {
  const [internalValue, setInternalValue] = useState(externalValue);

  useEffect(() => {
    setInternalValue(externalValue);
  }, [externalValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(internalValue);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [internalValue, debounceMs, onChange]);

  return (
    <Input
      {...props}
      value={internalValue}
      onChange={(e) => setInternalValue(e.target.value)}
      className="max-w-sm"
    />
  );
}
