import { commerce } from '../lib/commerce';

const generateToken = async (cartId) => {
  const token = await commerce.checkout.generateToken(cartId, {
    type: 'cart',
  });
  return token;
};

const checkout = { generateToken };

export default checkout;
