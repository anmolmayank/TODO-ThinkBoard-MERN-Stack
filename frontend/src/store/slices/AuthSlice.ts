import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  fetchLoginUser,
  fetchRefreshToken,
  fetchRegisterUser,
} from '../thunks/fetchAuthOps';

let refreshTimer: ReturnType<typeof setTimeout> | null = null;

interface IAuthState {
  accessToken: string | null;
  user: { id: string; email: string } | null;
  isAuthenticated: boolean;
  error: string | null;
  loading: boolean;
}

const initialState: IAuthState = {
  accessToken: null,
  user: null,
  isAuthenticated: false,
  error: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogout: (state) => {
      state.accessToken = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accesstoken');

      if (refreshTimer) {
        clearTimeout(refreshTimer);
        refreshTimer = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegisterUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRegisterUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchRegisterUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to register';
      })
      .addCase(fetchLoginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchLoginUser.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.accessToken = action.payload.accessToken;
          state.user = action.payload.user ?? state.user;
          state.isAuthenticated = true;
        }
      )
      .addCase(fetchLoginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to login';
      })
      .addCase(
        fetchRefreshToken.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.accessToken = action.payload.accessToken;
          state.user = action.payload.userId;
          state.isAuthenticated = true;
          localStorage.setItem('accessToken', action.payload.accessToken);
        }
      )
      .addCase(fetchRefreshToken.rejected, (state) => {
        state.isAuthenticated = false;
        state.accessToken = null;
        state.user = null;
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      });
  },
});

export const { setLogout } = authSlice.actions;
export default authSlice.reducer;
