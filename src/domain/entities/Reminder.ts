export type ReminderType = 'none' | 'push'
export type ReminderFrequency = 'once' | 'daily' | 'weekly'

export interface Reminder {
  id: string
  userId: string
  activityId: string
  type: ReminderType
  frequency: ReminderFrequency
  scheduledFor: Date
  message: string
  enabled: boolean
  createdAt: Date
  lastSentAt?: Date
}
