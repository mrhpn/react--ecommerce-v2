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

const remove = async (productId) => {
  const removed = await commerce.cart.remove(productId);
  return removed;
};

const cart = { add, reteive, update, remove };

export default cart;
