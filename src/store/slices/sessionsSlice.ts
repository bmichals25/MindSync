import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Session, Message, ActionItem } from '../../types';
import { v4 as uuidv4 } from 'uuid';

// Initial state
const initialState: Session[] = [];

// Helper function to find session by ID
const findSessionById = (state: Session[], id: string): [Session | undefined, number] => {
  const index = state.findIndex(session => session.id === id);
  return [state[index], index];
};

// Async thunks
export const createSession = createAsyncThunk(
  'sessions/create',
  async (sessionData: Partial<Session>, { rejectWithValue }) => {
    try {
      // In a real app, we would make API calls here
      // For now, just create a new session locally
      const newSession: Session = {
        id: uuidv4(),
        title: sessionData.title || 'New Session',
        date: new Date(),
        duration: 0,
        messages: [],
        actionItems: [],
        mode: sessionData.mode || 'chat',
        ...sessionData
      };
      
      return newSession;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'An error occurred');
    }
  }
);

export const endSession = createAsyncThunk(
  'sessions/end',
  async ({ sessionId, summary }: { sessionId: string; summary?: string }, { getState, rejectWithValue }) => {
    try {
      // In a real app, make API call to save the session
      // For now, just update the session locally
      
      // Add summary if provided
      return { sessionId, summary, endTime: new Date() };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'An error occurred');
    }
  }
);

// Create the sessions slice
const sessionsSlice = createSlice({
  name: 'sessions',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<{ sessionId: string; message: Message }>) => {
      const { sessionId, message } = action.payload;
      const [session] = findSessionById(state, sessionId);
      
      if (session) {
        session.messages.push(message);
      }
    },
    
    updateSession: (state, action: PayloadAction<{ sessionId: string; updates: Partial<Session> }>) => {
      const { sessionId, updates } = action.payload;
      const [session] = findSessionById(state, sessionId);
      
      if (session) {
        Object.assign(session, updates);
      }
    },
    
    addActionItem: (state, action: PayloadAction<{ sessionId: string; text: string }>) => {
      const { sessionId, text } = action.payload;
      const [session] = findSessionById(state, sessionId);
      
      if (session) {
        const newActionItem: ActionItem = {
          id: uuidv4(),
          text,
          isCompleted: false,
          sessionId,
          createdAt: new Date()
        };
        
        session.actionItems.push(newActionItem);
      }
    },
    
    toggleActionItem: (state, action: PayloadAction<{ sessionId: string; actionItemId: string }>) => {
      const { sessionId, actionItemId } = action.payload;
      const [session] = findSessionById(state, sessionId);
      
      if (session) {
        const actionItem = session.actionItems.find(item => item.id === actionItemId);
        if (actionItem) {
          actionItem.isCompleted = !actionItem.isCompleted;
        }
      }
    },
    
    deleteSession: (state, action: PayloadAction<{ sessionId: string }>) => {
      const { sessionId } = action.payload;
      const [_, index] = findSessionById(state, sessionId);
      
      if (index !== -1) {
        state.splice(index, 1);
      }
    }
  },
  extraReducers: (builder) => {
    // Handle create session
    builder.addCase(createSession.fulfilled, (state, action) => {
      state.push(action.payload);
    });
    
    // Handle end session
    builder.addCase(endSession.fulfilled, (state, action) => {
      const { sessionId, summary, endTime } = action.payload;
      const [session] = findSessionById(state, sessionId);
      
      if (session) {
        if (summary) {
          session.summary = summary;
        }
        
        if (endTime && session.date) {
          // Calculate duration in minutes
          const startTime = new Date(session.date);
          const durationMs = endTime.getTime() - startTime.getTime();
          session.duration = Math.round(durationMs / (1000 * 60));
        }
      }
    });
  }
});

export const { 
  addMessage, 
  updateSession, 
  addActionItem, 
  toggleActionItem, 
  deleteSession 
} = sessionsSlice.actions;

export default sessionsSlice.reducer; 