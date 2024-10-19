import express, { Request, Response, Router } from 'express'
import { WithId } from 'mongodb'
import { User } from '../models/user.js'
import { getUsers } from '../database/users.js'

export const router: Router = express.Router()

router.get('/', async (_: Request, res: Response<WithId<User>[]>) => {
  const allUsers: WithId<User>[] = await getUsers()
  res.send(allUsers)
})
