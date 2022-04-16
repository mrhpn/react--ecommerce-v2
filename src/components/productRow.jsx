import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import LoadingProducts from './loadingProducts';
import Products from './products';

const ProductRow = ({ title, viewAllLink = '/', products, onAddToCart }) => {
  return (
    <div className="mt-5 mb-5">
      <div className="d-flex justify-content-between">
        <h4 className="position-relative d-inline font-weight-bold mr-auto title__category-size">
          {title}
        </h4>
        <span>
          <Link to={viewAllLink}>View all</Link>
        </span>
      </div>
      {products.length === 0 ? (
        <LoadingProducts />
      ) : (
        <Products items={products} onAddToCart={onAddToCart} />
      )}
      <p className="d-block d-md-none text-right text-secondary font-italic">
        <HiOutlineArrowNarrowLeft /> <small>Scroll left to view more</small>
      </p>
    </div>
  );
};

export default ProductRow;
