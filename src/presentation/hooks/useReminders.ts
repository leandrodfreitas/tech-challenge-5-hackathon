import { useState, useEffect, useCallback } from 'react'
import { Reminder } from '../../domain/entities/Reminder'
import { reminderRepository } from '../../infrastructure/container'
import {
  CreateReminderUseCase,
  UpdateReminderUseCase,
  DeleteReminderUseCase,
} from '../../domain/use-cases'

const createReminderUC = new CreateReminderUseCase(reminderRepository)
const updateReminderUC = new UpdateReminderUseCase(reminderRepository)
const deleteReminderUC = new DeleteReminderUseCase(reminderRepository)

export function useReminders() {
  const [reminders, setReminders] = useState<Reminder[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const loadReminders = useCallback(async (userId: string) => {
    try {
      setIsLoading(true)
      const data = await reminderRepository.findByUserId(userId)
      setReminders(data)
    } catch (error) {
      console.error('Failed to load reminders:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleCreateReminder = useCallback(async (
    userId: string,
    activityId: string,
    type: Reminder['type'],
    frequency: Reminder['frequency'],
    scheduledFor: Date,
    message: string
  ) => {
    try {
      const reminder = await createReminderUC.execute(
        userId,
        activityId,
        type,
        frequency,
        scheduledFor,
        message
      )
      setReminders((prev) => [...prev, reminder])
      return reminder
    } catch (error) {
      console.error('Failed to create reminder:', error)
      throw error
    }
  }, [])

  const handleUpdateReminder = useCallback(async (id: string, updates: Partial<Reminder>) => {
    try {
      await updateReminderUC.execute(id, updates)
      setReminders((prev) =>
        prev.map((r) => (r.id === id ? { ...r, ...updates } : r))
      )
    } catch (error) {
      console.error('Failed to update reminder:', error)
      throw error
    }
  }, [])

  const handleDeleteReminder = useCallback(async (id: string) => {
    try {
      await deleteReminderUC.execute(id)
      setReminders((prev) => prev.filter((r) => r.id !== id))
    } catch (error) {
      console.error('Failed to delete reminder:', error)
      throw error
    }
  }, [])

  const getReminderByActivityId = (activityId: string) => {
    return reminders.find((r) => r.activityId === activityId)
  }

  return {
    reminders,
    isLoading,
    loadReminders,
    createReminder: handleCreateReminder,
    updateReminder: handleUpdateReminder,
    deleteReminder: handleDeleteReminder,
    getReminderByActivityId,
  }
}
