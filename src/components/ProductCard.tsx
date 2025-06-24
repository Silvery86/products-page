import React from "react";
import type { Product } from "../types";

type ProductCardProps = {
    product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="bg-gray-500 border rounded-xl p-4 ">
            <div key={product.id} className="font-bold mb-2">
                <h2>{product.title}</h2>
                <p>{product.description}</p>
                <p>${product.price}</p>
            </div>
        </div>
    );
};

export default ProductCard;