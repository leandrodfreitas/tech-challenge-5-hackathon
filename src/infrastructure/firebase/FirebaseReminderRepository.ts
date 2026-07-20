import {
  collection,
  doc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  Timestamp,
} from 'firebase/firestore'
import { db } from '../config/firebase'
import { Reminder } from '../../domain/entities/Reminder'
import { IReminderRepository } from '../../domain/repositories/IReminderRepository'

function toReminder(id: string, data: Record<string, unknown>): Reminder {
  return {
    ...(data as Omit<Reminder, 'id' | 'scheduledFor' | 'createdAt' | 'lastSentAt'>),
    id,
    scheduledFor: (data.scheduledFor as Timestamp).toDate(),
    createdAt: (data.createdAt as Timestamp).toDate(),
    lastSentAt: data.lastSentAt ? (data.lastSentAt as Timestamp).toDate() : undefined,
  }
}

export class FirebaseReminderRepository implements IReminderRepository {
  private col = 'reminders'

  async findByUserId(userId: string): Promise<Reminder[]> {
    const q = query(collection(db, this.col), where('userId', '==', userId))
    const snap = await getDocs(q)
    return snap.docs.map((d) => toReminder(d.id, d.data() as Record<string, unknown>))
  }

  async findByActivityId(activityId: string): Promise<Reminder | null> {
    const q = query(collection(db, this.col), where('activityId', '==', activityId))
    const snap = await getDocs(q)
    if (snap.docs.length === 0) return null
    return toReminder(snap.docs[0].id, snap.docs[0].data() as Record<string, unknown>)
  }

  async create(reminder: Omit<Reminder, 'id' | 'createdAt'>): Promise<Reminder> {
    const ref = await addDoc(collection(db, this.col), {
      ...reminder,
      scheduledFor: Timestamp.fromDate(new Date(reminder.scheduledFor)),
      createdAt: Timestamp.now(),
    })
    return {
      ...reminder,
      id: ref.id,
      createdAt: new Date(),
    }
  }

  async update(id: string, updates: Partial<Reminder>): Promise<void> {
    const ref = doc(db, this.col, id)
    const data: Record<string, unknown> = {}
    if (updates.scheduledFor) data.scheduledFor = Timestamp.fromDate(new Date(updates.scheduledFor))
    if (updates.lastSentAt) data.lastSentAt = Timestamp.fromDate(new Date(updates.lastSentAt))
    if (updates.enabled !== undefined) data.enabled = updates.enabled
    if (updates.message !== undefined) data.message = updates.message
    if (updates.type !== undefined) data.type = updates.type
    if (updates.frequency !== undefined) data.frequency = updates.frequency

    if (Object.keys(data).length > 0) {
      await updateDoc(ref, data)
    }
  }

  async delete(id: string): Promise<void> {
    const ref = doc(db, this.col, id)
    await deleteDoc(ref)
  }
}
