import { createAsyncThunk } from "@reduxjs/toolkit";
import type { INoteRequetTypePost, INoteType } from "../../types/getNoteType";
import { apiPost } from "../../utils/api";
import { enqueueSnackbar } from "notistack";

export const fetchPostNote = createAsyncThunk(
    'notes/AddNewNote', async (requestPayload: INoteRequetTypePost) => {
        try {
            const response = await apiPost<INoteType[]>('/notes', {title: requestPayload.title, content: requestPayload.content});
            if (response.status !== 201) {
                enqueueSnackbar('Something went wrong', { variant: 'error' });
                throw new Error(response.message || 'Failed to fetch notes');
            }
            enqueueSnackbar('Successfully added new note', { variant: 'success' });
            return response.data;
        } catch (error: any) {
            enqueueSnackbar('Something went wrong', { variant: 'error' });
            return (error.message || 'Failed to fetch notes');
        }
    }
);