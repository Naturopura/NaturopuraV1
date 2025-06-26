import { Server as SocketIOServer, Namespace } from 'socket.io';
import { Server as HTTPServer } from 'http';

let io: Namespace;

export const initializeSocket = (server: HTTPServer) => {
  io = new SocketIOServer(server, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      methods: ['GET', 'POST']
    }
  }).of('/logistics');

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('join-logistics-room', (productId: string) => {
      socket.join(`logistics-${productId}`);
      console.log(`Client ${socket.id} joined logistics room for product ${productId}`);
    });

    socket.on('leave-logistics-room', (productId: string) => {
      socket.leave(`logistics-${productId}`);
      console.log(`Client ${socket.id} left logistics room for product ${productId}`);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};

export const updateLogisticsStatus = (productId: string, status: any) => {
  if (io) {
    io.to(`logistics-${productId}`).emit('logistics-update', status);
  }
};