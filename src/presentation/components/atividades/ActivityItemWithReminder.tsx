'use client'
import { useState } from 'react'
import { Activity } from '../../../domain/entities/Activity'
import { ActivityItem } from './ActivityItem'
import { ReminderForm } from '../reminders/ReminderForm'
import { useReminders } from '../../hooks/useReminders'
import { Reminder } from '../../../domain/entities/Reminder'
import { useContrastStyles } from '../../hooks/useContrastStyles'
import { usePreferences } from '../../contexts/PreferencesContext'
import { SPACING_MAP } from '../../constants/theme'

interface ActivityItemWithReminderProps {
  activity: Activity
  onToggle: (id: string, status: Activity['status']) => void
  onGuide?: (activity: Activity) => void
}

export function ActivityItemWithReminder({
  activity,
  onToggle,
  onGuide,
}: ActivityItemWithReminderProps) {
  const { getReminderByActivityId, createReminder } = useReminders()
  const [showReminderForm, setShowReminderForm] = useState(false)
  const contrast = useContrastStyles()
  const { prefs } = usePreferences()

  const reminder = getReminderByActivityId(activity.id)
  const spacingValue = SPACING_MAP[prefs.spacing]
  
  // Se lembretes não estão habilitados, não mostrar opção
  if (!prefs.remindersEnabled) {
    return <ActivityItem activity={activity} onToggle={onToggle} onGuide={onGuide} />
  }

  const handleReminderSubmit = async (reminderData: Omit<Reminder, 'id' | 'createdAt'>) => {
    try {
      await createReminder(
        reminderData.userId,
        reminderData.activityId,
        reminderData.type,
        reminderData.frequency,
        reminderData.scheduledFor,
        reminderData.message
      )
      setShowReminderForm(false)
    } catch (error) {
      console.error('Failed to create reminder:', error)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacingValue }}>
      <ActivityItem activity={activity} onToggle={onToggle} onGuide={onGuide} />

      {/* Mostrar status do lembrete e botão */}
      {!showReminderForm && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: spacingValue,
            paddingLeft: spacingValue,
            fontSize: '14px',
          }}
        >
          {reminder && reminder.enabled ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#3b82f6' }}>
              <span>🔔</span>
              <span>Lembrete configurado</span>
            </div>
          ) : (
            <button
              onClick={() => setShowReminderForm(true)}
              style={{
                background: 'transparent',
                color: '#3b82f6',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
                padding: '0',
                textDecoration: 'underline',
              }}
            >
              + Adicionar lembrete
            </button>
          )}
        </div>
      )}

      {/* Formulário de lembrete */}
      {showReminderForm && (
        <ReminderForm
          activity={activity}
          onSubmit={handleReminderSubmit}
          onCancel={() => setShowReminderForm(false)}
          existingReminder={reminder}
        />
      )}
    </div>
  )
}
