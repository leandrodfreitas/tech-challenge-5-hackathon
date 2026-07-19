'use client'
import { usePathname } from 'next/navigation'

const TITLES: Record<string, string> = {
  '/dashboard':    'Dashboard',
  '/tarefas':      'Minhas Tarefas',
  '/tarefas/nova': 'Nova Tarefa',
  '/configuracoes':'Configurações',
  '/painel':       'Configurações',
  '/perfil':       'Perfil',
  // '/calendario':   'Calendário',
  // '/lembretes':    'Lembretes',
  // '/historico':    'Histórico',
}

function SearchIcon() {
  return (
    <svg width="20" height="20" fill="none" stroke="#9ca3af" strokeWidth="1.8" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
  )
}

function BellIcon() {
  return (
    <svg width="20" height="20" fill="none" stroke="#6b7280" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  )
}

function HelpIcon() {
  return (
    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10"/>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  )
}

export function Topbar() {
  const pathname = usePathname()
  const title = TITLES[pathname] ?? 'SeniorEase'

  return (
    <header style={{
      background: '#fff',
      borderBottom: '1px solid #e5e7eb',
      padding: '0 28px',
      height: 60,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexShrink: 0,
    }}>
      <h1 style={{ fontSize: '1.0625rem', fontWeight: 600, color: '#1a1a2e' }}>{title}</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <button aria-label="Pesquisar" style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 4 }}>
          <SearchIcon />
        </button>
        <button aria-label="Notificações — 3 novas" style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', display: 'flex', padding: 4 }}>
          <BellIcon />
          <span style={{
            position: 'absolute', top: 0, right: 0,
            width: 16, height: 16, borderRadius: '50%',
            background: '#ef4444', fontSize: '0.625rem', fontWeight: 700,
            color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>3</span>
        </button>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '6px 14px', borderRadius: 20,
          border: '1.5px solid #e5e7eb', background: '#fff',
          fontSize: '0.8125rem', color: '#374151', cursor: 'pointer', fontWeight: 500,
        }}>
          <HelpIcon /> Ajuda
        </button>
      </div>
    </header>
  )
}
