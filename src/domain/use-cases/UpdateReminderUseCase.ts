import { Reminder } from '../../domain/entities/Reminder'
import { IReminderRepository } from '../../domain/repositories/IReminderRepository'

export class UpdateReminderUseCase {
  constructor(private reminderRepository: IReminderRepository) {}

  async execute(id: string, updates: Partial<Reminder>): Promise<void> {
    return this.reminderRepository.update(id, updates)
  }
}
