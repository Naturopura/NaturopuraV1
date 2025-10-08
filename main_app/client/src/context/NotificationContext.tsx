import React, { createContext, useContext, useState, useEffect } from 'react';
import { createApiClient, ENDPOINTS } from '../config/api';

interface MotionEvent {
  _id: string;
  timestamp: string;
  photo: { data: number[] };
  detectedObjects: Array<{ label: string; confidence: number }>;
}

interface NotificationContextType {
  unreadCount: number;
  recentEvents: any[];
  viewedEvents: Set<string>;
  markAsRead: (eventId: string) => void;
  markAllAsRead: () => void;
  fetchRecentEvents: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [recentEvents, setRecentEvents] = useState<any[]>([]);
  const [viewedEvents, setViewedEvents] = useState<Set<string>>(new Set());

  const fetchRecentEvents = async () => {
    try {
      const client = createApiClient();
      const res = await client.get(ENDPOINTS.GET_MOTION_EVENTS);
      const events = res.data.slice(0, 5); // Get 5 most recent events
      setRecentEvents(events);
      
      // Update unread count based on viewed events
      const unread = events.filter((event: MotionEvent) => !viewedEvents.has(event._id)).length;
      setUnreadCount(unread);
    } catch (error) {
      console.error('Error fetching recent events:', error);
    }
  };

  const markAsRead = (eventId: string) => {
    setViewedEvents(prev => new Set([...prev, eventId]));
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    const newViewedEvents = new Set([...viewedEvents, ...recentEvents.map(event => event._id)]);
    setViewedEvents(newViewedEvents);
    setUnreadCount(0);
  };

  useEffect(() => {
    fetchRecentEvents();
    const interval = setInterval(fetchRecentEvents, 30000); // Poll every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <NotificationContext.Provider value={{
      unreadCount,
      recentEvents,
      viewedEvents,
      markAsRead,
      markAllAsRead,
      fetchRecentEvents
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}; 