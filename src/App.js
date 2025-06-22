import './App.css';
import Header from './pages/Header';
import ProductsList from './pages/ProductsList';
import Footer from './pages/Footer';
import { useEffect, useState } from 'react';
import { fetchProducts } from './utils/api';

function App() {
const [products, setProducts] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }else{
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
      localStorage.setItem('products',JSON.stringify(fetchedProducts));
    }
  };
  fetchData();
},[])

  return (
    <div className="App">
      <Header/>

      <main>
        <ProductsList/>
      </main>

      <Footer/>
    </div>
  );
}

export default App;
