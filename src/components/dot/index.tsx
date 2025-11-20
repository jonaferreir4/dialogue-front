import { Box, styled } from '@mui/material';
import React from 'react';
import Avatar from 'react-avatar'; // ⬅ IMPORTANTE

const Dot = styled('span')(({ theme }) => ({
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: theme.palette.grey[500],
  display: 'inline-block',
  margin: '0 2px',

  animationName: 'typingPulse',
  animationDuration: '1s',
  animationTimingFunction: 'ease-in-out',
  animationIterationCount: 'infinite',
}));

const typingPulse = `
  @keyframes typingPulse {
    0%, 100% {
      transform: translateY(0);
      opacity: 0.5;
    }
    50% {
      transform: translateY(-4px);
      opacity: 1;
    }
  }
`;

interface TypingIndicatorProps {
  isTyping: boolean;
  typingUser?: string; // ⬅ Nome do usuário que está digitando (opcional)
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ isTyping, typingUser = "User" }) => {
  if (!isTyping) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: '8px',
        maxWidth: 'fit-content',
        borderRadius: '12px',
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        position: "absolute",
        bottom: "8px",
        left: "8px",
        zIndex: 1,
        gap: 1
      }}
    >
      <style>{typingPulse}</style>

      {/* ▶️ AVATAR À ESQUERDA */}
      <Avatar
        name={typingUser}
        size="28"
        round={true}
        textSizeRatio={2}
      />

      {/* Pontinhos animados */}
      <Dot sx={{ animationDelay: '0s' }} />
      <Dot sx={{ animationDelay: '0.15s' }} />
      <Dot sx={{ animationDelay: '0.3s' }} />
    </Box>
  );
};

export default TypingIndicator;
