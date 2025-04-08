import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the state type
interface UIState {
  loading: boolean;
  modalVisible: boolean;
  currentModal: string | null;
  toast: {
    visible: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
  };
}

// Initial state
const initialState: UIState = {
  loading: false,
  modalVisible: false,
  currentModal: null,
  toast: {
    visible: false,
    message: '',
    type: 'info',
  },
};

// Create the UI slice
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    
    showModal: (state, action: PayloadAction<string>) => {
      state.modalVisible = true;
      state.currentModal = action.payload;
    },
    
    hideModal: (state) => {
      state.modalVisible = false;
      state.currentModal = null;
    },
    
    showToast: (state, action: PayloadAction<{
      message: string;
      type?: 'success' | 'error' | 'info';
    }>) => {
      state.toast = {
        visible: true,
        message: action.payload.message,
        type: action.payload.type || 'info',
      };
    },
    
    hideToast: (state) => {
      state.toast.visible = false;
    },
    
    resetUI: () => initialState,
  },
});

export const {
  setLoading,
  showModal,
  hideModal,
  showToast,
  hideToast,
  resetUI,
} = uiSlice.actions;

export default uiSlice.reducer; 