import { toast as sonnerToast } from "sonner";

// Simple wrapper to match your existing API
export const useToast = () => {
  const toast = ({
    title,
    description,
    variant = "default",
    action,
  }: {
    title?: string;
    description?: string;
    variant?: "default" | "destructive";
    action?: {
      label: string;
      onClick: () => void;
    };
  }) => {
    const message = title || description || "";
    const options: any = {};

    if (description && title) {
      options.description = description;
    }

    if (action) {
      options.action = {
        label: action.label,
        onClick: action.onClick,
      };
    }

    switch (variant) {
      case "destructive":
        return sonnerToast.error(message, options);
      default:
        return sonnerToast(message, options);
    }
  };

  return {
    toast,
    dismiss: sonnerToast.dismiss,
  };
};

// Export individual toast functions for convenience
export const toast = {
  success: (message: string, options?: any) => sonnerToast.success(message, options),
  error: (message: string, options?: any) => sonnerToast.error(message, options),
  info: (message: string, options?: any) => sonnerToast.info(message, options),
  warning: (message: string, options?: any) => sonnerToast.warning(message, options),
  default: (message: string, options?: any) => sonnerToast(message, options),
  dismiss: sonnerToast.dismiss,
};
