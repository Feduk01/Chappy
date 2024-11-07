import express, { json, Request, Response, Router } from 'express'
import { WithId, ObjectId } from 'mongodb'
import { Message } from '../models/message.js'
import {
  getMessages,
  getConversation,
  sendNewMessage,
} from '../database/messages.js'

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

router.post('/', async (req: Request, res: Response) => {
  try {
    const { content, senderId, recipientId, channelId, isDirectMessage } =
      req.body
    if (
      !content ||
      !senderId ||
      (isDirectMessage && !recipientId) ||
      (!isDirectMessage && !channelId)
    ) {
      res.status(400).json({ message: 'Missing required fields' })
      return
    }
    const messageId = await sendNewMessage(
      content,
      new ObjectId(senderId),
      isDirectMessage,
      recipientId ? new ObjectId(recipientId) : undefined,
      channelId ? new ObjectId(channelId) : undefined
    )
    if (messageId) {
      res.status(201).json({ messageId })
    } else {
      res.status(500).json({ message: 'Failed to save message' })
    }
  } catch (error) {
    console.error('Error in saving message:', error)
    res.status(500).json({ message: 'Server error' })
  }
})
