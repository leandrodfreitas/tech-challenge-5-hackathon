'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useActivities } from '../../presentation/hooks/useActivities'
import { ActivityItem } from '../../presentation/components/atividades/ActivityItem'
import { GuidedActivityFlow } from '../../presentation/components/atividades/GuidedActivityFlow'
import { FeedbackBanner } from '../../presentation/components/ui/FeedbackBanner'
import { Activity } from '../../domain/entities/Activity'

type Tab = 'Pendentes' | 'Concluídas' | 'Todas'

function PlusIcon() { return <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> }

export default function TarefasPage() {
  const { activities, toggle } = useActivities('u1')
  const [tab, setTab] = useState<Tab>('Pendentes')
  const [showFeedback, setShowFeedback] = useState(false)
  const [guidedActivity, setGuidedActivity] = useState<Activity | null>(null)

  const handleToggle = async (id: string, status: Activity['status']) => {
    await toggle(id, status)
    if (status !== 'done') setShowFeedback(true)
  }

  const handleGuideComplete = async () => {
    if (guidedActivity) {
      await toggle(guidedActivity.id, guidedActivity.status)
      setGuidedActivity(null)
      setShowFeedback(true)
    }
  }

  const filtered = activities.filter(a =>
    tab === 'Todas' ? true : tab === 'Concluídas' ? a.status === 'done' : a.status !== 'done'
  )

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f4f6fa', minHeight: '100vh' }}>
      <main id="main-content" style={{ flex: 1, padding: 32 }}>
        <div>

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1a1a2e' }}>Minhas Tarefas</h1>
            <Link href="/tarefas/nova" style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 20px', borderRadius: 10, background: 'var(--primary)',
              color: '#fff', textDecoration: 'none', fontSize: 14, fontWeight: 600,
            }}>
              <PlusIcon /> Nova tarefa
            </Link>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 0, borderBottom: '2px solid #e5e7eb', marginBottom: 20 }}>
            {(['Pendentes', 'Concluídas', 'Todas'] as Tab[]).map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                padding: '10px 20px', border: 'none', background: 'transparent',
                fontSize: 14, fontWeight: tab === t ? 600 : 400, cursor: 'pointer',
                color: tab === t ? 'var(--primary)' : '#9ca3af',
                borderBottom: tab === t ? '2px solid var(--primary)' : '2px solid transparent',
                marginBottom: -2, transition: 'all 0.15s',
              }}>
                {t}
              </button>
            ))}
          </div>

          {/* Feedback Banner */}
          <FeedbackBanner
            message="Muito bem! Tarefa concluída."
            show={showFeedback}
            onHide={() => setShowFeedback(false)}
          />

          {/* Lista */}
          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', overflow: 'hidden', padding: '20px' }}>
            {filtered.length === 0 ? (
              <div style={{ padding: 40, textAlign: 'center', color: '#9ca3af', fontSize: 15 }}>
                Nenhuma tarefa encontrada.
              </div>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {filtered.map((activity) => (
                  <ActivityItem
                    key={activity.id}
                    activity={activity}
                    onToggle={handleToggle}
                    onGuide={setGuidedActivity}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>

      {/* Modal Guided Activity */}
      {guidedActivity && (
        <GuidedActivityFlow
          activity={guidedActivity}
          onComplete={handleGuideComplete}
          onCancel={() => setGuidedActivity(null)}
        />
      )}
    </div>
  )
}
