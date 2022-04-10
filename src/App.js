import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import products from './services/products';
import NavBar from './components/navbar';
import cart from './services/cart';
import './App.css';
import Cart from './pages/cart';
import Home from './pages/home';

const App = () => {
  const [snacks, setSnacks] = useState([]);
  const [juices, setJuices] = useState([]);
  const [fishAndSeafood, setFishAndSeafood] = useState([]);
  const [shoppingCart, setShoppingCart] = useState({});

  const getSancks = async () => {
    const data = await products.getByCategory('snacks');
    setSnacks(data);
  };

  const getJuices = async () => {
    const data = await products.getByCategory('juice');
    setJuices(data);
  };

  const getFishAndSeafood = async () => {
    const data = await products.getByCategory('fish-and-seafood');
    setFishAndSeafood(data);
  };

  const handleAddToCart = async (productId, quantity) =>
    setShoppingCart(await cart.add(productId, quantity));

  const fetchCart = async () => setShoppingCart(await cart.reteive());

  useEffect(() => {
    getSancks();
    getJuices();
    getFishAndSeafood();
    fetchCart();
  }, []);

  const productsToPresent = { snacks, juices, fishAndSeafood };

  return (
    <div className="App">
      <NavBar totalItems={shoppingCart.total_items} />

      <Cart cart={shoppingCart} />

      {/* Home */}
      <Home products={productsToPresent} onAddToCart={handleAddToCart} />
    </div>
  );
};

export default App;
