import React from 'react';
import product1 from '../assets/imgs/1.jpg';

const Product = ({ id, name, price }) => {
  return (
    <div className="col-6 col-sm-4 col-md-2">
      <div className="card__product border-0 w-auto" key={id}>
        <img
          src={product1}
          className="card-img-top w__md-50 w__sm-50"
          alt="..."
        />
        <div className="text-center">
          <h6 className="title__item">{name}</h6>
          <span className="d-block text-success font-weight-bold">{price}</span>
          <a href="#" className="btn btn-sm mt-1 btn__add-to-cart">
            Add to cart
          </a>
        </div>
      </div>
    </div>
  );
};

export default Product;
