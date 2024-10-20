import express, { Request, Response, Router } from 'express'
import { WithId } from 'mongodb'
import { Channel } from '../models/channel.js'
import { getChannels } from '../database/channels.js'

export const router: Router = express.Router()

router.get('/', async (_: Request, res: Response<WithId<Channel>[]>) => {
  const allChannels: WithId<Channel>[] = await getChannels()
  res.send(allChannels)
})
