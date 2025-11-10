import { useParams } from 'react-router-dom'
import usePoll from '../../hooks/usePoll'
import { PieChart, Pie, Tooltip, Cell } from 'recharts'


export default function StatsPage() {
const { id } = useParams()
const { poll, loading } = usePoll(id)


if (loading) return <div>Loading...</div>
if (!poll) return <div>Poll not found</div>


const q = poll.questions[0]
const data = q.options.map((o: string, i: number) => ({ name: o, value: q.votes?.[i] ?? 0 }))


return (
<div>
<h1 className="text-2xl font-bold mb-4">Statistics — {poll.title}</h1>
<div className="bg-white p-4 rounded shadow">
<PieChart width={400} height={300}>
<Pie data={data} dataKey="value" nameKey="name" outerRadius={100} label />
<Tooltip />
{data.map((_, i) => (
<Cell key={i} />
))}
</PieChart>
</div>
</div>
)
}