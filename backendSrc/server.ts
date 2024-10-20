import express, { Express, NextFunction, Request, Response } from 'express'
import { router as usersRouter } from './routes/users.js'
import { router as messagesRouter } from './routes/messages.js'
import { router as channelsRouter } from './routes/channels.js'

const port: number = Number(process.env.PORT || 2345)
const app: Express = express()

app.use('/', express.static('dist'))
app.use('/', express.json())

app.use('/', (req: Request, __: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`, req.body)
  next()
})

app.use('/users', usersRouter)
app.use('/messages', messagesRouter)
app.use('/channels', channelsRouter)

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
