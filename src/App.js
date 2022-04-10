import React, { useState, useEffect } from 'react';
import products from './services/products';
import LoadingProducts from './components/loadingProducts';
import Carousel from './components/carousel';
import Footer from './components/footer';
import Products from './components/products';
import NavBar from './components/navbar';
import cart from './services/cart';
import './App.css';
import Cart from './pages/cart';

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

  console.log(shoppingCart);

  return (
    <div className="App">
      <NavBar totalItems={shoppingCart.total_items} />
      <Cart cart={shoppingCart} />
      <div>
        <div className="container">
          <Carousel />

          {/* Snacks */}
          <div className="mt-5 mb-5">
            <div className="d-flex justify-content-between">
              <h4 className="position-relative d-inline font-weight-bold mr-auto title__category-size">
                Snacks
              </h4>
              <span>
                <a href="#">View all</a>
              </span>
            </div>
            {snacks.length === 0 ? (
              <LoadingProducts />
            ) : (
              <Products items={snacks} onAddToCart={handleAddToCart} />
            )}
          </div>

          {/* Juice */}
          <div className="mt-5 mb-5">
            <div className="d-flex justify-content-between">
              <h4 className="font-weight-bold mr-auto title__category-size">
                Juice
              </h4>
              <span>
                <a href="#">View all</a>
              </span>
            </div>
            {juices.length === 0 ? (
              <LoadingProducts />
            ) : (
              <Products items={juices} onAddToCart={handleAddToCart} />
            )}
          </div>

          {/* Fish and Seafood */}
          <div className="mt-5 mb-5">
            <div className="d-flex justify-content-between">
              <h4 className="font-weight-bold mr-auto title__category-size">
                Fish and Seafood
              </h4>
              <span>
                <a href="#">View all</a>
              </span>
            </div>
            {fishAndSeafood.length === 0 ? (
              <LoadingProducts />
            ) : (
              <Products items={fishAndSeafood} onAddToCart={handleAddToCart} />
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
