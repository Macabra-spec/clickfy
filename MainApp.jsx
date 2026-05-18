import { useState } from 'react'
import { useAuthStore } from '../store/authStore'
import {
  Home, Search, Plus, MessageCircle, User, Moon, Sun, LogOut, Star, Heart,
  ShoppingCart, Phone, ChevronLeft, Send, Bell, TrendingUp, Package,
  DollarSign, Eye, BookOpen, Globe, Palette, Smartphone, Users, BarChart3,
  CheckCircle, Flag, Share2
} from 'lucide-react'

const CATS = [
  { id: 'all', name: 'Todos', icon: <Package className="w-4 h-4" /> },
  { id: 'cursos', name: 'Cursos', icon: <BookOpen className="w-4 h-4" /> },
  { id: 'ebooks', name: 'E-books', icon: <Globe className="w-4 h-4" /> },
  { id: 'websites', name: 'Websites', icon: <Globe className="w-4 h-4" /> },
  { id: 'design', name: 'Design', icon: <Palette className="w-4 h-4" /> },
  { id: 'apps', name: 'Apps', icon: <Smartphone className="w-4 h-4" /> },
  { id: 'mentoria', name: 'Mentoria', icon: <Users className="w-4 h-4" /> },
  { id: 'marketing', name: 'Marketing', icon: <BarChart3 className="w-4 h-4" /> },
]

