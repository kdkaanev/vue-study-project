import axiosJD from '../config/axiosinstance';

const ENDPOINT = 'products/categories';

export async function getAllCategories() {
  try {
    const response = await axiosJD.get(`/${ENDPOINT}`);
    return response.data;
  }
  catch (error) {
    console.error('Error getting products', error);
    return [];
  }
}
