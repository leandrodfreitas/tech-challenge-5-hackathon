'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useActivities } from '../../presentation/hooks/useActivities'
import { Activity } from '../../domain/entities/Activity'

function CircleProgress({ pct }: { pct: number }) {
  const r = 45
  const circ = 2 * Math.PI * r
  const offset = circ - (pct / 100) * circ
  
  return (
    <svg width="140" height="140" viewBox="0 0 120 120" style={{ display: 'block', margin: '0 auto' }} aria-label={`${pct}% das tarefas concluídas`}>
      <circle cx="60" cy="60" r={r} fill="none" stroke="#e5e7eb" strokeWidth="10" />
      <circle 
        cx="60" cy="60" r={r} fill="none" stroke="#16a34a" strokeWidth="10"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ 
          transition: 'stroke-dashoffset 0.6s ease-out',
          transform: 'rotate(-90deg)',
          transformOrigin: '60px 60px'
        }}
      />
      <text x="60" y="70" textAnchor="middle" fontSize="28" fontWeight="700" fill="#1a1a2e">{pct}%</text>
    </svg>
  )
}

function StatCard({ icon, iconBg, value, label, green }: { icon: React.ReactNode; iconBg: string; value: number; label: string; green?: boolean }) {
  return (
    <div style={{ background: green ? '#f0fdf4' : '#f9fafb', borderRadius: 12, padding: '16px 12px', textAlign: 'center' }}>
      <div style={{ width: 44, height: 44, borderRadius: '50%', background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
        {icon}
      </div>
      <p style={{ fontSize: 28, fontWeight: 700, color: '#1a1a2e', lineHeight: 1 }}>{value}</p>
      <p style={{ fontSize: 12, color: '#6b7280', marginTop: 4, lineHeight: 1.4 }}>{label}</p>
    </div>
  )
}

function PendingIcon() { return <svg width="22" height="22" fill="none" stroke="#2F80ED" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l2 2"/></svg> }
function DoneIcon()    { return <svg width="22" height="22" fill="none" stroke="#16a34a" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg> }
function BellSmIcon()  { return <svg width="22" height="22" fill="none" stroke="#2F80ED" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg> }

export default function DashboardPage() {
  const { activities, toggle } = useActivities('u1')

  const displayActivities = useMemo(() => activities.filter(a => a.status !== 'done').slice(0, 3), [activities])
  const pendingCount = activities.filter(a => a.status !== 'done').length
  const doneCount = activities.filter(a => a.status === 'done').length
  const totalCount = activities.length
  const pct = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0

  const getStatusColor = (status: Activity['status']) => {
    if (status === 'done') return { color: '#16a34a', bg: '#dcfce7' }
    if (status === 'overdue') return { color: '#ef4444', bg: '#fee2e2' }
    return { color: '#2563eb', bg: '#eff6ff' }
  }

  const getStatusLabel = (status: Activity['status']) => {
    if (status === 'done') return 'Feito'
    if (status === 'overdue') return 'Atrasado'
    return 'Hoje'
  }

  const handleToggle = async (id: string, status: Activity['status']) => {
    await toggle(id, status)
  }

  return (
    <div style={{ padding: 28 }}>
      {/* Saudação */}
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 26, fontWeight: 700, color: '#1a1a2e' }}>Olá, Maria! 👋</h2>
        <p style={{ fontSize: 15, color: '#6b7280', marginTop: 4 }}>Vamos tornar seu dia produtivo e tranquilo.</p>
      </div>

      {/* Linha superior */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20, marginBottom: 20 }}>
        {/* Resumo do dia */}
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: 20 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: '#1a1a2e', marginBottom: 16 }}>Resumo do dia</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
            <StatCard icon={<PendingIcon />} iconBg="#eff6ff" value={pendingCount} label="Tarefas pendentes" />
            <StatCard icon={<DoneIcon />}    iconBg="#f0fdf4" value={doneCount}  label="Concluídas" green />
            <StatCard icon={<BellSmIcon />}  iconBg="#eff6ff" value={1}     label="Lembrete para hoje" />
          </div>
        </div>

        {/* Próximo lembrete */}
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: 20 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: '#1a1a2e', marginBottom: 16 }}>Próximo lembrete</h3>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="18" height="18" fill="#d97706" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            </div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: '#1a1a2e' }}>Reunião da faculdade</p>
              <p style={{ fontSize: 13, color: '#6b7280', marginTop: 2 }}>Hoje • 14:00</p>
            </div>
          </div>
          <button style={{ width: '100%', padding: '10px 0', borderRadius: 10, border: 'none', background: '#16a34a', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
            Ver detalhes
          </button>
        </div>
      </div>

      {/* Linha inferior */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
        {/* Tarefas */}
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: '#1a1a2e' }}>Minhas tarefas</h3>
            <Link href="/tarefas" style={{ fontSize: 13, color: '#2F80ED', textDecoration: 'none', fontWeight: 500 }}>Ver todas</Link>
          </div>
          <ul style={{ listStyle: 'none' }}>
            {displayActivities.length === 0 ? (
              <li style={{ padding: '20px 0', textAlign: 'center', color: '#9ca3af', fontSize: 14 }}>
                Nenhuma tarefa para mostrar
              </li>
            ) : (
              displayActivities.map((activity, i) => {
                const colors = getStatusColor(activity.status)
                const label = getStatusLabel(activity.status)
                return (
                  <li key={activity.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderBottom: i < displayActivities.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 14, fontWeight: 500, color: '#1a1a2e', textDecoration: activity.status === 'done' ? 'line-through' : 'none', opacity: activity.status === 'done' ? 0.5 : 1 }}>{activity.title}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 12, color: '#9ca3af' }}>
                          {new Date(activity.scheduledAt).toLocaleString('pt-BR', {
                            hour: '2-digit',
                            minute: '2-digit',
                            day: '2-digit',
                            month: '2-digit',
                          })}
                        </span>
                        <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 6, color: colors.color, background: colors.bg }}>
                          {label}
                        </span>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleToggle(activity.id, activity.status)} 
                      aria-label={activity.status === 'done' ? `Desmarcar ${activity.title}` : `Concluir ${activity.title}`} 
                      aria-pressed={activity.status === 'done'} 
                      style={{ width: 24, height: 24, borderRadius: '50%', flexShrink: 0, border: activity.status === 'done' ? 'none' : '1.5px solid #d1d5db', background: activity.status === 'done' ? '#16a34a' : 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}>
                      {activity.status === 'done' && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><path d="m5 12 5 5L20 7"/></svg>}
                    </button>
                  </li>
                )
              })
            )}
          </ul>
        </div>

        {/* Progresso */}
        <div style={{ background: '#f0fdf4', borderRadius: 16, border: '1px solid #bbf7d0', padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: '#15803d', marginBottom: 16 }}>Você está indo bem!</p>
          <CircleProgress pct={pct} />
          <p style={{ fontSize: 13, color: '#374151', marginTop: 12, lineHeight: 1.5 }}>das tarefas concluídas<br />esta semana</p>
          <p style={{ fontSize: 13, color: '#16a34a', fontWeight: 600, marginTop: 8 }}>Continue assim! ♥</p>
        </div>
      </div>
    </div>
  )
}
