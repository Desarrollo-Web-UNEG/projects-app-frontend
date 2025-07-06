import React, { useState } from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import { SmartToy as BotIcon } from '@mui/icons-material';
import { ChatInterface, ChatSuggestions, ServiceInfo } from '../components';
import { NavBar } from '@dashboard/components';
import { useChat } from '../hooks/useChat';
import './ChatPage.css';

const ChatPage: React.FC = () => {
  const [showSuggestions, setShowSuggestions] = useState(true);
  const { messages, isLoading, sendMessage, clearChat } = useChat();

  const handleSuggestionClick = async (suggestion: string) => {
    setShowSuggestions(false);
    await sendMessage(suggestion);
  };

  const handleFirstMessage = () => {
    setShowSuggestions(false);
  };

  return (
    <Box className="chat-page">
      <NavBar />
      
      <Container maxWidth="lg" className="chat-page-container">
        <Box className="chat-page-header">
          <Paper className="header-paper" elevation={2}>
            <Box className="header-content">
              <BotIcon className="header-icon" />
              <Box className="header-text">
                <Typography variant="h4" className="header-title">
                  Asistente Académico IA
                </Typography>
                <Typography variant="body1" className="header-subtitle">
                  Tu compañero inteligente para resolver dudas académicas y de programación
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>

        <Box className="chat-content">
          {/* <ServiceInfo /> */}
          
          {showSuggestions && (
            <ChatSuggestions onSuggestionClick={handleSuggestionClick} isLoading={isLoading} />
          )}
          
          <ChatInterface
            messages={messages}
            isLoading={isLoading}
            sendMessage={sendMessage}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default ChatPage; 