import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import reducers from slices (we'll create these next)
// For now, use empty reducers
const authReducer = (state = { user: null, isAuthenticated: false, loading: false, error: null }, action) => state;
const sessionsReducer = (state = [], action) => state;
const moodsReducer = (state = [], action) => state;
const settingsReducer = (state = {
  theme: 'light',
  notifications: true,
  aiModel: {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    provider: 'openai',
  },
  voice: {
    enabled: true,
  },
  privacy: {
    dataSharingEnabled: false,
    storageEnabled: true,
  },
}, action) => state;
const uiReducer = (state = { loading: false, modalVisible: false, currentModal: null }, action) => state;

// Configure persist for each reducer that needs persistence
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'sessions', 'moods', 'settings'], // Only these will be persisted
};

// Combine reducers
const rootReducer = {
  auth: authReducer,
  sessions: sessionsReducer,
  moods: moodsReducer,
  settings: settingsReducer,
  ui: uiReducer,
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, (state, action) => {
  const newState = {};
  
  Object.keys(rootReducer).forEach(key => {
    newState[key] = rootReducer[key](state ? state[key] : undefined, action);
  });
  
  return newState;
});

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create persistor
export const persistor = persistStore(store);

// Export types
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default { store, persistor }; 