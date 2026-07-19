'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { activityRepository } from '../../../infrastructure/container'
import { Activity } from '../../../domain/entities/Activity'

type Priority = 'Baixa' | 'Média' | 'Alta'
type Step = 1 | 2 | 3

const PRIORITY_STYLE: Record<Priority, { color: string; bg: string; border: string }> = {
  Baixa: { color: '#16a34a', bg: '#dcfce7', border: '#86efac' },
  Média: { color: '#d97706', bg: '#fef3c7', border: '#fcd34d' },
  Alta:  { color: '#ef4444', bg: '#fee2e2', border: '#fca5a5' },
}

function StepIndicator({ current }: { current: Step }) {
  const steps = [
    { n: 1, label: 'Detalhes' },
    { n: 2, label: 'Passos (opcional)' },
    { n: 3, label: 'Revisão' },
  ]
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 28 }}>
      {steps.map((s, i) => {
        const done    = current > s.n
        const active  = current === s.n
        return (
          <div key={s.n} style={{ display: 'flex', alignItems: 'center', flex: i < steps.length - 1 ? 1 : undefined }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                background: done ? '#6FCF97' : active ? '#2F80ED' : '#e5e7eb',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 700, color: done || active ? '#fff' : '#9ca3af',
              }}>
                {done
                  ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><path d="m5 12 5 5L20 7"/></svg>
                  : s.n}
              </div>
              <span style={{ fontSize: 13, fontWeight: active ? 600 : 400, color: active ? '#2F80ED' : done ? '#16a34a' : '#9ca3af', whiteSpace: 'nowrap' }}>
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div style={{ flex: 1, height: 2, background: done ? '#6FCF97' : '#e5e7eb', margin: '0 12px' }} />
            )}
          </div>
        )
      })}
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 8 }}>{label}</label>
      {children}
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '11px 14px', borderRadius: 10,
  border: '1.5px solid #e5e7eb', fontSize: 14, color: '#374151',
  background: '#fff', outline: 'none',
}

