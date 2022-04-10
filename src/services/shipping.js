import { commerce } from '../lib/commerce';

const getCountries = async (checkoutTokenId) => {
  const response = await commerce.services.localeListShippingCountries(
    checkoutTokenId
  );
  return response;
};

const shipping = { getCountries };

export default shipping;
