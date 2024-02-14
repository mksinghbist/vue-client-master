import axios, { AxiosResponse, AxiosError } from 'axios';

const API_BASE_URL = process.env.VUE_APP_API_BASE_URL; 
const setHeader = () => {
  const userInfoString = localStorage.getItem('userInfo');
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
  const accessToken = userInfo?.token || '';
  // Set the default headers for all Axios requests
  axios.defaults.headers.common['Authorization'] = accessToken;
}

export const updateUserCart = async <T>(endpoint: string, payload?: any): Promise<{ data: T | null, error: any }> => {
  try {
      setHeader();
      const response: AxiosResponse<T> = await axios.post(`${API_BASE_URL}/${endpoint}`, payload);
      return { data: response.data, error: null };
  } catch (error) {
      // Handle errors
      const axiosError = error as AxiosError;
      return { data: null, error: axiosError };
  }
};

export const getCustomerCart = async <T>(endpoint: string, payload?: any): Promise<{ data: T | null, error: AxiosError | null }> => {
  try {
    setHeader();
    const response: AxiosResponse<T> = await axios.get(`${API_BASE_URL}/${endpoint}`, {
      params: payload, // Pass payload as params
    });
    return { data: response.data, error: null };
  } catch (error) {
    // Handle errors
    const axiosError = error as AxiosError;
    return { data: null, error: axiosError };
  }
}
