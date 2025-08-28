import axiosInstance from './axiosInstance';
import type { ApiResponse } from '../types/apiType';

// Generic GET
export const apiGet = async <T>(
  url: string,
  config = {}
): Promise<ApiResponse<T>> => {
  try {
    const response = await axiosInstance.get<T>(url, config);
    return {
      data: response.data,
      status: response.status,
      message: 'Success',
    };
  } catch (error: any) {
    return {
      data: null,
      status: error.response?.status ?? 500,
      message: error.response?.data?.message ?? error.message,
    };
  }
};

// Generic POST
export const apiPost = async <T>(
  url: string,
  data: unknown,
  config = {}
): Promise<ApiResponse<T>> => {
  try {
    const response = await axiosInstance.post<T>(url, data, config);
    return {
      data: response.data,
      status: response.status,
      message: 'Success',
    };
  } catch (error: any) {
    return {
      data: null,
      status: error.response?.status ?? 500,
      message: error.response?.data?.message ?? error.message,
    };
  }
};

// Generic PUT
export const apiPut = async <T>(
  url: string,
  data: unknown,
  config = {}
): Promise<ApiResponse<T>> => {
  try {
    const response = await axiosInstance.put<T>(url, data, config);
    return {
      data: response.data,
      status: response.status,
      message: 'Success',
    };
  } catch (error: any) {
    return {
      data: null,
      status: error.response?.status ?? 500,
      message: error.response?.data?.message ?? error.message,
    };
  }
};

// Generic DELETE
export const apiDelete = async <T>(
  url: string,
  config = {}
): Promise<ApiResponse<T>> => {
  try {
    const response = await axiosInstance.delete<T>(url, config);
    return {
      data: response.data,
      status: response.status,
      message: 'Success',
    };
  } catch (error: any) {
    return {
      data: null,
      status: error.response?.status ?? 500,
      message: error.response?.data?.message ?? error.message,
    };
  }
};
