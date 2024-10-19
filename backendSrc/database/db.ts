import { MongoClient, Db } from 'mongodb'

const con: string | undefined = process.env.CONNECTING_STRING

let client: MongoClient | null = null
let db: Db | null = null

export const connectToDb = async (): Promise<Db> => {
  if (db) {
    return db
  }

  if (!con) {
    throw new Error('ERROR: Connection string not found!')
  }

  try {
    client = new MongoClient(con)
    await client.connect()
    console.log('Connected to db')
    db = client.db('Chappy')
    return db
  } catch (error: any) {
    console.log('Failed to connect to MongoDb', error.message)
    throw error
  }
}

export const disconnectFromDb = async (): Promise<void> => {
  if (client) {
    await client.close()
    console.log('Database connection closed.')
    client = null
    db = null
  }
}
