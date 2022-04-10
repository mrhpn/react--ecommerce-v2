import React, { useState, useEffect } from 'react';
import { commerce } from '../lib/commerce';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/icons/logo.svg';
import shoppingCart from '../assets/icons/shopping-cart.svg';

const NavBar = ({ totalItems }) => {
  const [isCategoryDropdownVisible, setCategoryDropdownVisible] = useState(
    false
  );
  const [categoryDropdown, setCategoryDropDown] = useState(false);
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const a = await commerce.categories.list();
    console.log(a);
    setCategories(a.data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <React.Fragment>
      <div className="bg-dark text-white text-right pr-3 py-1 d-none d-md-block">
        <span className="mr-3">Phone: +959767682526, +959442264024</span>
        <a href="#" className="mr-2 link-blue">
          About Us
        </a>
        <a href="#" className="link-blue">
          Contact Us
        </a>
      </div>

      <nav className="navbar navbar-expand-lg sticky-top navbar-light bg-glass border-bottom shadow-sm">
        <div className="container-fluid">
          <img className="mr-2" width="40px" height="40px" src={logo} />
          <a
            className="navbar-brand text-danger font-lg font-weight-bold d-none d-sm-block"
            href="#">
            <h3>
              <b>အဝယ်တော်</b>
            </h3>
          </a>
          <form className="d-inline-flex d-sm-none input-group-sm">
            <input
              className="form-control font-weight-bold mr-1"
              type="search"
              placeholder="ဒီမှာရှာပါ..."
            />
            <button
              className="btn btn-danger align-top btn-sm font-weight-bold"
              type="submit">
              <ion-icon name="search-outline"></ion-icon>
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
                        <li
                          key={category.name}
                          className="list-group-item list-group-item-action">
                          {category.name}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
              <form className="form-inline ml-3 my-lg-0 input-group-sm">
                <input
                  className="form-control mr-sm-2 font-weight-bold"
                  type="search"
                  placeholder="ဒီမှာရှာပါ..."
                />
                <button
                  className="btn btn-danger my-sm-0 btn-sm font-weight-bold"
                  type="submit">
                  ရှာမယ်လေ
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
    </React.Fragment>
  );
};

export default NavBar;
