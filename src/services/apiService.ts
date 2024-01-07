import axios, { AxiosResponse, AxiosError } from 'axios';

const API_BASE_URL = process.env.VUE_APP_API_BASE_URL; 

export const fetchDataFromApi = async <T>(endpoint: string, payload?: any): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios.get(`${API_BASE_URL}/${endpoint}`, {
      params: payload, // Pass payload as params
    });

    return response.data;
  } catch (error) {
    // Handle errors
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error - Status:', axiosError.response.status);
      console.error('API Error - Data:', axiosError.response.data);
    } else if (axiosError.request) {
      // The request was made but no response was received
      console.error('API Error - No Response:', axiosError.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('API Error - Message:', axiosError.message);
    }

    throw error;
  }
};

export const insertDataFromApi = async <T>(endpoint: string, payload?: any): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios.post(`${API_BASE_URL}/${endpoint}`, payload);
    return response.data;
  } catch (error) {
    // Handle errors
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error - Status:', axiosError.response.status);
      console.error('API Error - Data:', axiosError.response.data);
    } else if (axiosError.request) {
      // The request was made but no response was received
      console.error('API Error - No Response:', axiosError.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('API Error - Message:', axiosError.message);
    }

    throw error;
  }
};

export const fileUpload = async <T>(
  endpoint: string,
  payload?: FormData
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios.post(
      `${API_BASE_URL}/${endpoint}`,
      payload,
      {
        headers: {
          'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data
        },
      }
    );
    return response.data;
  } catch (error) {
    // Handle errors
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error - Status:', axiosError.response.status);
      console.error('API Error - Data:', axiosError.response.data);
    } else if (axiosError.request) {
      // The request was made but no response was received
      console.error('API Error - No Response:', axiosError.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('API Error - Message:', axiosError.message);
    }

    throw error;
  }
};
