import axios from 'axios';

const API_KEY = '36831131-bfb1c5890fc73f15a7de29d05';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchPhotos = async (searchImage, page) => {
  const params = {
    key: API_KEY,
    q: searchImage,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 15,
    page: page,
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    throw new Error('Sorry, there are no images matching your search query. Please try again!');
  }
};
