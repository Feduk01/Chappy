import express, { Express, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { router as authRouter } from './routes/auth.js'
import { router as usersRouter } from './routes/users.js'
import { router as messagesRouter } from './routes/messages.js'
import { router as channelsRouter } from './routes/channels.js'
import { authenticateToken } from './routes/authMiddleware.js'

const port: number = Number(process.env.PORT || 2345)
const app: Express = express()

app.use('/', express.static('dist'))
app.use(express.json())
app.use(cors())

app.use('/', (req: Request, __: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`, req.body)
  next()
})

app.use('/api/auth', authRouter)

app.use('/api/users', authenticateToken, usersRouter)
app.use('/api/messages', authenticateToken, messagesRouter)
app.use('/api/channels', authenticateToken, channelsRouter)

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
