import { Button } from "@/component/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/component/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/style.css";
import { format } from "date-fns";

interface DatePickerProps {
  value?: DateRange;
  onChange?: (value: DateRange | undefined) => void;
  type?: "range";
  open?: boolean;
  setOpen?: (open: boolean) => void;
  placeholder?: string;
}

export function DatePicker({
  value,
  onChange,
  open,
  setOpen,
  placeholder = "Pick a date range",
}: DatePickerProps) {
  const displayValue =
    value?.from && value?.to
      ? `${format(value.from, "MMM dd, yyyy")} - ${format(value.to, "MMM dd, yyyy")}`
      : placeholder;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "justify-start text-left font-normal min-w-64",
            !value && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 size-4" />
          {displayValue}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4" align="end">
        <DayPicker
          mode="range"
          selected={value}
          onSelect={onChange}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
}
