import React, { useState, useEffect } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    fetch('/api/items/products')
      .then((res) => res.json())
      .then((data) => setProducts(data.data || []));
  }, []);

  const handleAddProduct = () => {
    fetch('/api/items/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price: parseFloat(price) }),
    }).then(() => window.location.reload());
  };

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((prod) => (
          <li key={prod.id}>{prod.name} - {prod.price} €</li>
        ))}
      </ul>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
      <button onClick={handleAddProduct}>Add Product</button>
    </div>
  );
}

export default App;
