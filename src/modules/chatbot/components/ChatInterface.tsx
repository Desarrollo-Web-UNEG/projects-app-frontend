import React, { useState, useRef, useEffect } from 'react';
import { Send as SendIcon, SmartToy as BotIcon, Person as UserIcon } from '@mui/icons-material';
import { IconButton, TextField, Paper, Typography, Box, CircularProgress } from '@mui/material';
import { Message } from '../hooks/useChat';
import ReactMarkdown from 'react-markdown';
import './ChatInterface.css';

interface ChatInterfaceProps {
  messages: Message[];
  isLoading: boolean;
  sendMessage: (messageText: string) => Promise<void>;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, isLoading, sendMessage }) => {
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;
    await sendMessage(inputMessage);
    setInputMessage('');
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box className="chat-container">
      <Paper className="chat-paper" elevation={3}>
        {/* Header */}
        <Box className="chat-header">
          <BotIcon className="bot-icon" />
          <Typography variant="h6" className="chat-title">
            Asistente Académico IA
          </Typography>
        </Box>

        {/* Messages Area */}
        <Box className="messages-container">
          {messages.map((message) => (
            <Box
              key={message.id}
              className={`message ${message.isUser ? 'user-message' : 'bot-message'}`}
            >
              <Box className="message-avatar">
                {message.isUser ? <UserIcon /> : <BotIcon />}
              </Box>
              <Paper className="message-bubble" elevation={1}>
                {message.isUser ? (
                  <Typography variant="body1" className="message-text">
                    {message.text}
                  </Typography>
                ) : (
                  <ReactMarkdown
                    components={{
                      p: ({node, ...props}) => <Typography variant="body1" className="message-text" paragraph {...props} />,
                      ul: ({node, ...props}) => <ul style={{ marginLeft: 20, marginBottom: 8 }} {...props} />,
                      ol: ({node, ...props}) => <ol style={{ marginLeft: 20, marginBottom: 8 }} {...props} />,
                      li: ({node, ...props}) => <li style={{ marginBottom: 4 }} {...props} />,
                      strong: ({node, ...props}) => <strong style={{ fontWeight: 600 }} {...props} />,
                      em: ({node, ...props}) => <em style={{ fontStyle: 'italic' }} {...props} />,
                      // Puedes agregar más si quieres personalizar otros elementos
                    }}
                  >
                    {message.text}
                  </ReactMarkdown>
                )}
                <Typography variant="caption" className="message-time">
                  {message.timestamp.toLocaleTimeString()}
                </Typography>
              </Paper>
            </Box>
          ))}
          
          {isLoading && (
            <Box className="message bot-message">
              <Box className="message-avatar">
                <BotIcon />
              </Box>
              <Paper className="message-bubble" elevation={1}>
                <Box className="loading-indicator">
                  <CircularProgress size={20} />
                  <Typography variant="body2" className="loading-text">
                    Pensando...
                  </Typography>
                </Box>
              </Paper>
            </Box>
          )}
          
          <div ref={messagesEndRef} />
        </Box>

        {/* Input Area */}
        <Box className="input-container">
          <TextField
            fullWidth
            multiline
            maxRows={4}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe tu pregunta académica aquí..."
            variant="outlined"
            disabled={isLoading}
            className="message-input"
          />
          <IconButton
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="send-button"
            color="primary"
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
};

export default ChatInterface; 