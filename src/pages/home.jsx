import React, { useState, useEffect } from 'react';
import { commerce } from '../lib/commerce';
import Carousel from '../components/carousel';
import Footer from '../components/footer';
import Products from '../components/products';

const curryProducts = [
  {
    id: 1,
    name: 'ကြက်သွန်ဖြူကြီးကြီး',
    price: '300',
    catName: 'အဓိကဟင်းချက်ပစ္စည်းများ',
  },
  {
    id: 2,
    name: 'ကြက်သွန်ဖြူကြီးကြီး',
    price: '300',
    catName: 'အဓိကဟင်းချက်ပစ္စည်းများ',
  },
  {
    id: 3,
    name: 'ကြက်သွန်ဖြူကြီးကြီး',
    price: '300',
    catName: 'အဓိကဟင်းချက်ပစ္စည်းများ',
  },
  {
    id: 4,
    name: 'ကြက်သွန်ဖြူကြီးကြီး',
    price: '300',
    catName: 'အဓိကဟင်းချက်ပစ္စည်းများ',
  },
  {
    id: 5,
    name: 'ကြက်သွန်ဖြူကြီးကြီး',
    price: '300',
    catName: 'အဓိကဟင်းချက်ပစ္စည်းများ',
  },
  {
    id: 6,
    name: 'ကြက်သွန်ဖြူကြီးကြီး',
    price: '300',
    catName: 'အဓိကဟင်းချက်ပစ္စည်းများ',
  },
];

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
    const { data } = await commerce.products.list({
      category_slug: ['snacks'],
      limit: 6,
    });
    setSnacks(data);
  };

  const getJuices = async () => {
    const { data } = await commerce.products.list({
      category_slug: ['juice'],
      limit: 6,
    });
    setJuices(data);
  };

  const getFishAndSeafood = async () => {
    const { data } = await commerce.products.list({
      category_slug: ['fish-and-seafood'],
      limit: 6,
    });
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
            <h4 className="font-weight-bold mr-auto title__category-size">
              Snacks
            </h4>
            <span>
              <a href="#">အားလုံးကြည့်မယ်</a>
            </span>
          </div>

          <Products items={snacks} />
        </div>

        {/* Juice */}
        <div className="mt-5 mb-5">
          <div className="d-flex justify-content-between">
            <h4 className="font-weight-bold mr-auto title__category-size">
              Juice
            </h4>
            <span>
              <a href="#">အားလုံးကြည့်မယ်</a>
            </span>
          </div>

          <Products items={juices} />
        </div>

        {/* Fish and Seafood */}
        <div className="mt-5 mb-5">
          <div className="d-flex justify-content-between">
            <h4 className="font-weight-bold mr-auto title__category-size">
              Fish and Seafood
            </h4>
            <span>
              <a href="#">အားလုံးကြည့်မယ်</a>
            </span>
          </div>

          <Products items={fishAndSeafood} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
