import axiosJD from '../config/axiosinstance';

const ENDPOINT = 'products';

export async function getAllProducts() {
  try {
    const response = await axiosJD.get(`/${ENDPOINT}`);
    return response.data.products;
  }
  catch (error) {
    console.error('Error getting products', error);
    return [];
  }
}

export async function getProductsByCategory(categorySlug) {
  try {
    const response = await axiosJD.get(`/${ENDPOINT}/category/${categorySlug}`);
    return response.data.products;
  }
  catch (error) {
    console.error('Error getting products', error);
    return [];
  }
}
