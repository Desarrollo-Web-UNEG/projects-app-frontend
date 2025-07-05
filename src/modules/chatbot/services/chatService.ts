import { config } from '@/config';

export interface ChatMessage {
  message: string;
  context?: string;
}

export interface ChatResponse {
  response: string;
  isValid: boolean;
  timestamp: string;
}

export interface AIServiceInfo {
  status: string;
  version: string;
  features: string[];
}

class ChatService {
  private baseUrl = `${config.apiUrl}/ai`;

  private getHeaders(): HeadersInit {
    const token = localStorage.getItem('access_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  async sendMessage(message: ChatMessage): Promise<ChatResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/chat`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(message)
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  async getServiceInfo(): Promise<AIServiceInfo> {
    try {
      const response = await fetch(`${this.baseUrl}/info`, {
        method: 'GET',
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting service info:', error);
      throw error;
    }
  }

  async validateAcademicMessage(message: string): Promise<{ message: string; isAcademic: boolean; timestamp: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/chat/academic-validation`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ message })
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error validating academic message:', error);
      throw error;
    }
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }

  // Método para obtener el token de autenticación
  getAuthToken(): string | null {
    return localStorage.getItem('access_token');
  }
}

export const chatService = new ChatService();
export default chatService; 