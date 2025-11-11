import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { signOutUser } from "../../lib/auth";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Stack,
  Container,
} from "@mui/material";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f9fafb" }}>
      <AppBar position="static" color="inherit" elevation={1}>
        <Container maxWidth="lg">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              component={Link}
              to="/"
              variant="h6"
              sx={{
                textDecoration: "none",
                fontWeight: "bold",
                color: "primary.main",
              }}
            >
              Опитування
            </Typography>

            <Stack direction="row" spacing={2} alignItems="center">
              <Button
                component={Link}
                to="/create"
                variant="contained"
                color="primary"
              >
                Створити
              </Button>

              {!loading && !user && (
                <>
                  <Button
                    component={Link}
                    to="/auth/login"
                    color="inherit"
                    size="small"
                  >
                    Login
                  </Button>
                  <Button
                    component={Link}
                    to="/auth/register"
                    color="inherit"
                    size="small"
                  >
                    Register
                  </Button>
                </>
              )}

              {user && (
                <Stack direction="row" spacing={1} alignItems="center">
                  <Avatar
                    sx={{
                      bgcolor: "primary.main",
                      width: 32,
                      height: 32,
                      fontSize: 14,
                    }}
                  >
                    {user.email?.[0]?.toUpperCase()}
                  </Avatar>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {user.email}
                  </Typography>
                  <Button
                    color="error"
                    size="small"
                    onClick={() => signOutUser()}
                  >
                    вийти
                  </Button>
                </Stack>
              )}
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
        {children}
      </Container>
    </Box>
  );
}
