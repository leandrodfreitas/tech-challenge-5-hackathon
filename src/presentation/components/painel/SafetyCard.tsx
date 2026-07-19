'use client'
import { usePreferences } from '../../contexts/PreferencesContext'
import { useContrastStyles } from '../../hooks/useContrastStyles'
import { Toggle } from '../ui/Toggle'

export function SafetyCard() {
  const { prefs, update } = usePreferences()
  const contrast = useContrastStyles()

  return (
    <section style={{ background: contrast.background, borderRadius: 16, border: `1px solid ${contrast.border}`, padding: 20, marginBottom: 16 }}>
      <h2 style={{ fontSize: 16, fontWeight: 600, color: contrast.text, margin: 0, marginBottom: 8 }}>Segurança e feedback</h2>
      <Toggle
        label="Confirmar antes de ações importantes"
        checked={prefs.extraConfirmation}
        onChange={(v) => update({ extraConfirmation: v })}
      />
      <Toggle
        label="Feedback visual reforçado"
        checked={prefs.visualFeedback}
        onChange={(v) => update({ visualFeedback: v })}
      />
      <Toggle
        label="Animações suaves"
        checked={prefs.smoothAnimations}
        onChange={(v) => update({ smoothAnimations: v })}
      />
    </section>
  )
}
