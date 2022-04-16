import React from 'react';
import { useParams } from 'react-router-dom';
import Product from './product';

const Products = ({ items, slugs = [], onAddToCart }) => {
  const { category } = useParams();

  let isScrollable = slugs.includes(category) ? '' : 'container__hr-scrollable';

  return (
    <div className={`container ${isScrollable}`}>
      <div className="row text-center">
        {items.map((item) => {
          return (
            <Product
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price.formatted_with_symbol}
              imgUrl={item.image.url}
              onAddToCart={onAddToCart}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Products;
