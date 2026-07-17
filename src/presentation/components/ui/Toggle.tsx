'use client'
import { useContrastStyles } from '../../hooks/useContrastStyles'

interface ToggleProps {
  checked: boolean
  onChange: (val: boolean) => void
  label: string
}

export function Toggle({ checked, onChange, label }: ToggleProps) {
  const contrast = useContrastStyles()

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, paddingBottom: 12, borderBottom: `1px solid ${contrast.border}`, lastChild: { borderBottom: 'none' } }}>
      <span style={{ fontSize: 15, color: contrast.text }}>{label}</span>
      <button
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        style={{
          width: 44,
          height: 24,
          borderRadius: 12,
          border: 'none',
          background: checked ? contrast.primary : contrast.border,
          cursor: 'pointer',
          position: 'relative',
          transition: 'background 0.2s',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 3,
            width: 18,
            height: 18,
            borderRadius: '50%',
            background: '#fff',
            transition: 'left 0.2s',
            left: checked ? 23 : 3,
          }}
        />
      </button>
    </div>
  )
}
