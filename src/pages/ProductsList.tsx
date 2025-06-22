import React from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}

interface ProductsListProps {
  products: Product[];  
}
const ProductsList : React.FC<ProductsListProps> = ({products}) => {
    return (
        <section>
                {products.length === 0 
                ? (<h1> Loading products ....</h1>)
                : (products.map((product) => (
                    <div className="font-bold mb-2" key={product.id}>
                       {product.title}
                    </div>
                )))}
            
        </section>
    )
}

export default ProductsList;