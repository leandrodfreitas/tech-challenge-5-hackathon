import { usePreferences } from '../contexts/PreferencesContext'

interface ContrastPalette {
  text: string
  textSecondary: string
  background: string
  border: string
  primary: string
  primaryLight: string
  success: string
  warning: string
  danger: string
}

const CONTRAST_PALETTES: Record<string, ContrastPalette> = {
  default: {
    text: '#1a1a2e',
    textSecondary: '#6b7280',
    background: '#ffffff',
    border: '#e5e7eb',
    primary: '#2F80ED',
    primaryLight: '#eff6ff',
    success: '#16a34a',
    warning: '#d97706',
    danger: '#ef4444',
  },
  high: {
    text: '#000000',
    textSecondary: '#333333',
    background: '#ffffff',
    border: '#000000',
    primary: '#0051cc',
    primaryLight: '#e5e5ff',
    success: '#003300',
    warning: '#cc5c00',
    danger: '#cc0000',
  },
  maximum: {
    text: '#000000',
    textSecondary: '#000000',
    background: '#ffffff',
    border: '#000000',
    primary: '#ffff00',
    primaryLight: '#ffff00',
    success: '#000000',
    warning: '#000000',
    danger: '#000000',
  },
}

export function useContrastStyles() {
  const { prefs } = usePreferences()
  return CONTRAST_PALETTES[prefs.contrast] || CONTRAST_PALETTES.default
}
