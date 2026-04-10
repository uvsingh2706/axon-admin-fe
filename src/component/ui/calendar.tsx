import * as React from "react"
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
  type Locale,
} from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/component/ui/button"
import LeftArrowIcon from "@/assets/icons/LeftArrowIcon"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant,
  locale,
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      fixedWeeks = {false}
      className={cn(
        "group/calendar w-fit bg-background p-4 rounded-xl shadow-xs [--cell-radius:12px] [--cell-size:--spacing(12)]",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      locale={locale}
      formatters={{
        formatWeekdayName: (date) =>
          date.toLocaleString(locale?.code, { weekday: "narrow" }),
        formatMonthDropdown: (date) =>
          date.toLocaleString(locale?.code, { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),

        months: cn(
          "relative flex flex-col gap-4 md:flex-row",
          defaultClassNames.months
        ),

        month: cn("flex w-full flex-col gap-4", defaultClassNames.month),

        nav: cn(
          "absolute inset-x-0 top-0 flex w-full items-center justify-end gap-1 pr-1",
          defaultClassNames.nav
        ),

        button_previous: cn(
          buttonVariants({ variant: buttonVariant || "tertiary" }),
          "w-(--cell-size) h-10 p-0 select-none aria-disabled:opacity-50",
          "text-secondary-700 hover:text-secondary-900 active:text-secondary-500",
          defaultClassNames.button_previous
        ),

        button_next: cn(
          buttonVariants({ variant: buttonVariant || "tertiary" }),
          "w-(--cell-size) h-10 p-0 select-none aria-disabled:opacity-50",
          "text-secondary-700 hover:text-secondary-900 active:text-secondary-500",
          defaultClassNames.button_next
        ),

        // Month title: LEFT-aligned, no horizontal padding pushing it to center
        month_caption: cn(
          "flex h-10 w-full items-center justify-start px-1",
          defaultClassNames.month_caption
        ),

        dropdowns: cn(
          "flex h-10 w-full items-center gap-2 px-1",
          defaultClassNames.dropdowns
        ),

        dropdown_root: cn(
          "relative rounded-xl",
          defaultClassNames.dropdown_root
        ),

        dropdown: cn(
          "absolute inset-0 bg-popover opacity-0",
          defaultClassNames.dropdown
        ),

        caption_label: cn(
          "text-xl font-semibold select-none text-text-950",
          defaultClassNames.caption_label
        ),

        table: "w-full border-collapse space-y-1",
        weekdays: cn("flex", defaultClassNames.weekdays),

        weekday: cn(
          "w-(--cell-size) text-lg font-bold select-none text-center text-secondary-600",
          defaultClassNames.weekday
        ),

        week: cn("flex w-full mt-1", defaultClassNames.week),

        week_number_header: cn(
          "w-(--cell-size) select-none",
          defaultClassNames.week_number_header
        ),

        week_number: cn(
          "text-[0.8rem] text-muted-foreground select-none",
          defaultClassNames.week_number
        ),

        day: cn(
          "group/day relative w-(--cell-size) h-10 flex items-center justify-center rounded-xl p-0 text-center select-none",
          "[&:last-child[data-selected=true]_button]:rounded-r-xl",
          props.showWeekNumber
            ? "[&:nth-child(2)[data-selected=true]_button]:rounded-l-xl"
            : "[&:first-child[data-selected=true]_button]:rounded-l-xl",
          defaultClassNames.day
        ),

        // range_start: cn(
        //   "relative isolate z-0 rounded-l-xl bg-[var(--color-primary-50)] after:absolute after:inset-y-0 after:right-0 after:w-4 after:bg-[var(--color-primary-50)]",
        //   defaultClassNames.range_start
        // ),

        // range_middle: cn("rounded-none", defaultClassNames.range_middle),

        // range_end: cn(
        //   "relative isolate z-0 rounded-r-xl bg-[var(--color-primary-50)] after:absolute after:inset-y-0 after:left-0 after:w-4 after:bg-[var(--color-primary-50)]",
        //   defaultClassNames.range_end
        // ),

        today: defaultClassNames.today,
        selected: defaultClassNames.selected,
        outside: defaultClassNames.outside,
        disabled: defaultClassNames.disabled,
        hidden: cn("invisible", defaultClassNames.hidden),

        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn("bg-background", className)}
              {...props}
            />
          )
        },

        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <LeftArrowIcon className={cn("size-5 text-secondary-600", className)} {...props} />
            )
          }
          if (orientation === "right") {
            return (
              <LeftArrowIcon className={cn("size-5 text-secondary-600 rotate-180", className)} {...props} />
            )
          }
          return <></>
        },

        Weekday: ({ children, ...props }) => (
          <th
            {...props}
            className="w-(--cell-size) text-lg font-bold select-none text-center text-secondary-600"
          >
            {children}
          </th>
        ),

        DayButton: ({ ...props }) => (
          <CalendarDayButton locale={locale} {...props} />
        ),

        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          )
        },

        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  ...props
}: React.ComponentProps<typeof DayButton> & { locale?: Partial<Locale> }) {
  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "flex size-10 mx-auto items-center justify-center rounded-xl text-[14px]",
        "p-0 transition-colors aspect-square focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2",
        !modifiers.selected && "font-semibold",
        !modifiers.selected && !modifiers.range_middle && "hover:bg-secondary-50 text-foreground",
        // Selected Single / Range Edges
        modifiers.selected && !modifiers.range_middle && "bg-primary-700 text-white font-medium hover:bg-primary-700",
        // Range Middle (logic commented out) 
        modifiers.range_middle && "bg-primary-50 text-foreground rounded-none font-medium",
        // Today Unselected
        modifiers.today && !modifiers.selected && "ring-2 ring-primary-700 ring-inset text-primary-700 font-semibold",
        // Disabled
        modifiers.disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        // Outside
        modifiers.outside && "opacity-40",
        className
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }