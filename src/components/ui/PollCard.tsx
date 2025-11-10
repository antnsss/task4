export default function PollCard({ poll }: { poll: any }) {
  return (
    <div className="border p-3 rounded shadow-sm">
      <h2 className="font-semibold">{poll.title}</h2>
      <p className="text-sm text-gray-600">{poll.description}</p>
    </div>
  );
}
