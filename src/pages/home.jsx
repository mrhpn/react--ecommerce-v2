import React from 'react';
import LoadingProducts from '../components/loadingProducts';
import Carousel from '../components/carousel';
import Footer from '../components/footer';
import Products from '../components/products';

const Home = ({ products, onAddToCart }) => {
  const { snacks, juices, fishAndSeafood } = products;

  return (
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
            <Products items={snacks} onAddToCart={onAddToCart} />
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
            <Products items={juices} onAddToCart={onAddToCart} />
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
            <Products items={fishAndSeafood} onAddToCart={onAddToCart} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
