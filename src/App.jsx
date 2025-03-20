import React, { useState, useEffect } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupère la liste des produits
  useEffect(() => {
    fetch('/api/items/products')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        setProducts(data.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Ajoute un nouveau produit
  const handleAddProduct = () => {
    fetch('/api/items/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price: parseFloat(price) }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        // Rafraîchit la liste des produits après l'ajout
        setProducts([...products, data.data]);
        setName('');
        setPrice('');
      })
      .catch((error) => {
        console.error('Error adding product:', error);
        setError(error.message);
      });
  };

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  return (
    <div>
      <h1>Liste des produits</h1>
      <ul>
        {Array.isArray(products) && products.length > 0 ? (
          products.map((prod) => (
            <li key={prod.id}>
              {prod.name} - {prod.price} €
            </li>
          ))
        ) : (
          <li>Aucun produit disponible</li>
        )}
      </ul>

      <h2>Ajouter un nouveau produit</h2>
      <div>
        <input
          type="text"
          placeholder="Nom du produit"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Prix"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button onClick={handleAddProduct}>Ajouter</button>
      </div>
    </div>
  );
}

export default App;