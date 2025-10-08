// import { Server as HTTPServer } from 'http';
// import WebSocket, { WebSocketServer } from 'ws';
// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
// import { saveMessage, getRecentMessages } from './dao/aiDao';

// dotenv.config();

// interface WebSocketWithUser extends WebSocket {
//   userId?: string;
// }

// export const createWebSocketServer = (server: HTTPServer): WebSocketServer => {
//   const wss = new WebSocketServer({ server, path: '/ws/chat' });

//   wss.on('connection', (ws: WebSocketWithUser, req) => {
//     console.log('WebSocket connected');

//     // Authentication
//     const token = new URL(req.url || '', `http://localhost:${process.env.PORT || 5000}`).searchParams.get('token');
//     if (!token) {
//       console.log('No token provided');
//       ws.send(JSON.stringify({ type: 'error', error: 'Authentication required' }));
//       ws.close();
//       return;
//     }

//     jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, decoded: any) => {
//       if (err) {
//         console.log('Invalid token:', err);
//         ws.send(JSON.stringify({ type: 'error', error: 'Invalid token' }));
//         ws.close();
//         return;
//       }
//       console.log('User authenticated:', decoded);
//       ws.userId = decoded._id;

//       // Send connection confirmation and load recent messages
//       ws.send(JSON.stringify({ type: 'connection_status', data: { status: 'connected' } }));
//       loadRecentMessages(ws);
//     });

//     ws.on('message', (message: string) => {
//       handleIncomingMessage(ws, message);
//     });

//     ws.on('close', () => {
//       console.log('WebSocket disconnected');
//     });

//     ws.on('error', (error) => {
//       console.error('WebSocket error:', error);
//     });
//   });

//   console.log('WebSocket server created');
//   return wss;
// };

// async function loadRecentMessages(ws: WebSocketWithUser) {
//   if (!ws.userId) return;

//   try {
//     const messages = await getRecentMessages(ws.userId, 50);
//     ws.send(JSON.stringify({ type: 'connection_status', data: { messages } }));
//   } catch (error) {
//     console.error('Error loading recent messages:', error);
//     ws.send(JSON.stringify({ type: 'error', error: 'Failed to load recent messages' }));
//   }
// }

// async function handleIncomingMessage(ws: WebSocketWithUser, message: string) {
//   try {
//     const parsedMessage = JSON.parse(message);

//     switch (parsedMessage.type) {
//       case 'message':
//         await handleMessage(ws, parsedMessage.data);
//         break;

//       case 'typing':
//         // Broadcast typing status to other clients in the same room (if needed)
//         break;

//       case 'clear_chat':
//         // Implement clear chat functionality (if needed)
//         break;

//       case 'get_messages':
//         await loadRecentMessages(ws);
//         break;

//       case 'heartbeat':
//         // Respond to heartbeat to keep the connection alive
//         ws.send(JSON.stringify({ type: 'heartbeat' }));
//         break;

//       default:
//         console.log('Unknown message type:', parsedMessage.type);
//     }
//   } catch (error) {
//     console.error('Error handling message:', error);
//     ws.send(JSON.stringify({ type: 'error', error: 'Invalid message format' }));
//   }
// }

// async function handleMessage(ws: WebSocketWithUser, data: any) {
//   if (!ws.userId || !data || !data.content) {
//     ws.send(JSON.stringify({ type: 'error', error: 'Invalid message data' }));
//     return;
//   }

//   try {
//     const savedMessage = await saveMessage({ sender: 'user', text: data.content, userId: ws.userId });
//     // Broadcast the message to all connected clients (or clients in the same room)
//     // In this basic example, we're just echoing it back to the sender
//     ws.send(JSON.stringify({ type: 'message', data: { ...savedMessage.toObject(), sender: 'user' } }));
//   } catch (error) {
//     console.error('Error saving message:', error);
//     ws.send(JSON.stringify({ type: 'error', error: 'Failed to save message' }));
//   }
// }