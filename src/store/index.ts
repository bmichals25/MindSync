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
import { combineReducers } from '@reduxjs/toolkit';

// Import reducers from slices
import authReducer from './slices/authSlice';
import sessionsReducer from './slices/sessionsSlice';
import moodsReducer from './slices/moodSlice';
import settingsReducer from './slices/settingsSlice';
import uiReducer from './slices/uiSlice';

// Configure persist for each reducer that needs persistence
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'sessions', 'moods', 'settings'], // Only these will be persisted
};

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  sessions: sessionsReducer,
  moods: moodsReducer,
  settings: settingsReducer,
  ui: uiReducer,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

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