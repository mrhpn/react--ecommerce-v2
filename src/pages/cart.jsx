import React from 'react';
import LoadingProducts from '../components/loadingProducts';
import CartItem from '../components/cartItem';

const Cart = ({ cart }) => {
  const isCartEmpty = cart.total_items === 0;

  const EmptyCart = () => <span>Empty cart. Keep Shopping!</span>;

  const CartProducts = () => {
    if (cart.line_items && cart.line_items.length > 0)
      return (
        <div className="row text-center mb-5">
          {cart.line_items.map((item) => (
            <CartItem item={item} />
          ))}
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
