import React, { createContext, useState, useEffect, useCallback } from 'react';

export const NotificationContext = createContext({
  notifications: [],
  unreadCount: 0,
  addNotification: () => {},
  markAllAsRead: () => {},
  markAsRead: () => {},
  clearNotifications: () => {},
  removeNotification: () => {},
});

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  
  // Load notifications from localStorage on mount
  useEffect(() => {
    const storedNotifications = localStorage.getItem('notifications');
    if (storedNotifications) {
      try {
        const parsedNotifications = JSON.parse(storedNotifications);
        setNotifications(parsedNotifications);
        
        // Calculate unread count
        const unread = parsedNotifications.filter(notification => !notification.read).length;
        setUnreadCount(unread);
      } catch (error) {
        console.error('Error parsing stored notifications:', error);
      }
    }
    
    // Generate some sample notifications for demonstration
    if (!storedNotifications) {
      const sampleNotifications = [
        {
          id: '1',
          type: 'bid',
          title: 'New Bid Received',
          message: 'You received a new bid of 0.15 ETH for your NFT #123',
          timestamp: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
          read: false,
          data: {
            nftId: '123',
            bidAmount: '0.15',
            bidder: '0x1234567890abcdef1234567890abcdef12345678',
          }
        },
        {
          id: '2',
          type: 'sale',
          title: 'NFT Sold',
          message: 'Your NFT #456 was sold for 0.5 ETH',
          timestamp: new Date(Date.now() - 3600000 * 24).toISOString(), // 1 day ago
          read: true,
          data: {
            nftId: '456',
            saleAmount: '0.5',
            buyer: '0x2345678901abcdef2345678901abcdef23456789',
          }
        },
        {
          id: '3',
          type: 'transfer',
          title: 'NFT Transferred',
          message: 'NFT #789 was transferred to your wallet',
          timestamp: new Date(Date.now() - 3600000 * 48).toISOString(), // 2 days ago
          read: false,
          data: {
            nftId: '789',
            from: '0x3456789012abcdef3456789012abcdef34567890',
          }
        }
      ];
      
      setNotifications(sampleNotifications);
      
      // Calculate unread count
      const unread = sampleNotifications.filter(notification => !notification.read).length;
      setUnreadCount(unread);
      
      // Store in localStorage
      localStorage.setItem('notifications', JSON.stringify(sampleNotifications));
    }
  }, []);
  
  // Update localStorage when notifications change
  useEffect(() => {
    if (notifications.length > 0) {
      localStorage.setItem('notifications', JSON.stringify(notifications));
    }
  }, [notifications]);
  
  // Add a new notification
  const addNotification = useCallback((notification) => {
    const newNotification = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      read: false,
      ...notification,
    };
    
    setNotifications(prevNotifications => {
      const updatedNotifications = [newNotification, ...prevNotifications];
      return updatedNotifications;
    });
    
    setUnreadCount(prevCount => prevCount + 1);
    
    // Show browser notification if supported
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/logo192.png',
      });
    }
    
    return newNotification.id;
  }, []);
  
  // Mark all notifications as read
  const markAllAsRead = useCallback(() => {
    setNotifications(prevNotifications => {
      return prevNotifications.map(notification => ({
        ...notification,
        read: true,
      }));
    });
    
    setUnreadCount(0);
  }, []);
  
  // Mark a specific notification as read
  const markAsRead = useCallback((id) => {
    setNotifications(prevNotifications => {
      return prevNotifications.map(notification => {
        if (notification.id === id && !notification.read) {
          setUnreadCount(prevCount => prevCount - 1);
          return { ...notification, read: true };
        }
        return notification;
      });
    });
  }, []);
  
  // Remove a specific notification
  const removeNotification = useCallback((id) => {
    setNotifications(prevNotifications => {
      const notification = prevNotifications.find(n => n.id === id);
      if (notification && !notification.read) {
        setUnreadCount(prevCount => prevCount - 1);
      }
      
      return prevNotifications.filter(notification => notification.id !== id);
    });
  }, []);
  
  // Clear all notifications
  const clearNotifications = useCallback(() => {
    setNotifications([]);
    setUnreadCount(0);
    localStorage.removeItem('notifications');
  }, []);
  
  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAllAsRead,
        markAsRead,
        removeNotification,
        clearNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
