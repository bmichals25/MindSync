import axios from 'axios';
import { Message, MessageRole } from '../types';
import { API } from '../constants/api';

interface OpenAIMessage {
  role: string;
  content: string;
}

interface OpenAIRequest {
  model: string;
  messages: OpenAIMessage[];
  temperature?: number;
  max_tokens?: number;
}

interface OpenAIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: OpenAIMessage;
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

class AIService {
  private apiKey: string;
  private model: string;

  constructor(apiKey: string, model = API.MODELS.OPENAI.GPT35_TURBO) {
    this.apiKey = apiKey;
    this.model = model;
  }

  setModel(model: string) {
    this.model = model;
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }

  async sendMessage(messages: Message[]): Promise<Message> {
    try {
      const openAIMessages: OpenAIMessage[] = messages.map(message => ({
        role: message.role.toLowerCase(),
        content: message.content,
      }));

      const requestData: OpenAIRequest = {
        model: this.model,
        messages: openAIMessages,
        temperature: 0.7,
        max_tokens: 1000,
      };

      const response = await axios.post<OpenAIResponse>(
        `${API.OPENAI_BASE_URL}${API.OPENAI.CHAT_COMPLETIONS}`,
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`,
          },
          timeout: API.TIMEOUT,
        }
      );

      const aiMessage = response.data.choices[0].message;
      
      return {
        id: response.data.id,
        role: aiMessage.role === 'assistant' ? MessageRole.AI : MessageRole.USER,
        content: aiMessage.content,
        timestamp: new Date(),
      };
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      throw error;
    }
  }

  // Method for handling different AI providers
  // This will be expanded as we add more providers
  async sendMessageToProvider(provider: string, messages: Message[]): Promise<Message> {
    switch (provider) {
      case 'openai':
        return this.sendMessage(messages);
      // Add cases for other providers here (Gemini, Claude, etc.)
      default:
        return this.sendMessage(messages);
    }
  }
}

export default new AIService('');  // Initialize with empty API key, to be set later 