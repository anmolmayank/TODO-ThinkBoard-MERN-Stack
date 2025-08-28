import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiDelete } from "../../utils/api";
import { enqueueSnackbar } from "notistack";

export const fetchDeleteNote = createAsyncThunk(
    'notes/deleteNote', async (requestPayload: string) => {
        try {
            const response = await apiDelete<[]>('/notes' + `/${requestPayload}`);
            if (response.status !== 200) {
                enqueueSnackbar('Something went wrong', { variant: 'error' });
                throw new Error(response.message || 'Failed to delete note');
            }
            enqueueSnackbar('Successfully deleted note', { variant: 'success' });
            return response.data;
        } catch (error: any) {
            enqueueSnackbar('Something went wrong', { variant: 'error' });
            return (error.message || 'Failed to delete note');
        }
    }
);