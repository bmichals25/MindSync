import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppSettings, AIModel } from '../../types';

// Initial state
const initialState: AppSettings = {
  theme: 'system',
  notifications: true,
  aiModel: {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    provider: 'openai',
  },
  voice: {
    enabled: true,
    voiceId: undefined,
  },
  privacy: {
    dataSharingEnabled: false,
    storageEnabled: true,
  },
};

// Create the settings slice
const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.theme = action.payload;
    },
    
    toggleNotifications: (state) => {
      state.notifications = !state.notifications;
    },
    
    setNotifications: (state, action: PayloadAction<boolean>) => {
      state.notifications = action.payload;
    },
    
    setAIModel: (state, action: PayloadAction<AIModel>) => {
      state.aiModel = action.payload;
    },
    
    toggleVoice: (state) => {
      state.voice.enabled = !state.voice.enabled;
    },
    
    setVoiceEnabled: (state, action: PayloadAction<boolean>) => {
      state.voice.enabled = action.payload;
    },
    
    setVoiceId: (state, action: PayloadAction<string | undefined>) => {
      state.voice.voiceId = action.payload;
    },
    
    toggleDataSharing: (state) => {
      state.privacy.dataSharingEnabled = !state.privacy.dataSharingEnabled;
    },
    
    setDataSharing: (state, action: PayloadAction<boolean>) => {
      state.privacy.dataSharingEnabled = action.payload;
    },
    
    toggleStorageEnabled: (state) => {
      state.privacy.storageEnabled = !state.privacy.storageEnabled;
    },
    
    setStorageEnabled: (state, action: PayloadAction<boolean>) => {
      state.privacy.storageEnabled = action.payload;
    },
    
    resetSettings: () => initialState,
  },
});

export const {
  setTheme,
  toggleNotifications,
  setNotifications,
  setAIModel,
  toggleVoice,
  setVoiceEnabled,
  setVoiceId,
  toggleDataSharing,
  setDataSharing,
  toggleStorageEnabled,
  setStorageEnabled,
  resetSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer; 