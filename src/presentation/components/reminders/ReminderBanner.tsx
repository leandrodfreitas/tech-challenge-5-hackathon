'use client'
import { useEffect, useState } from 'react'
import { Reminder } from '../../../domain/entities/Reminder'
import { useContrastStyles } from '../../hooks/useContrastStyles'
import { usePreferences } from '../../contexts/PreferencesContext'
import { IconBell, IconClose } from '../icons'

interface ReminderBannerProps {
  reminder: Reminder | null
  onDismiss: () => void
  autoHideDuration?: number
}

export function ReminderBanner({ reminder, onDismiss, autoHideDuration = 5000 }: ReminderBannerProps) {
  const contrast = useContrastStyles()
  const { prefs } = usePreferences()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (reminder) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
        onDismiss()
      }, autoHideDuration)
      return () => clearTimeout(timer)
    }
  }, [reminder, autoHideDuration, onDismiss])

  if (!reminder || !isVisible || !prefs.visualFeedback) return null

  const spacingMap = { compact: '12px', normal: '16px', wide: '24px' }
  const spacingValue = spacingMap[prefs.spacing]
  const fontMap = { small: '16px', medium: '18px', large: '20px' }
  const fontSize = fontMap[prefs.fontSize]
  const animationDuration = prefs.smoothAnimations ? '0.3s' : '0.1s'

  return (
    <div
      role="alert"
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: '#3b82f6',
        color: 'white',
        padding: spacingValue,
        borderRadius: 12,
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        maxWidth: '400px',
        zIndex: 9999,
        animation: `slideIn ${animationDuration} ease-out`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: spacingValue }}>
        <div style={{ fontSize: '24px', flexShrink: 0, color: 'white' }}>
          <IconBell style={{ color: 'white' }} />
        </div>
        <div style={{ flex: 1 }}>
          <h4 style={{ fontSize, fontWeight: 'bold', margin: '0 0 4px 0' }}>
            Lembrete
          </h4>
          <p style={{ fontSize: '14px', margin: 0 }}>
            {reminder.message}
          </p>
        </div>
        <button
          onClick={() => {
            setIsVisible(false)
            onDismiss()
          }}
          style={{
            background: 'transparent',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            padding: '0',
            flexShrink: 0,
            transition: `opacity ${animationDuration}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          aria-label="Fechar lembrete"
        >
          <IconClose style={{ color: 'white' }} />
        </button>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}
