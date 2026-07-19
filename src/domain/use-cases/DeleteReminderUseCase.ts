import { IReminderRepository } from '../../domain/repositories/IReminderRepository'

export class DeleteReminderUseCase {
  constructor(private reminderRepository: IReminderRepository) {}

  async execute(id: string): Promise<void> {
    return this.reminderRepository.delete(id)
  }
}
