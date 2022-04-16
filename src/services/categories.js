import { commerce } from '../lib/commerce';

const get = async () => {
  const response = await commerce.categories.list();

  return response.data;
};

const categoryService = { get };

export default categoryService;
