import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    "group/button isolate relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-md border bg-clip-padding text-sm font-medium whitespace-nowrap transition-colors duration-200 ease-in-out outline-none select-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-primary)] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 aria-invalid:ring-2 aria-invalid:ring-destructive/20",
  ].join(" "),

  {
    variants: {
      variant: {
        primary: [
          "border-transparent bg-[var(--color-primary)] text-white",
          "hover:bg-[var(--color-primary-500)] hover:cursor-pointer",
          "active:bg-[var(--color-primary-400)] active:cursor-pointer",
          "disabled:bg-[var(--color-text-200)] disabled:text-[var(--color-text-600)] disabled:cursor-not-allowed",
        ].join(" "),

        secondary: [
          "bg-white text-[var(--color-primary)] border-[var(--color-primary)]",
          "hover:bg-white hover:text-[var(--color-primary-500)] hover:border-[var(--color-primary-500)] hover:cursor-pointer",
          "active:bg-white active:text-[var(--color-text-500)] active:border-[color-mix(in_srgb,var(--color-text-950)_40%,transparent)] active:cursor-pointer",
          "disabled:bg-white disabled:text-[var(--color-text-950)] disabled:border-[var(--color-text-950)] disabled:opacity-40 disabled:cursor-not-allowed",
        ].join(" "),

        tertiary: [
          "border-transparent bg-transparent text-[var(--color-primary)]",
          "hover:text-[var(--color-primary-500)] hover:cursor-pointer",
          "active:text-[var(--color-primary-400)] active:cursor-pointer",
          "disabled:text-[var(--color-text-950)] disabled:cursor-not-allowed disabled:opacity-40",
        ].join(" "),
      },

      size: {
        default:
          "h-[2.5rem] gap-1.5 px-4 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2", // 40px (Medium)
        sm: "h-[2rem] gap-1 rounded-[min(var(--radius-md),10px)] px-3", // 32px (Small)
        md: "h-[2.5rem] gap-1.5 px-4", // 40px (Medium)
        lg: "h-[2.75rem] gap-1.5 px-6 text-base", // 44px (Large)
        xl: "h-[3rem] gap-1.5 px-6 text-base", // 48px (Extra Large)
        icon: "size-[2.5rem]", // 40px (Medium)
        "icon-sm": "size-[2rem] rounded-[min(var(--radius-md),10px)]", // 32px (Small)
        "icon-lg": "size-[2.75rem]", // 44px (Large)
        "icon-xl": "size-[3rem]", // 48px (Extra Large)
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ComponentProps<"button">,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isIcon?: React.ReactNode
  // rightIcon?: React.ReactNode
}

function Button({
  className,
  variant,
  size = "default",
  asChild = false,
  disabled,
  onClick,
  children,
  isIcon,
  ...props
}: ButtonProps) {

  if (asChild) {
    return (
      <Slot.Root
        data-slot="button"
        data-variant={variant}
        data-size={size}
        className={cn(buttonVariants({ variant, size }), className)}
        onClick={onClick}
        {...props}
      >
        {children}
      </Slot.Root>
    )
  }

  const wantsCircle = !disabled && (variant === "primary" || variant === "secondary")

  // Primary gets 15% opacity when active, Secondary gets 100% opacity when active.
  const circleClass =
    variant === "primary"
      ? "bg-[var(--color-ripple-primary)] opacity-0 group-active/button:opacity-15"
      : "bg-[var(--color-ripple-secondary)] opacity-0 group-active/button:opacity-100"

  return (
    <button
      data-slot="button"
      data-variant={variant}
      data-size={size}
      disabled={disabled}
      className={cn(buttonVariants({ variant, size }), className)}
      onClick={onClick}
      {...props}
    >
      {/* Static active circle (replaces JS ripple) */}
      {wantsCircle && (
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute left-1/2 top-1/2 -z-10 aspect-square h-[250%] -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-150 ease-out",
            circleClass
          )}
        />
      )}

      {/* Left icon */}
      {!asChild && isIcon && (
        <span className="inline-flex shrink-0 items-center" aria-hidden="true">
          {isIcon}
        </span>
      )}

      {children}

      {/* Right icon */}
      {/* {!asChild && rightIcon && (
        <span className="inline-flex shrink-0 items-center" aria-hidden="true">
          {rightIcon}
        </span>
      )} */}
      
    </button>
  )
}

export { Button, buttonVariants }
