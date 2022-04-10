import React from 'react';

const Product = ({ id, name, price, imgUrl, onAddToCart }) => {
  return (
    <div className="col-6 col-sm-4 col-md-2">
      <div className="card__product border-0 w-auto mt-2" key={id}>
        <img src={imgUrl} className="card-img-top" alt="..." />
        <div className="text-center">
          <h6 className="title__item mt-2">{name}</h6>
          <span className="d-block text-success font-weight-bold">{price}</span>
          <button
            onClick={() => onAddToCart(id, 1)}
            className="btn btn-sm mt-1 btn__add-to-cart">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
