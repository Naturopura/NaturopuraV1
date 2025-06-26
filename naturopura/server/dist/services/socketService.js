"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLogisticsStatus = exports.initializeSocket = void 0;
const socket_io_1 = require("socket.io");
let io;
const initializeSocket = (server) => {
    io = new socket_io_1.Server(server, {
        cors: {
            origin: process.env.CLIENT_URL || 'http://localhost:5173',
            methods: ['GET', 'POST']
        }
    }).of('/logistics');
    io.on('connection', (socket) => {
        console.log('Client connected:', socket.id);
        socket.on('join-logistics-room', (productId) => {
            socket.join(`logistics-${productId}`);
            console.log(`Client ${socket.id} joined logistics room for product ${productId}`);
        });
        socket.on('leave-logistics-room', (productId) => {
            socket.leave(`logistics-${productId}`);
            console.log(`Client ${socket.id} left logistics room for product ${productId}`);
        });
        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });
};
exports.initializeSocket = initializeSocket;
const updateLogisticsStatus = (productId, status) => {
    if (io) {
        io.to(`logistics-${productId}`).emit('logistics-update', status);
    }
};
exports.updateLogisticsStatus = updateLogisticsStatus;