export default function NovaTarefaPage() {
  const router = useRouter()
  const [step,        setStep]        = useState<Step>(1)
  const [title,       setTitle]       = useState('')
  const [description, setDescription] = useState('')
  const [date,        setDate]        = useState('')
  const [time,        setTime]        = useState('')
  const [priority,    setPriority]    = useState<Priority | null>(null)
  const [stepTexts,   setStepTexts]   = useState(['', ''])
  const [success,     setSuccess]     = useState(false)

  const canNext = step === 1 ? title.trim() !== '' && date !== '' && priority !== null
                : step === 2 ? true
                : true

  const handleSubmit = async () => {
    const scheduledDate = date && time ? new Date(`${date}T${time}`) : new Date(date)
    
    const newActivity: Omit<Activity, 'id'> = {
      userId: 'u1',
      title: title.trim(),
      scheduledAt: scheduledDate,
      status: 'pending',
      steps: stepTexts
        .filter(Boolean)
        .map((description, index) => ({
          order: index + 1,
          description,
          isDone: false,
        }))
    }

    try {
      await activityRepository.create(newActivity)
      setSuccess(true)
      setTimeout(() => router.push('/atividades'), 2200)
    } catch (error) {
      console.error('Erro ao criar tarefa:', error)
    }
  }

  if (success) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#f4f6fa' }}>
        <div style={{ background: '#fff', borderRadius: 20, padding: 40, textAlign: 'center', maxWidth: 380, boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#f0fdf4', border: '2px solid #86efac', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
          </div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1a1a2e', marginBottom: 8 }}>Tarefa criada com sucesso!</h2>
          <p style={{ fontSize: 14, color: '#6b7280' }}>Tudo certo. Você está no caminho certo! 💚</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f4f6fa', minHeight: '100vh' }}>
      <main id="main-content" style={{ flex: 1, padding: 32 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1a1a2e', marginBottom: 24 }}>Nova tarefa</h1>

          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: 28 }}>
            <StepIndicator current={step} />

            {/* ── Etapa 1: Detalhes ── */}
            {step === 1 && (
              <div>
                <Field label="Título da tarefa">
                  <input
                    type="text" value={title} onChange={e => setTitle(e.target.value)}
                    placeholder="Ex: Enviar atividade de UX Design"
                    style={inputStyle} aria-required="true"
                  />
                </Field>

                <Field label="Descrição">
                  <textarea
                    value={description} onChange={e => setDescription(e.target.value)}
                    placeholder="Descreva o que precisa ser feito..."
                    rows={4}
                    style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }}
                  />
                </Field>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                  <Field label="Data e hora">
                    <div style={{ display: 'flex', gap: 8 }}>
                      <div style={{ position: 'relative', flex: 1 }}>
                        <input type="date" value={date} onChange={e => setDate(e.target.value)}
                          style={{ ...inputStyle, paddingRight: 36 }} aria-required="true" />
                      </div>
                      <div style={{ position: 'relative' }}>
                        <input type="time" value={time} onChange={e => setTime(e.target.value)}
                          style={{ ...inputStyle, width: 100 }} />
                      </div>
                    </div>
                  </Field>
                </div>

                <Field label="Prioridade">
                  <div style={{ display: 'flex', gap: 10 }}>
                    {(['Baixa', 'Média', 'Alta'] as Priority[]).map(p => {
                      const ps = PRIORITY_STYLE[p]
                      const sel = priority === p
                      return (
                        <button key={p} onClick={() => setPriority(p)} style={{
                          padding: '8px 20px', borderRadius: 8, cursor: 'pointer',
                          border: `1.5px solid ${sel ? ps.border : '#e5e7eb'}`,
                          background: sel ? ps.bg : '#fff',
                          color: sel ? ps.color : '#6b7280',
                          fontSize: 14, fontWeight: sel ? 700 : 400, transition: 'all 0.15s',
                        }}>
                          {p}
                        </button>
                      )
                    })}
                  </div>
                </Field>
              </div>
            )}

            {/* ── Etapa 2: Passos ── */}
            {step === 2 && (
              <div>
                <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 20 }}>
                  Opcional: divida a tarefa em passos menores para facilitar a execução.
                </p>
                {stepTexts.map((txt, i) => (
                  <Field key={i} label={`Passo ${i + 1}`}>
                    <input type="text" value={txt}
                      onChange={e => {
                        const next = [...stepTexts]
                        next[i] = e.target.value
                        setStepTexts(next)
                      }}
                      placeholder={`Ex: ${i === 0 ? 'Abrir o documento' : 'Revisar o conteúdo'}`}
                      style={inputStyle}
                    />
                  </Field>
                ))}
                <button onClick={() => setStepTexts(p => [...p, ''])} style={{
                  display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px',
                  borderRadius: 8, border: '1.5px dashed #d1d5db', background: 'transparent',
                  fontSize: 13, color: '#6b7280', cursor: 'pointer',
                }}>
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  Adicionar passo
                </button>
              </div>
            )}

            {/* ── Etapa 3: Revisão ── */}
            {step === 3 && (
              <div>
                <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 20 }}>Confirme os dados antes de criar a tarefa.</p>
                <div style={{ background: '#f9fafb', borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <ReviewRow label="Título"     value={title} />
                  {description && <ReviewRow label="Descrição"  value={description} />}
                  {date         && <ReviewRow label="Data"       value={`${date}${time ? ' às ' + time : ''}`} />}
                  {priority     && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 13, color: '#9ca3af' }}>Prioridade</span>
                      <span style={{
                        fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 6,
                        color: PRIORITY_STYLE[priority].color, background: PRIORITY_STYLE[priority].bg,
                      }}>{priority}</span>
                    </div>
                  )}
                  {stepTexts.filter(Boolean).length > 0 && (
                    <div>
                      <span style={{ fontSize: 13, color: '#9ca3af', display: 'block', marginBottom: 6 }}>Passos</span>
                      {stepTexts.filter(Boolean).map((s, i) => (
                        <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
                          <span style={{ fontSize: 12, width: 20, height: 20, borderRadius: '50%', background: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#374151', fontWeight: 600 }}>{i + 1}</span>
                          <span style={{ fontSize: 13, color: '#374151' }}>{s}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Botões de navegação */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 28 }}>
              <button
                onClick={() => step === 1 ? router.push('/tarefas') : setStep(s => (s - 1) as Step)}
                style={{
                  padding: '10px 22px', borderRadius: 10, border: '1.5px solid #e5e7eb',
                  background: '#fff', fontSize: 14, color: '#374151', cursor: 'pointer', fontWeight: 500,
                }}
              >
                {step === 1 ? 'Cancelar' : 'Voltar'}
              </button>
              <button
                onClick={() => step < 3 ? setStep(s => (s + 1) as Step) : handleSubmit()}
                disabled={!canNext}
                style={{
                  padding: '10px 28px', borderRadius: 10, border: 'none',
                  background: canNext ? '#2F80ED' : '#93c5fd',
                  fontSize: 14, color: '#fff', cursor: canNext ? 'pointer' : 'not-allowed',
                  fontWeight: 600, transition: 'background 0.15s',
                }}
              >
                {step === 3 ? 'Criar tarefa' : 'Próximo'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
      <span style={{ fontSize: 13, color: '#9ca3af', flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: 13, color: '#374151', fontWeight: 500, textAlign: 'right' }}>{value}</span>
    </div>
  )
}
