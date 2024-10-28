// backendSrc/routes/auth.ts
import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { connectToDb } from '../database/db.js'
import { User } from '../models/user.js'

export const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET as string
router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body

  try {
    const db = await connectToDb()
    const usersCollection = db.collection<User>('Users')

    const user = await usersCollection.findOne({ username })
    console.log('db connection')

    if (!user) {
      console.log('could not find user')
      res.status(401)
      return
    }

    if (!user || user.password !== password) {
      console.log('user data wrong')

      res.status(401)
      return
    }

    console.log('on its way to create token')

    const token = jwt.sign(
      { id: user._id.toString(), username: user.username },
      JWT_SECRET,
      { expiresIn: '1h' }
    )
    console.log('on its way to send token')

    res.json({ token })
  } catch (error) {
    res.status(500)
    return
  }
})
