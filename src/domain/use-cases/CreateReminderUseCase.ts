import { Reminder } from '../../domain/entities/Reminder'
import { IReminderRepository } from '../../domain/repositories/IReminderRepository'

export class CreateReminderUseCase {
  constructor(private reminderRepository: IReminderRepository) {}

  async execute(
    userId: string,
    activityId: string,
    type: Reminder['type'],
    frequency: Reminder['frequency'],
    scheduledFor: Date,
    message: string
  ): Promise<Reminder> {
    return this.reminderRepository.create({
      userId,
      activityId,
      type,
      frequency,
      scheduledFor,
      message,
      enabled: true,
    })
  }
}
