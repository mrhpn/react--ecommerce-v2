import React from 'react';
import Product from './product';

const Products = ({ items }) => {
  return (
    <div className="container container__hr-scrollable">
      <div className="row text-center">
        {items.map((item) => {
          return (
            <Product
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price.formatted_with_symbol}
              imgUrl={item.image.url}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Products;
