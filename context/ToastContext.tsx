import Toast from "@/components/Toast";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ToastContextType {
  showToast: (
    message: string,
    severity?: "success" | "info" | "warning" | "error",
    duration?: number
  ) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastSeverity, setToastSeverity] = useState<
    "success" | "info" | "warning" | "error"
  >("info");
  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [toastDuration, setToastDuration] = useState<number>(3000);

  const showToast = (
    message: string,
    severity: "success" | "info" | "warning" | "error" = "info",
    duration: number = 1750
  ) => {
    setToastMessage(message);
    setToastSeverity(severity);
    setToastDuration(duration);
    setToastOpen(true);
  };

  const handleCloseToast = () => {
    setToastOpen(false);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast
        message={toastMessage}
        open={toastOpen}
        onClose={handleCloseToast}
        duration={toastDuration}
        severity={toastSeverity}
      />
    </ToastContext.Provider>
  );
};

// Custom hook to use the Toast context
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
