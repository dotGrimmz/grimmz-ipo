import React from "react";
import { Snackbar, Alert } from "@mui/material";

interface ToastProps {
  message: string;
  open: boolean;
  onClose: () => void;
  duration?: number;
  severity?: "success" | "info" | "warning" | "error";
}

const Toast: React.FC<ToastProps> = ({
  message,
  open,
  onClose,
  duration = 3000,
  severity = "info",
}) => {
  return (
    <Snackbar open={open} autoHideDuration={duration} onClose={onClose}>
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
