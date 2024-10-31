import express, { Request, Response, Router } from 'express'
import { WithId } from 'mongodb'
import { Channel } from '../models/channel.js'
import { getChannels,getOpenChannels } from '../database/channels.js'

export const router: Router = express.Router()

router.get('/', async (req: Request, res: Response<WithId<Channel>[]>) => {
  const isGuest = req.query.guest === 'true'; 
  try {
    if (isGuest) {
      const openChannels: WithId<Channel>[] = await getOpenChannels();
      res.send(openChannels);
    } else {
      const allChannels: WithId<Channel>[] = await getChannels();
      res.send(allChannels);
    }
  } catch (error:any) {
    console.error(error);
    res.status(500).send(error);
  }
});
