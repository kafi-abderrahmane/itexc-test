import React, { forwardRef } from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Snackbar, SnackbarProps } from "@mui/material";

interface SnackbarCustomProps extends SnackbarProps {
  open: boolean;
  type: "success" | "info" | "warning" | "error";
  message: string;
  onClose: () => void;
}

const SnackbarCustom: React.FC<SnackbarCustomProps> = ({
  open,
  type,
  message,
  onClose,
  ...rest
}) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose} {...rest}>
      <Alert onClose={onClose} severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarCustom;

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} {...props} />;
});
