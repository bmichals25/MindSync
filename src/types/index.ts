// User related types
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
  createdAt: Date;
}

// Authentication related types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Message types for chat
export enum MessageRole {
  USER = 'user',
  AI = 'assistant',
  SYSTEM = 'system'
}

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

// Session related types
export interface Session {
  id: string;
  title: string;
  date: Date;
  duration: number; // in minutes
  messages: Message[];
  moodBefore?: MoodEntry;
  moodAfter?: MoodEntry;
  summary?: string;
  actionItems: ActionItem[];
  mode: 'chat' | 'voice';
}

// Mood tracking types
export enum MoodType {
  HAPPY = 'happy',
  NEUTRAL = 'neutral',
  SAD = 'sad',
  ANXIOUS = 'anxious',
  ANGRY = 'angry',
  CALM = 'calm',
  STRESSED = 'stressed'
}

export interface MoodEntry {
  value: MoodType;
  intensity: number; // 1-10
  notes?: string;
  timestamp: Date;
}

// Action items
export interface ActionItem {
  id: string;
  text: string;
  isCompleted: boolean;
  sessionId: string;
  createdAt: Date;
}

// AI model types
export interface AIModel {
  id: string;
  name: string;
  provider: 'openai' | 'gemini' | 'claude';
  description?: string;
}

// App settings
export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  aiModel: AIModel;
  voice: {
    enabled: boolean;
    voiceId?: string;
  };
  privacy: {
    dataSharingEnabled: boolean;
    storageEnabled: boolean;
  };
}

// Navigation types
export type RootStackParamList = {
  Home: undefined;
  Chat: { sessionId?: string };
  Voice: { sessionId?: string };
  SessionRecap: { sessionId: string };
  Settings: undefined;
  Auth: undefined;
  Login: undefined;
  Register: undefined;
};

// Redux state root type
export interface RootState {
  auth: AuthState;
  sessions: Session[];
  moods: MoodEntry[];
  settings: AppSettings;
  ui: {
    loading: boolean;
    modalVisible: boolean;
    currentModal: string | null;
  };
} 