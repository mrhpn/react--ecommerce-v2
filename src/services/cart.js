import { commerce } from '../lib/commerce';

const add = async (productId, quantity) => {
  const product = await commerce.cart.add(productId, quantity);
  return product;
};

const reteive = async () => {
  const fetchedCart = await commerce.cart.retrieve();
  return fetchedCart;
};

const update = async (productId, quantity) => {
  const updatedCart = await commerce.cart.update(productId, { quantity });
  return updatedCart;
};

const cart = { add, reteive, update };

export default cart;
