import React, { useEffect, useState } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '' });

  // Charger les produits au chargement de la page
  useEffect(() => {
    fetch('/api/items/products')
      .then(res => res.json())
      .then(data => setProducts(data.data))
      .catch(err => console.error('❌ Erreur chargement:', err));
  }, []);

  // Fonction pour ajouter un produit
  const handleAddProduct = (e) => {
    e.preventDefault();
    fetch('/api/items/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newProduct.name, price: parseInt(newProduct.price) })
    })
    .then(() => {
      alert('✅ Produit ajouté !');
      // Recharger la liste
      return fetch('/api/items/products')
        .then(res => res.json())
        .then(data => setProducts(data.data));
    })
    .catch(err => console.error('❌ Erreur ajout:', err));
  };

  return (
    <div style={{ padding: '30px' }}>
      <h1>📦 Liste des Produits</h1>
      <ul>
        {products.map(prod => (
          <li key={prod.id}>{prod.name} - {prod.price}€</li>
        ))}
      </ul>

      <h2>➕ Ajouter un produit</h2>
      <form onSubmit={handleAddProduct}>
        <input
          type="text"
          placeholder="Nom du produit"
          value={newProduct.name}
          onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Prix"
          value={newProduct.price}
          onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
          required
        />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default App;
