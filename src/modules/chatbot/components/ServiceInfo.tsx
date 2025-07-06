import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip, 
  CircularProgress,
  Alert
} from '@mui/material';
import { CheckCircle as CheckIcon, Error as ErrorIcon } from '@mui/icons-material';
import { chatService, type AIServiceInfo } from '../services/chatService';
import './ServiceInfo.css';

const ServiceInfo: React.FC = () => {
  const [serviceInfo, setServiceInfo] = useState<AIServiceInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServiceInfo = async () => {
      try {
        setLoading(true);
        setError(null);
        const info = await chatService.getServiceInfo();
        setServiceInfo(info);
      } catch (err) {
        setError('No se pudo obtener la información del servicio');
        console.error('Error fetching service info:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceInfo();
  }, []);

  if (loading) {
    return (
      <Card className="service-info-card">
        <CardContent className="loading-content">
          <CircularProgress size={24} />
          <Typography variant="body2" className="loading-text">
            Verificando estado del servicio...
          </Typography>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="service-info-card error">
        <CardContent>
          <Box className="status-header">
            <ErrorIcon className="status-icon error" />
            <Typography variant="h6" className="status-title">
              Error de Conexión
            </Typography>
          </Box>
          <Alert severity="warning" className="error-alert">
            {error}
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="service-info-card">
      <CardContent>
        <Box className="status-header">
          <CheckIcon className="status-icon success" />
          <Typography variant="h6" className="status-title">
            Servicio Activo
          </Typography>
        </Box>
        
        {serviceInfo && (
          <Box className="service-details">
            <Box className="detail-row">
              <Typography variant="body2" className="detail-label">
                Estado:
              </Typography>
              <Chip 
                label={serviceInfo.status} 
                color="success" 
                size="small"
                className="status-chip"
              />
            </Box>
            
            {serviceInfo.version && (
              <Box className="detail-row">
                <Typography variant="body2" className="detail-label">
                  Versión:
                </Typography>
                <Typography variant="body2" className="detail-value">
                  {serviceInfo.version}
                </Typography>
              </Box>
            )}
            
            {serviceInfo.features && serviceInfo.features.length > 0 && (
              <Box className="features-section">
                <Typography variant="body2" className="detail-label">
                  Características:
                </Typography>
                <Box className="features-grid">
                  {serviceInfo.features.map((feature, index) => (
                    <Chip
                      key={index}
                      label={feature}
                      size="small"
                      variant="outlined"
                      className="feature-chip"
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ServiceInfo; 