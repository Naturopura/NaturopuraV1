import { AiMessage, IAiMessage } from '../models/AiMessage';
import { AiSession, IAiSession } from '../models/AiSession';

export const saveMessage = async (message: Partial<IAiMessage>): Promise<IAiMessage> => {
  const newMessage = new AiMessage(message);
  const savedMessage = await newMessage.save();
  
  // Update session's lastMessageAt
  if (message.sessionId) {
    await AiSession.findByIdAndUpdate(message.sessionId, {
      lastMessageAt: new Date()
    });
  }
  
  return savedMessage;
};

export const getRecentMessages = async (
  sessionId: string,
  limit: number = 50
): Promise<IAiMessage[]> => {
  return await AiMessage.find({ sessionId }).sort({ createdAt: 1 }).limit(limit);
};

export const getMessagesBySession = async (
  sessionId: string,
  userId: string
): Promise<IAiMessage[]> => {
  return await AiMessage.find({ sessionId, userId }).sort({ createdAt: 1 });
};

export const deleteMessagesBySession = async (sessionId: string): Promise<void> => {
  await AiMessage.deleteMany({ sessionId });
};

export const deleteMessagesByUser = async (userId: string): Promise<void> => {
  await AiMessage.deleteMany({ userId });
};

// Session-related DAO functions
export const createSession = async (sessionData: {
  name: string;
  userId: string;
}): Promise<IAiSession> => {
  const newSession = new AiSession(sessionData);
  return await newSession.save();
};

export const getUserSessions = async (userId: string): Promise<IAiSession[]> => {
  return await AiSession.find({ userId, isActive: true })
    .sort({ lastMessageAt: -1, createdAt: -1 });
};

export const getSessionById = async (
  sessionId: string,
  userId: string
): Promise<IAiSession | null> => {
  return await AiSession.findOne({ _id: sessionId, userId });
};

export const updateSession = async (
  sessionId: string,
  userId: string,
  updates: Partial<IAiSession>
): Promise<IAiSession | null> => {
  return await AiSession.findOneAndUpdate(
    { _id: sessionId, userId },
    updates,
    { new: true }
  );
};

export const deleteSession = async (sessionId: string, userId: string): Promise<void> => {
  // Delete all messages in the session
  await deleteMessagesBySession(sessionId);
  // Soft delete the session
  await AiSession.findOneAndUpdate(
    { _id: sessionId, userId },
    { isActive: false }
  );
};

