import { Router } from 'express';
import { 
  handleAiChat, 
  handleImageUpload, 
  handleGetMessages, 
  handleCreateSession,
  handleGetUserSessions,
  handleUpdateSession,
  handleDeleteSession as handleDeleteSessionController,
  handleClearChat,
  handleGetOrCreateDefaultSession
} from '../controllers/aiController';
import { authenticateToken } from '../middleware/auth';
import multer from 'multer';

const router = Router();
const upload = multer({ dest: 'uploads/' });

// Regular endpoints
router.post('/chat', authenticateToken, handleAiChat);
router.post('/analyze-image', authenticateToken, upload.single('image'), handleImageUpload);
router.get('/messages', authenticateToken, handleGetMessages);
router.post('/sessions', authenticateToken, handleCreateSession);
router.get('/sessions', authenticateToken, handleGetUserSessions);
router.get('/sessions/default', authenticateToken, handleGetOrCreateDefaultSession);
router.put('/sessions/:sessionId', authenticateToken, handleUpdateSession);
router.delete('/sessions/:sessionId', authenticateToken, handleDeleteSessionController);
router.delete('/messages', authenticateToken, handleClearChat);

export default router;
