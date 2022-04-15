import React from 'react';
import carouselImg1 from '../assets/imgs/elan-cover.jpg';
import carouselImg2 from '../assets/imgs/coca-cola.jpg';
import carouselImg3 from '../assets/imgs/fresh-meats.jpg';

const Carousel = () => {
  return (
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
          <img src={carouselImg1} className="d-block w-100 rounded" alt="..." />
        </div>
        <div className="carousel-item">
          <img src={carouselImg2} className="d-block w-100 rounded" alt="..." />
        </div>
        <div className="carousel-item">
          <img src={carouselImg3} className="d-block w-100 rounded" alt="..." />
        </div>
      </div>
      <a
        className="carousel-control-prev"
        href="#carouselExampleCaptions"
        role="button"
        data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#carouselExampleCaptions"
        role="button"
        data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
};

export default Carousel;
