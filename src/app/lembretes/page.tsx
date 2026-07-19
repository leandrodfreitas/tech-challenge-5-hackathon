'use client'
import { useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useReminders } from '../../presentation/hooks/useReminders'
import { useActivities } from '../../presentation/hooks/useActivities'
import { usePreferences } from '../../presentation/contexts/PreferencesContext'
import { useContrastStyles } from '../../presentation/hooks/useContrastStyles'

interface ReminderFunctions {
  reminders: any[]
  loadReminders: (userId: string) => Promise<void>
  handleDeleteReminder: (id: string) => Promise<void>
  handleUpdateReminder: (id: string, updates: any) => Promise<void>
}

export default function LembretesPage() {
  const { reminders, loadReminders, deleteReminder, updateReminder } = useReminders()
  const { activities } = useActivities('u1')
  const { prefs } = usePreferences()
  const contrast = useContrastStyles()

  useEffect(() => {
    loadReminders('u1')
  }, [])

  const spacingMap = { compact: '12px', normal: '16px', wide: '24px' }
  const spacingValue = spacingMap[prefs.spacing]
  const fontMap = { small: '12px', medium: '14px', large: '16px' }
  const labelFontSize = fontMap[prefs.fontSize]
  const headingMap = { small: '18px', medium: '22px', large: '26px' }
  const headingFontSize = headingMap[prefs.fontSize]

  const remindersWithActivity = useMemo(() => {
    return reminders.map(reminder => {
      const activity = activities.find(a => a.id === reminder.activityId)
      return {
        ...reminder,
        activityTitle: activity?.title || 'Tarefa desconhecida'
      }
    })
  }, [reminders, activities])

  const enabledCount = reminders.filter(r => r.enabled).length
  const totalCount = reminders.length

  const getFrequencyLabel = (freq: string) => {
    const freqMap: Record<string, string> = {
      'once': '🔔 Uma vez',
      'daily': '📅 Diariamente',
      'weekly': '📆 Semanalmente'
    }
    return freqMap[freq] || freq
  }

  const getTypeLabel = (type: string) => {
    return type === 'push' ? '📲 Push' : '✖️ Desativado'
  }

  const handleToggle = async (reminderId: string, currentState: boolean) => {
    await updateReminder(reminderId, { enabled: !currentState })
  }

  const handleDelete = async (reminderId: string) => {
    const confirmed = confirm('Tem certeza que deseja deletar este lembrete?')
    if (confirmed) {
      await deleteReminder(reminderId)
    }
  }

  return (
    <div style={{ padding: spacingValue }}>
      {/* Header */}
      <div style={{ marginBottom: spacingValue }}>
        <h1 style={{ fontSize: headingFontSize, fontWeight: 700, color: contrast.text, marginBottom: 8 }}>
          🔔 Meus Lembretes
        </h1>
        <p style={{ fontSize: labelFontSize, color: '#6b7280' }}>
          Gerencie seus lembretes para não esquecer de suas tarefas importantes.
        </p>
      </div>

      {/* Estatísticas */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: spacingValue }}>
        <div style={{ background: contrast.background, borderRadius: 12, border: `1px solid ${contrast.border}`, padding: spacingValue, textAlign: 'center' }}>
          <p style={{ fontSize: '32px', fontWeight: 700, color: '#16a34a' }}>{totalCount}</p>
          <p style={{ fontSize: labelFontSize, color: '#6b7280' }}>Total de lembretes</p>
        </div>
        <div style={{ background: contrast.background, borderRadius: 12, border: `1px solid ${contrast.border}`, padding: spacingValue, textAlign: 'center' }}>
          <p style={{ fontSize: '32px', fontWeight: 700, color: '#2F80ED' }}>{enabledCount}</p>
          <p style={{ fontSize: labelFontSize, color: '#6b7280' }}>Lembretes ativos</p>
        </div>
      </div>

      {/* Lista de Lembretes */}
      <div style={{ background: contrast.background, borderRadius: 16, border: `1px solid ${contrast.border}`, padding: spacingValue, marginBottom: spacingValue }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacingValue }}>
          <h2 style={{ fontSize: labelFontSize, fontWeight: 600, color: contrast.text }}>Todos os lembretes</h2>
          <Link href="/tarefas" style={{ fontSize: '12px', color: '#2F80ED', textDecoration: 'underline', cursor: 'pointer' }}>
            Criar novo
          </Link>
        </div>

        {totalCount === 0 ? (
          <div style={{ padding: '40px 20px', textAlign: 'center', color: '#9ca3af' }}>
            <p style={{ fontSize: labelFontSize, marginBottom: 12 }}>Você não tem nenhum lembrete ainda 😴</p>
            <Link href="/tarefas" style={{ fontSize: '12px', color: '#2F80ED', textDecoration: 'underline' }}>
              Adicionar lembrete para uma tarefa
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {remindersWithActivity.map((reminder, idx) => (
              <div
                key={reminder.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: spacingValue,
                  borderRadius: 12,
                  border: `1px solid ${contrast.border}`,
                  background: reminder.enabled ? '#f0fdf4' : '#f3f4f6',
                  transition: prefs.smoothAnimations ? 'all 0.15s' : 'none'
                }}
              >
                {/* Toggle */}
                <button
                  onClick={() => handleToggle(reminder.id, reminder.enabled)}
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    border: `2px solid ${reminder.enabled ? '#16a34a' : '#d1d5db'}`,
                    background: reminder.enabled ? '#16a34a' : 'transparent',
                    cursor: 'pointer',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: prefs.smoothAnimations ? 'all 0.15s' : 'none'
                  }}
                  aria-label={reminder.enabled ? `Desativar lembrete de ${reminder.activityTitle}` : `Ativar lembrete de ${reminder.activityTitle}`}
                  aria-pressed={reminder.enabled}
                >
                  {reminder.enabled && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><path d="m5 12 5 5L20 7"/></svg>}
                </button>

                {/* Conteúdo */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <p style={{ fontSize: labelFontSize, fontWeight: 600, color: contrast.text }}>
                      {reminder.activityTitle}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', fontSize: '12px', color: '#6b7280' }}>
                    <span>{getFrequencyLabel(reminder.frequency)}</span>
                    <span>•</span>
                    <span>{getTypeLabel(reminder.type)}</span>
                    <span>•</span>
                    <span>📝 {reminder.message}</span>
                  </div>
                  <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: 4 }}>
                    Agendado para {new Date(reminder.scheduledFor).toLocaleString('pt-BR')}
                  </p>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(reminder.id)}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    border: '1px solid #fecaca',
                    background: '#fee2e2',
                    color: '#ef4444',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: prefs.smoothAnimations ? 'all 0.15s' : 'none'
                  }}
                  aria-label={`Deletar lembrete de ${reminder.activityTitle}`}
                >
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h16zM10 11v6M14 11v6"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info Box */}
      <div style={{ background: '#eff6ff', borderRadius: 12, border: '1px solid #bfdbfe', padding: spacingValue, marginBottom: spacingValue }}>
        <p style={{ fontSize: labelFontSize, color: '#1e40af', lineHeight: 1.6 }}>
          💡 <strong>Dica:</strong> Ative lembretes para não esquecer suas tarefas importantes. Você pode criar um novo lembrete na página de tarefas.
        </p>
      </div>
    </div>
  )
}
