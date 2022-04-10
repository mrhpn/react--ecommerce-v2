import React, { useState, useEffect } from 'react';
import Home from './pages/home';
import NavBar from './components/navbar';
import cart from './services/cart';
import './App.css';

const App = () => {
  const [shoppingCart, setShoppingCart] = useState({});

  const handleAddToCart = async (productId, quantity) =>
    setShoppingCart(await cart.add(productId, quantity));

  const fetchCart = async () => setShoppingCart(await cart.reteive());

  useEffect(() => {
    fetchCart();
  }, [shoppingCart]);

  return (
    <div className="App">
      <NavBar totalItems={shoppingCart.total_items} />
      <Home onAddToCart={handleAddToCart} />
    </div>
  );
};

export default App;
