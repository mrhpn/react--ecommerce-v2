import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { slugToTitle } from '../utils/slugToTitle';
import Products from '../components/products';
import LoadingProducts from '../components/loadingProducts';
import products from '../services/products';

const ProductsPage = ({ slugs, onAddToCart }) => {
  const { category } = useParams();
  const [fetchedProducts, setFetchedProducts] = useState([]);

  if (!slugs.includes(category)) {
    const navigate = useNavigate();
    navigate('/not-found');
  }

  useEffect(() => {
    const getProducts = async () => {
      const data = await products.getDoublesByCategory(category);
      setFetchedProducts(data);
    };

    getProducts();
  }, [category]);

  return (
    <>
      <div className="container">
        <div className="mt-5 mb-5">
          <div className="d-flex justify-content-between">
            <h4 className="position-relative d-inline font-weight-bold mr-auto title__category-size">
              {slugToTitle(category)}
            </h4>
          </div>
          {fetchedProducts.length === 0 ? (
            <LoadingProducts />
          ) : (
            <Products
              items={fetchedProducts}
              slugs={slugs}
              onAddToCart={onAddToCart}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
