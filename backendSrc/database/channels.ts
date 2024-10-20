import { Collection, Db, WithId } from 'mongodb'

import { Channel } from '../models/channel.js'
import { connectToDb } from './db.js'

export const getChannels = async (): Promise<WithId<Channel>[]> => {
  const db: Db = await connectToDb()
  const col: Collection<Channel> = db.collection<Channel>('Channels')
  const result: WithId<Channel>[] = await col.find({}).toArray()
  return result
}
