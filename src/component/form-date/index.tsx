import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/component/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/component/ui/calendar";
import { type DateRange } from "react-day-picker";
import { format } from "date-fns";
import * as React from "react";

export interface DatePickerProps {
  mode?: "single" | "range";
  value?: Date | DateRange | undefined;
  onChange?: (value: any) => void;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  error?: boolean;
}

export function DatePicker({
  mode = "single",
  value,
  onChange,
  open,
  setOpen,
  placeholder = "Select Date",
  className,
  disabled,
  error
}: DatePickerProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isOpen = open !== undefined ? open : internalOpen;
  const handleOpenChange = (newOpen: boolean) => {
    if (setOpen) setOpen(newOpen);
    else setInternalOpen(newOpen);
  };

  const displayValue = () => {
    if (!value) return placeholder;
    if (mode === "single") {
      return format(value as Date, "MMM dd, yyyy");
    }
    if (mode === "range") {
      const range = value as DateRange;
      if (range.from && range.to) {
        return `${format(range.from, "MMM d, yy")} - ${format(range.to, "MMM d, yy")}`;
      } else if (range.from) {
        return `${format(range.from, "MMM d, yy")} - ...`;
      }
    }
    return placeholder;
  };

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            "flex h-[42px] w-full items-center rounded-lg bg-white px-4 py-2 outline-none transition-colors duration-150 text-sm",
            "border text-left font-normal focus:outline-none focus:ring-0",
            error
              ? "border-danger text-text-950 focus:border-danger"
              : "border-text-200 focus:border-primary-400",
            value ? "text-text-950" : "text-text-500",
            disabled && "cursor-not-allowed border-text-100 bg-text-100 opacity-100 text-text-500",
            className
          )}
        >
          <CalendarIcon className="mr-2 size-4 shrink-0 text-text-500 opacity-70" />
          <span className="flex-1 truncate">{displayValue()}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 border-none shadow-none bg-transparent" align="start">
        <Calendar
          mode={mode as any}
          selected={value as any}
          onSelect={(date: any) => {
            onChange?.(date);
            if (mode === "single" && date) handleOpenChange(false);
          }}
          initialFocus
          {...(mode === "range" ? { numberOfMonths: 2 } : {})}
        />
      </PopoverContent>
    </Popover>
  );
}
