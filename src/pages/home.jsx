import React from 'react';
import Carousel from '../components/carousel';
import Footer from '../components/footer';
import ProductRow from '../components/productRow';

const Home = ({ slugs, products, onAddToCart }) => {
  const { snacks, juices, fishAndSeafood } = products;

  return (
    <div>
      <div className="container">
        <Carousel />

        {/* Snacks */}
        <ProductRow
          title="Snacks"
          viewAllLink={`/products/${slugs[0]}`}
          products={snacks}
          onAddToCart={onAddToCart}
        />

        {/* Juice */}
        <ProductRow
          title="Juices"
          viewAllLink={`/products/${slugs[1]}`}
          products={juices}
          onAddToCart={onAddToCart}
        />

        {/* Fish and Seafood */}
        <ProductRow
          title="Fish and Seafood"
          viewAllLink={`/products/${slugs[2]}`}
          products={fishAndSeafood}
          onAddToCart={onAddToCart}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
