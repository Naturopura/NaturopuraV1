"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLogisticsStatus = exports.initializeSocket = void 0;
const socket_io_1 = require("socket.io");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const aiDao_1 = require("../dao/aiDao");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let logisticsNamespace;
let aiNamespace;
const initializeSocket = (server) => {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: process.env.CLIENT_URL || 'http://localhost:5173',
            methods: ['GET', 'POST'],
            allowedHeaders: ['Authorization'],
            credentials: true,
        }
    });
    logisticsNamespace = io.of('/logistics');
    aiNamespace = io.of('/ai');
    logisticsNamespace.on('connection', (socket) => {
        socket.on('join-logistics-room', (productId) => {
            socket.join(`logistics-${productId}`);
        });
        socket.on('leave-logistics-room', (productId) => {
            socket.leave(`logistics-${productId}`);
        });
        socket.on('disconnect', () => {
        });
    });
    aiNamespace.use((socket, next) => {
        const token = socket.handshake.query.token;
        console.log(`[${new Date().toISOString()}] WebSocket auth middleware: token received:`, token);
        if (!token) {
            const error = new Error('Authentication error: Token required');
            console.error(`[${new Date().toISOString()}] WebSocket auth middleware: no token provided`, error);
            return next(error);
        }
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'secret', (err, decoded) => {
            if (err) {
                console.log('WebSocket auth middleware: token verification failed', err);
                return next(new Error('Authentication error: Invalid token'));
            }
            console.log('WebSocket auth middleware: token verified, user:', decoded);
            socket.user = decoded; // Attach user info to socket
            next();
        });
    });
    aiNamespace.on('connection', (socket) => {
        const user = socket.user;
        console.log(`[${new Date().toISOString()}] WebSocket connection established: ${socket.id} for user: ${user._id}`);
        socket.join(user._id); // Join user-specific room
        // Notify user they joined
        socket.emit('connection_status', { status: 'connected', message: 'Successfully connected to chat.' });
        console.log(`[${new Date().toISOString()}] Emitted 'connection_status' to user ${user._id}`);
        socket.on('message', (data) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { content, sender, imageUrl, tempId } = data; // Include tempId
                console.log(`[${new Date().toISOString()}] Received 'message' from user ${user._id}:`, data);
                const userId = user._id;
                // Save message to DB
                const savedMessage = yield (0, aiDao_1.saveMessage)({
                    text: content,
                    sender,
                    userId,
                    createdAt: new Date(),
                    // imageUrl: imageUrl, // Removed because not in IAiMessage interface
                });
                console.log(`[${new Date().toISOString()}] Message saved to DB:`, savedMessage);
                // Broadcast message to all in user's room (including sender)
                aiNamespace.in(userId).emit('message', {
                    id: savedMessage._id,
                    content: savedMessage.text,
                    tempId: tempId, // Send back tempId for confirmation
                    sender: savedMessage.sender,
                    timestamp: savedMessage.createdAt,
                    imageUrl: imageUrl, // send imageUrl from original data
                });
                // Acknowledge message receipt to the sender
                socket.emit('message_status', { tempId: tempId, status: 'delivered', messageId: savedMessage._id });
                // Optionally, acknowledge the message
                // socket.emit('message_status', { messageId: savedMessage._id, status: 'delivered' });
            }
            catch (error) {
                if (error.name === 'MongoServerError' && error.code === 11000) {
                    console.error('Duplicate key error (likely message ID):', error);
                    socket.emit('error', {
                        message: 'A duplicate message was detected. Please try again.',
                        code: 'DUPLICATE_MESSAGE',
                    });
                    return;
                }
                else {
                    console.error(`[${new Date().toISOString()}] Error processing message from user ${user._id}:`, error);
                    socket.emit('error', {
                        message: 'An error occurred while processing your message. Please try again.',
                        code: 'MESSAGE_PROCESSING_ERROR',
                    });
                }
            }
        }));
        socket.on('typing', (data) => {
            const { isTyping, sender } = data;
            console.log(`[${new Date().toISOString()}] User ${user._id} is typing: ${isTyping}`);
            socket.broadcast.to(user._id).emit('typing', { isTyping, sender }); // Broadcast to others in the room (not the sender)
        });
        socket.on('disconnect', () => {
            console.log(`[${new Date().toISOString()}] WebSocket disconnected: ${socket.id} for user: ${user._id}`);
            // Notify user they disconnected (optional, as client should handle this)
            // socket.emit('connection_status', { status: 'disconnected', message: 'Disconnected from chat.' });
            console.log(`[${new Date().toISOString()}] aiNamespace: disconnect event handler set.`); // Add this log
        });
    });
};
exports.initializeSocket = initializeSocket;
const updateLogisticsStatus = (productId, status) => {
    console.log(`[${new Date().toISOString()}] Updating logistics status for product ${productId}:`, status);
    if (logisticsNamespace) {
        logisticsNamespace.to(`logistics-${productId}`).emit('logistics-update', status);
    }
};
exports.updateLogisticsStatus = updateLogisticsStatus;
