import express, { Request, Response, Router } from 'express'
import { WithId, ObjectId } from 'mongodb'
import { Message } from '../models/message.js'
import { getMessages, getConversation } from '../database/messages.js'

export const router: Router = express.Router()

router.get('/', async (_: Request, res: Response<WithId<Message>[]>) => {
  const allMessages: WithId<Message>[] = await getMessages()
  res.send(allMessages)
})

router.get(
  '/contacts',
  async (req: Request, res: Response<WithId<Message>[]>) => {
    try {
      const userId = new ObjectId((req as any).user.id)
      const otherUserId = new ObjectId(req.query.otherUserId as string)

      const conversationMessages = await getConversation(userId, otherUserId)
      res.json(conversationMessages)
    } catch (error) {
      console.error('Error:', error)
      res.sendStatus(500)
    }
  }
)

