import axios from 'axios';

const BASE_URL = 'https://dummyjson.com';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}

// Function to fetch all products
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get<{ products: Product[] }>(`${BASE_URL}/products`);
    return response.data.products;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

// Function to fetch a single product by ID
export const fetchProductById = async (id: number): Promise<Product | null> => {
  try {
    const response = await axios.get<Product>(`${BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    return null;
  }
};