const PRODUCTS = [
  { id: 1, title: 'Curso Completo de React', cat: 'cursos', price: 2500, seller: 'Joao Silva', rating: 4.8, reviews: 23, img: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400', desc: 'Aprenda React do zero ao avancado com projetos praticos.', items: ['10 modulos', '50 video-aulas', 'Certificado', 'Suporte'] },
  { id: 2, title: 'E-book: Marketing Digital em Mocambique', cat: 'ebooks', price: 800, seller: 'Ana Machel', rating: 4.5, reviews: 15, img: 'https://images.pexels.com/photos/6476808/pexels-photo-6476808.jpeg?auto=compress&cs=tinysrgb&w=400', desc: 'Guia completo de marketing digital para o mercado mocambicano.', items: ['150 paginas', 'Templates', 'Checklists'] },
  { id: 3, title: 'Website para Negocios', cat: 'websites', price: 15000, seller: 'TechMoz', rating: 4.9, reviews: 31, img: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400', desc: 'Website profissional completo para seu negocio.', items: ['Design responsivo', 'SEO', 'Dominio .mz', 'Hospedagem 1 ano'] },
  { id: 4, title: 'Design de Logo Profissional', cat: 'design', price: 3500, seller: 'CriaMoz', rating: 4.7, reviews: 18, img: 'https://images.pexels.com/photos/326312/pexels-photo-326312.jpeg?auto=compress&cs=tinysrgb&w=400', desc: 'Logo profissional para sua marca ou empresa.', items: ['3 conceitos', 'Revisoes ilimitadas', 'Arquivos AI/PNG/SVG'] },
  { id: 5, title: 'App de Delivery - Codigo Fonte', cat: 'apps', price: 8000, seller: 'DevMoz', rating: 4.6, reviews: 9, img: 'https://images.pexels.com/photos/147413/instagram-phone-phone-smartphone-147413.jpeg?auto=compress&cs=tinysrgb&w=400', desc: 'Codigo fonte completo de app de delivery.', items: ['React Native', 'Node.js Backend', 'Documentacao', 'Suporte 30 dias'] },
  { id: 6, title: 'Mentoria de Carreira Tech', cat: 'mentoria', price: 5000, seller: 'Paulo Mondlane', rating: 5.0, reviews: 7, img: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400', desc: '4 sessoes de mentoria para sua carreira em tecnologia.', items: ['4 sessoes 1h', 'Plano de carreira', 'Networking'] },
  { id: 7, title: 'Curso de Marketing com WhatsApp', cat: 'marketing', price: 1800, seller: 'DigiMoz', rating: 4.4, reviews: 12, img: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=400', desc: 'Aprenda a usar WhatsApp Business para vender mais.', items: ['8 aulas', 'Templates', 'Grupo exclusivo'] },
  { id: 8, title: 'Pacote de E-books Empreendedorismo', cat: 'ebooks', price: 1200, seller: 'EmpreendeMoz', rating: 4.3, reviews: 20, img: 'https://images.pexels.com/photos/3760529/pexels-photo-3760529.jpeg?auto=compress&cs=tinysrgb&w=400', desc: '5 e-books sobre empreendedorismo no contexto africano.', items: ['5 e-books', 'Worksheets', 'Audiobooks'] },
]

const CHATS = [
  { id: 1, name: 'Joao Silva', last: 'Ola, o curso ainda esta disponivel?', time: '10:30', unread: 2 },
  { id: 2, name: 'Ana Machel', last: 'Enviei o e-book por email', time: '9:15', unread: 0 },
  { id: 3, name: 'TechMoz', last: 'O website ficara pronto na sexta', time: 'Ontem', unread: 1 },
  { id: 4, name: 'CriaMoz', last: 'Segue as revisoes do logo', time: 'Ontem', unread: 0 },
]

const NOTIFS = [
  { id: 1, type: 'sale', text: 'Nova venda! "Curso de React" comprado por Maria', time: '5 min', read: false },
  { id: 2, type: 'review', text: 'Nova avaliacao de 5 estrelas no seu e-book', time: '1h', read: false },
  { id: 3, type: 'order', text: 'Pagamento de M1,500 recebido via M-Pesa', time: '2h', read: true },
  { id: 4, type: 'chat', text: 'Nova mensagem de Joao Silva', time: '3h', read: true },
  { id: 5, type: 'system', text: 'Bem-vindo ao ClickFy! Complete seu perfil', time: '1d', read: true },
]

function BottomNav({ page, setPage }) {
  const items = [
    { id: 'feed', icon: <Home className="w-5 h-5" />, label: 'Inicio' },
    { id: 'search', icon: <Search className="w-5 h-5" />, label: 'Buscar' },
    { id: 'publish', icon: <Plus className="w-5 h-5" />, label: 'Publicar' },
    { id: 'chats', icon: <MessageCircle className="w-5 h-5" />, label: 'Chat' },
    { id: 'profile', icon: <User className="w-5 h-5" />, label: 'Perfil' },
  ]
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-t border-gray-100 dark:border-slate-800 z-50">
      <div className="max-w-lg mx-auto flex items-center justify-around py-2">
        {items.map((i) => (
          <button key={i.id} onClick={() => setPage(i.id)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors ${page === i.id ? 'text-sky-500' : 'text-gray-400 dark:text-gray-500'}`}>
            {i.icon}<span className="text-[10px] font-medium">{i.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}

function FeedPage({ setPage, setProductId, cat, setCat }) {
  const [q, setQ] = useState('')
  const filtered = PRODUCTS.filter((p) => {
    const matchCat = cat === 'all' || p.cat === cat
    const matchQ = !q || p.title.toLowerCase().includes(q.toLowerCase()) || p.seller.toLowerCase().includes(q.toLowerCase())
    return matchCat && matchQ
  })
  return (
    <div className="pb-20">
      <div className="sticky top-0 bg-white/90 dark:bg-slate-950/90 backdrop-blur-lg z-40 pt-4 pb-2 px-4">
        <h1 className="text-xl font-bold mb-3">Explorar</h1>
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar produtos..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-100 dark:bg-slate-800 outline-none text-sm" />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 no-scrollbar">
          {CATS.map((c) => (
            <button key={c.id} onClick={() => setCat(c.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${cat === c.id ? 'bg-sky-500 text-white' : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400'}`}>
              {c.icon}{c.name}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 px-4 mt-2">
        {filtered.map((p) => (
          <button key={p.id} onClick={() => { setProductId(p.id); setPage('product') }}
            className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-gray-100 dark:border-slate-700 text-left hover:shadow-md transition-shadow">
            <img src={p.img} alt={p.title} className="w-full h-28 object-cover" loading="lazy" />
            <div className="p-3">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">{p.seller}</p>
              <h3 className="text-sm font-semibold line-clamp-2 mb-1">{p.title}</h3>
              <div className="flex items-center gap-1 mb-1">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span className="text-xs text-gray-500">{p.rating}</span>
                <span className="text-xs text-gray-400">({p.reviews})</span>
              </div>
              <p className="text-sky-500 font-bold text-sm">MT {p.price.toLocaleString()}</p>
            </div>
          </button>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>Nenhum produto encontrado</p>
        </div>
      )}
    </div>
  )
}

function ProductPage({ product, setPage }) {
  const [fav, setFav] = useState(false)
  if (!product) return null
  return (
    <div className="pb-24">
      <div className="sticky top-0 bg-white/90 dark:bg-slate-950/90 backdrop-blur-lg z-40 px-4 py-3 flex items-center gap-3">
        <button onClick={() => setPage('feed')} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="font-semibold truncate flex-1">{product.title}</h1>
        <button onClick={() => setFav(!fav)} className="p-1.5">
          <Heart className={`w-5 h-5 ${fav ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
        </button>
        <button className="p-1.5"><Share2 className="w-5 h-5 text-gray-400" /></button>
      </div>
      <img src={product.img} alt={product.title} className="w-full h-56 object-cover" />
      <div className="px-4 pt-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-sky-100 dark:bg-sky-500/20 rounded-full flex items-center justify-center text-sky-500 text-xs font-bold">{product.seller[0]}</div>
          <div>
            <p className="text-sm font-medium">{product.seller}</p>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="text-xs text-gray-500">{product.rating} ({product.reviews} avaliacoes)</span>
            </div>
          </div>
        </div>
        <h2 className="text-xl font-bold mb-2">{product.title}</h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{product.desc}</p>
        <p className="text-2xl font-bold text-sky-500 mb-4">MT {product.price.toLocaleString()}</p>
        <div className="mb-4">
          <h3 className="font-semibold text-sm mb-2">Inclui:</h3>
          <div className="space-y-2">
            {product.items.map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500" /><span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-sm mb-2">Avaliacoes</h3>
          <div className="space-y-3">
            {[{ name: 'Maria L.', text: 'Excelente produto! Recomendo.', r: 5 }, { name: 'Carlos M.', text: 'Muito bom, superou expectativas.', r: 4 }].map((rev, i) => (
              <div key={i} className="bg-gray-50 dark:bg-slate-800 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium">{rev.name}</span>
                  <div className="flex">{Array.from({ length: rev.r }).map((_, j) => <Star key={j} className="w-3 h-3 fill-amber-400 text-amber-400" />)}</div>
                </div>
                <p className="text-xs text-gray-500">{rev.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 p-4 z-50">
        <div className="max-w-lg mx-auto flex gap-3">
          <button onClick={() => setPage('checkout')} className="flex-1 py-3 bg-sky-500 text-white rounded-xl font-semibold hover:bg-sky-600 transition-colors flex items-center justify-center gap-2">
            <ShoppingCart className="w-4 h-4" /> Comprar
          </button>
          <a href={`https://wa.me/258840000000?text=Ola! Gostaria de comprar: ${product.title}`} target="_blank" rel="noopener"
            className="px-4 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-colors flex items-center gap-2">
            <Phone className="w-4 h-4" /> WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}

function CheckoutPage({ product, setPage }) {
  const [method, setMethod] = useState(null)
  if (!product) return null
  return (
    <div className="pb-8">
      <div className="sticky top-0 bg-white/90 dark:bg-slate-950/90 backdrop-blur-lg z-40 px-4 py-3 flex items-center gap-3">
        <button onClick={() => setPage('product')} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="font-semibold">Finalizar compra</h1>
      </div>
      <div className="px-4 mt-2">
        <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-4 mb-4 flex gap-3">
          <img src={product.img} alt={product.title} className="w-16 h-16 rounded-lg object-cover" />
          <div className="flex-1">
            <h3 className="font-semibold text-sm">{product.title}</h3>
            <p className="text-xs text-gray-500">{product.seller}</p>
            <p className="text-sky-500 font-bold mt-1">MT {product.price.toLocaleString()}</p>
          </div>
        </div>
        <h2 className="font-semibold mb-3">Metodo de pagamento</h2>
        <div className="space-y-3 mb-6">
          {[
            { id: 'mpesa', name: 'M-Pesa', color: 'bg-red-500', desc: 'Pagamento via M-Pesa' },
            { id: 'emola', name: 'E-Mola', color: 'bg-blue-500', desc: 'Pagamento via E-Mola' },
            { id: 'whatsapp', name: 'WhatsApp Order', color: 'bg-green-500', desc: 'Encomendar via WhatsApp' },
          ].map((m) => (
            <button key={m.id} onClick={() => setMethod(m.id)}
              className={`w-full p-4 rounded-xl border-2 flex items-center gap-3 transition-colors text-left ${method === m.id ? 'border-sky-500 bg-sky-50 dark:bg-sky-500/10' : 'border-gray-200 dark:border-slate-700'}`}>
              <div className={`w-10 h-10 ${m.color} rounded-lg flex items-center justify-center text-white font-bold text-xs`}>{m.name[0]}</div>
              <div><p className="font-medium text-sm">{m.name}</p><p className="text-xs text-gray-500">{m.desc}</p></div>
            </button>
          ))}
        </div>
        {method === 'mpesa' && (
          <div className="bg-red-50 dark:bg-red-500/10 rounded-xl p-4 animate-fade-in">
            <h3 className="font-semibold text-red-700 dark:text-red-400 mb-2">Pagamento M-Pesa</h3>
            <ol className="text-sm text-red-600 dark:text-red-300 space-y-1.5 list-decimal list-inside">
              <li>Abra o app M-Pesa no seu telemovel</li>
              <li>Selecione &quot;Pagamento&quot;</li>
              <li>Digite o numero: <strong>840000000</strong></li>
              <li>Valor: <strong>MT {product.price.toLocaleString()}</strong></li>
              <li>Confirme o pagamento</li>
            </ol>
            <p className="text-xs text-red-500 mt-3">Apos o pagamento, envie o comprovativo via chat.</p>
          </div>
        )}
        {method === 'emola' && (
          <div className="bg-blue-50 dark:bg-blue-500/10 rounded-xl p-4 animate-fade-in">
            <h3 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Pagamento E-Mola</h3>
            <ol className="text-sm text-blue-600 dark:text-blue-300 space-y-1.5 list-decimal list-inside">
              <li>Abra o app E-Mola</li>
              <li>Selecione &quot;Transferir&quot;</li>
              <li>Numero: <strong>840000000</strong></li>
              <li>Valor: <strong>MT {product.price.toLocaleString()}</strong></li>
              <li>Confirme a transferencia</li>
            </ol>
            <p className="text-xs text-blue-500 mt-3">Envie o comprovativo via chat apos o pagamento.</p>
          </div>
        )}
        {method === 'whatsapp' && (
          <div className="bg-green-50 dark:bg-green-500/10 rounded-xl p-4 animate-fade-in">
            <h3 className="font-semibold text-green-700 dark:text-green-400 mb-2">Encomendar via WhatsApp</h3>
            <p className="text-sm text-green-600 dark:text-green-300 mb-3">Sera redirecionado ao WhatsApp do vendedor para finalizar a compra.</p>
            <a href={`https://wa.me/258840000000?text=Ola! Gostaria de comprar: ${product.title} - MT ${product.price}`} target="_blank" rel="noopener"
              className="block w-full py-3 bg-green-500 text-white rounded-xl font-semibold text-center hover:bg-green-600 transition-colors">
              Abrir WhatsApp
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

function StorePage({ setPage }) {
  const stats = [
    { label: 'Vendas', value: '24', icon: <ShoppingCart className="w-4 h-4" /> },
    { label: 'Receita', value: 'MT 45K', icon: <DollarSign className="w-4 h-4" /> },
    { label: 'Visualizacoes', value: '1.2K', icon: <Eye className="w-4 h-4" /> },
    { label: 'Avaliacao', value: '4.8', icon: <Star className="w-4 h-4" /> },
  ]
  return (
    <div className="pb-20 px-4">
      <h1 className="text-xl font-bold mb-4">Minha Loja</h1>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-gray-50 dark:bg-slate-800 rounded-xl p-4">
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-1">{s.icon}<span className="text-xs">{s.label}</span></div>
            <p className="text-xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold">Meus Produtos</h2>
        <button onClick={() => setPage('publish')} className="text-sky-500 text-sm font-medium flex items-center gap-1">
          <Plus className="w-4 h-4" /> Novo
        </button>
      </div>
      <div className="space-y-3">
        {PRODUCTS.slice(0, 4).map((p) => (
          <div key={p.id} className="flex gap-3 bg-white dark:bg-slate-800 rounded-xl p-3 border border-gray-100 dark:border-slate-700">
            <img src={p.img} alt={p.title} className="w-16 h-16 rounded-lg object-cover" />
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm truncate">{p.title}</h3>
              <p className="text-sky-500 font-bold text-sm">MT {p.price.toLocaleString()}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" /><span className="text-xs text-gray-500">{p.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function PublishPage({ setPage }) {
  const [form, setForm] = useState({ title: '', cat: 'cursos', price: '', desc: '' })
  const [done, setDone] = useState(false)
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }))
  const handleSubmit = (e) => { e.preventDefault(); setDone(true) }
  if (done) {
    return (
      <div className="pb-20 px-4 text-center py-16">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-2">Produto publicado!</h2>
        <p className="text-gray-500 mb-6">Seu produto ja esta disponivel no marketplace.</p>
        <button onClick={() => setPage('feed')} className="px-6 py-2.5 bg-sky-500 text-white rounded-xl font-semibold">Ver no feed</button>
      </div>
    )
  }
  return (
    <div className="pb-20 px-4">
      <h1 className="text-xl font-bold mb-4">Publicar produto</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Titulo</label>
          <input value={form.title} onChange={(e) => set('title', e.target.value)} required
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 outline-none text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Categoria</label>
          <select value={form.cat} onChange={(e) => set('cat', e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 outline-none text-sm">
            {CATS.filter((c) => c.id !== 'all').map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Preco (MT)</label>
          <input type="number" value={form.price} onChange={(e) => set('price', e.target.value)} required
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 outline-none text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Descricao</label>
          <textarea value={form.desc} onChange={(e) => set('desc', e.target.value)} rows={4} required
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 outline-none text-sm resize-none" />
        </div>
        <button type="submit" className="w-full py-3 bg-sky-500 text-white rounded-xl font-semibold hover:bg-sky-600 transition-colors">
          Publicar
        </button>
      </form>
    </div>
  )
}

function ChatListPage({ setPage, setChatId }) {
  return (
    <div className="pb-20 px-4">
      <h1 className="text-xl font-bold mb-4">Conversas</h1>
      <div className="space-y-2">
        {CHATS.map((c) => (
          <button key={c.id} onClick={() => { setChatId(c.id); setPage('chat') }}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors text-left">
            <div className="w-10 h-10 bg-sky-100 dark:bg-sky-500/20 rounded-full flex items-center justify-center text-sky-500 font-bold text-sm">{c.name[0]}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">{c.name}</span>
                <span className="text-xs text-gray-400">{c.time}</span>
              </div>
              <p className="text-xs text-gray-500 truncate">{c.last}</p>
            </div>
            {c.unread > 0 && (
              <span className="w-5 h-5 bg-sky-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">{c.unread}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

function ChatOpenPage({ chatId, setPage }) {
  const [msgs, setMsgs] = useState([
    { id: 1, from: 'them', text: 'Ola! Como posso ajudar?', time: '10:28' },
    { id: 2, from: 'me', text: 'Ola, o curso ainda esta disponivel?', time: '10:30' },
  ])
  const [input, setInput] = useState('')
  const chat = CHATS.find((c) => c.id === chatId) || CHATS[0]
  const send = () => {
    if (!input.trim()) return
    setMsgs((p) => [...p, { id: p.length + 1, from: 'me', text: input, time: new Date().toLocaleTimeString('pt', { hour: '2-digit', minute: '2-digit' }) }])
    setInput('')
  }
  return (
    <div className="flex flex-col h-screen">
      <div className="bg-white/90 dark:bg-slate-950/90 backdrop-blur-lg border-b border-gray-100 dark:border-slate-800 px-4 py-3 flex items-center gap-3">
        <button onClick={() => setPage('chats')} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="w-8 h-8 bg-sky-100 dark:bg-sky-500/20 rounded-full flex items-center justify-center text-sky-500 font-bold text-xs">{chat.name[0]}</div>
        <div><p className="font-medium text-sm">{chat.name}</p><p className="text-[10px] text-green-500">Online</p></div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {msgs.map((m) => (
          <div key={m.id} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-sm ${m.from === 'me' ? 'bg-sky-500 text-white rounded-br-md' : 'bg-gray-100 dark:bg-slate-800 rounded-bl-md'}`}>
              <p>{m.text}</p>
              <p className={`text-[10px] mt-1 ${m.from === 'me' ? 'text-sky-200' : 'text-gray-400'}`}>{m.time}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 p-3">
        <div className="flex gap-2">
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder="Digite uma mensagem..." className="flex-1 px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-slate-800 outline-none text-sm" />
          <button onClick={send} className="p-2.5 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-colors">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

function ProfilePage({ profile, setPage }) {
  const { signOut } = useAuthStore()
  const [dark, setDark] = useState(document.documentElement.classList.contains('dark'))
  const toggleDark = () => {
    document.documentElement.classList.toggle('dark')
    const isDark = document.documentElement.classList.contains('dark')
    localStorage.setItem('clickfy-theme', isDark ? 'dark' : 'light')
    setDark(isDark)
  }
  return (
    <div className="pb-20 px-4">
      <div className="text-center py-6">
        <div className="w-20 h-20 bg-sky-100 dark:bg-sky-500/20 rounded-full flex items-center justify-center text-sky-500 font-bold text-2xl mx-auto mb-3">
          {profile?.name?.[0] || 'U'}
        </div>
        <h1 className="text-xl font-bold">{profile?.name || 'Usuario'}</h1>
        <p className="text-sm text-gray-500">{profile?.email || ''}</p>
        <span className="inline-block mt-2 px-3 py-1 bg-sky-50 dark:bg-sky-500/10 text-sky-500 rounded-full text-xs font-medium">
          {profile?.role === 'seller' ? 'Vendedor' : 'Comprador'}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: 'Compras', value: profile?.role === 'buyer' ? '5' : '0' },
          { label: 'Vendas', value: profile?.role === 'seller' ? '24' : '0' },
          { label: 'Avaliacao', value: '4.8' },
        ].map((s, i) => (
          <div key={i} className="bg-gray-50 dark:bg-slate-800 rounded-xl p-3 text-center">
            <p className="text-lg font-bold">{s.value}</p>
            <p className="text-xs text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="space-y-1">
        {[
          { icon: <ShoppingCart className="w-5 h-5" />, label: 'Minha Loja', action: () => setPage('store') },
          { icon: <Heart className="w-5 h-5" />, label: 'Favoritos', action: () => {} },
          { icon: <Bell className="w-5 h-5" />, label: 'Notificacoes', action: () => setPage('notifs') },
          { icon: dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />, label: dark ? 'Modo claro' : 'Modo escuro', action: toggleDark },
          { icon: <Flag className="w-5 h-5" />, label: 'Reportar problema', action: () => {} },
          { icon: <LogOut className="w-5 h-5" />, label: 'Sair', action: signOut, danger: true },
        ].map((item, i) => (
          <button key={i} onClick={item.action}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors text-left ${item.danger ? 'text-red-500' : ''}`}>
            {item.icon}<span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function NotifPage({ setPage }) {
  return (
    <div className="pb-20 px-4">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => setPage('profile')} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold">Notificacoes</h1>
      </div>
      <div className="space-y-2">
        {NOTIFS.map((n) => (
          <div key={n.id} className={`p-3 rounded-xl ${n.read ? 'bg-white dark:bg-slate-800' : 'bg-sky-50 dark:bg-sky-500/5'} border border-gray-100 dark:border-slate-700`}>
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${n.type === 'sale' ? 'bg-green-100 text-green-600' : n.type === 'review' ? 'bg-amber-100 text-amber-600' : n.type === 'order' ? 'bg-sky-100 text-sky-600' : n.type === 'chat' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'}`}>
                {n.type === 'sale' ? '$' : n.type === 'review' ? '★' : n.type === 'order' ? '✓' : n.type === 'chat' ? '💬' : 'i'}
              </div>
              <div className="flex-1">
                <p className="text-sm">{n.text}</p>
                <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
              </div>
              {!n.read && <div className="w-2 h-2 bg-sky-500 rounded-full mt-1.5" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function MainApp({ profile }) {
  const [page, setPage] = useState('feed')
  const [cat, setCat] = useState('all')
  const [productId, setProductId] = useState(null)
  const [chatId, setChatId] = useState(null)
  const product = PRODUCTS.find((p) => p.id === productId)

  const renderPage = () => {
    switch (page) {
      case 'feed': return <FeedPage setPage={setPage} setProductId={setProductId} cat={cat} setCat={setCat} />
      case 'search': return <FeedPage setPage={setPage} setProductId={setProductId} cat={cat} setCat={setCat} />
      case 'product': return <ProductPage product={product} setPage={setPage} />
      case 'checkout': return <CheckoutPage product={product} setPage={setPage} />
      case 'publish': return <PublishPage setPage={setPage} />
      case 'store': return <StorePage setPage={setPage} />
      case 'chats': return <ChatListPage setPage={setPage} setChatId={setChatId} />
      case 'chat': return <ChatOpenPage chatId={chatId} setPage={setPage} />
      case 'profile': return <ProfilePage profile={profile} setPage={setPage} />
      case 'notifs': return <NotifPage setPage={setPage} />
      default: return <FeedPage setPage={setPage} setProductId={setProductId} cat={cat} setCat={setCat} />
    }
  }

  const showBottomNav = !['product', 'checkout', 'chat'].includes(page)

  return (
    <div className="max-w-lg mx-auto min-h-screen bg-white dark:bg-slate-950 text-gray-900 dark:text-white relative">
      {renderPage()}
      {showBottomNav && <BottomNav page={page} setPage={setPage} />}
    </div>
  )
}
