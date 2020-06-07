import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import showcase1 from "./showcase-1.png";
import showcaseMed1 from "./showcase-med-1.png";
import showcaseMobile1 from "./showcase-mobile-1.png";

import showcase2 from "./showcase-2.png";
import showcaseMed2 from "./showcase-med-2.png";
import showcaseMobile2 from "./showcase-mobile-2.png";

import showcase3 from "./showcase-3.png";
import showcaseMed3 from "./showcase-med-3.png";
import showcaseMobile3 from "./showcase-mobile-3.png";

const Landing = ({ isAuthenticated }) => {
  // If user is logged in, don't show landing page - redirect to recipes page instead
  if (isAuthenticated) {
    return <Redirect to='/find' />;
  }

  return (
    <section className='landing text-center'>
      <h1 className='text-center'>
        <span className='badge badge-success pt-3 pb-3 pl-5 pr-5 mt-4'>
          <i className='fas fa-utensils mr-4 header-icon'></i>
          recip-ez
        </span>
      </h1>

      {/* SHOW SCREENSHOTS DEPENDING ON SCREEN SIZE */}
      <p className='lead mt-5'>
        Find tasty recipes and save them to your own collection*
      </p>
      <picture className='showcase'>
        <source media='(min-width: 992px)' srcset={showcase1} />
        <source media='(min-width: 700px)' srcset={showcaseMed1} />
        <source media='(min-width: 100px)' srcset={showcaseMobile1} />
        <img src={showcase1} className='showcase' alt='Showcase' />
      </picture>

      <p className='lead mt-5'>
        View comprehensive recipe information and easily find ingredients from 3
        UK supermarkets.
      </p>
      <picture className='showcase'>
        <source media='(min-width: 992px)' srcset={showcase2} />
        <source media='(min-width: 700px)' srcset={showcaseMed2} />
        <source media='(min-width: 100px)' srcset={showcaseMobile2} />
        <img src={showcase2} className='showcase' alt='Showcase' />
      </picture>

      <p className='lead mt-5'>Manage your own collection of saved recipes*</p>
      <picture className='showcase'>
        <source media='(min-width: 992px)' srcset={showcase3} />
        <source media='(min-width: 700px)' srcset={showcaseMed3} />
        <source media='(min-width: 100px)' srcset={showcaseMobile3} />
        <img src={showcase3} className='showcase' alt='Showcase' />
      </picture>

      <p className='lead mt-5'>
        Like what you see? Start{" "}
        <Link to='/find' className='badge badge-success'>
          browsing recipes
        </Link>{" "}
        now or{" "}
        <Link to='/register' className='badge badge-info'>
          create a free account
        </Link>{" "}
        to save your tasty finds for a later date.
      </p>

      <p className='font-weight-lighter font-italic mt-5'>
        *saving recipes requires a free recipe-ez account.
      </p>

      <a href='https://github.com/ksells99/recip-ez'>
        <p className='btn btn-dark mt-5 mb-4'>
          <i className='fab fa-github'></i> View Github Repository
        </p>
      </a>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
