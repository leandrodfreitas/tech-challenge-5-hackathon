'use client'
import { useEffect } from 'react'
import { useHistory } from '../../presentation/hooks/useHistory'
import { usePreferences } from '../../presentation/contexts/PreferencesContext'
import { useContrastStyles } from '../../presentation/hooks/useContrastStyles'
import { HistoryList } from '../../presentation/components/history/HistoryList'

export default function HistoricoPage() {
  const { history, isLoading, loadHistory } = useHistory()
  const { prefs } = usePreferences()
  const contrast = useContrastStyles()

  useEffect(() => {
    loadHistory('u1')
  }, [])

  const spacingMap = { compact: '12px', normal: '16px', wide: '24px' }
  const spacingValue = spacingMap[prefs.spacing]
  const fontMap = { small: '16px', medium: '18px', large: '20px' }
  const fontSize = fontMap[prefs.fontSize]
  const animationStyle = prefs.smoothAnimations ? 'all 0.3s ease-out' : 'none'

  const sortedHistory = [...history].sort(
    (a, b) => new Date(b.completedAt || 0).getTime() - new Date(a.completedAt || 0).getTime()
  )

  return (
    <main
      style={{
        padding: spacingValue,
        maxWidth: '900px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: spacingValue }}>
        📜 Histórico de Atividades
      </h1>

      <div
        style={{
          background: contrast.background,
          border: `2px solid ${contrast.border}`,
          borderRadius: 16,
          padding: spacingValue,
          marginBottom: spacingValue,
          transition: animationStyle,
        }}
      >
        <p style={{ fontSize, margin: 0, lineHeight: '1.6' }}>
          Aqui você vê todas as atividades que você completou. Cada uma mostra quando foi
          realizada e todos os passos que você seguiu.
        </p>
      </div>

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: spacingValue }}>
          <p style={{ fontSize }}>Carregando histórico...</p>
        </div>
      ) : (
        <HistoryList activities={sortedHistory} />
      )}

      {/* Estatísticas */}
      {sortedHistory.length > 0 && (
        <div
          style={{
            marginTop: spacingValue,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: spacingValue,
          }}
        >
          <div
            style={{
              background: contrast.background,
              border: `2px solid #16a34a`,
              borderRadius: 12,
              padding: spacingValue,
              textAlign: 'center',
            }}
          >
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 8px 0' }}>
              {sortedHistory.length}
            </h3>
            <p style={{ fontSize: '14px', margin: 0 }}>Atividades Concluídas</p>
          </div>

          <div
            style={{
              background: contrast.background,
              border: `2px solid #3b82f6`,
              borderRadius: 12,
              padding: spacingValue,
              textAlign: 'center',
            }}
          >
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 8px 0' }}>
              🎯
            </h3>
            <p style={{ fontSize: '14px', margin: 0 }}>Você está indo bem!</p>
          </div>
        </div>
      )}
    </main>
  )
}
