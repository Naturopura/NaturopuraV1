import path from 'path';
import { Request, Response } from 'express';
import { getAiResponse, clearSessionMessages, clearUserMessages } from '../services/aiService';
import { 
  saveMessage, 
  getMessagesBySession, 
  createSession, 
  getUserSessions, 
  getSessionById,
  updateSession,
  deleteSession as deleteSessionDao
} from '../dao/aiDao';
import { analyzeImage } from '../services/imageAnalysisService';

export const handleAiChat = async (
  req: Request & { user?: any },
  res: Response
): Promise<void> => {
  const { prompt, sessionId } = req.body;
  const userId = req.user?._id;

  if (!prompt) {
    res.status(400).json({ message: 'Prompt is required' });
    return;
  }

  if (!sessionId) {
    res.status(400).json({ message: 'Session ID is required' });
    return;
  }

  if (!userId) {
    res.status(401).json({ message: 'Unauthorized: User not authenticated' });
    return;
  }

  try {
    // Verify session belongs to user
    const session = await getSessionById(sessionId, userId.toString());
    if (!session) {
      res.status(404).json({ message: 'Session not found' });
      return;
    }

    await saveMessage({ sender: 'user', text: prompt, userId, sessionId });
    const aiReply = await getAiResponse(prompt);
    await saveMessage({ sender: 'ai', text: aiReply, userId, sessionId });
    res.status(200).json({ reply: aiReply });
  } catch (err) {
    console.error('Error in handleAiChat:', err);
    res.status(500).json({ message: 'AI failed to respond' });
  }
};

export const handleImageUpload = async (
  req: Request & { user?: any },
  res: Response
): Promise<void> => {
  const { sessionId } = req.body;
  
  if (!req.file) {
    res.status(400).json({ message: 'No image uploaded' });
    return;
  }

  if (!sessionId) {
    res.status(400).json({ message: 'Session ID is required' });
    return;
  }

  const userId = req.user?._id || req.user?.id;
  
  if (!userId) {
    res.status(401).json({ message: 'Unauthorized: User not authenticated' });
    return;
  }

  try {
    // Verify session belongs to user
    const session = await getSessionById(sessionId, userId.toString());
    if (!session) {
      res.status(404).json({ message: 'Session not found' });
      return;
    }

    console.log('Uploaded file path:', req.file.path);
    const absoluteFilePath = path.isAbsolute(req.file.path)
      ? req.file.path
      : path.resolve(req.file.path);
    console.log('Absolute file path:', absoluteFilePath);

    const analysis = await analyzeImage(absoluteFilePath);
    await saveMessage({ sender: 'user', text: '[Image Uploaded]', userId, sessionId });
    await saveMessage({ sender: 'ai', text: analysis, userId, sessionId });
    res.status(200).json({ result: analysis });
  } catch (err) {
    console.error('Error in handleImageUpload:', err);
    res.status(500).json({ message: 'Image analysis failed' });
  }
};

export const handleGetMessages = async (
  req: Request & { user?: any },
  res: Response
): Promise<void> => {
  const { sessionId } = req.query;
  const userId = req.user?._id;

  if (!userId) {
    res.status(401).json({ message: 'Unauthorized: User not authenticated' });
    return;
  }

  if (!sessionId) {
    res.status(400).json({ message: 'Session ID is required' });
    return;
  }

  try {
    // Verify session belongs to user
    const session = await getSessionById(sessionId as string, userId.toString());
    if (!session) {
      res.status(404).json({ message: 'Session not found' });
      return;
    }

    const messages = await getMessagesBySession(sessionId as string, userId.toString());
    res.status(200).json({ messages });
  } catch (err) {
    console.error('Error in handleGetMessages:', err);
    res.status(500).json({ message: 'Failed to fetch messages' });
  }
};

