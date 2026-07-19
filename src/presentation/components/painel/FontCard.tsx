'use client'
import { usePreferences } from '../../contexts/PreferencesContext'
import { useContrastStyles } from '../../hooks/useContrastStyles'
import { SliderControl } from '../ui/SliderControl'

const FONT_SIZES = ['small', 'medium', 'large'] as const
const FONT_LABELS: Record<string, string> = { small: 'Pequeno', medium: 'Médio', large: 'Grande' }
const FONT_PX: Record<string, string> = { small: '14px', medium: '16px', large: '20px' }

const SPACINGS = ['compact', 'normal', 'wide'] as const
const SPACING_LABELS: Record<string, string> = { compact: 'Compacto', normal: 'Normal', wide: 'Amplo' }

export function FontCard() {
  const { prefs, update } = usePreferences()
  const contrast = useContrastStyles()

  return (
    <section style={{ background: contrast.background, borderRadius: 16, border: `1px solid ${contrast.border}`, padding: 20, marginBottom: 16 }}>
      <h2 style={{ fontSize: 16, fontWeight: 600, color: contrast.text, margin: 0, marginBottom: 16 }}>Tamanho e legibilidade</h2>
      <SliderControl
        label="Tamanho da fonte"
        value={FONT_SIZES.indexOf(prefs.fontSize) + 1}
        min={1}
        max={3}
        displayValue={FONT_LABELS[prefs.fontSize]}
        onChange={(v) => update({ fontSize: FONT_SIZES[v - 1] })}
      />
      <SliderControl
        label="Espaçamento"
        value={SPACINGS.indexOf(prefs.spacing) + 1}
        min={1}
        max={3}
        displayValue={SPACING_LABELS[prefs.spacing]}
        onChange={(v) => update({ spacing: SPACINGS[v - 1] })}
      />
      <div
        style={{ marginTop: 12, padding: 16, background: contrast.primaryLight, borderRadius: 12, color: contrast.text, transition: 'all 0.15s', fontSize: FONT_PX[prefs.fontSize] }}
        aria-label="Prévia do texto com as configurações atuais"
      >
        Texto de exemplo. Ajuste o tamanho até ficar confortável para ler.
      </div>
    </section>
  )
}
