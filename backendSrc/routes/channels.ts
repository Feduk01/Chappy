import express, { Request, Response, Router } from 'express'
import { ObjectId, WithId } from 'mongodb'
import { Channel } from '../models/channel.js'
import { getChannels,getOpenChannels } from '../database/channels.js'
import {getChannelConversation} from '../database/messages.js'
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

router.get('/:channelId/messages', async (req: Request, res: Response) => {
  try{
    const channelId = new ObjectId(req.params.channelId)
    const messages = await getChannelConversation(channelId)
    res.json(messages)
  } catch(error) {
    console.log('Error fetching channel messages:', error);
    res.sendStatus(500).json({message: 'Failed to fetch messages in channel chat'})
  }
})