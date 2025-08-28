import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiPut } from "../../utils/api";
import { enqueueSnackbar } from "notistack";
import type { INoteRequetTypePost } from "../../types/getNoteType";

export const fetchUpdateNote = createAsyncThunk(
    'notes/updateNote', async (requestPayload: INoteRequetTypePost) => {
        try {
            const response = await apiPut<[]>(`/notes/${requestPayload.id}`,{title: requestPayload.title, content: requestPayload.content});
            if (response.status !== 200) {
                enqueueSnackbar('Something went wrong', { variant: 'error' });
                throw new Error(response.message || 'Failed to update note');
            }
            enqueueSnackbar('Successfully updated note', { variant: 'success' });
            return response.data;
        } catch (error: any) {
            enqueueSnackbar('Something went wrong', { variant: 'error' });
            return (error.message || 'Failed to update note');
        }
    }
);