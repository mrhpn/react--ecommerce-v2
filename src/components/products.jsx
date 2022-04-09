import React from 'react';
import Product from './product';

const Products = ({ items }) => {
  return (
    <div className="mt-5 mb-5">
      <div className="d-flex justify-content-between">
        <h4 className="font-weight-bold mr-auto title__category-size">
          {items[0].catName}
        </h4>
        <span>
          <a href="#">အားလုံးကြည့်မယ်</a>
        </span>
      </div>

      <div className="container container__hr-scrollable">
        <div className="row text-center">
          {items.map((item) => {
            return (
              <Product
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Products;
