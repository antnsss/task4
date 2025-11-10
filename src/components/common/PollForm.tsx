import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

interface QuestionForm {
  text: string;
  options: string[];
}

interface PollFormProps {
  onSubmit: (payload: { title: string; questions: QuestionForm[] }) => void;
}

export default function PollForm({ onSubmit }: PollFormProps) {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState<QuestionForm[]>([
    { text: "", options: ["", ""] },
  ]);

  // Додаємо нове питання
  const addQuestion = () => {
    setQuestions((q) => [...q, { text: "", options: ["", ""] }]);
  };

  // Оновлюємо текст питання
  const setQuestionText = (index: number, text: string) => {
    setQuestions((q) => q.map((qt, i) => (i === index ? { ...qt, text } : qt)));
  };

  // Додаємо варіант відповіді для питання
  const addOption = (qIndex: number) => {
    setQuestions((q) =>
      q.map((qt, i) =>
        i === qIndex ? { ...qt, options: [...qt.options, ""] } : qt
      )
    );
  };

  // Оновлюємо варіант відповіді
  const setOption = (qIndex: number, oIndex: number, value: string) => {
    setQuestions((q) =>
      q.map((qt, i) =>
        i === qIndex
          ? {
              ...qt,
              options: qt.options.map((opt, j) => (j === oIndex ? value : opt)),
            }
          : qt
      )
    );
  };

  const handleSubmit = () => {
    // Відфільтровуємо пусті питання та варіанти
    const filtered = questions
      .filter((q) => q.text.trim() !== "")
      .map((q) => ({
        text: q.text,
        options: q.options.filter((o) => o.trim() !== ""),
        votes: q.options.filter((o) => o.trim() !== "").map(() => 0),
      }));

    if (!title.trim() || filtered.length === 0) {
      return alert("Title and at least one question with options are required");
    }

    onSubmit({ title, questions: filtered });

    // Скидаємо форму
    setTitle("");
    setQuestions([{ text: "", options: ["", ""] }]);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block font-medium">Poll Title</label>
        <Input value={title} onChange={setTitle} placeholder="Title" />
      </div>

      {questions.map((q, qi) => (
        <div key={qi} className="border p-4 rounded space-y-3">
          <div>
            <label className="block font-medium">Question {qi + 1}</label>
            <Input
              value={q.text}
              onChange={(t: string) => setQuestionText(qi, t)}
              placeholder="Question text"
            />
          </div>

          <div>
            <label className="block font-medium">Options</label>
            <div className="space-y-2">
              {q.options.map((opt, oi) => (
                <Input
                  key={oi}
                  value={opt}
                  onChange={(v: string) => setOption(qi, oi, v)}
                  placeholder={`Option ${oi + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => addOption(qi)}
              type="button"
              className="text-sm text-blue-600 mt-1"
            >
              + Add option
            </button>
          </div>
        </div>
      ))}

      <div className="flex gap-2">
        <Button onClick={addQuestion}>+ Add Question</Button>
        <Button onClick={handleSubmit}>Create Poll</Button>
      </div>
    </div>
  );
}
