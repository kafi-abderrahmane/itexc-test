import { Stack } from "@mui/material";
import { StandardTextFieldProps, TextField, InputLabel } from "@mui/material";
import "./textfield.scss";
interface InTextField_w_LabelProps extends StandardTextFieldProps {
  label?: string;
}

const InTextField_w_Label: React.FC<InTextField_w_LabelProps> = ({
  label,
  ...rest
}) => {
  return (
    <Stack spacing={1.5}>
      {label && (
        <InputLabel
          htmlFor={rest.id}
          style={{
            fontSize: "14px",
            fontWeight: "600",
            color: "#192252",
            textTransform: "capitalize",
          }}>
          {label}
        </InputLabel>
      )}
      <TextField
        {...rest}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            height: "48px",
            "& .MuiInputBase-input": {
              padding: "12px 14px",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#192252",
            },
          },
        }}
      />
    </Stack>
  );
};

export default InTextField_w_Label;
