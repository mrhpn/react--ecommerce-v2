import { commerce } from '../lib/commerce';

const add = async (productId, quantity) => {
  const product = await commerce.cart.add(productId, quantity);
  return product;
};

const reteive = async () => {
  const fetchedCart = await commerce.cart.retrieve();
  return fetchedCart;
};

const cart = { add, reteive };

export default cart;
