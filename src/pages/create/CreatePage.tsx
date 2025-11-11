import { useNavigate } from "react-router-dom";
import { Typography, Box, Paper } from "@mui/material";
import PollForm from "../../components/common/PollForm";
import { createPoll } from "../../lib/polls";
import { auth } from "../../lib/firebase";
import type { Question } from "../../types/poll";

export default function CreatePage() {
  const nav = useNavigate();

  const handleCreate = async (payload: { title: string; questions: Question[] }) => {
    if (!auth.currentUser) {
      alert("You must be logged in to create a poll");
      return;
    }

    try {
      const id = await createPoll(payload, auth.currentUser.uid);
      nav(`/poll/${id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to create poll");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "grey.100",
        py: 6,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 800,
          p: 4,
          borderRadius: 3,
        }}
      >
        <Typography variant="h4" fontWeight="600" gutterBottom>
          Create Poll
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          Fill in the poll title and add your questions with possible answers.
        </Typography>

        <PollForm onSubmit={handleCreate} />
      </Paper>
    </Box>
  );
}
