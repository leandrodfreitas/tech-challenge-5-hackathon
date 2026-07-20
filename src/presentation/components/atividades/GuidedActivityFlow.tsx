'use client'
import { useState } from 'react'
import { Activity } from '../../../domain/entities/Activity'
import { IconClipboard, IconCheckmark } from '../icons'

interface GuidedActivityFlowProps {
  activity: Activity
  onComplete: () => void
  onCancel: () => void
}

export function GuidedActivityFlow({ activity, onComplete, onCancel }: GuidedActivityFlowProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const steps = activity.steps || []
  const totalSteps = steps.length
  const isLastStep = currentStep === totalSteps - 1
  const progress = ((currentStep + 1) / totalSteps) * 100
  const currentStepData = steps[currentStep]

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = () => {
    onComplete()
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50,
    }}>
      <div style={{
        background: 'var(--background)',
        borderRadius: 16,
        boxShadow: '0 20px 25px rgba(0, 0, 0, 0.15)',
        maxWidth: 600,
        width: '90%',
        padding: 32,
        border: `2px solid var(--primary)`,
      }}>
        {/* Cabeçalho */}
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-color)', margin: 0, marginBottom: 12 }}>
            {activity.title}
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0, marginBottom: 16 }}>
            Passo {currentStep + 1} de {totalSteps}
          </p>

          {/* Barra de Progresso */}
          <div style={{
            width: '100%',
            height: 8,
            background: 'var(--border-color)',
            borderRadius: 4,
            overflow: 'hidden',
          }}>
            <div style={{
              width: `${progress}%`,
              height: '100%',
              background: 'var(--primary)',
              transition: 'width 0.3s ease',
            }} />
          </div>
        </div>

        {/* Conteúdo do Passo */}
        <div style={{
          background: 'var(--primary-light)',
          border: `1px solid var(--border-color)`,
          borderRadius: 12,
          padding: 24,
          marginBottom: 28,
          minHeight: 160,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          <div style={{
            fontSize: '2rem',
            marginBottom: 16,
            lineHeight: 1,
            color: 'var(--primary)',
          }}>
            <IconClipboard />
          </div>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            color: 'var(--text-color)',
            margin: 0,
            marginBottom: 12,
          }}>
            {currentStepData?.description || 'Carregando...'}
          </h3>
          <p style={{
            fontSize: '0.9375rem',
            color: 'var(--text-secondary)',
            margin: 0,
            lineHeight: 1.6,
          }}>
            Siga as instruções acima para completar este passo. Clique em "Próximo" quando terminar.
          </p>
        </div>

        {/* Botões de Ação */}
        <div style={{
          display: 'flex',
          gap: 12,
          justifyContent: 'flex-end',
        }}>
          <button
            onClick={onCancel}
            style={{
              padding: '10px 20px',
              borderRadius: 8,
              border: `1.5px solid var(--border-color)`,
              background: '#fff',
              color: 'var(--text-color)',
              fontSize: '0.9375rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'var(--transition)',
            }}
          >
            Cancelar
          </button>

          {currentStep > 0 && (
            <button
              onClick={handlePrevious}
              style={{
                padding: '10px 20px',
                borderRadius: 8,
                border: `1.5px solid var(--border-color)`,
                background: 'var(--primary-light)',
                color: 'var(--primary)',
                fontSize: '0.9375rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'var(--transition)',
              }}
            >
              ← Anterior
            </button>
          )}

          {!isLastStep && (
            <button
              onClick={handleNext}
              style={{
                padding: '10px 20px',
                borderRadius: 8,
                border: 'none',
                background: 'var(--primary)',
                color: '#fff',
                fontSize: '0.9375rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'var(--transition)',
              }}
            >
              Próximo →
            </button>
          )}

          {isLastStep && (
            <button
              onClick={handleComplete}
              style={{
                padding: '10px 20px',
                borderRadius: 8,
                border: 'none',
                background: 'var(--success)',
                color: '#fff',
                fontSize: '0.9375rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'var(--transition)',
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}
              aria-label="Concluir tarefa"
            >
              <IconCheckmark style={{ color: 'white' }} /> Concluir
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
