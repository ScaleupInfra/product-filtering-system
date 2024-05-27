import React, { useState, useEffect } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState({ category: "", sortBy: "" });

  useEffect(() => {
    fetch("http://localhost:8000/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      });
  }, []);

  useEffect(() => {
    let filtered = products;

    if (filter.category) {
      filtered = filtered.filter((p) => p.category === filter.category);
    }

    if (filter.sortBy) {
      filtered = [...filtered].sort((a, b) => {
        if (filter.sortBy === "price_asc") {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });
    }

    setFilteredProducts(filtered);
  }, [filter, products]);

  const handleFilterChange = (e) => {
    setFilter({ ...filter, category: e.target.value });
  };

  const handleSortChange = (e) => {
    setFilter({ ...filter, sortBy: e.target.value });
  };

  return (
    <div>
      <select value={filter.category} onChange={handleFilterChange}>
        <option value="">All Categories</option>
        <option value="Electronics">Electronics</option>
        <option value="Clothing">Clothing</option>
      </select>
      <select value={filter.sortBy} onChange={handleSortChange}>
        <option value="">Sort By</option>
        <option value="price_asc">Price (Low to High)</option>
        <option value="price_desc">Price (High to Low)</option>
      </select>

      <ul>
        {filteredProducts?.map((product) => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
