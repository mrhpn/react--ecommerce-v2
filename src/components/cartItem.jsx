import React from 'react';

const CartItem = ({ item, cartItemActions }) => {
  const { handleUpdateQuantity } = cartItemActions;

  return (
    <div className="col-6 col-sm-4 col-md-2">
      <div className="card__product border-0 w-auto mt-2" key={item.id}>
        <img src={item.image.url} className="card-img-top" alt={item.name} />
        <div className="text-center">
          <h6 className="title__item mt-2">{item.name}</h6>
          <span className="d-block text-success font-weight-bold">
            {item.price.formatted_with_symbol}
          </span>
          <div className="d-flex justify-content-around align-items-center mt-2">
            <div className="d-flex justify-content-around align-items-center">
              <button
                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                className="btn-quantity-control mr-2">
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                className="btn-quantity-control ml-2">
                +
              </button>
            </div>
            <button className="badge badge-danger border-0">remove</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
