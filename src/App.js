import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './components/navbar';
import Home from './pages/home';
import Categories from './pages/categories';
import Cart from './pages/cart';
import Checkout from './pages/checkout';
import NotFound from './pages/app/notFound';
import { commerce } from './lib/commerce';
import products from './services/products';
import cartServices from './services/cart';
import './App.css';
import checkoutServices from './services/checkout';

const App = () => {
  const [snacks, setSnacks] = useState([]);
  const [juices, setJuices] = useState([]);
  const [fishAndSeafood, setFishAndSeafood] = useState([]);
  const [shoppingCart, setShoppingCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

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
    const fetchedCart = await cartServices.add(productId, quantity);
    setShoppingCart(fetchedCart.cart);
  };

  const handleUpdateQuantity = async (productId, quantity) => {
    const updatedCart = await cartServices.update(productId, quantity);
    setShoppingCart(updatedCart.cart);
  };

  const handleRemoveCartItem = async (productId) => {
    const removed = await cartServices.remove(productId);
    setShoppingCart(removed.cart);
  };

  const handleEmptyCart = async () => {
    const emptied = await cartServices.empty();
    setShoppingCart(emptied.cart);
  };

  const fetchCart = async () => {
    const data = await cartServices.reteive();
    setShoppingCart(data);
  };

  const refreshCart = async () => {
    const newCart = await cartServices.refresh();
    setShoppingCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingNewOrder = await checkoutServices.capture(
        checkoutTokenId,
        newOrder
      );
      setOrder(incomingNewOrder);

      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
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
        <Route
          path="/checkout"
          element={
            <Checkout
              cart={shoppingCart}
              order={order}
              onCaptureCheckout={handleCaptureCheckout}
              error={errorMessage}
            />
          }
        />
        <Route path="/categories" element={<Categories />} />
        <Route
          path="/"
          exact
          element={
            <Home products={productsToPresent} onAddToCart={handleAddToCart} />
          }
        />
        <Route path="*" element={<Navigate to="/not-found" />} />
        <Route path="/not-found" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
