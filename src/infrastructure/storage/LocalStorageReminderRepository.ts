import { Reminder } from '../../domain/entities/Reminder'
import { IReminderRepository } from '../../domain/repositories/IReminderRepository'

export class LocalStorageReminderRepository implements IReminderRepository {
  private readonly key = 'seniorease:reminders'

  private load(): Reminder[] {
    if (typeof window === 'undefined') return []
    const raw = localStorage.getItem(this.key)
    return raw ? JSON.parse(raw) : []
  }

  private save(items: Reminder[]): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.key, JSON.stringify(items))
    }
  }

  async findByUserId(userId: string): Promise<Reminder[]> {
    return this.load().filter((r) => r.userId === userId)
  }

  async findByActivityId(activityId: string): Promise<Reminder | null> {
    const reminders = this.load()
    return reminders.find((r) => r.activityId === activityId) || null
  }

  async create(reminder: Omit<Reminder, 'id' | 'createdAt'>): Promise<Reminder> {
    const reminders = this.load()
    const id = `reminder_${Date.now()}`
    const newReminder: Reminder = {
      ...reminder,
      id,
      createdAt: new Date(),
    }
    reminders.push(newReminder)
    this.save(reminders)
    return newReminder
  }

  async update(id: string, updates: Partial<Reminder>): Promise<void> {
    const reminders = this.load()
    const index = reminders.findIndex((r) => r.id === id)
    if (index !== -1) {
      reminders[index] = { ...reminders[index], ...updates }
      this.save(reminders)
    }
  }

  async delete(id: string): Promise<void> {
    const reminders = this.load()
    this.save(reminders.filter((r) => r.id !== id))
  }
}
