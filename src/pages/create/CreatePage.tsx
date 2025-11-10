// src/pages/poll/CreatePage.tsx
import { useNavigate } from "react-router-dom";
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
      // передаємо ownerId як другий аргумент
      const id = await createPoll(payload, auth.currentUser.uid);
      nav(`/poll/${id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to create poll");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create Poll</h1>
      <PollForm onSubmit={handleCreate} />
    </div>
  );
}
