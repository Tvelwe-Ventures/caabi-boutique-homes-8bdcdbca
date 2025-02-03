import { useToast } from "@/hooks/use-toast"
import {
  ToastProvider,
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
            title={title?.toString()}
            description={description?.toString()}
            variant={props.variant === "destructive" ? "error" : "default"}
            {...props}
          />
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}