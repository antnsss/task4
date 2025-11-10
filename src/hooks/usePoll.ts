import { useEffect, useState } from 'react'
import { getPoll } from '../lib/polls'
import type { Poll } from '../types/poll'



export default function usePoll(id?: string) {
const [poll, setPoll] = useState<Poll | null>(null)
const [loading, setLoading] = useState(false)


useEffect(() => {
if (!id) return
setLoading(true)
getPoll(id)
.then((p) => setPoll(p))
.finally(() => setLoading(false))
}, [id])


return { poll, loading, setPoll }
}