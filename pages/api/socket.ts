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
  } else {
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

      // Join user to their specific room
      socket.on('join-user-room', (userId: string) => {
        const userRoom = `user-${userId}`;
        socket.join(userRoom);
      })

      // Join admin/role-based rooms
      socket.on('join-role-room', (role: string) => {
        const roleRoom = `role-${role}`;
        socket.join(roleRoom);
      })

      socket.on('disconnect', () => {
        console.log('Socket disconnected:', socket.id);
      })
    })
  }
  res.end()
}

export default SocketHandler