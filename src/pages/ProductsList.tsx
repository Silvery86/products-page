import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types";

interface ProductsListProps {
  products: Product[];
}

const ProductsList: React.FC<ProductsListProps> = ({ products }) => {

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(100);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 10;

  const [sortBy, setSortBy] = useState<string>("");

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice =
      product.price >= minPrice && product.price <= maxPrice;
    return matchesSearch && matchesPrice;
  });

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortBy === "priceAsc") {
      return a.price - b.price;
    } else if (sortBy === "priceDesc") {
      return b.price - a.price;
    } else if (sortBy === "alphabetAsc") {
      return a.title.localeCompare(b.title);
    } else if (sortBy === "alphabetDesc") {
      return b.title.localeCompare(a.title);
    }
    return 0;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section>
      <div className="filters mb-4">
        <div>
          <label>Search by Name:</label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border"
            placeholder="Search for a product"
          />
        </div>
        <div className="mt-2">
          <label>Min Price:</label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="p-2 border"
            placeholder="Min price"
          />
        </div>
        <div className="mt-2">
          <label>Max Price:</label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="p-2 border"
            placeholder="Max price"
          />
        </div>
      </div>
      <hr></hr>
      <div className="sorting mb-4">
        <label>Sort By:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 border"
        >
          <option value="">Select</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="alphabetAsc">Alphabet: A to Z</option>
          <option value="alphabetDesc">Alphabet: Z to A</option>
        </select>
      </div>
      <hr></hr>
      {currentProducts.length === 0 ? (
        <h1>No products available...</h1>
      ) : (
        currentProducts.map((product) => (
          <ProductCard product={product} />
        ))
      )}
    <div className="pagination mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 m-1 bg-gray-300"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`p-2 m-1 ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 m-1 bg-gray-300"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default ProductsList;
