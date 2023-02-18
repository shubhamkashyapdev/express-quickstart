import dotenv from 'dotenv'
dotenv.config()
import express, { Request, Response } from 'express'
import cors from 'cors'
import { Socket, Server } from 'socket.io'
import { connectDB } from './config/db'

// Routers
import DeviceRouter from './routers/DeviceRouter'

const app = express()
app.use(express.json())
app.use(cors())

app.use('/device', DeviceRouter)

app.use('/', (req: Request, res: Response) => {
  res.status(200).json('Working')
})
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'You have lost!!',
  })
})

const server = app.listen(5000, () => {
  console.log('app is listening on port: 5000 in development environment')
  connectDB()
})

export const socket = new Server(server, {
  cors: {
    origin: '*',
  },
})
socket.on('connection', (socket: Socket) => {
  console.log(`Client connected: ${socket.id}`)
  socket.emit('connected', 'socket connection established')

  socket.on('disconnect', () => {
    console.log(`Client disconnected`)
  })
})
