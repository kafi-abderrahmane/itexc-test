import React, {
  useState,
  useMemo,
  createContext,
  ReactNode,
  useContext,
} from "react";
import Snackbar from "@/components/Snackbar";

interface SnackBarState {
  open: boolean;
  type: "success" | "info" | "warning" | "error";
  message: string;
}

interface SnackBarContextType {
  setSnack: React.Dispatch<React.SetStateAction<SnackBarState>>;
  snack: SnackBarState;
}

interface SnackBarProviderProps {
  children: ReactNode;
}

const SnackBarContext = createContext<SnackBarContextType | undefined>(
  undefined
);

const SnackBarProvider: React.FC<SnackBarProviderProps> = ({ children }) => {
  const [snack, setSnack] = useState<SnackBarState>({
    open: false,
    type: "success",
    message: "",
  });

  const storeValue = useMemo(
    () => ({
      setSnack,
      snack,
    }),
    [snack]
  );

  return (
    <SnackBarContext.Provider value={storeValue}>
      <Snackbar
        open={snack?.open}
        type={snack?.type}
        message={snack?.message}
        onClose={() => setSnack({ ...snack, open: false })}
      />
      {children}
    </SnackBarContext.Provider>
  );
};

const useSnackBar = () => {
  const context = useContext(SnackBarContext);
  if (!context) {
    throw new Error("useSnackBar must be used within an AuthProvider");
  }
  return context;
};

export { SnackBarProvider, useSnackBar };
