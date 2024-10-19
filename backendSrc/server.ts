import express, { Express, NextFunction, Request, Response } from 'express'
import { router as usersRouter } from './routes/users.js'
const port: number = Number(process.env.PORT || 2345)
const app: Express = express()

app.use('/', express.static('dist'))
app.use('/', express.json())

app.use('/', (req: Request, __: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`, req.body)
  next()
})

app.use('/users', usersRouter)

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
