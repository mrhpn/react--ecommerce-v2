import { commerce } from '../lib/commerce';

const getCountries = async (checkoutTokenId) => {
  const response = await commerce.services.localeListShippingCountries(
    checkoutTokenId
  );
  return response;
};

const getSubdivisions = async (countryCode) => {
  const response = await commerce.services.localeListSubdivisions(countryCode);
  return response;
};

const shipping = { getCountries, getSubdivisions };

export default shipping;
