import { commerce } from '../lib/commerce';

const generateToken = async (cartId) => {
  if (cartId) {
    const token = await commerce.checkout.generateToken(cartId, {
      type: 'cart',
    });
    return token;
  }
};

const getShippingOptions = async (checkoutTokenId, country, region = null) => {
  const options = await commerce.checkout.getShippingOptions(checkoutTokenId, {
    country,
    region,
  });
  return options;
};

const capture = async (checkoutTokenId, order) => {
  const newOrder = await commerce.checkout.capture(checkoutTokenId, order);
  return newOrder;
};

const checkoutServices = { generateToken, getShippingOptions, capture };

export default checkoutServices;
