import React, { useState, useEffect } from 'react';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/items/products')
      .then(res => res.json())
      .then(data => setProducts(data.data))
      .catch(err => console.error('Erreur:', err));
  }, []);

  return (
    <div>
      <h1>Liste des Produits</h1>
      <ul>
        {products.map(p => (
          <li key={p.id}>{p.name} - {p.price}€</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
