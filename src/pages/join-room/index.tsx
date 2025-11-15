import { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useChat } from "../../context/ChatContext"
const JoinRoom = () => {
  const [username, setUsername] = useState('');
  const [roomName, setRoomName] = useState('');
  const navigate = useNavigate();

   // Usa o hook customizado
  const { joinRoom, isConnected } = useChat();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!username.trim() || !roomName.trim()) {
      console.log("Username e Room são obrigatórios!");
      return;
    }

      await joinRoom(username, roomName)
      .then((() => {
        navigate("/chat");
        localStorage.setItem("username", username);
        localStorage.setItem("roomName", roomName);
      })).catch((error) => {
        console.log("Erro ao entrar na sala:", error);
      });
    
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center',
        alignItems: 'center', minHeight: '100vh', backgroundColor: '#f5f5f5', padding: 2,
      }}>

      <Paper elevation={6} sx={{ padding: 4, maxWidth: 400, width: '100%', borderRadius: 2 }}>
        <Typography variant="h5" component="h1" gutterBottom align="center"
          sx={{ marginBottom: 3, fontWeight: 'bold' }}>Join a Chat Room</Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="User name" variant="outlined" fullWidth required value={username}
            onChange={(e) => setUsername(e.target.value)}/>

          <TextField label="Chat Room" variant="outlined" fullWidth required value={roomName}
            onChange={(e) => setRoomName(e.target.value)}/>

          <Button type="submit" variant="contained" color="primary" size="large" fullWidth
            sx={{ marginTop: 2 }} disabled={!isConnected && !username && !roomName }>Join</Button>
        </Box>
      </Paper>
    </Box>
  );
};

export { JoinRoom } ;