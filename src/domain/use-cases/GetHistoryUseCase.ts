import { Activity } from '../../domain/entities/Activity'
import { IActivityRepository } from '../../domain/repositories/IActivityRepository'

export class GetHistoryUseCase {
  constructor(private activityRepository: IActivityRepository) {}

  async execute(userId: string): Promise<Activity[]> {
    return this.activityRepository.findCompleted(userId)
  }
}
