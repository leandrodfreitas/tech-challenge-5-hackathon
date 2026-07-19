export type ActivityStatus = 'pending' | 'done' | 'overdue'

export interface Activity {
  id: string
  userId: string
  title: string
  scheduledAt: Date
  status: ActivityStatus
  steps?: ActivityStep[]
  completedAt?: Date | null
  priority?: 'low' | 'medium' | 'high'
  reminderId?: string
}

export interface ActivityStep {
  order: number
  description: string
  isDone: boolean
}
