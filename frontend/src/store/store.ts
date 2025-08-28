import { configureStore } from '@reduxjs/toolkit';
import NoteReducer from './slices/NoteSlice.ts';

const store = configureStore({
  reducer: {
    // Add your reducers here
    notes: NoteReducer,
  },
});

// Export thunks and types for use in the app
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;

export default store;
