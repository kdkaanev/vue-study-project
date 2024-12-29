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

export async function getProductsByIds(ids) {
  if (!Array.isArray(ids))
    return;

  try {
    const promises = ids.map(id => axiosJD.get(`/${ENDPOINT}/${id}`));
    const response = await Promise.allSettled(promises);
    return response
      .filter(entry => entry.status === 'fulfilled')
      .map(entry => entry.value.data);
  }
  catch (error) {
    console.error('Error getting products', error);
    return [];
  }
}
