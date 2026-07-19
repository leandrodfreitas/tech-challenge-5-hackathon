import { Activity, ActivityStep } from '../../domain/entities/Activity'
import { IActivityRepository } from '../../domain/repositories/IActivityRepository'

const SEED: Activity[] = [
  { 
    id: '1', 
    userId: 'u1', 
    title: 'Consulta médica', 
    scheduledAt: new Date(), 
    status: 'pending',
    steps: [
      { order: 1, description: 'Abra seu calendário na tela inicial', isDone: false },
      { order: 2, description: 'Procure o dia da consulta (17 de julho)', isDone: false },
      { order: 3, description: 'Clique no horário 18:00', isDone: false },
      { order: 4, description: 'Anote o local: Clínica Dr. Silva, Av. Paulista 1000', isDone: false },
      { order: 5, description: 'Defina um lembrete para 1 hora antes', isDone: false },
    ]
  },
  { 
    id: '2', 
    userId: 'u1', 
    title: 'Tomar remédio', 
    scheduledAt: new Date(), 
    status: 'pending',
    steps: [
      { order: 1, description: 'Pegue o frasco de remédio do armário', isDone: false },
      { order: 2, description: 'Leia o rótulo para confirmar o medicamento', isDone: false },
      { order: 3, description: 'Tome com um copo de água', isDone: false },
      { order: 4, description: 'Guarde o frasco no lugar correto', isDone: false },
    ]
  },
  { 
    id: '3', 
    userId: 'u1', 
    title: 'Exercício físico', 
    scheduledAt: new Date(), 
    status: 'done',
    steps: [
      { order: 1, description: 'Coloque uma roupa confortável', isDone: true },
      { order: 2, description: 'Alongue os braços por 2 minutos', isDone: true },
      { order: 3, description: 'Caminhe por 15 minutos', isDone: true },
      { order: 4, description: 'Alongue novamente para relaxar', isDone: true },
    ]
  },
  { 
    id: '4', 
    userId: 'u1', 
    title: 'Enviar documento', 
    scheduledAt: new Date(), 
    status: 'overdue',
    steps: [
      { order: 1, description: 'Abra a pasta de documentos no computador', isDone: false },
      { order: 2, description: 'Procure pelo arquivo "Documento_Final.pdf"', isDone: false },
      { order: 3, description: 'Abra o navegador e acesse o site da plataforma', isDone: false },
      { order: 4, description: 'Clique em "Enviar Documento"', isDone: false },
      { order: 5, description: 'Selecione o arquivo da pasta', isDone: false },
      { order: 6, description: 'Clique em "Confirmar Envio"', isDone: false },
    ]
  },
]

export class LocalStorageActivityRepository implements IActivityRepository {
  private readonly key = 'seniorease:activities'

  private load(): Activity[] {
    if (typeof window === 'undefined') return SEED
    const raw = localStorage.getItem(this.key)
    return raw ? JSON.parse(raw) : SEED
  }

  private save(items: Activity[]): void {
    localStorage.setItem(this.key, JSON.stringify(items))
  }

  async findByUserId(userId: string): Promise<Activity[]> {
    return this.load().filter((a) => a.userId === userId)
  }

  async create(activity: Omit<Activity, 'id'>): Promise<Activity> {
    const items = this.load()
    const newItem: Activity = { ...activity, id: crypto.randomUUID() }
    this.save([...items, newItem])
    return newItem
  }

  async updateStatus(id: string, status: Activity['status']): Promise<void> {
    const items = this.load().map((a) => (a.id === id ? { ...a, status } : a))
    this.save(items)
  }
}
