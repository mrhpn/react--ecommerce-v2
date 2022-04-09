import React from 'react';
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

const Home = () => {
  return (
    <div>
      <div className="container">
        <Carousel />

        <Products items={curryProducts} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
