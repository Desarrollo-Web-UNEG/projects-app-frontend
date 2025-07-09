import React from 'react';
import { Chip, Box, Typography } from '@mui/material';
import { School as SchoolIcon, Code as CodeIcon, Book as BookIcon, Help as HelpIcon } from '@mui/icons-material';
import './ChatSuggestions.css';

interface ChatSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
  isLoading?: boolean;
}

const ChatSuggestions: React.FC<ChatSuggestionsProps> = ({ onSuggestionClick, isLoading }) => {
  const suggestions = [
    {
      text: '¿Qué es la programación orientada a objetos?',
      icon: <CodeIcon />,
      category: 'programming'
    },
    {
      text: 'Explícame los principios SOLID',
      icon: <CodeIcon />,
      category: 'programming'
    },
    {
      text: '¿Cuáles son las mejores prácticas para bases de datos?',
      icon: <SchoolIcon />,
      category: 'database'
    },
    {
      text: '¿Cómo funciona el patrón MVC?',
      icon: <BookIcon />,
      category: 'architecture'
    },
    {
      text: '¿Qué es la recursividad y cuándo usarla?',
      icon: <HelpIcon />,
      category: 'algorithms'
    },
    {
      text: 'Explícame el concepto de API REST',
      icon: <CodeIcon />,
      category: 'web'
    }
  ];

  const colorClasses = [
    "suggestion-burgundy",
  ];

  return (
    <Box className="suggestions-container">
      <Typography variant="h6" className="suggestions-title">
        Preguntas sugeridas
      </Typography>
      <Box className="suggestions-grid">
        {suggestions.map((suggestion, index) => (
          <Chip
            key={index}
            label={suggestion.text}
            icon={suggestion.icon}
            onClick={() => onSuggestionClick(suggestion.text)}
            className={`suggestion-chip ${colorClasses[index % colorClasses.length]}`}
            clickable
            disabled={isLoading}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ChatSuggestions; 