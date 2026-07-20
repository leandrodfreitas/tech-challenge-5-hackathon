import { useState, useEffect, useCallback } from 'react'
import { Activity } from '../../domain/entities/Activity'
import { activityRepository } from '../../infrastructure/container'
import { GetHistoryUseCase } from '../../domain/use-cases/GetHistoryUseCase'

const getHistoryUC = new GetHistoryUseCase(activityRepository)

export function useHistory() {
  const [history, setHistory] = useState<Activity[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const loadHistory = useCallback(async (userId: string) => {
    try {
      setIsLoading(true)
      const data = await getHistoryUC.execute(userId)
      setHistory(data)
    } catch (error) {
      console.error('Failed to load history:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    history,
    isLoading,
    loadHistory,
  }
}
