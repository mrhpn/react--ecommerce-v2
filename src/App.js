import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import products from './services/products';
import NavBar from './components/navbar';
import cart from './services/cart';
import './App.css';
import Cart from './pages/cart';
import Home from './pages/home';
import Categories from './pages/categories';
import Checkout from './pages/checkout';

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

  const handleAddToCart = async (productId, quantity) => {
    const fetchedCart = await cart.add(productId, quantity);
    setShoppingCart(fetchedCart.cart);
  };

  const handleUpdateQuantity = async (productId, quantity) => {
    const updatedCart = await cart.update(productId, quantity);
    setShoppingCart(updatedCart.cart);
  };

  const handleRemoveCartItem = async (productId) => {
    const removed = await cart.remove(productId);
    setShoppingCart(removed.cart);
  };

  const handleEmptyCart = async () => {
    const emptied = await cart.empty();
    setShoppingCart(emptied.cart);
  };

  const fetchCart = async () => {
    const data = await cart.reteive();
    setShoppingCart(data);
  };

  useEffect(() => {
    getSancks();
    getJuices();
    getFishAndSeafood();
    fetchCart();
  }, []);

  const productsToPresent = { snacks, juices, fishAndSeafood };
  const cartActions = { handleEmptyCart };
  const cartItemActions = { handleUpdateQuantity, handleRemoveCartItem };

  return (
    <div className="App">
      <NavBar totalItems={shoppingCart.total_items} />

      <Routes>
        <Route
          path="/cart"
          element={
            <Cart
              cart={shoppingCart}
              cartActions={cartActions}
              cartItemActions={cartItemActions}
            />
          }
        />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/categories" element={<Categories />} />
        <Route
          path="/"
          element={
            <Home products={productsToPresent} onAddToCart={handleAddToCart} />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
