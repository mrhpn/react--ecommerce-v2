import React from 'react';
import Carousel from '../components/carousel';
import Footer from '../components/footer';
import ProductRow from '../components/productRow';

const Home = ({ products, onAddToCart }) => {
  const { snacks, juices, fishAndSeafood } = products;

  return (
    <div>
      <div className="container">
        <Carousel />

        {/* Snacks */}
        <ProductRow
          title="Snacks"
          viewAllLink="/"
          products={snacks}
          onAddToCart={onAddToCart}
        />

        {/* Juice */}
        <ProductRow
          title="Juices"
          viewAllLink="/"
          products={juices}
          onAddToCart={onAddToCart}
        />

        {/* Fish and Seafood */}
        <ProductRow
          title="Fish and Seafood"
          viewAllLink="/"
          products={fishAndSeafood}
          onAddToCart={onAddToCart}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
