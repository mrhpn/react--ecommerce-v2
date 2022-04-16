import { commerce } from '../lib/commerce';

const getByCategory = async (category) => {
  const response = await commerce.products.list({
    category_slug: [category],
    limit: 6,
  });

  return response.data;
};

const getDoublesByCategory = async (category) => {
  const response = await commerce.products.list({
    category_slug: [category],
    limit: 12,
  });

  return response.data;
};

const products = { getByCategory, getDoublesByCategory };

export default products;
