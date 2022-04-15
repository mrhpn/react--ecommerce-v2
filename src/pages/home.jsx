import React from 'react';
import { Link } from 'react-router-dom';
import LoadingProducts from '../components/loadingProducts';
import Carousel from '../components/carousel';
import Footer from '../components/footer';
import Products from '../components/products';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';

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
              <Link to="/">View all</Link>
            </span>
          </div>
          {snacks.length === 0 ? (
            <LoadingProducts />
          ) : (
            <Products items={snacks} onAddToCart={onAddToCart} />
          )}
          <p className="d-block d-sm-none text-right text-secondary font-italic">
            <HiOutlineArrowNarrowLeft /> <small>Scroll left to view more</small>
          </p>
        </div>

        {/* Juice */}
        <div className="mt-5 mb-5">
          <div className="d-flex justify-content-between">
            <h4 className="font-weight-bold mr-auto title__category-size">
              Juice
            </h4>
            <span>
              <Link to="/">View all</Link>
            </span>
          </div>
          {juices.length === 0 ? (
            <LoadingProducts />
          ) : (
            <Products items={juices} onAddToCart={onAddToCart} />
          )}
          <p className="d-block d-sm-none text-right text-secondary font-italic">
            <HiOutlineArrowNarrowLeft /> <small>Scroll left to view more</small>
          </p>
        </div>

        {/* Fish and Seafood */}
        <div className="mt-5 mb-5">
          <div className="d-flex justify-content-between">
            <h4 className="font-weight-bold mr-auto title__category-size">
              Fish and Seafood
            </h4>
            <span>
              <Link to="/">View all</Link>
            </span>
          </div>
          {fishAndSeafood.length === 0 ? (
            <LoadingProducts />
          ) : (
            <Products items={fishAndSeafood} onAddToCart={onAddToCart} />
          )}
          <p className="d-block d-sm-none text-right text-secondary font-italic">
            <HiOutlineArrowNarrowLeft /> <small>Scroll left to view more</small>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
