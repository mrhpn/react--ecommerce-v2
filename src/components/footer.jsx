import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/icons/logo.svg';

const Footer = () => {
  return (
    <div className="footer border-top py-5 px-3 bg-dark pb-5">
      <div className="container pb-5 mb-3">
        <div className="d-inline">
          <img
            alt="logo"
            className="mr-2 d-block py-2"
            width="80px"
            height="80px"
            src={logo}
          />
          <Link className="navbar-brand py-0" to="/">
            <span className="h1 font-weight-bold text-primary">My Zay</span>
          </Link>
          <div className="">
            <span className="h5 text-white">Online Shopping Mail</span>
            <br />
            <span className="h5 text-white small">
              Phone: +959767682526, +959442264024
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
