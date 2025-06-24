import './App.css';
import Header from './pages/Header';
import ProductsList from './pages/ProductsList';
import Footer from './pages/Footer';
import { useEffect, useState } from 'react';
import { fetchProducts } from './utils/api';
import './index.css';
import type { Product } from './types'

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const storedProducts = localStorage.getItem('products');
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      } else {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
        localStorage.setItem('products', JSON.stringify(fetchedProducts));
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <main>
        <ProductsList products={products} />
      </main>
      <Footer />
    </>
  );
};

export default App;

