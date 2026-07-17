'use client'
import { useState } from 'react'
import { usePreferences } from '../../presentation/contexts/PreferencesContext'

function AccessibilityIcon({ active }: { active: boolean }) {
  return <svg width="18" height="18" fill="none" stroke={active ? '#2F80ED' : '#6b7280'} strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="5" r="2"/><path d="M12 9v4m-2 0h4m2 3H8a2 2 0 0 0-2 2v5h12v-5a2 2 0 0 0-2-2m-4-4v4"/></svg>
}

function AppearanceIcon({ active }: { active: boolean }) {
  return <svg width="18" height="18" fill="none" stroke={active ? '#2F80ED' : '#6b7280'} strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="8" cy="8" r="2" fill={active ? '#2F80ED' : '#6b7280'}/><circle cx="16" cy="8" r="2" fill={active ? '#2F80ED' : '#6b7280'}/><circle cx="12" cy="16" r="1.5" fill={active ? '#2F80ED' : '#6b7280'}/></svg>
}

function NotificationsIcon({ active }: { active: boolean }) {
  return <svg width="18" height="18" fill="none" stroke={active ? '#2F80ED' : '#6b7280'} strokeWidth="1.8" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
}

function AccountIcon({ active }: { active: boolean }) {
  return <svg width="18" height="18" fill="none" stroke={active ? '#2F80ED' : '#6b7280'} strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="7" r="3"/><path d="M12 12c-4 0-7 2.239-7 5v5h14v-5c0-2.761-3-5-7-5"/></svg>
}

function SecurityIcon({ active }: { active: boolean }) {
  return <svg width="18" height="18" fill="none" stroke={active ? '#2F80ED' : '#6b7280'} strokeWidth="1.8" viewBox="0 0 24 24"><path d="M12 1l8 3v7c0 5.55-3.84 10.74-8 12-4.16-1.26-8-6.45-8-12V4z"/><circle cx="12" cy="12" r="2"/></svg>
}

const CONFIG_SECTIONS = [
  { key: 'acessibilidade', label: 'Acessibilidade', icon: AccessibilityIcon },
  { key: 'aparencia',      label: 'Aparência',      icon: AppearanceIcon },
  { key: 'notificacoes',   label: 'Notificações',   icon: NotificationsIcon },
  { key: 'conta',          label: 'Conta',          icon: AccountIcon },
  { key: 'seguranca',      label: 'Segurança',      icon: SecurityIcon },
]

const FONT_SIZE_MAP = { small: 14, medium: 16, large: 20 }
const FONT_SIZE_REVERSE = { 14: 'small' as const, 16: 'medium' as const, 20: 'large' as const }
const FONT_SIZES_ARRAY = ['small', 'medium', 'large'] as const
const CONTRAST_MAP = { default: 'padrao', high: 'alto', maximum: 'preto-amarelo' } as const
const CONTRAST_REVERSE = { padrao: 'default', alto: 'high', 'preto-amarelo': 'maximum' } as const
const SPACING_MAP = { compact: 'compacto', normal: 'normal', wide: 'confortavel' } as const
const SPACING_REVERSE = { compacto: 'compact', normal: 'normal', confortavel: 'wide' } as const
const NAV_MODE_MAP = { simplified: 'basico', advanced: 'avancado' } as const
const NAV_MODE_REVERSE = { basico: 'simplified', avancado: 'advanced' } as const

