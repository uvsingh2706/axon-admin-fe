// import { useTheme } from "next-themes"
// import { Toaster as Sonner, type ToasterProps } from "sonner"
// import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

// const Toaster = ({ ...props }: ToasterProps) => {
//   const { theme = "system" } = useTheme()

//   return (
//     <Sonner
//       theme={theme as ToasterProps["theme"]}
//       className="toaster group"
//       icons={{
//         success: (
//           <CircleCheckIcon className="size-4" />
//         ),
//         info: (
//           <InfoIcon className="size-4" />
//         ),
//         warning: (
//           <TriangleAlertIcon className="size-4" />
//         ),
//         error: (
//           <OctagonXIcon className="size-4" />
//         ),
//         loading: (
//           <Loader2Icon className="size-4 animate-spin" />
//         ),
//       }}
//       style={
//         {
//           "--normal-bg": "var(--popover)",
//           "--normal-text": "var(--popover-foreground)",
//           "--normal-border": "var(--border)",
//           "--border-radius": "var(--radius)",
//         } as React.CSSProperties
//       }
//       toastOptions={{
//         classNames: {
//           toast: "cn-toast",
//         },
//       }}
//       {...props}
//     />
//   )
// }

// export { Toaster }




import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import TickImage from "@/assets/images/tick.webp"
import CloseIcon from "@/assets/icons/CloseIcon"
import ErrorIcon from "@/assets/icons/ErrorIcon"
import { InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      closeButton={true}
      position="top-right"
      icons={{
        success: (
          <div className="relative flex items-center justify-center w-12 h-12 shrink-0">
            {/* Image Replacement */}
            <div className="relative bottom-3 right-0 w-8 h-8 rounded-full overflow-hidden shadow-sm flex items-center justify-center">
              <img src={TickImage} alt="Success" className="w-full h-full object-cover" />
            </div>
          </div>
        ),
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <ErrorIcon className="w-12 h-12 shrink-0 -mt-8" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
        close: <CloseIcon className="w-[1.5rem] h-[1.5rem] text-text-400 hover:text-text-600 transition-colors opacity-100 rotate-0" />,
      }}
      style={
        {
          "--normal-bg": "var(--background)",
          "--normal-text": "var(--color-text-900)",
          "--normal-border": "var(--color-green-c2)",
          "--border-radius": "0.75rem",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast relative flex items-center justify-between w-full max-w-md min-h-24 p-0 border opacity-100 gap-3",
          title: "text-[1rem] font-bold text-text-950 leading-tight",
          description: "text-sm text-text-700 font-medium leading-tight",
          content: "flex-1 ml-8 py-[0.75rem]",
          closeButton: "absolute !top-[1.25rem] !right-[1.25rem] !left-auto !w-[1.5rem] !h-[1.5rem] !p-0 flex items-center justify-center !bg-transparent !hover:bg-transparent !border-none transition-colors opacity-100 rotate-0",
          error: "!border-red-c2",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
