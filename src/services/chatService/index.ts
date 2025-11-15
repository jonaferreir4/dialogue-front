import { useEffect, useState, useCallback } from "react";
import * as signalR from "@microsoft/signalr";

export interface Message {
  user: string;
  message: string;
  messageTime: string;
}

export function useChatService() {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [connectedUsers, setConnectedUsers] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  // Inicializa a conexão
  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5000/chat")
      .configureLogging(signalR.LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
    
  }, []);

 useEffect(() => {
  if (!connection) return;
  
  // Verifica se já está conectado para evitar reconexões desnecessárias
  if (connection.state === signalR.HubConnectionState.Connected) {
    setIsConnected(true);
    return;
  }

  connection.start()
    .then(() => {
      console.log("Connection established!");
      setIsConnected(true);
    })
    .catch((error) => console.error("Error starting connection:", error));

}, [connection]);

  // Inicia e gerencia eventos
useEffect(() => {
  if (!connection) return;

  // Eventos do servidor
  connection.on("ReceiveMessage", (user: string, message: string, messageTime: string) => {
    setMessages(prev => [...prev, { user, message, messageTime }]);
  });

  connection.on("ConnectedUser", (users: string[]) => {
    setConnectedUsers(users);
  });

  return () => {
    connection.off("ReceiveMessage");
    connection.off("ConnectedUser");
  };
}, [connection]); 


  // Enviar mensagem
  const sendMessage = useCallback(async (message: string) => {
    if (connection) await connection.invoke("SendMessage", message);
  }, [connection]);

  // Entrar na sala
  const joinRoom = useCallback(async (Username: string, ChatRoom: string) => {
    if (connection) await connection.invoke("JoinRoom", { Username, ChatRoom });
  }, [connection]); 

  // Sair
  const leaveChat = useCallback(async () => {
    if (connection) await connection.stop();
    setIsConnected(false);
  }, [connection]);

  return {
    messages,
    connectedUsers,
    isConnected,
    sendMessage,
    joinRoom,
    leaveChat
  };
}
