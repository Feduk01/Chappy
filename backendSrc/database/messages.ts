import { Collection, Db, WithId } from 'mongodb'

import { Message } from '../models/message.js'
import { connectToDb } from './db.js'

export const getMessages = async (): Promise<WithId<Message>[]> => {
  const db: Db = await connectToDb()
  const col: Collection<Message> = db.collection<Message>('Messages')
  const result: WithId<Message>[] = await col.find({}).toArray()
  return result
}
