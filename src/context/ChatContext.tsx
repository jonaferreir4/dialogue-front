import { createContext, useContext } from "react";
import { useChatService } from "../services/chatService";

const ChatContext = createContext<ReturnType<typeof useChatService> | null>(null);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const chat = useChatService();
  return <ChatContext.Provider value={chat}>{children}</ChatContext.Provider>;
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat must be used within a ChatProvider");
  return context;
};
