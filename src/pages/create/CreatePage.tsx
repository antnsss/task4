import PollForm from "../../components/common/PollForm";
import { createPoll } from "../../lib/polls";
import { useNavigate } from "react-router-dom";

export default function CreatePage() {
  const nav = useNavigate();

  const handleCreate = async (payload: any) => {
    try {
      const id = await createPoll(payload);
      nav(`/poll/${id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to create poll");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create Poll</h1>
      <PollForm onSubmit={handleCreate} />
    </div>
  );
}
