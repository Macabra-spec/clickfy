import { useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { ArrowLeft, Eye, EyeOff, User, Store } from 'lucide-react'

export default function AuthPage({ onBack }) {
  const { signUp, signIn } = useAuthStore()
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', role: 'buyer' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (isLogin) {
        await signIn(form.email, form.password)
      } else {
        await signUp(form.email, form.password, form.name, form.role, form.phone)
      }
    } catch (err) {
      setError(err.message || 'Erro ao processar')
    } finally {
      setLoading(false)
    }
  }

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }))

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col">
      <div className="p-4">
        <button onClick={onBack} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800">
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>
      <div className="flex-1 flex items-center justify-center px-4 pb-8">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-sky-500 rounded-xl flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">CF</div>
            <h1 className="text-2xl font-bold">{isLogin ? 'Entrar' : 'Criar conta'}</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              {isLogin ? 'Acesse sua conta ClickFy' : 'Junte-se ao marketplace digital'}
            </p>
          </div>
          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-lg text-sm">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Nome completo</label>
                  <input type="text" value={form.name} onChange={(e) => set('name', e.target.value)} required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 focus:ring-2 focus:ring-sky-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Telefone</label>
                  <div className="flex">
                    <span className="px-3 py-2.5 bg-gray-100 dark:bg-slate-700 border border-r-0 border-gray-200 dark:border-slate-600 rounded-l-lg text-sm">+258</span>
                    <input type="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)}
                      className="flex-1 px-4 py-2.5 rounded-r-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 focus:ring-2 focus:ring-sky-500 outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Tipo de conta</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button type="button" onClick={() => set('role', 'buyer')}
                      className={`p-3 rounded-lg border-2 flex flex-col items-center gap-1 transition-colors ${form.role === 'buyer' ? 'border-sky-500 bg-sky-50 dark:bg-sky-500/10' : 'border-gray-200 dark:border-slate-700'}`}>
                      <User className="w-5 h-5" /><span className="text-sm font-medium">Comprador</span>
                    </button>
                    <button type="button" onClick={() => set('role', 'seller')}
                      className={`p-3 rounded-lg border-2 flex flex-col items-center gap-1 transition-colors ${form.role === 'seller' ? 'border-sky-500 bg-sky-50 dark:bg-sky-500/10' : 'border-gray-200 dark:border-slate-700'}`}>
                      <Store className="w-5 h-5" /><span className="text-sm font-medium">Vendedor</span>
                    </button>
                  </div>
                </div>
              </>
            )}
            <div>
              <label className="block text-sm font-medium mb-1.5">Email</label>
              <input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 focus:ring-2 focus:ring-sky-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Senha</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} value={form.password} onChange={(e) => set('password', e.target.value)} required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 focus:ring-2 focus:ring-sky-500 outline-none pr-10" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3 bg-sky-500 text-white rounded-lg font-semibold hover:bg-sky-600 disabled:opacity-50 transition-colors">
              {loading ? 'Aguarde...' : isLogin ? 'Entrar' : 'Criar conta'}
            </button>
          </form>
          <p className="text-center text-sm mt-6 text-gray-500 dark:text-gray-400">
            {isLogin ? 'Nao tem conta?' : 'Ja tem conta?'}{' '}
            <button onClick={() => { setIsLogin(!isLogin); setError('') }} className="text-sky-500 font-medium">
              {isLogin ? 'Criar conta' : 'Entrar'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
