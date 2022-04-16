import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './components/navbar';
import Home from './pages/home';
import Categories from './pages/categories';
import Cart from './pages/cart';
import Checkout from './pages/checkout';
import NotFound from './pages/app/notFound';
import ProductsPage from './pages/productsPage';
import products from './services/products';
import cartServices from './services/cart';
import checkoutServices from './services/checkout';
import './App.css';

const slugs = ['snacks', 'juice', 'fish-and-seafood'];

const App = () => {
  const [snacks, setSnacks] = useState([]);
  const [juices, setJuices] = useState([]);
  const [fishAndSeafood, setFishAndSeafood] = useState([]);
  const [shoppingCart, setShoppingCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const getSancks = async () => {
    const data = await products.getByCategory(slugs[0]);
    setSnacks(data);
  };

  const getJuices = async () => {
    const data = await products.getByCategory(slugs[1]);
    setJuices(data);
  };

  const getFishAndSeafood = async () => {
    const data = await products.getByCategory(slugs[2]);
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
            <Home
              slugs={slugs}
              products={productsToPresent}
              onAddToCart={handleAddToCart}
            />
          }
        />
        <Route
          path="/products/:category"
          exact
          element={<ProductsPage slugs={slugs} onAddToCart={handleAddToCart} />}
        />
        <Route path="*" element={<Navigate to="/not-found" />} />
        <Route path="/not-found" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
