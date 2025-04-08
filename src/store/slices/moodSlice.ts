import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { MoodEntry, MoodType } from '../../types';
import { RootState } from '../index';
import { v4 as uuidv4 } from 'uuid';

// Initial state
const initialState: MoodEntry[] = [];

// Async thunks
export const fetchMoodHistory = createAsyncThunk(
  'moods/fetchHistory',
  async (_, { getState, rejectWithValue }) => {
    try {
      // In a real app, fetch mood history from API/backend
      // For now, just return the current state
      const state = getState() as RootState;
      return state.moods;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'An error occurred');
    }
  }
);

// Create the moods slice
const moodSlice = createSlice({
  name: 'moods',
  initialState,
  reducers: {
    addMoodEntry: (state, action: PayloadAction<{
      value: MoodType;
      intensity: number;
      notes?: string;
    }>) => {
      const { value, intensity, notes } = action.payload;
      
      const newMoodEntry: MoodEntry = {
        value,
        intensity,
        notes,
        timestamp: new Date()
      };
      
      state.push(newMoodEntry);
    },
    
    updateMoodEntry: (state, action: PayloadAction<{
      timestamp: Date;
      updates: Partial<MoodEntry>;
    }>) => {
      const { timestamp, updates } = action.payload;
      const index = state.findIndex(entry => 
        entry.timestamp.getTime() === new Date(timestamp).getTime()
      );
      
      if (index !== -1) {
        state[index] = { ...state[index], ...updates };
      }
    },
    
    deleteMoodEntry: (state, action: PayloadAction<{ timestamp: Date }>) => {
      const { timestamp } = action.payload;
      const index = state.findIndex(entry => 
        entry.timestamp.getTime() === new Date(timestamp).getTime()
      );
      
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    
    // Used for linking mood entries to sessions
    linkMoodToSession: (state, action: PayloadAction<{
      moodTimestamp: Date;
      sessionId: string;
      isBefore: boolean; // true = mood before session, false = mood after
    }>) => {
      const { moodTimestamp, sessionId, isBefore } = action.payload;
      const index = state.findIndex(entry => 
        entry.timestamp.getTime() === new Date(moodTimestamp).getTime()
      );
      
      if (index !== -1) {
        state[index] = {
          ...state[index],
          sessionId,
          isMoodBefore: isBefore
        };
      }
    }
  },
  extraReducers: (builder) => {
    // Handle fetch mood history
    builder.addCase(fetchMoodHistory.fulfilled, (state, action) => {
      // If we're fetching from a real API, we'd replace the state
      // For now, since we're just returning the existing state, do nothing
      return state;
    });
  }
});

// Selectors
export const selectAllMoods = (state: RootState) => state.moods;

export const selectMoodsByDateRange = (startDate: Date, endDate: Date) => 
  (state: RootState) => {
    return state.moods.filter(mood => {
      const moodDate = new Date(mood.timestamp);
      return moodDate >= startDate && moodDate <= endDate;
    });
  };

export const selectLatestMood = (state: RootState) => {
  if (state.moods.length === 0) return null;
  
  return state.moods.reduce((latest, current) => {
    const latestDate = new Date(latest.timestamp);
    const currentDate = new Date(current.timestamp);
    return currentDate > latestDate ? current : latest;
  }, state.moods[0]);
};

export const { 
  addMoodEntry, 
  updateMoodEntry, 
  deleteMoodEntry,
  linkMoodToSession
} = moodSlice.actions;

export default moodSlice.reducer; 