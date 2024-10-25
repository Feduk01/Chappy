// backendSrc/routes/auth.ts
import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { connectToDb } from '../database/db'
import { User } from '../models/user'
import { ObjectId } from 'mongodb'

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET as string // Добавь JWT_SECRET в .env

// Маршрут для входа
router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body

  try {
    const db = await connectToDb()
    const usersCollection = db.collection<User>('users') // Типизируем коллекцию пользователей

    // Поиск пользователя по имени пользователя
    const user = await usersCollection.findOne({ username })
    if (!user) {
      res.status(401)
      return
    }

    // Проверка пароля
    if (user.password !== password) {
      res.status(401)
      return
    }

    // Создание JWT-токена, если пользователь найден и пароль совпадает
    const token = jwt.sign(
      { id: user._id.toString(), username: user.username }, // Сохраняем id как строку для токена
      JWT_SECRET,
      { expiresIn: '1h' }
    )

    res.json({ token })
  } catch (error) {
    res.status(500)
    return
  }
})
