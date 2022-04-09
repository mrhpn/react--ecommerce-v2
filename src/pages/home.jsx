import React, { useState, useEffect } from 'react';
import { commerce } from '../lib/commerce';
import products from '../services/products';
import LoadingProducts from '../components/loadingProducts';
import Carousel from '../components/carousel';
import Footer from '../components/footer';
import Products from '../components/products';

const categoriesSlags = [
  'snacks',
  'juice',
  'meat-and-poultry',
  'fish-and-seafood',
  'grains-beans-and-nuts',
  'fruits',
  'vegetables',
];

const Home = () => {
  const [snacks, setSnacks] = useState([]);
  const [juices, setJuices] = useState([]);
  const [fishAndSeafood, setFishAndSeafood] = useState([]);

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

  useEffect(() => {
    getSancks();
    getJuices();
    getFishAndSeafood();
  }, []);

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
            <Products items={snacks} />
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
            <Products items={juices} />
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
            <Products items={fishAndSeafood} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