export const handleCreateSession = async (
  req: Request & { user?: any },
  res: Response
): Promise<void> => {
  const { name } = req.body;
  const userId = req.user?._id;

  if (!userId) {
    res.status(401).json({ message: 'Unauthorized: User not authenticated' });
    return;
  }

  // Allow empty name for auto-generation
  const sessionName = name && name.trim().length > 0 ? name.trim() : 'New Chat';

  try {
    const session = await createSession({
      name: sessionName,
      userId: userId.toString(),
    });
    res.status(201).json({ session });
  } catch (err) {
    console.error('Error creating session:', err);
    res.status(500).json({ message: 'Failed to create session' });
  }
};

export const handleGetOrCreateDefaultSession = async (
  req: Request & { user?: any },
  res: Response
): Promise<void> => {
  const userId = req.user?._id;

  if (!userId) {
    res.status(401).json({ message: 'Unauthorized: User not authenticated' });
    return;
  }

  try {
    // Check if user has any active sessions
    const sessions = await getUserSessions(userId.toString());
    
    if (sessions.length > 0) {
      // Return the most recent session
      res.status(200).json({ session: sessions[0] });
    } else {
      // Create a default session
      const defaultSession = await createSession({
        name: 'New Chat',
        userId: userId.toString(),
      });
      res.status(201).json({ session: defaultSession });
    }
  } catch (err) {
    console.error('Error getting or creating default session:', err);
    res.status(500).json({ message: 'Failed to get or create default session' });
  }
};

export const handleGetUserSessions = async (
  req: Request & { user?: any },
  res: Response
): Promise<void> => {
  const userId = req.user?._id;

  if (!userId) {
    res.status(401).json({ message: 'Unauthorized: User not authenticated' });
    return;
  }

  try {
    const sessions = await getUserSessions(userId.toString());
    res.status(200).json({ sessions });
  } catch (err) {
    console.error('Error fetching sessions:', err);
    res.status(500).json({ message: 'Failed to fetch sessions' });
  }
};

export const handleUpdateSession = async (
  req: Request & { user?: any },
  res: Response
): Promise<void> => {
  const { sessionId } = req.params;
  const { name } = req.body;
  const userId = req.user?._id;

  if (!userId) {
    res.status(401).json({ message: 'Unauthorized: User not authenticated' });
    return;
  }

  if (!name || name.trim().length === 0) {
    res.status(400).json({ message: 'Session name is required' });
    return;
  }

  try {
    const session = await updateSession(sessionId, userId.toString(), {
      name: name.trim(),
    });

    if (!session) {
      res.status(404).json({ message: 'Session not found' });
      return;
    }

    res.status(200).json({ session });
  } catch (err) {
    console.error('Error updating session:', err);
    res.status(500).json({ message: 'Failed to update session' });
  }
};

export const handleDeleteSession = async (
  req: Request & { user?: any },
  res: Response
): Promise<void> => {
  const { sessionId } = req.params;
  const userId = req.user?._id;

  if (!userId) {
    res.status(401).json({ message: 'Unauthorized: User not authenticated' });
    return;
  }

  try {
    await deleteSessionDao(sessionId, userId.toString());
    res.status(200).json({ message: 'Session deleted successfully' });
  } catch (err) {
    console.error('Error deleting session:', err);
    res.status(500).json({ message: 'Failed to delete session' });
  }
};

export const handleClearChat = async (
  req: Request & { user?: any },
  res: Response
): Promise<void> => {
  const { sessionId } = req.query;
  const userId = req.user?._id;

  if (!userId) {
    res.status(401).json({ message: 'Unauthorized: User not authenticated' });
    return;
  }

  if (sessionId) {
    // Clear specific session
    const session = await getSessionById(sessionId as string, userId.toString());
    if (!session) {
      res.status(404).json({ message: 'Session not found' });
      return;
    }
    try {
      await clearSessionMessages(sessionId as string);
      res.status(200).json({ message: 'Chat cleared for session' });
    } catch (err) {
      console.error('Error clearing session chat:', err);
      res.status(500).json({ message: 'Failed to clear session chat' });
    }
  } else {
    // Clear all user messages (backward compatibility)
    try {
      await clearUserMessages(userId.toString());
      res.status(200).json({ message: 'All chats cleared' });
    } catch (err) {
      console.error('Error clearing all chats:', err);
      res.status(500).json({ message: 'Failed to clear all chats' });
    }
  }
};
