import { commerce } from '../lib/commerce';

const generateToken = async (cartId) => {
  const token = await commerce.checkout.generateToken(cartId, {
    type: 'cart',
  });
  return token;
};

const getShippingOptions = async (checkoutTokenId, country, region = null) => {
  const options = await commerce.checkout.getShippingOptions(checkoutTokenId, {
    country,
    region,
  });
  return options;
};

const checkout = { generateToken, getShippingOptions };

export default checkout;
