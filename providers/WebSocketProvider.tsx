"use client";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

export const WebSocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

type WebSocketProviderProps = {
  userId: string | null;
  userRole?: string;
  children: React.ReactNode;
};

export function WebSocketProvider({ userId, userRole, children }: WebSocketProviderProps) {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!userId) {
      return;
    }


    // Get the current origin (handles dynamic ports)
    const socketUrl = process.env.NODE_ENV === 'production' 
      ? window.location.origin 
      : window.location.origin;


    // Initialize socket connection
    const socket = io(socketUrl, {
      path: '/api/socket',
      transports: ['websocket', 'polling'], 
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      setIsConnected(true);
      
      // Join user-specific room
      socket.emit('join-user-room', userId);
      
      // Join role-specific room if provided
      if (userRole) {
        socket.emit('join-role-room', userRole);
      }
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('connect_error', () => {
      setIsConnected(false);
    });

    // Listen for real-time notifications
    socket.on('new-notification', (notification) => {
      console.log('User:', userId, 'received notification:', notification);
    });
    socket.on('new-notification', (notification) => {
      console.log('📢 New notification received:', notification);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, userRole]);

  const contextValue: SocketContextType = {
    socket: socketRef.current,
    isConnected,
  };

  return (
    <WebSocketContext.Provider value={contextValue}>
      {children}
    </WebSocketContext.Provider>
  );
}

// Custom hook to use WebSocket context
export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};
