import { createAsyncThunk } from "@reduxjs/toolkit";
import type { INoteType } from "../../types/getNoteType";
import { apiGet } from "../../utils/api";
import { enqueueSnackbar } from "notistack";

export const fetchGetAllNotes = createAsyncThunk(
    'notes/fetchGetAll', async () => {
        try {
            const response = await apiGet<INoteType[]>('/notes');
            if (response.status !== 200) {
                enqueueSnackbar('Something went wrong', { variant: 'error' });
                throw new Error(response.message || 'Failed to fetch notes');
            }
            enqueueSnackbar('Fetched all Notes', { variant: 'success' });
            return response.data;
        } catch (error: any) {
            enqueueSnackbar('Something went wrong', { variant: 'error' });
            return (error.message || 'Failed to fetch notes');
        }
    }
);