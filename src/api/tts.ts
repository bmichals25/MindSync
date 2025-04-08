import axios from 'axios';
import { API } from '../constants/api';

interface ElevenlabsVoice {
  voice_id: string;
  name: string;
}

interface TTSOptions {
  text: string;
  voiceId: string;
  model?: string;
  stability?: number;
  similarity_boost?: number;
}

class TTSService {
  private apiKey: string;
  private voices: ElevenlabsVoice[] = [];

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getVoices(): Promise<ElevenlabsVoice[]> {
    try {
      if (this.voices.length > 0) {
        return this.voices;
      }

      const response = await axios.get(`${API.ELEVENLABS_BASE_URL}${API.ELEVENLABS.VOICES}`, {
        headers: {
          'xi-api-key': this.apiKey,
        },
        timeout: API.TIMEOUT,
      });

      this.voices = response.data.voices;
      return this.voices;
    } catch (error) {
      console.error('Error fetching Elevenlabs voices:', error);
      throw error;
    }
  }

  async textToSpeech(options: TTSOptions): Promise<ArrayBuffer> {
    try {
      const { text, voiceId, model = 'eleven_monolingual_v1', stability = 0.5, similarity_boost = 0.75 } = options;

      const url = `${API.ELEVENLABS_BASE_URL}${API.ELEVENLABS.TEXT_TO_SPEECH}/${voiceId}`;
      
      const requestData = {
        text,
        model_id: model,
        voice_settings: {
          stability,
          similarity_boost,
        },
      };

      const response = await axios.post(url, requestData, {
        headers: {
          'xi-api-key': this.apiKey,
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer',
        timeout: API.TIMEOUT,
      });

      return response.data;
    } catch (error) {
      console.error('Error calling Elevenlabs TTS API:', error);
      throw error;
    }
  }

  // Helper method to convert ArrayBuffer to Audio element
  createAudioFromBuffer(buffer: ArrayBuffer): HTMLAudioElement {
    const blob = new Blob([buffer], { type: 'audio/mpeg' });
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    
    // Clean up the URL when the audio is no longer needed
    audio.onended = () => {
      URL.revokeObjectURL(url);
    };
    
    return audio;
  }
}

export default new TTSService(''); // Initialize with empty API key, to be set later 