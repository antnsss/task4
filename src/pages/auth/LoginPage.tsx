import { useState } from 'react'
import { signInWithGoogle, signInEmail } from '../../lib/auth'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const nav = useNavigate()

  const handleEmail = async () => {
    try {
      await signInEmail(email, password)
      nav('/')
    } catch (err) {
      alert((err as Error).message)
    }
  }

  const handleGoogle = async () => {
    try {
      await signInWithGoogle()
      nav('/')
    } catch (err) {
      alert((err as Error).message)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <input className="border p-2 w-full mb-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="border p-2 w-full mb-2" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <div className="flex items-center justify-between">
        <button onClick={handleEmail} className="px-4 py-2 bg-blue-600 text-white rounded">Sign in</button>
        <button onClick={handleGoogle} className="px-4 py-2 border rounded">Sign in with Google</button>
      </div>
    </div>
  )
}
