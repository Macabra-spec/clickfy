import { useState, useEffect } from 'react'
import { ShoppingCart, Smartphone, Users, TrendingUp, Shield, Zap, ChevronRight, Moon, Sun, BookOpen, Globe, Palette } from 'lucide-react'

export default function LandingPage({ onGetStarted }) {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'))
  }, [])

  const toggleDark = () => {
    document.documentElement.classList.toggle('dark')
    const isDark = document.documentElement.classList.contains('dark')
    localStorage.setItem('clickfy-theme', isDark ? 'dark' : 'light')
    setDark(isDark)
  }

  const features = [
    { icon: <ShoppingCart className="w-6 h-6" />, title: 'Venda Digital', desc: 'Venda cursos, e-books e servicos com facilidade' },
    { icon: <Smartphone className="w-6 h-6" />, title: 'M-Pesa & E-Mola', desc: 'Pagamentos locais integrados para Mocambique' },
    { icon: <Shield className="w-6 h-6" />, title: 'Seguro', desc: 'Autenticacao e protecao de dados avancada' },
    { icon: <Zap className="w-6 h-6" />, title: 'Rapido', desc: 'Plataforma otimizada para velocidade' },
    { icon: <Users className="w-6 h-6" />, title: 'Chat Integrado', desc: 'Comunique-se com vendedores e compradores' },
    { icon: <TrendingUp className="w-6 h-6" />, title: 'Dashboard', desc: 'Acompanhe suas vendas e desempenho' },
  ]

  const steps = [
    { num: '1', title: 'Crie sua conta', desc: 'Registre-se como vendedor ou comprador' },
    { num: '2', title: 'Publique ou encontre', desc: 'Publique produtos ou explore o catalogo' },
    { num: '3', title: 'Venda e compre', desc: 'Receba pagamentos via M-Pesa ou E-Mola' },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-gray-900 dark:text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg border-b border-gray-100 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">CF</div>
            <span className="font-bold text-lg">ClickFy</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={toggleDark} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800">
              {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button onClick={onGetStarted} className="px-4 py-2 bg-sky-500 text-white rounded-lg font-medium text-sm hover:bg-sky-600 transition-colors">
              Entrar
            </button>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" /> O marketplace digital de Mocambique
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Venda e compre produtos digitais em{' '}
            <span className="text-sky-500">Mocambique</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            A plataforma completa para vender cursos, e-books, websites, design e servicos. Pague com M-Pesa, E-Mola ou WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={onGetStarted} className="px-8 py-3.5 bg-sky-500 text-white rounded-xl font-semibold text-lg hover:bg-sky-600 transition-colors flex items-center justify-center gap-2">
              Comecar agora <ChevronRight className="w-5 h-5" />
            </button>
            <button onClick={onGetStarted} className="px-8 py-3.5 bg-gray-100 dark:bg-slate-800 rounded-xl font-semibold text-lg hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors">
              Sou vendedor
            </button>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50 dark:bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-3 gap-8 text-center">
          <div><div className="text-3xl font-bold text-sky-500">500+</div><div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Vendedores</div></div>
          <div><div className="text-3xl font-bold text-sky-500">2K+</div><div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Produtos</div></div>
          <div><div className="text-3xl font-bold text-sky-500">10K+</div><div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Compradores</div></div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Como funciona</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.num} className="text-center">
                <div className="w-12 h-12 bg-sky-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">{s.num}</div>
                <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-gray-500 dark:text-gray-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50 dark:bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Tudo que precisa</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-100 dark:border-slate-700 hover:shadow-lg transition-shadow">
                <div className="w-10 h-10 bg-sky-50 dark:bg-sky-500/10 text-sky-500 rounded-lg flex items-center justify-center mb-4">{f.icon}</div>
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Pronto para comecar?</h2>
          <p className="text-sky-100 mb-8">Junte-se a milhares de vendedores e compradores em Mocambique</p>
          <button onClick={onGetStarted} className="px-8 py-3.5 bg-white text-sky-600 rounded-xl font-semibold text-lg hover:bg-sky-50 transition-colors">
            Criar conta gratis
          </button>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-gray-100 dark:border-slate-800">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-sky-500 rounded flex items-center justify-center text-white font-bold text-xs">CF</div>
            <span>ClickFy Mozambique</span>
          </div>
          <div>&copy; 2026 ClickFy. Todos os direitos reservados.</div>
        </div>
      </footer>
    </div>
  )
}
