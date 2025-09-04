import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IGetAllNoteSlice } from '../../types/getNoteType';
import { fetchGetAllNotes } from '../thunks/fetchGetAllNotes';
import { fetchPostNote } from '../thunks/fetchPostNote';
import { fetchDeleteNote } from '../thunks/fetchDeleteNote';
import { fetchUpdateNote } from '../thunks/fetchUpdateNote';

const initialState: IGetAllNoteSlice = {
  data: null,
  error: null,
  loading: false,
  isEdit: false,
  editId: '',
};

const NoteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    editMode: (state, action: PayloadAction<boolean>) => {
      state.isEdit = action.payload || false;
    },
    setEditId: (state, action: PayloadAction<string>) => {
      state.editId = action.payload || '';
    },
    // addNote: (state, action: PayloadAction<Note>) => {
    //     state.notes.push(action.payload);
    // },
    // removeNote: (state, action: PayloadAction<string>) => {     // action.payload is the id of the note to remove
    //     state.notes = state.notes.filter(note => note.id !== action.payload);
    // }
  },
  extraReducers(builder) {
    // Handle async actions for fetching all notes
    builder
      .addCase(fetchGetAllNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGetAllNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchGetAllNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch notes';
      });
    builder
      .addCase(fetchPostNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostNote.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchPostNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch notes';
      });
    builder
      .addCase(fetchDeleteNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeleteNote.fulfilled, (state, action) => {
        state.loading = false;
        state.data =
          state.data?.filter((note) => note._id !== action.meta.arg) ||
          state.data;
      })
      .addCase(fetchDeleteNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch notes';
      });
    builder
      .addCase(fetchUpdateNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUpdateNote.fulfilled, (state) => {
        state.loading = false;
        state.isEdit = false;
      })
      .addCase(fetchUpdateNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch notes';
      });
  },
});
export const { editMode, setEditId } = NoteSlice.actions;
export default NoteSlice.reducer;
