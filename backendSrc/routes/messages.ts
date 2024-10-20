import express, { Request, Response, Router } from 'express'
import { WithId } from 'mongodb'
import { Message } from '../models/message.js'
import { getMessages } from '../database/messages.js'

export const router: Router = express.Router()

router.get('/', async (_: Request, res: Response<WithId<Message>[]>) => {
  const allMessages: WithId<Message>[] = await getMessages()
  res.send(allMessages)
})
