import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle, signInEmail } from "../../lib/auth";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
  Divider,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleEmail = async () => {
    try {
      await signInEmail(email, password);
      nav("/");
    } catch (err) {
      alert((err as Error).message);
    }
  };

  const handleGoogle = async () => {
    try {
      await signInWithGoogle();
      nav("/");
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "grey.100",
        px: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 400,
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" fontWeight="600" textAlign="center" mb={3}>
          Login
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleEmail}
            fullWidth
          >
            Sign in
          </Button>

          <Divider>or</Divider>

          <Button
            variant="outlined"
            startIcon={<GoogleIcon />}
            onClick={handleGoogle}
            fullWidth
          >
            Sign in with Google
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
