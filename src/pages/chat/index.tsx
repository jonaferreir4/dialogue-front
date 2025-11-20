import { useState } from "react";
import { Box, Paper, Typography, List, ListItem, ListItemText,TextField,Button,} from "@mui/material";
import Brightness1RoundedIcon from '@mui/icons-material/Brightness1Rounded';
import { useNavigate } from "react-router-dom";
import { useChat } from "../../context/ChatContext"
import TypingIndicator from "../../components/dot";

export function Chat() {
  const username = localStorage.getItem("username")
  const roomname = localStorage.getItem("roomName")
  const navigate = useNavigate();

  // Hook que gerencia a conexão com o SignalR
  const { messages, connectedUsers, sendMessage, leaveChat, isConnected, sendStartTyping,
    sendStopTyping, isTyping, typingTimeoutRef } = useChat();

  const [input, setInput] = useState("");

  // Enviar mensagem
  const handleSend = async () => {
    
    if (!input.trim()) return;

      await sendMessage(input).then(() => {
        setInput("");
        sendStopTyping(username!, roomname!);
      })
        .catch((error) => console.log("Erro ao enviar mensagem:", error));
  };

  // Sair do chat
  const handleLeaveChat = async () => {
    await leaveChat();
    navigate("/");
  };


  // Se não estiver conectado, retorna mensagem de carregamento
  if (!isConnected) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh",
          flexDirection: "column",}}>
        <Typography variant="h6">Conectando ao chat...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "background.default" }}>
      <Box sx={{ width: 280, borderRight: 1, borderColor: "divider", bgcolor: "background.paper", p: 2,
          display: "flex", flexDirection: "column" }}>
        <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: "bold",  pb: 1 }}>
          {roomname} </Typography>

        <Button variant="outlined" color="error" onClick={handleLeaveChat}sx={{ mb: 2, alignSelf: "stretch" }}>
          Sair do chat</Button>

        <Typography variant="h6" gutterBottom sx={{ borderBottom: "1px solid", borderColor: "divider", pb: 1 }}>
          Usuários conectados </Typography>


        {/* <Divider sx={{ mb: 1 }} /> */}

        <List sx={{ flexGrow: 1 }}>
          {connectedUsers.length === 0 && (
            <Typography variant="body2" color="text.secondary">
              Nenhum usuário conectado
            </Typography>
          )}

          {connectedUsers.map((user, index) => (
            <ListItem key={index} disablePadding sx={{ borderBottom: "1px solid", borderColor: "divider", py:1 }}>
              <ListItemText primary={user} sx={{display: "flex", justifyContent:"space-between", alignItems: "center" }}/>
              <Brightness1RoundedIcon sx={{ fontSize: 14, color: "success.main" }} />
            </ListItem>
          ))}
        </List>
      </Box>

      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", p: 2, position: "relative" }}>
        <Paper sx={{flexGrow: 1, p: 2, overflowY: "auto", mb: 2, display: "flex", flexDirection: "column",gap: 1, position: "relative"
          }}>
          {messages.map((msg, i) => (
            <Box key={i} sx={{ alignSelf: msg.user === "system" ? "center" : msg.user === username ? "flex-end"
                : "flex-start", bgcolor: msg.user === "system" ? "transparent" : msg.user === username
                ? "primary.main" : "grey.300", color: msg.user === "system" ? "text.secondary"
                : msg.user === username ? "primary.contrastText" : "text.primary", px: msg.user === "system" ? 0 : 2,
                py: msg.user === "system" ? 0 : 1, borderRadius: msg.user === "system" ? 0 : 2, maxWidth: "70%",
                fontStyle: msg.user === "system" ? "italic" : "normal",
              }}>
              {msg.user !== "system" && (
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  {msg.user} </Typography>
              )}
              <Typography
                variant="body1"
                align={msg.user === "system" ? "center" : "left"}>
                {msg.message}
              </Typography>
            </Box>
          ))}
          <TypingIndicator isTyping={isTyping} typingUser={username!}/>
        </Paper>

        {/* Campo de envio */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField fullWidth placeholder="Digite uma mensagem..." value={input}
            onChange={(e) => {
              setInput(e.target.value)
              sendStartTyping(username!, roomname!)

              if (typingTimeoutRef.current){
                clearTimeout(typingTimeoutRef.current);
              }

              typingTimeoutRef.current = setTimeout(() => {
                sendStopTyping(username!, roomname!)
              }, 600);
            }
          }
            onKeyDown={(e) => 
            {
              e.key === "Enter" && handleSend()
            }}/>

          <Button variant="contained" onClick={handleSend}>
            Enviar</Button>
        </Box>
      </Box>
    </Box>
  );
}
