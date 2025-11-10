import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { signOutUser } from '../../lib/auth'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="font-bold text-xl">Polls</Link>
          <nav className="space-x-4 flex items-center">
            <Link to="/create" className="px-3 py-1 rounded bg-blue-600 text-white">Create</Link>

            {!loading && !user && (
              <>
                <Link to="/auth/login" className="text-sm">Login</Link>
                <Link to="/auth/register" className="text-sm">Register</Link>
              </>
            )}

            {user && (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">{user.email}</span>
                <button onClick={() => signOutUser()} className="text-sm text-red-600">Sign out</button>
              </div>
            )}
          </nav>
        </div>
      </header>
      <main className="max-w-5xl mx-auto p-6">{children}</main>
    </div>
  )
}
