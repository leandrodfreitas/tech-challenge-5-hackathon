'use client'
import { Activity } from '../../../domain/entities/Activity'
import { useContrastStyles } from '../../hooks/useContrastStyles'
import { usePreferences } from '../../contexts/PreferencesContext'

interface HistoryListProps {
  activities: Activity[]
  onRestart?: (activity: Activity) => void
}

export function HistoryList({ activities, onRestart }: HistoryListProps) {
  const contrast = useContrastStyles()
  const { prefs } = usePreferences()

  const spacingMap = { compact: '12px', normal: '16px', wide: '24px' }
  const spacingValue = spacingMap[prefs.spacing]
  const fontMap = { small: '16px', medium: '18px', large: '20px' }
  const fontSize = fontMap[prefs.fontSize]
  const animationStyle = prefs.smoothAnimations ? 'all 0.3s ease-out' : 'none'

  if (activities.length === 0) {
    return (
      <div
        style={{
          padding: spacingValue,
          background: contrast.background,
          border: `2px solid ${contrast.border}`,
          borderRadius: 16,
          textAlign: 'center',
          transition: animationStyle,
        }}
      >
        <p style={{ fontSize, color: contrast.text }}>
          📭 Nenhuma atividade concluída ainda
        </p>
      </div>
    )
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: spacingValue,
      }}
    >
      {activities.map((activity) => {
        const completedDate = activity.completedAt
          ? new Date(activity.completedAt).toLocaleDateString('pt-BR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          : 'Data desconhecida'

        return (
          <div
            key={activity.id}
            style={{
              padding: spacingValue,
              background: contrast.background,
              border: `2px solid #16a34a`,
              borderRadius: 16,
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              transition: animationStyle,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: spacingValue }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  background: '#16a34a',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '20px',
                  flexShrink: 0,
                }}
              >
                ✓
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize, fontWeight: 'bold', margin: '0 0 4px 0' }}>
                  {activity.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
                  ✓ Concluída em {completedDate}
                </p>
              </div>
            </div>

            {activity.steps && activity.steps.length > 0 && (
              <div
                style={{
                  marginTop: '8px',
                  paddingLeft: spacingValue,
                  borderLeft: `4px solid #16a34a`,
                }}
              >
                <p style={{ fontSize: '14px', fontWeight: 'bold', margin: '0 0 8px 0' }}>
                  Etapas concluídas:
                </p>
                <ul style={{ margin: 0, paddingLeft: spacingValue, fontSize: '14px' }}>
                  {activity.steps.map((step) => (
                    <li key={step.order} style={{ marginBottom: '4px' }}>
                      {step.description}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {onRestart && (
              <button
                onClick={() => onRestart(activity)}
                style={{
                  alignSelf: 'flex-start',
                  marginTop: '8px',
                  padding: `${prefs.spacing === 'wide' ? '12px' : '10px'} ${spacingValue}`,
                  background: contrast.background,
                  color: contrast.text,
                  border: `2px solid ${contrast.border}`,
                  borderRadius: 8,
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: animationStyle,
                }}
                aria-label={`Repetir atividade: ${activity.title}`}
              >
                🔄 Repetir Atividade
              </button>
            )}
          </div>
        )
      })}
    </div>
  )
}
