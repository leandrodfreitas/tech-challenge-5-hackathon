'use client'
import { usePreferences } from '../../presentation/contexts/PreferencesContext'
import { IconFont, IconContrast, IconNavigation, IconBell, IconSecurity } from '../../presentation/components/icons'

const FONT_LABELS = { small: 'Pequeno', medium: 'Médio', large: 'Grande' }
const CONTRAST_LABELS = { default: 'Padrão', high: 'Alto', maximum: 'Máximo' }
const MODE_LABELS = { simplified: 'Simplificado', advanced: 'Avançado' }

export default function PerfilPage() {
  const { prefs } = usePreferences()

  const items = [
    { icon: <IconFont />, label: 'Tamanho da fonte', value: FONT_LABELS[prefs.fontSize] },
    { icon: <IconContrast />, label: 'Contraste', value: CONTRAST_LABELS[prefs.contrast] },
    { icon: <IconNavigation />, label: 'Modo de navegação', value: MODE_LABELS[prefs.navigationMode] },
    { icon: <IconBell />, label: 'Lembretes', value: prefs.remindersEnabled ? 'Ativados' : 'Desativados' },
    { icon: <IconSecurity />, label: 'Confirmações extras', value: prefs.extraConfirmation ? 'Ativadas' : 'Desativadas' },
  ]

  return (
    <div className="px-4 py-8">
      <h1 className="text-2xl font-medium text-gray-900 mb-6">Seu perfil</h1>
      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4 flex items-center gap-4">
        <div
          className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xl font-medium"
          aria-hidden="true"
        >
          MJ
        </div>
        <div>
          <p className="text-lg font-medium text-gray-900">Maria José</p>
          <p className="text-sm text-gray-500">mariajose@email.com</p>
        </div>
      </div>
      <section className="bg-white rounded-2xl border border-gray-100 p-5">
        <h2 className="text-base font-medium text-gray-800 mb-3">Preferências salvas</h2>
        <ul>
          {items.map((item) => (
            <li
              key={item.label}
              className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0"
            >
              <span
                className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center text-base flex-shrink-0"
                aria-hidden="true"
              >
                <span style={{ color: '#2F80ED', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {item.icon}
                </span>
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">{item.label}</p>
                <p className="text-xs text-gray-500">{item.value}</p>
              </div>
              <span className="text-gray-300" aria-hidden="true">›</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
