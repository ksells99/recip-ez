import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/authActions";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <div className='nav nav-pills'>
      <Link to='/find' className='nav-link font-weight-bold text-light'>
        <i class='fas fa-hamburger mr-2'></i>Browse Recipes
      </Link>
      <Link to='/saved' className='nav-link font-weight-bold text-light'>
        <i class='fas fa-cloud-download-alt mr-2'></i>My Recipes
      </Link>
      <a
        onClick={logout}
        className='nav-link font-weight-bold text-light'
        href='/'
      >
        <i class='fas fa-sign-out-alt mr-2'></i>
        Logout
      </a>
    </div>
  );

  const guestLinks = (
    <div className='nav nav-pills'>
      <Link to='/find' className='nav-link font-weight-bold text-light'>
        <i class='fas fa-hamburger mr-2'></i>Browse Recipes
      </Link>
      <Link to='/login' className='nav-link font-weight-bold text-light'>
        <i class='fas fa-sign-in-alt mr-2'></i>
        Login
      </Link>

      <Link
        to='/register'
        className='nav-link font-weight-bold bg-light text-dark ml-3'
      >
        <i class='fas fa-user-plus mr-2'></i>
        Sign Up
      </Link>
    </div>
  );

  return (
    <nav className='navbar navbar-light bg-success'>
      <Link to='/' className='navbar-brand text-light text-header'>
        <div>
          <h2 className='site-name font-weight-bold'>
            <div className='full-width'>
              <i className='fas fa-utensils ml-4 mr-4 header-icon'></i>
              recip-ez
            </div>
          </h2>
        </div>
      </Link>

      <div className='nav nav-pills'>
        {!loading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
