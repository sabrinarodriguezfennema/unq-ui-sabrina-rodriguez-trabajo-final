import axios from 'axios';

const API_URL = 'https://word-api-hmlg.vercel.app';

export interface ValidateWordResponse {
  exists: boolean;
}

export const validarPalabra = async (word: string): Promise<ValidateWordResponse> => {
  try {
    const response = await axios.get<ValidateWordResponse>(`${API_URL}/api/validate`, {
      params: { word },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching word validation:', error);
    throw error;
  }
};