import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { HiOutlineSearch } from 'react-icons/hi';
import { FiHome, FiGrid, FiShoppingCart, FiUser } from 'react-icons/fi';
import logo from '../assets/icons/logo.svg';
import shoppingCart from '../assets/icons/shopping-cart.svg';
import categoryService from '../services/categories';

const NavBar = ({ totalItems }) => {
  const [isCategoryDropdownVisible, setCategoryDropdownVisible] = useState(
    false
  );
  const [categoryDropdown] = useState(false);
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const data = await categoryService.get();
    setCategories(data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <React.Fragment>
      <div className="bg-dark text-white text-right pr-3 py-1 d-none d-md-block">
        <span className="mr-3">Phone: +959767682526, +959442264024</span>
        <Link to="/" className="mr-2 link-blue">
          About Us
        </Link>
        <Link to="/" className="link-blue">
          Contact Us
        </Link>
      </div>

      <nav className="navbar navbar-expand-lg sticky-top navbar-light bg-glass border-bottom shadow-sm">
        <div className="container-fluid">
          <div className="d-flex mr-3">
            <img
              className="mr-2"
              width="40px"
              height="40px"
              src={logo}
              alt="logo"
            />
            <Link className="text-primary font-lg font-weight-bold" to="/">
              <h3>
                <b>My Zay</b>
              </h3>
            </Link>
          </div>
          <form className="d-inline-flex d-lg-none input-group-sm">
            <input
              className="form-control font-weight-bold mr-1"
              type="search"
              placeholder="Search..."
            />
            <button
              className="btn btn-danger align-top btn-sm font-weight-bold"
              type="submit">
              <HiOutlineSearch />
            </button>
          </form>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="nav navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/categories"
                  onMouseEnter={() => setCategoryDropdownVisible(true)}
                  onMouseLeave={() => setCategoryDropdownVisible(false)}
                  className="nav-link position-relative">
                  Categories
                </NavLink>
                <div
                  id="list_group_kinds"
                  onMouseEnter={() => setCategoryDropdownVisible(true)}
                  onMouseLeave={() => setCategoryDropdownVisible(false)}
                  className={`${
                    isCategoryDropdownVisible || categoryDropdown
                      ? 'd-block'
                      : 'd-none'
                  }`}>
                  <ul className="list-group list-group-flush position-absolute shadow-lg">
                    {categories.map((category) => {
                      return (
                        <Link
                          key={category.name}
                          to={`/products/${category.slug}`}>
                          <li
                            key={category.name}
                            className="list-group-item list-group-item-action">
                            {category.name}
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                </div>
              </li>
              <form className="form-inline ml-3 my-lg-0 input-group-sm">
                <input
                  className="form-control mr-sm-2 font-weight-bold"
                  type="search"
                  placeholder="Search..."
                />
                <button
                  className="btn btn-primary my-sm-0 btn-sm font-weight-bold"
                  type="submit">
                  Search
                </button>
              </form>
            </ul>
            <Link to="/cart">
              <button className="btn bg-transparent position-relative">
                <img src={shoppingCart} alt="..." />
                <span className="badge badge-pill badge-danger mr-4 position-absolute">
                  {totalItems}
                </span>
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="d-md-block d-lg-none">
        <nav className="navbar fixed-bottom bg-glass navbar-light border-top shadow-sm justify-content-between">
          <NavLink to="/" className="nav-link text-center">
            <FiHome />
            <span className="d-block">Home</span>
          </NavLink>
          <NavLink to="/categories" className="nav-link text-center">
            <FiGrid />
            <span className="d-block">Categories</span>
          </NavLink>
          <NavLink to="/cart" className="nav-link text-center">
            <FiShoppingCart />
            <span className="badge badge-pill badge-danger position-absolute">
              {totalItems}
            </span>

            <span className="d-block">Cart</span>
          </NavLink>
          <NavLink to="/account" className="nav-link text-center">
            <FiUser />
            <span className="d-block">Account</span>
          </NavLink>
        </nav>
      </div>
    </React.Fragment>
  );
};

export default NavBar;
