import dotenv from 'dotenv'
dotenv.config()
import express, { Request, Response } from 'express'
import cors from 'cors'
import { Socket, Server } from 'socket.io'
import { connectDB } from './config/db'

// Routers
import DeviceRouter from './routers/DeviceRouter'

const app = express()

app.use(cors())

app.use('/device', DeviceRouter)

app.use('/', (req: Request, res: Response) => {
  res.status(200).json('Working')
})
const server = app.listen(5000, () => {
  console.log('app is listening on port: 5000 in development environment')
  connectDB()
})

const socket = new Server(server, {
  cors: {
    origin: '*',
  },
})
socket.on('connection', (socket: Socket) => {
  console.log(`Socket initialized successfully!!`)
  socket.emit('connected', 'socket connection established')

  socket.on('disconnrect', () => {
    console.log('Client disconnected!!')
  })
})
