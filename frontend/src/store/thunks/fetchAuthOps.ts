import { createAsyncThunk } from '@reduxjs/toolkit';
import { enqueueSnackbar } from 'notistack';
import { apiPost } from '../../utils/api';
import type { IUserRegisterPayload } from '../../types/apiType';
import { jwtDecode } from 'jwt-decode';

export const fetchRegisterUser = createAsyncThunk(
  'auth/userRegister',
  async (requestPayload: IUserRegisterPayload) => {
    try {
      const response = await apiPost('/auth/register', requestPayload);
      if (response.status !== 201) {
        enqueueSnackbar('Something went wrong', { variant: 'error' });
        throw new Error(response.message || 'Failed to register');
      }
      enqueueSnackbar('Successfully resgistered', { variant: 'success' });
      return response.data;
    } catch (error: any) {
      enqueueSnackbar('Something went wrong', { variant: 'error' });
      return error.message || 'Failed to register';
    }
  }
);

export const fetchLoginUser = createAsyncThunk(
  'auth/userLogin',
  async (requestPayload: IUserRegisterPayload) => {
    try {
      const response = await apiPost('/auth/login', {
        email: requestPayload.email,
        password: requestPayload.password,
      });
      if (response.status !== 200) {
        enqueueSnackbar('Something went wrong', { variant: 'error' });
        throw new Error(response.message || 'Failed to login');
      }
      const data = response.data as {
        accessToken: string;
        refreshToken: string;
        user: any;
      };
      // Decode the user from the accessToken
      const user = jwtDecode<any>(data.accessToken);
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      enqueueSnackbar('Successfully loggedin', { variant: 'success' });
      return { ...data, user };
      return data;
    } catch (error: any) {
      enqueueSnackbar('Something went wrong', { variant: 'error' });
      return error.message || 'Failed to login';
    }
  }
);

export const fetchRefreshToken = createAsyncThunk('auth/refresh', async () => {
  const storedRefreshToken = localStorage.getItem('refreshToken');
  if (!storedRefreshToken) throw new Error('No refresh token');

  const response = await apiPost('/auth/refresh', {
    refreshToken: storedRefreshToken,
  });
  return response.data; // { accessToken, user }
});

export const fetchLogout = createAsyncThunk('auth/logout', async () => {
  try {
    const response = await apiPost('/auth/logout', {});
    return response.data;
  } catch(error) {
    console.error(error);
  }
});
