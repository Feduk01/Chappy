import { Collection, Db, WithId } from 'mongodb'

import { User } from '../models/user.js'
import { connectToDb } from './db.js'

export const getUsers = async (): Promise<WithId<User>[]> => {
  const db: Db = await connectToDb()
  const col: Collection<User> = db.collection<User>('Users')
  const result: WithId<User>[] = await col.find({}).toArray()
  return result
}
