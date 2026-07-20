'use client'
import { useState } from 'react'
import { Activity } from '../../../domain/entities/Activity'
import { Reminder, ReminderType, ReminderFrequency } from '../../../domain/entities/Reminder'
import { useContrastStyles } from '../../hooks/useContrastStyles'
import { usePreferences } from '../../contexts/PreferencesContext'
import { IconWarning, IconClipboard, IconArrowBack, IconCheckmark } from '../icons'

interface ReminderFormProps {
  activity: Activity
  onSubmit: (reminder: Omit<Reminder, 'id' | 'createdAt'>) => void
  onCancel: () => void
  existingReminder?: Reminder
}

export function ReminderForm({ activity, onSubmit, onCancel, existingReminder }: ReminderFormProps) {
  const contrast = useContrastStyles()
  const { prefs } = usePreferences()
  
  const [type, setType] = useState<ReminderType>(existingReminder?.type || 'push')
  const [frequency, setFrequency] = useState<ReminderFrequency>(existingReminder?.frequency || 'once')
  const [hoursBeforeReminder, setHoursBeforeReminder] = useState(
    existingReminder ? 1 : 1
  )
  const [confirmationStep, setConfirmationStep] = useState(false)

  const spacingMap = { compact: '12px', normal: '16px', wide: '24px' }
  const spacingValue = spacingMap[prefs.spacing]
  const fontMap = { small: '16px', medium: '18px', large: '20px' }
  const fontSize = fontMap[prefs.fontSize]
  const animationStyle = prefs.smoothAnimations ? 'all 0.3s ease-out' : 'none'

  const handleSubmit = () => {
    // Se extraConfirmation está ativo, mostrar confirmação antes de salvar
    if (prefs.extraConfirmation && !confirmationStep) {
      setConfirmationStep(true)
      return
    }

    const scheduledFor = new Date(activity.scheduledAt)
    scheduledFor.setHours(scheduledFor.getHours() - hoursBeforeReminder)

    const message =
      frequency === 'once'
        ? `Lembrete: ${activity.title} acontece ${hoursBeforeReminder}h a partir de agora`
        : `Lembrete diário: ${activity.title}`

    onSubmit({
      userId: 'u1', // será substituído pelo contexto de auth real
      activityId: activity.id,
      type,
      frequency,
      scheduledFor,
      message,
      enabled: true,
    })
  }

  // Etapa de Confirmação Extra
  if (confirmationStep && prefs.extraConfirmation) {
    return (
      <div
        style={{
          padding: spacingValue,
          background: contrast.background,
          border: `2px solid ${contrast.border}`,
          borderRadius: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: spacingValue,
          transition: animationStyle,
        }}
      >
        <h3 style={{ fontSize, fontWeight: 'bold', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
          <IconWarning style={{ color: contrast.text }} /> Confirmar Lembrete
        </h3>
        <p style={{ fontSize, margin: 0, lineHeight: '1.6' }}>
          Você tem certeza que quer adicionar este lembrete?
        </p>
        <div style={{ backgroundColor: contrast.border, padding: spacingValue, borderRadius: 8 }}>
          <p style={{ fontSize: '14px', margin: '0 0 8px 0', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 8 }}>
            <IconClipboard style={{ width: 16, height: 16, color: contrast.text }} /> Resumo:
          </p>
          <p style={{ fontSize: '14px', margin: '4px 0' }}>
            • Tipo: {type === 'none' ? 'Sem lembretes' : 'Notificação'}
          </p>
          <p style={{ fontSize: '14px', margin: '4px 0' }}>
            • Frequência: {frequency === 'once' ? 'Uma vez' : frequency === 'daily' ? 'Diários' : 'Semanais'}
          </p>
          {frequency === 'once' && (
            <p style={{ fontSize: '14px', margin: '4px 0' }}>
              • Horas antes: {hoursBeforeReminder}h
            </p>
          )}
        </div>

        <div style={{ display: 'flex', gap: spacingValue }}>
          <button
            onClick={() => setConfirmationStep(false)}
            style={{
              flex: 1,
              padding: `${prefs.spacing === 'wide' ? '20px' : '16px'} ${spacingValue}`,
              background: contrast.background,
              color: contrast.text,
              border: `2px solid ${contrast.border}`,
              borderRadius: 12,
              fontSize,
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: animationStyle,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8
            }}
            aria-label="Voltar para editar lembrete"
          >
            <IconArrowBack style={{ width: 16, height: 16 }} /> Voltar
          </button>
          <button
            onClick={handleSubmit}
            style={{
              flex: 1,
              padding: `${prefs.spacing === 'wide' ? '20px' : '16px'} ${spacingValue}`,
              background: '#16a34a',
              color: 'white',
              border: 'none',
              borderRadius: 12,
              fontSize,
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: animationStyle,
            }}
          >
            ┊ Confirmar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        padding: spacingValue,
        background: contrast.background,
        border: `2px solid ${contrast.border}`,
        borderRadius: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: spacingValue,
        transition: animationStyle,
      }}
    >
      <h3 style={{ fontSize, fontWeight: 'bold', marginBottom: spacingValue }}>
        Configurar Lembrete
      </h3>

      {/* Tipo de Lembrete */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize, fontWeight: 'bold' }}>Como você quer ser lembrado?</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {['none', 'push'].map((t) => (
            <button
              key={t}
              onClick={() => setType(t as ReminderType)}
              style={{
                padding: `${prefs.spacing === 'wide' ? '20px' : '16px'} ${spacingValue}`,
                border: `2px solid ${type === t ? contrast.text : contrast.border}`,
                borderRadius: 12,
                background: type === t ? contrast.border : contrast.background,
                color: contrast.text,
                fontSize,
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: animationStyle,
              }}
              aria-pressed={type === t}
            >
              {t === 'none' ? '🔇 Sem lembretes' : '🔔 Notificação'}
            </button>
          ))}
        </div>
      </div>

      {type !== 'none' && (
        <>
          {/* Frequência */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize, fontWeight: 'bold' }}>Com qual frequência?</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['once', 'daily', 'weekly'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFrequency(f as ReminderFrequency)}
                  style={{
                    padding: `${prefs.spacing === 'wide' ? '20px' : '16px'} ${spacingValue}`,
                    border: `2px solid ${frequency === f ? contrast.text : contrast.border}`,
                    borderRadius: 12,
                    background: frequency === f ? contrast.border : contrast.background,
                    color: contrast.text,
                    fontSize,
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: animationStyle,
                  }}
                  aria-pressed={frequency === f}
                >
                  {f === 'once' && '⏰ Uma vez'}
                  {f === 'daily' && '📅 Todos os dias'}
                  {f === 'weekly' && '📆 Todas as semanas'}
                </button>
              ))}
            </div>
          </div>

          {/* Tempo Antes */}
          {frequency === 'once' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize, fontWeight: 'bold' }}>Quantas horas antes?</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: spacingValue }}>
                <input
                  type="range"
                  min="1"
                  max="24"
                  value={hoursBeforeReminder}
                  onChange={(e) => setHoursBeforeReminder(parseInt(e.target.value))}
                  style={{
                    flex: 1,
                    height: '12px',
                    cursor: 'pointer',
                  }}
                />
                <span style={{ fontSize, fontWeight: 'bold', minWidth: '60px' }}>
                  {hoursBeforeReminder}h
                </span>
              </div>
            </div>
          )}
        </>
      )}

      {/* Botões de Ação */}
      <div style={{ display: 'flex', gap: spacingValue, marginTop: spacingValue }}>
        <button
          onClick={handleSubmit}
          style={{
            flex: 1,
            padding: `${prefs.spacing === 'wide' ? '20px' : '16px'} ${spacingValue}`,
            background: '#16a34a',
            color: 'white',
            border: 'none',
            borderRadius: 12,
            fontSize,
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: animationStyle,
          }}
        >
          ✓ Salvar Lembrete
        </button>
        <button
          onClick={onCancel}
          style={{
            flex: 1,
            padding: `${prefs.spacing === 'wide' ? '20px' : '16px'} ${spacingValue}`,
            background: contrast.background,
            color: contrast.text,
            border: `2px solid ${contrast.border}`,
            borderRadius: 12,
            fontSize,
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: animationStyle,
          }}
        >
          ✕ Cancelar
        </button>
      </div>
    </div>
  )
}
