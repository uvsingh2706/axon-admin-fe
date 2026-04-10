import * as React from "react"
import { Slot } from "radix-ui"
import { cn } from "@/lib/utils"
import { ChevronRightIcon } from "lucide-react"


function Breadcrumb({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      aria-label="breadcrumb"
      data-slot="breadcrumb"
      className={cn(className)}
      {...props}
    />
  )
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "flex flex-wrap items-center gap-1.5 text-sm wrap-break-word text-muted-foreground sm:gap-2.5",
        className
      )}
      {...props}
    />
  )
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  )
}

function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<"a"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "a"

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn(
        "transition-colors hover:text-foreground cursor-pointer",
        className
      )}
      {...props}
    />
  )
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("font-normal text-foreground", className)}
      {...props}
    />
  )
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <ChevronRightIcon />}
    </li>
  )
}

export interface BreadcrumbItemProps {
  name: string
  href?: string
  active?: boolean
}

interface BreadcrumbsProps {
  items: BreadcrumbItemProps[]
  className?: string
  separator?: React.ReactNode
  onItemClick?: (index: number) => void
}


function Breadcrumbs({
  items,
  className,
  separator = "/",
  onItemClick,
}: BreadcrumbsProps) {
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {items.map((item, index) => (
          <React.Fragment key={`${item.name}-${index}`}>
            <BreadcrumbItem>
              {item.active ? (
                <BreadcrumbPage>{item.name}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink
                  href={item.href || "#"}
                  onClick={(e) => {
                    e.preventDefault()
                    onItemClick?.(index)
                  }}
                >
                  {item.name}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < items.length - 1 && (
              <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export function useBreadcrumbs(initial: BreadcrumbItemProps[] = []) {
  const [items, setItems] = React.useState<BreadcrumbItemProps[]>(() =>
    initial.map((item, i, arr) => ({
      ...item,
      active: i === arr.length - 1,
    }))
  )

  const push = (item: Omit<BreadcrumbItemProps, "active">) => {
    setItems((prev) => [
      ...prev.map((i) => ({ ...i, active: false })),
      { ...item, active: true },
    ])
  }

  const navigateTo = (index: number) => {
    setItems((prev) =>
      prev.slice(0, index + 1).map((item, i, arr) => ({
        ...item,
        active: i === arr.length - 1,
      }))
    )
  }

  /** Reset to the original initial state */
  // const reset = () => {
  //   setItems(
  //     initial.map((item, i, arr) => ({
  //       ...item,
  //       active: i === arr.length - 1,
  //     }))
  //   )
  // }

  // return { items, push, navigateTo, reset }
  return { items, push, navigateTo }
}

export { Breadcrumbs }