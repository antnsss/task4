import { useEffect, useState } from "react";
import { getAllPolls } from "../../lib/polls";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Stack,
  Button,
  Divider,
} from "@mui/material";

export default function HomePage() {
  const [polls, setPolls] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const data = await getAllPolls();
      setPolls(data);
    }
    load();
  }, []);

  return (
    <Box
      sx={{
        maxWidth: 800,
        mx: "auto",
        p: 4,
        minHeight: "100vh",
        bgcolor: "grey.100",
      }}
    >
      <Typography variant="h4" fontWeight="600" gutterBottom>
        Всі опитування
      </Typography>

      {polls.length === 0 ? (
        <Typography color="text.secondary">Більше немає опитувань</Typography>
      ) : (
        <Stack spacing={2} mt={2}>
          {polls.map((p) => (
            <Paper
              key={p.id}
              elevation={2}
              sx={{
                p: 3,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: 2,
              }}
            >
              <Box>
                <Typography variant="h6" fontWeight="500">
                  {p.title}
                </Typography>
                {p.questions?.map((q: any, i: number) => (
                  <Typography
                    key={i}
                    variant="body2"
                    color="text.secondary"
                    sx={{ ml: 1 }}
                  >
                    • {q.text}
                  </Typography>
                ))}
              </Box>

              <Stack direction="row" spacing={1}>
                <Button
                  component={RouterLink}
                  to={`/poll/${p.id}`}
                  variant="contained"
                  color="primary"
                  size="small"
                >
                  Пройти
                </Button>
                <Button
                  component={RouterLink}
                  to={`/stats/${p.id}`}
                  variant="outlined"
                  color="inherit"
                  size="small"
                >
                  Статистика
                </Button>
              </Stack>
            </Paper>
          ))}
        </Stack>
      )}
    </Box>
  );
}
