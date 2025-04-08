export const API = {
  // Base URLs for different services
  OPENAI_BASE_URL: 'https://api.openai.com/v1',
  ELEVENLABS_BASE_URL: 'https://api.elevenlabs.io/v1',
  
  // OpenAI endpoints
  OPENAI: {
    CHAT_COMPLETIONS: '/chat/completions',
    MODELS: '/models',
  },
  
  // ElevenLabs endpoints
  ELEVENLABS: {
    TEXT_TO_SPEECH: '/text-to-speech',
    VOICES: '/voices',
  },
  
  // API keys will be stored in environment variables
  // or secure storage, not hardcoded here
  
  // Request timeouts
  TIMEOUT: 30000, // 30 seconds
  
  // AI models
  MODELS: {
    OPENAI: {
      GPT4: 'gpt-4',
      GPT35_TURBO: 'gpt-3.5-turbo',
    },
    // Reserved for future models
    GEMINI: {},
    CLAUDE: {},
  },
};

export default API; 