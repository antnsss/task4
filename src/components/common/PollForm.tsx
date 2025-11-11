import { useState } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  IconButton,
  Radio,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import type { Question } from "../../types/poll";

interface PollFormProps {
  onSubmit: (poll: { title: string; questions: Question[] }) => void;
}

export default function PollForm({ onSubmit }: PollFormProps) {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState<Question[]>([
    { text: "", options: ["", ""], votes: [], correctOptionIndex: undefined },
  ]);

  const addQuestion = () =>
    setQuestions([
      ...questions,
      { text: "", options: ["", ""], votes: [], correctOptionIndex: undefined },
    ]);

  const setQuestionText = (index: number, text: string) => {
    setQuestions((qs) => qs.map((q, i) => (i === index ? { ...q, text } : q)));
  };

  const addOption = (qIndex: number) => {
    setQuestions((qs) =>
      qs.map((q, i) =>
        i === qIndex ? { ...q, options: [...q.options, ""] } : q
      )
    );
  };

  const setOption = (qIndex: number, oIndex: number, value: string) => {
    setQuestions((qs) =>
      qs.map((q, i) =>
        i === qIndex
          ? {
              ...q,
              options: q.options.map((o, idx) => (idx === oIndex ? value : o)),
            }
          : q
      )
    );
  };

  const setCorrectOption = (qIndex: number, oIndex: number) => {
    setQuestions((qs) =>
      qs.map((q, i) =>
        i === qIndex ? { ...q, correctOptionIndex: oIndex } : q
      )
    );
  };

  const handleSubmit = () => {
    if (!title.trim()) return alert("Enter poll title");

    const cleaned = questions.map((q) => ({
      ...q,
      options: q.options.filter(Boolean),
      votes: q.options.filter(Boolean).map(() => 0),
    }));

    onSubmit({ title, questions: cleaned });
    setTitle("");
    setQuestions([
      { text: "", options: ["", ""], votes: [], correctOptionIndex: undefined },
    ]);
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Створити опитування
        </Typography>

        <TextField
          fullWidth
          label="Poll title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 3 }}
        />

        {questions.map((q, qi) => (
          <Paper
            key={qi}
            sx={{ p: 2, mb: 2, backgroundColor: "#fafafa" }}
            elevation={0}
          >
            <Typography variant="subtitle1" gutterBottom>
              Question {qi + 1}
            </Typography>

            <TextField
              fullWidth
              label="Question text"
              variant="outlined"
              value={q.text}
              onChange={(e) => setQuestionText(qi, e.target.value)}
              sx={{ mb: 2 }}
            />

            <Stack spacing={1}>
              {q.options.map((opt, oi) => (
                <Stack key={oi} direction="row" alignItems="center" spacing={1}>
                  <Radio
                    checked={q.correctOptionIndex === oi}
                    onChange={() => setCorrectOption(qi, oi)}
                  />
                  <TextField
                    label={`Option ${oi + 1}`}
                    value={opt}
                    onChange={(e) => setOption(qi, oi, e.target.value)}
                    fullWidth
                  />
                </Stack>
              ))}
            </Stack>

            <Button
              onClick={() => addOption(qi)}
              startIcon={<AddIcon />}
              size="small"
              sx={{ mt: 1 }}
            >
              Add option
            </Button>
          </Paper>
        ))}

        <Stack direction="row" spacing={2} mt={2}>
          <Button variant="outlined" onClick={addQuestion}>
            + Add Question
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Create Poll
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