function RadioBtn({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <button onClick={onChange} style={{
      display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px',
      borderRadius: 8, border: `1.5px solid ${checked ? '#2F80ED' : '#e5e7eb'}`,
      background: checked ? '#eff6ff' : '#fff', cursor: 'pointer',
      fontSize: 13, fontWeight: checked ? 600 : 400,
      color: checked ? '#2F80ED' : '#374151', transition: 'all 0.15s',
    }}>
      <span style={{ width: 16, height: 16, borderRadius: '50%', border: `2px solid ${checked ? '#2F80ED' : '#d1d5db'}`, background: checked ? '#2F80ED' : '#fff', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {checked && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />}
      </span>
      {label}
    </button>
  )
}

function ToggleRow({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid #f3f4f6' }}>
      <span style={{ fontSize: 14, color: '#374151' }}>{label}</span>
      <button onClick={onChange} role="switch" aria-checked={checked} aria-label={label} style={{ width: 44, height: 24, borderRadius: 12, border: 'none', background: checked ? '#2F80ED' : '#d1d5db', cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
        <span style={{ position: 'absolute', top: 3, width: 18, height: 18, borderRadius: '50%', background: '#fff', transition: 'left 0.2s', left: checked ? 23 : 3 }} />
      </button>
    </div>
  )
}

export default function ConfiguracoesPage() {
  const { prefs, update } = usePreferences()
  const [section, setSection] = useState('acessibilidade')
  const [saved, setSaved] = useState(false)

  const fontSizeNum = FONT_SIZE_MAP[prefs.fontSize]
  const contrastUI = CONTRAST_MAP[prefs.contrast]
  const spacingUI = SPACING_MAP[prefs.spacing]
  const navModeUI = NAV_MODE_MAP[prefs.navigationMode]

  const handleFontChange = (value: number) => {
    const size = FONT_SIZES_ARRAY[value - 1]
    if (size) update({ fontSize: size }).catch(e => console.error('Font update failed:', e))
  }

  const handleContrastChange = (value: string) => {
    const contrast = CONTRAST_REVERSE[value as keyof typeof CONTRAST_REVERSE]
    if (contrast) update({ contrast }).catch(e => console.error('Contrast update failed:', e))
  }

  const handleSpacingChange = (value: string) => {
    const spacing = SPACING_REVERSE[value as keyof typeof SPACING_REVERSE]
    if (spacing) update({ spacing }).catch(e => console.error('Spacing update failed:', e))
  }

  const handleNavModeChange = (value: string) => {
    const mode = NAV_MODE_REVERSE[value as keyof typeof NAV_MODE_REVERSE]
    if (mode) update({ navigationMode: mode }).catch(e => console.error('Nav mode update failed:', e))
  }

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500) }

  return (
    <div style={{ display: 'flex', height: '100%', minHeight: 'calc(100vh - 60px)' }}>

      {/* Submenu lateral de configurações */}
      <aside style={{ width: 196, background: '#fff', borderRight: '1px solid #e5e7eb', padding: '20px 10px', flexShrink: 0 }}>
        <ul style={{ listStyle: 'none' }}>
          {CONFIG_SECTIONS.map(s => (
            <li key={s.key}>
              <button onClick={() => setSection(s.key)} style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 12px', borderRadius: 10, border: 'none', cursor: 'pointer', textAlign: 'left',
                background: section === s.key ? '#eff6ff' : 'transparent',
                color: section === s.key ? '#2F80ED' : '#6b7280',
                fontSize: 14, fontWeight: section === s.key ? 600 : 400, transition: 'all 0.15s',
              }}>
                <s.icon active={section === s.key} />{s.label}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Painel de acessibilidade */}
      <div style={{ flex: 1, padding: 32, overflowY: 'auto' }}>
        {saved && (
          <div role="status" aria-live="polite" style={{ position: 'fixed', top: 24, right: 24, background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 12, padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 10, zIndex: 100, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#15803d' }}>Alterações salvas com sucesso!</span>
          </div>
        )}

        <div style={{ maxWidth: 620 }}>
          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: 28 }}>
            {section === 'acessibilidade' && (
              <>
                <h2 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a2e', marginBottom: 24 }}>Acessibilidade</h2>

                <div style={{ marginBottom: 24 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                    <label style={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>Tamanho da fonte</label>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#2F80ED' }}>{fontSizeNum}px</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600 }}>A-</span>
                    <input type="range" min={1} max={3} step={1} value={FONT_SIZES_ARRAY.indexOf(prefs.fontSize) + 1} onChange={e => handleFontChange(Number(e.target.value))} aria-label="Tamanho da fonte" style={{ flex: 1, accentColor: '#2F80ED' }} />
                    <span style={{ fontSize: 18, color: '#9ca3af', fontWeight: 600 }}>A+</span>
                  </div>
                  <div style={{ marginTop: 10, padding: '10px 14px', background: '#f9fafb', borderRadius: 8, border: '1px solid #f3f4f6' }}>
                    <span style={{ fontSize: fontSizeNum, color: '#374151' }}>Exemplo de texto com {fontSizeNum}px</span>
                  </div>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <label style={{ fontSize: 14, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 10 }}>Contraste</label>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <RadioBtn checked={contrastUI === 'padrao'}        onChange={() => handleContrastChange('padrao')}        label="Padrão" />
                    <RadioBtn checked={contrastUI === 'alto'}          onChange={() => handleContrastChange('alto')}          label="Alto contraste" />
                    <RadioBtn checked={contrastUI === 'preto-amarelo'} onChange={() => handleContrastChange('preto-amarelo')} label="Preto e amarelo" />
                  </div>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <label style={{ fontSize: 14, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 10 }}>Espaçamento entre elementos</label>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <RadioBtn checked={spacingUI === 'compacto'}    onChange={() => handleSpacingChange('compacto')}    label="Compacto" />
                    <RadioBtn checked={spacingUI === 'normal'}      onChange={() => handleSpacingChange('normal')}      label="Normal" />
                    <RadioBtn checked={spacingUI === 'confortavel'} onChange={() => handleSpacingChange('confortavel')} label="Confortável" />
                  </div>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <label style={{ fontSize: 14, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 10 }}>Modo de navegação</label>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <RadioBtn checked={navModeUI === 'basico'}   onChange={() => handleNavModeChange('basico')}   label="Básico" />
                    <RadioBtn checked={navModeUI === 'avancado'} onChange={() => handleNavModeChange('avancado')} label="Avançado" />
                  </div>
                </div>

                <ToggleRow label="Feedback visual reforçado"                  checked={prefs.visualFeedback} onChange={() => update({ visualFeedback: !prefs.visualFeedback })} />
                <ToggleRow label="Confirmação adicional antes de ações críticas" checked={prefs.extraConfirmation}  onChange={() => update({ extraConfirmation: !prefs.extraConfirmation })} />
              </>
            )}

            {section === 'aparencia' && (
              <>
                <h2 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a2e', marginBottom: 24 }}>Aparência</h2>
                <div style={{ padding: '20px', background: '#f9fafb', borderRadius: 12, marginBottom: 24 }}>
                  <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.6 }}>Controle como a interface aparece para você:</p>
                </div>
                <ToggleRow label="Animações suaves" checked={prefs.smoothAnimations} onChange={() => update({ smoothAnimations: !prefs.smoothAnimations })} />
              </>
            )}

            {section === 'notificacoes' && (
              <>
                <h2 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a2e', marginBottom: 24 }}>Notificações</h2>
                <ToggleRow label="Ativar lembretes" checked={prefs.remindersEnabled} onChange={() => update({ remindersEnabled: !prefs.remindersEnabled })} />
                <div style={{ marginTop: 20, padding: '14px', background: '#eff6ff', borderRadius: 10, border: '1px solid #bfdbfe' }}>
                  <p style={{ fontSize: 13, color: '#1d4ed8', margin: 0 }}>Você receberá notificações sobre suas tarefas próximas quando os lembretes estiverem ativados.</p>
                </div>
              </>
            )}

            {section === 'conta' && (
              <>
                <h2 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a2e', marginBottom: 24 }}>Sua Conta</h2>
                <div style={{ marginBottom: 24 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 16, background: '#f9fafb', borderRadius: 12, marginBottom: 20 }}>
                    <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, color: '#1d4ed8', flexShrink: 0 }}>
                      MJ
                    </div>
                    <div>
                      <p style={{ fontSize: 15, fontWeight: 600, color: '#1a1a2e', margin: 0 }}>Maria José Silva</p>
                      <p style={{ fontSize: 13, color: '#6b7280', margin: '4px 0 0 0' }}>mariajose@email.com</p>
                    </div>
                  </div>
                  <button style={{ width: '100%', padding: '10px 16px', borderRadius: 10, border: 'none', background: '#fff', color: '#ef4444', fontSize: 14, fontWeight: 600, cursor: 'pointer', marginBottom: 8 }}>
                    Alterar senha
                  </button>
                  <button style={{ width: '100%', padding: '10px 16px', borderRadius: 10, border: 'none', background: '#fff', color: '#ef4444', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                    Exportar dados
                  </button>
                </div>
              </>
            )}

            {section === 'seguranca' && (
              <>
                <h2 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a2e', marginBottom: 24 }}>Segurança</h2>
                <div style={{ marginBottom: 24 }}>
                  <div style={{ padding: 16, background: '#fef3c7', borderRadius: 10, border: '1px solid #fcd34d', marginBottom: 20 }}>
                    <p style={{ fontSize: 13, color: '#92400e', margin: 0 }}>Sua conta está protegida com autenticação de dois fatores.</p>
                  </div>
                  <button style={{ width: '100%', padding: '10px 16px', borderRadius: 10, border: '1.5px solid #e5e7eb', background: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: '#374151', marginBottom: 8 }}>
                    Gerenciar dispositivos
                  </button>
                  <button style={{ width: '100%', padding: '10px 16px', borderRadius: 10, border: '1.5px solid #e5e7eb', background: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: '#374151' }}>
                    Atividade de login
                  </button>
                </div>
              </>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 28, paddingTop: 20, borderTop: '1px solid #e5e7eb' }}>
              <button style={{ padding: '10px 22px', borderRadius: 10, border: '1.5px solid #e5e7eb', background: '#fff', fontSize: 14, color: '#374151', cursor: 'pointer', fontWeight: 500 }}>
                Restaurar padrão
              </button>
              <button onClick={handleSave} style={{ padding: '10px 22px', borderRadius: 10, border: 'none', background: '#2F80ED', fontSize: 14, color: '#fff', cursor: 'pointer', fontWeight: 600 }}>
                Salvar alterações
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
