import axios from 'axios';

const API_URL = 'https://pixabay.com/api/';
const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

export const searchImages = async (query, page = 1) => {
  try {
    const { data } = await axios.get(API_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        safesearch: true,
        per_page: 20,
        page,
      },
    });
    return data;
  } catch (error) {
    throw error?.response?.data?.message || 'Failed to fetch images.';
  }
};
