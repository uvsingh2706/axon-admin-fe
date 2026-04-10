import { useEffect, useRef, useState } from "react";
import { Input } from "@/component/ui/input";
import SearchIcon from "@/assets/icons/SearchIcon";

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
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    setInternalValue(externalValue);
  }, [externalValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChangeRef.current(internalValue);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [internalValue, debounceMs]);

  return (
    <Input
      placeholder="Search"
      {...props}
      value={internalValue}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInternalValue(e.target.value)}
      className="max-w-80 w-full border-text-200 rounded-lg h-11"
      prefixIcon={<SearchIcon className="h-4.5 w-4.5 text-text-500" />}
    />
  );
}
