import React from 'react';
import notFound from '../../assets/icons/notFound.png';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container mx-auto">
      <img src={notFound} alt="not-found" className="mb-5" />
      <span className="mb-3 text-danger">Oops!</span>
      <span className="mx-3 ">Page Not Found</span>
      <Link to="/">
        <button className="btn btn-info">Go to Home</button>
      </Link>
    </div>
  );
};

export default NotFound;
