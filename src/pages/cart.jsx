import React from 'react';
import { Link } from 'react-router-dom';
import LoadingProducts from '../components/loadingProducts';
import CartItem from '../components/cartItem';

const Cart = ({ cart, cartActions, cartItemActions }) => {
  const { handleEmptyCart } = cartActions;
  const isCartEmpty = cart.total_items === 0;

  const EmptyCart = () => <span>Empty cart. Keep Shopping!</span>;

  const CartProducts = () => {
    if (cart.line_items && cart.line_items.length > 0)
      return (
        <div className="my-5">
          <div className="d-flex justify-content-between mt-3">
            <h5>
              <small>Subtotal:</small>{' '}
              <span className="text-success">
                {cart.subtotal.formatted_with_symbol}
              </span>{' '}
            </h5>
            <div>
              <button
                onClick={() => handleEmptyCart()}
                className="btn btn-sm btn-danger mr-2">
                Empty Cart
              </button>
              <Link to="/checkout">
                <button className="btn btn-sm btn-primary">Checkout</button>
              </Link>
            </div>
          </div>
          <div
            className="row text-center mt-3 mb-5"
            style={{ paddingBottom: '3rem' }}>
            {cart.line_items.map((item, index) => (
              <CartItem
                key={index}
                item={item}
                cartItemActions={cartItemActions}
              />
            ))}
          </div>
        </div>
      );
    else return <LoadingProducts />;
  };

  return (
    <>
      <div>
        <div className="container">
          <h3 className="mt-3 mb-3">Shopping Cart</h3>

          {isCartEmpty ? <EmptyCart /> : <CartProducts />}
        </div>
      </div>
    </>
  );
};

export default Cart;
