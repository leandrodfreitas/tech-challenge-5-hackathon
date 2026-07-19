'use client'
import { Activity } from '../../../domain/entities/Activity'
import { useContrastStyles } from '../../hooks/useContrastStyles'
import { usePreferences } from '../../contexts/PreferencesContext'

interface ActivityItemProps {
  activity: Activity
  onToggle: (id: string, status: Activity['status']) => void
}

const BADGE_STYLES: Record<Activity['status'], { label: string; colors: Record<string, { bg: string; text: string }> }> = {
  done: { label: 'Feito', colors: { default: { bg: '#dcfce7', text: '#16a34a' }, high: { bg: '#ccffcc', text: '#000000' }, maximum: { bg: '#ffff00', text: '#000000' } } },
  pending: { label: 'Hoje', colors: { default: { bg: '#eff6ff', text: '#2563eb' }, high: { bg: '#ccddff', text: '#0051cc' }, maximum: { bg: '#ffff00', text: '#000000' } } },
  overdue: { label: 'Atrasado', colors: { default: { bg: '#fee2e2', text: '#dc2626' }, high: { bg: '#ffcccc', text: '#cc0000' }, maximum: { bg: '#ffff00', text: '#000000' } } },
}

export function ActivityItem({ activity, onToggle }: ActivityItemProps) {
  const contrast = useContrastStyles()
  const { prefs } = usePreferences()
  const badge = BADGE_STYLES[activity.status]
  const isDone = activity.status === 'done'
  
  const contrastLevel = prefs.contrast
  const badgeColors = badge.colors[contrastLevel] || badge.colors.default
  const spacingMap = { compact: '12px', normal: '16px', wide: '24px' }
  const spacingValue = spacingMap[prefs.spacing]

  return (
    <li
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: spacingValue,
        padding: spacingValue,
        background: contrast.background,
        borderRadius: 16,
        border: `1.5px solid ${contrast.border}`,
        cursor: 'pointer',
        transition: 'all 0.15s',
        opacity: isDone ? 0.6 : 1,
      }}
      onClick={() => onToggle(activity.id, activity.status)}
      role="checkbox"
      aria-checked={isDone}
      aria-label={`${activity.title} — ${badge.label}`}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onToggle(activity.id, activity.status)}
    >
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: '50%',
          border: `2px solid ${isDone ? '#16a34a' : contrast.border}`,
          background: isDone ? '#16a34a' : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transition: 'all 0.15s',
        }}
        aria-hidden="true"
      >
        {isDone && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
            <path d="m5 12 5 5L20 7" />
          </svg>
        )}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: prefs.fontSize === 'small' ? 14 : prefs.fontSize === 'medium' ? 16 : 20, fontWeight: 500, color: contrast.text, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {activity.title}
        </p>
        <p style={{ fontSize: prefs.fontSize === 'small' ? 12 : prefs.fontSize === 'medium' ? 13 : 15, color: contrast.textSecondary, marginTop: 4, margin: 0 }}>
          {new Date(activity.scheduledAt).toLocaleString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            day: '2-digit',
            month: '2-digit',
          })}
        </p>
      </div>
      <span style={{ fontSize: 12, fontWeight: 600, paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, borderRadius: 8, flexShrink: 0, background: badgeColors.bg, color: badgeColors.text }}>
        {badge.label}
      </span>
    </li>
  )
}
