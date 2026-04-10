import * as React from "react"
import { AlertDialog as AlertDialogPrimitive } from "radix-ui"
import CloseIcon from "@/assets/icons/CloseIcon"
import { cn } from "@/lib/utils"
import { Button } from "@/component/ui/button"

function AlertDialog({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
}

function AlertDialogTrigger({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  )
}

function AlertDialogPortal({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  )
}

function AlertDialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogContent({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Content> & {
  size?: "default" | "sm"
}) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        data-size={size}
        className={cn(
          "group/alert-dialog-content fixed top-1/2 left-1/2 z-50 grid",
          "w-[23.5625rem] h-[15.75rem] -translate-x-1/2 -translate-y-1/2", 
          "gap-0 rounded-[1.5rem] bg-popover", 
          "pt-[3.75rem] px-4 pb-6", 
          "text-popover-foreground border border-foreground/10", 
          "duration-100 outline-none",
          
          "data-[size=default]:max-w-none data-[size=sm]:max-w-none sm:data-[size=default]:max-w-none",
          "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        {...props}
      >
        <AlertDialogPrimitive.Cancel className="absolute right-4 top-4 opacity-100 transition-opacity cursor-pointer">
          <CloseIcon className="w-[1.75rem] h-[1.75rem]" />
          <span className="sr-only">Close</span>
        </AlertDialogPrimitive.Cancel>
        {props.children}
      </AlertDialogPrimitive.Content>
    </AlertDialogPortal>
    

  )
}

function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn(
          "flex flex-col items-center text-center",
        "w-[14.8125rem] h-[6.5rem] mx-auto gap-2", 
        className
      )}
      {...props}
    />
  )
}

function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
          "flex flex-row items-center justify-center auto-cols-fr",
        "w-[21.5625rem] h-[2.5rem] mx-auto gap-2", 
        className
      )}
      {...props}
    />
  )
}

function AlertDialogMedia({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-media"
      className={cn(
         "inline-flex size-12 items-center justify-center", 
        "opacity-100", 
        className
      )}
      {...props}
    />
  )
}

function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn(
        "font-heading text-lg font-medium sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn(
       "w-[14.8125rem] h-[3rem] mx-auto", 
        // Typography
        "text-base font-normal leading-[1.5] text-center",
        "color-gray-c3:",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogAction({
  className,
  variant = "primary",
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action> &
 {
  variant?: "primary" | "secondary" | "tertiary"
}) {
  return (
    <Button 
      variant={variant} 
      className={cn(
        "w-[6.125rem] h-[2.5rem] border-[0.5px] rounded-[8px]", 
         variant === "primary" && ["bg-red-c1 text-white border-red-c1 hover:bg-red-c1/90","active:bg-red-c1/80","focus-visible:ring-red-c1/50"],
        className
      )} 
      asChild
    >
      <AlertDialogPrimitive.Action
        data-slot="alert-dialog-action"
        {...props}
      />
    </Button>
  )
}

function AlertDialogCancel({
  className,
  variant = "secondary",


  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel> &
  { variant?: "primary" | "secondary" | "tertiary"}){
     return (
    <Button 
      variant={variant} 

      className={cn(
        "w-[6.125rem] h-[2.5rem] border-[0.5px] rounded-[8px]", // Matches action button size
        className
      )} 
      asChild
    >
      <AlertDialogPrimitive.Cancel
        data-slot="alert-dialog-cancel"
        {...props}
      />
  
    </Button>
  )
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
}
