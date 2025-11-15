import { Box, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();

  return (
    <Box sx={{ height: "100vh", bgcolor: "background.default", display: "flex",
        justifyContent: "center", alignItems: "center", p: 2, }} >
      <Paper elevation={3} sx={{ p: 6, textAlign: "center", borderRadius: 3,
          maxWidth: 400, width: "100%",}}>
        
        <Typography variant="h4" gutterBottom>
          👋 Bem-vindo ao Chat!</Typography>

        <Typography variant="body1" sx={{ mb: 4 }}>
          Clique no botão abaixo para entrar em uma sala. </Typography>

        <Button variant="contained" size="large" color="primary"
          onClick={() => navigate("/join-room")}>
          Ir para Join Room </Button>
      </Paper>
    </Box>
  );
}

export { Welcome };
