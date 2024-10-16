import express, { Express } from 'express'

const port: number = Number(process.env.PORT || 2345)
const app: Express = express()

app.use('/', express.static('dist'))
app.use('/', express.json())

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
