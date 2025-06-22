import axios from 'axios';

const BASE_URL = 'https://dummyjson.com'

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data.products;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    return null;
  }
};
