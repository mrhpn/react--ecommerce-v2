import React from 'react';
import logo from '../assets/icons/logo.svg';
import carouselImg1 from '../assets/imgs/coca-cola.jpg';
import carouselImg2 from '../assets/imgs/elan-cover.jpg';
import carouselImg3 from '../assets/imgs/fresh-meats.jpg';
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
        <div
          id="carouselExampleCaptions"
          className="carousel slide mx-auto mt-3"
          data-ride="carousel">
          <ol className="carousel-indicators">
            <li
              data-target="#carouselExampleCaptions"
              data-slide-to="0"
              className="active"></li>
            <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
            <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src={carouselImg1}
                className="d-block w-100 rounded"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src={carouselImg2}
                className="d-block w-100 rounded"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src={carouselImg3}
                className="d-block w-100 rounded"
                alt="..."
              />
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleCaptions"
            role="button"
            data-slide="prev">
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleCaptions"
            role="button"
            data-slide="next">
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>

        <Products items={curryProducts} />
      </div>
      <div className="footer border-top py-5 px-3 bg-dark d-none d-sm-block">
        <div className="container">
          <div className="d-inline">
            <img
              className="mr-2 d-block py-2"
              width="80px"
              height="80px"
              src={logo}
            />
            <a className="navbar-brand py-0" href="#">
              <span className="h1 font-weight-bold text-danger">အဝယ်တော်</span>
            </a>
            <div className="">
              <span className="h5 text-white">Online Shopping Mail</span>
              <br />
              <span className="h5 text-white small">
                Phone: +959767682526, +959442264024
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
