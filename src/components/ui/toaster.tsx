import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { CustomToast } from "./custom-toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <CustomToast
            key={id}
            title={title}
            description={description}
            variant={props.variant === "destructive" ? "error" : props.variant === "default" ? "success" : "default"}
            {...props}
          />
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}