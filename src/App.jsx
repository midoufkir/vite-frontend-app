import React, { useState, useEffect } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Fetching products...');
    fetch('/api/items/products')
      .then((res) => {
        console.log('Response received:', res);
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        console.log('Data received:', data);
        setProducts(data.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleAddProduct = () => {
    fetch('/api/items/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price: parseFloat(price) }),
    }).then(() => window.location.reload());
  };

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {Array.isArray(products) && products.length > 0 ? (
          products.map((prod) => (
            <li key={prod.id}>{prod.name} - {prod.price} €</li>
          ))
        ) : (
          <li>Aucun produit disponible</li>
        )}
      </ul>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
      <button onClick={handleAddProduct}>Add Product</button>
    </div>
  );
}

export default App;