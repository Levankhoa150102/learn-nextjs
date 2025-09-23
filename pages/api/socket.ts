import { NextApiRequest, NextApiResponse } from 'next'
import { Server as ServerIO } from 'socket.io'
import { Server as NetServer } from 'http'

export const config = {
  api: {
    bodyParser: false,
  },
}

interface NextApiResponseServerIO extends NextApiResponse {
  socket: NextApiResponse['socket'] & {
    server: NetServer & {
      io?: ServerIO
    }
  }
}

const SocketHandler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new ServerIO(res.socket.server, {
      path: '/api/socket',
      cors: {
        origin: process.env.NODE_ENV === 'production' ? false : ["http://localhost:3000"],
        methods: ["GET", "POST"]
      }
    })
    res.socket.server.io = io

    // Store global reference for use in API routes
    const globalForSocket = globalThis as unknown as { 
      socketServer?: ServerIO 
    };
    globalForSocket.socketServer = io;

    io.on('connection', (socket) => {
      console.log('User connected:', socket.id)

      // Join user to their specific room
      socket.on('join-user-room', (userId: string) => {
        socket.join(`user-${userId}`)
        console.log(`User ${userId} joined their room`)
      })

      // Join admin/role-based rooms
      socket.on('join-role-room', (role: string) => {
        socket.join(`role-${role}`)
        console.log(`User joined role room: ${role}`)
      })

      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id)
      })
    })
  }
  res.end()
}

export default SocketHandler