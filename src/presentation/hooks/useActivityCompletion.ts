import { activityRepository } from '../../infrastructure/container'

export function useActivityCompletion() {
  const markActivityAsComplete = async (activityId: string) => {
    try {
      await activityRepository.updateStatus(activityId, 'done')
      await activityRepository.updateCompletedAt(activityId, new Date())
    } catch (error) {
      console.error('Failed to mark activity as complete:', error)
      throw error
    }
  }

  const markActivityAsPending = async (activityId: string) => {
    try {
      await activityRepository.updateStatus(activityId, 'pending')
      await activityRepository.updateCompletedAt(activityId, null)
    } catch (error) {
      console.error('Failed to mark activity as pending:', error)
      throw error
    }
  }

  return {
    markActivityAsComplete,
    markActivityAsPending,
  }
}
