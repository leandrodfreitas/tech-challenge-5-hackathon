'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { usePreferences } from '../../contexts/PreferencesContext'

const NAV_BASIC = [
  { href: '/dashboard',    label: 'Dashboard',     icon: <HomeIcon /> },
  { href: '/tarefas',      label: 'Minhas Tarefas', icon: <TaskIcon /> },
  { href: '/perfil',       label: 'Perfil',        icon: <UserIcon /> },
  { href: '/configuracoes',       label: 'Configurações', icon: <CogIcon /> },
]

const NAV_ADVANCED = [
  { href: '/dashboard',    label: 'Dashboard',     icon: <HomeIcon /> },
  { href: '/tarefas',      label: 'Minhas Tarefas', icon: <TaskIcon /> },
  { href: '/calendario',   label: 'Calendário',    icon: <CalIcon /> },
  { href: '/lembretes',    label: 'Lembretes',     icon: <BellIcon /> },
  { href: '/historico',    label: 'Histórico',     icon: <HistIcon /> },
  { href: '/perfil',       label: 'Perfil',        icon: <UserIcon /> },
  { href: '/configuracoes',       label: 'Configurações', icon: <CogIcon /> },
  { href: '/ajuda',        label: 'Ajuda',         icon: <HelpIcon /> },
]

function HomeIcon() { return <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> }
function TaskIcon() { return <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 12l2 2 4-4"/></svg> }
function CalIcon() { return <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> }
function BellIcon() { return <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg> }
function HistIcon() { return <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> }
function UserIcon() { return <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> }
function CogIcon() { return <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> }
function HelpIcon() { return <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> }

export function Sidebar() {
  const pathname = usePathname()
  const { prefs } = usePreferences()
  
  const isSimplified = prefs.navigationMode === 'simplified'
  const NAV = isSimplified ? NAV_BASIC : NAV_ADVANCED

  return (
    <aside style={{
      width: 220, minHeight: '100vh', background: 'var(--background)',
      borderRight: '1px solid var(--border-color)', display: 'flex',
      flexDirection: 'column', flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: '20px 16px 16px', borderBottom: `1px solid var(--border-color)` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </div>
          <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-color)' }}>
            Senior<span style={{ color: 'var(--primary)' }}>Ease</span>
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 8px' }} aria-label="Menu principal">
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {NAV.map(item => {
            const active = pathname === item.href
            return (
              <li key={item.href}>
                <Link href={item.href} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '9px 12px', borderRadius: 10, textDecoration: 'none',
                  fontSize: '0.875rem', fontWeight: active ? 600 : 400,
                  color: active ? 'var(--primary)' : 'var(--text-secondary)',
                  background: active ? 'var(--primary-light)' : 'transparent',
                  transition: 'var(--transition)',
                }}
                aria-current={active ? 'page' : undefined}
                >
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer do sidebar */}
      <div style={{ padding: '12px 16px', borderTop: `1px solid var(--border-color)` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--primary)', flexShrink: 0 }}>
            MS
          </div>
          <div>
            <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-color)' }}>Maria Silva</p>
            <p style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)' }}>Ver perfil</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
