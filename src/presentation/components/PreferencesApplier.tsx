'use client'
import { useEffect } from 'react'
import { usePreferences } from '../contexts/PreferencesContext'

export function PreferencesApplier() {
  const { prefs } = usePreferences()

  useEffect(() => {
    const root = document.documentElement

    const fontSizes = { small: '14px', medium: '16px', large: '20px' }
    const spacingValues = { compact: '12px', normal: '16px', wide: '24px' }
    const contrastPalettes = {
      default: {
        text: '#1f2937',
        textSecondary: '#6b7280',
        background: '#ffffff',
        border: '#e5e7eb',
        primary: '#2F80ED',
        primaryLight: '#eff6ff',
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
      },
      high: {
        text: '#000000',
        textSecondary: '#374151',
        background: '#ffffff',
        border: '#111827',
        primary: '#1e40af',
        primaryLight: '#dbeafe',
        success: '#047857',
        warning: '#d97706',
        danger: '#dc2626',
      },
      maximum: {
        text: '#000000',
        textSecondary: '#1a1a1a',
        background: '#ffffff',
        border: '#000000',
        primary: '#000000',
        primaryLight: '#ffff00',
        success: '#008000',
        warning: '#ff9900',
        danger: '#ff0000',
      },
    }

    root.style.fontSize = fontSizes[prefs.fontSize]
    root.style.setProperty('--spacing', spacingValues[prefs.spacing])

    const palette = contrastPalettes[prefs.contrast]
    root.style.setProperty('--text-color', palette.text)
    root.style.setProperty('--text-secondary', palette.textSecondary)
    root.style.setProperty('--background', palette.background)
    root.style.setProperty('--border-color', palette.border)
    root.style.setProperty('--primary', palette.primary)
    root.style.setProperty('--primary-light', palette.primaryLight)
    root.style.setProperty('--success', palette.success)
    root.style.setProperty('--warning', palette.warning)
    root.style.setProperty('--danger', palette.danger)

    if (prefs.smoothAnimations) {
      root.style.setProperty('--transition', 'all 0.15s ease')
    } else {
      root.style.setProperty('--transition', 'none')
    }
  }, [prefs])

  return null
}
