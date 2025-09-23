"use client";
import { useSession } from "next-auth/react";
import { WebSocketProvider } from "@/providers/WebSocketProvider";
import { ReactNode } from "react";

interface ClientWebSocketWrapperProps {
  children: ReactNode;
}

export default function ClientWebSocketWrapper({ children }: ClientWebSocketWrapperProps) {
  const { data: session } = useSession();
  
  return (
    <WebSocketProvider 
      userId={session?.user?.id || null} 
      userRole={session?.user?.role || undefined}
    >
      {children}
    </WebSocketProvider>
  );
}