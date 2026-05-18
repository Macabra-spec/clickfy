import { useEffect, useState } from 'react'
import { useAuthStore } from './store/authStore'
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/AuthPage'
import MainApp from './pages/MainApp'

export default function App() {
  const { user, profile, loading, checkSession } = useAuthStore()
  const [showAuth, setShowAuth] = useState(false)

  useEffect(() => {
    checkSession()
    const saved = localStorage.getItem('clickfy-theme')
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    }
  }, [checkSession])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-slate-950">
        <div className="animate-pulse text-center">
          <div className="text-5xl mb-4">🎯</div>
          <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">ClickFy</p>
        </div>
      </div>
    )
  }

  if (!user) {
    if (showAuth) return <AuthPage onBack={() => setShowAuth(false)} />
    return <LandingPage onGetStarted={() => setShowAuth(true)} />
  }

  return <MainApp profile={profile} />
}
