# Módulo Chatbot IA

Este módulo implementa una interfaz de chat interactiva que se conecta con el servicio de IA del backend para proporcionar asistencia académica.

## Características

- **Chat en tiempo real**: Interfaz de chat moderna y responsiva
- **Sugerencias de preguntas**: Chips con preguntas sugeridas para facilitar el inicio de conversaciones
- **Estado del servicio**: Información en tiempo real sobre el estado del servicio de IA
- **Autenticación**: Integración con el sistema de autenticación existente
- **Diseño responsivo**: Optimizado para dispositivos móviles y de escritorio

## Estructura del Módulo

```
chatbot/
├── components/
│   ├── ChatInterface.tsx      # Componente principal del chat
│   ├── ChatInterface.css      # Estilos del chat
│   ├── ChatSuggestions.tsx    # Componente de sugerencias
│   ├── ChatSuggestions.css    # Estilos de sugerencias
│   ├── ServiceInfo.tsx        # Información del servicio
│   ├── ServiceInfo.css        # Estilos de información
│   └── index.ts              # Exportaciones de componentes
├── pages/
│   ├── ChatPage.tsx          # Página principal del chatbot
│   ├── ChatPage.css          # Estilos de la página
│   └── index.ts              # Exportaciones de páginas
├── services/
│   └── chatService.ts        # Servicio para comunicación con backend
├── hooks/
│   └── useChat.ts            # Hook personalizado para lógica del chat
└── index.ts                  # Exportaciones principales
```

## Componentes

### ChatInterface
Componente principal que maneja la conversación con el chatbot. Incluye:
- Lista de mensajes con scroll automático
- Campo de entrada con soporte para Enter
- Indicador de carga
- Avatares diferenciados para usuario y bot

### ChatSuggestions
Componente que muestra sugerencias de preguntas para ayudar a los usuarios a iniciar conversaciones. Las sugerencias están categorizadas por temas académicos.

### ServiceInfo
Componente que muestra el estado del servicio de IA, incluyendo:
- Estado de conexión
- Versión del servicio
- Características disponibles

## Servicios

### chatService
Servicio que maneja toda la comunicación con el backend:
- `sendMessage()`: Envía mensajes al chatbot
- `getServiceInfo()`: Obtiene información del servicio
- `validateAcademicMessage()`: Valida si un mensaje es académico
- `isAuthenticated()`: Verifica autenticación del usuario

## Hooks

### useChat
Hook personalizado que encapsula la lógica del chat:
- Estado de mensajes
- Estado de carga
- Función para enviar mensajes
- Función para limpiar el chat

## Integración con el Backend

El módulo se conecta con los siguientes endpoints del backend:

- `POST /ai/chat` - Enviar mensaje al chatbot
- `GET /ai/info` - Obtener información del servicio
- `POST /ai/chat/academic-validation` - Validar mensaje académico

## Uso

1. **Navegación**: El chatbot está disponible en la ruta `/chatbot`
2. **Autenticación**: Requiere estar autenticado (token en localStorage)
3. **Interacción**: Los usuarios pueden escribir mensajes o usar las sugerencias
4. **Responsive**: Funciona en dispositivos móviles y de escritorio

## Estilos

El módulo utiliza:
- Material-UI para componentes base
- CSS personalizado para estilos específicos
- Gradientes y sombras para un diseño moderno
- Media queries para responsividad

## Configuración

El módulo utiliza la configuración global del proyecto:
- `config.apiUrl` para la URL del backend
- Sistema de autenticación existente
- Rutas configuradas en el router principal 