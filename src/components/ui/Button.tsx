import { Button as MuiButton } from "@mui/material";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  color?: "primary" | "secondary" | "error" | "success" | "info" | "warning";
  variant?: "contained" | "outlined" | "text";
  fullWidth?: boolean;
  disabled?: boolean;
}

export default function Button({
  children,
  onClick,
  color = "primary",
  variant = "contained",
  fullWidth = false,
  disabled = false,
}: ButtonProps) {
  return (
    <MuiButton
      onClick={onClick}
      color={color}
      variant={variant}
      fullWidth={fullWidth}
      disabled={disabled}
      sx={{ textTransform: "none", borderRadius: 2, py: 1.2, px: 2.5 }}
    >
      {children}
    </MuiButton>
  );
}
