"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { AnimatePresence } from "framer-motion";
import CustomToast from "./custom-toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      <AnimatePresence mode="sync">
        {toasts.map(function ({ id, title, description, action, ...props }) {
          return (
            <CustomToast key={id} {...props}>
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
              {action}
              <ToastClose />
            </CustomToast>
          );
        })}
      </AnimatePresence>
      <ToastViewport />
    </ToastProvider>
  );
}