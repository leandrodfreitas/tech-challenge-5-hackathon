import { Reminder } from '../entities/Reminder'

export interface IReminderRepository {
  findByUserId(userId: string): Promise<Reminder[]>
  findByActivityId(activityId: string): Promise<Reminder | null>
  create(reminder: Omit<Reminder, 'id' | 'createdAt'>): Promise<Reminder>
  update(id: string, reminder: Partial<Reminder>): Promise<void>
  delete(id: string): Promise<void>
}
