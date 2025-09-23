"use client";
import { useEffect } from 'react';
import { useWebSocket } from '@/providers/WebSocketProvider';

/**
 * This component ensures socket connection is initialized
 * Add this to any page where you want to ensure socket connectivity
 */
export default function SocketInitializer() {
  const { socket, isConnected } = useWebSocket();

  useEffect(() => {
    if (!socket) return;

    // Initialize socket connection by calling the socket endpoint
    const initSocket = async () => {
      try {
        await fetch('/api/socket');
      } catch (error) {
        console.error('Socket initialization error:', error);
      }
    };

    if (!isConnected) {
      initSocket();
    }
  }, [socket, isConnected]);

  return null; // This component doesn't render anything
}