import { TextField } from "@mui/material";

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  type?: string;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
}

export default function Input({
  value,
  onChange,
  placeholder,
  label,
  type = "text",
  error = false,
  helperText,
  fullWidth = true,
}: InputProps) {
  return (
    <TextField
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      label={label}
      type={type}
      error={error}
      helperText={helperText}
      fullWidth={fullWidth}
      variant="outlined"
      size="small"
      sx={{
        backgroundColor: "white",
        borderRadius: 2,
        "& .MuiOutlinedInput-root": {
          borderRadius: 2,
        },
      }}
    />
  );
}
