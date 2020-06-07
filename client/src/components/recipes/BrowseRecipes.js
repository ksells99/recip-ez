import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";

import Spinner from "../layout/Spinner";

import {
  searchRecipes,
  getRecipes,
  clearRecipes,
} from "../../actions/recipeActions";
import RecipeItem from "./RecipeItem";

const BrowseRecipes = ({
  getRecipes,
  searchRecipes,
  auth: { isAuthenticated },
  recipe: { recipes, loading },
}) => {
  const text = useRef("");

  const onChange = (e) => {
    // If text entered into search, call search function
    if (text.current.value !== null || text.current.value !== "") {
      searchRecipes(e.target.value);
    }

    // If blank/cleared, get random recipes
    if (text.current.value === "") {
      getRecipes();
    }
  };

  useEffect(() => {
    getRecipes();
    // eslint-disable-next-line
  }, []);

  // If loading, show spinner, else show recipes

  return loading || Object.keys(recipes).length === 0 || recipes === {} ? (
    <Spinner />
  ) : (
    <div className='container mb-4'>
      <h4>
        <div className='bg-success recipe-header text-center text-light mt-3 mb-3 '>
          Find Recipes
        </div>
      </h4>
      <div className='form input-group has-clear form-inline'>
        <input
          id='search'
          type='search'
          placeholder='Search recipes...'
          ref={text}
          onChange={onChange}
          className='form form-control mb-3 search-bar'
        />
        {/* CLEAR SEARCH BTN */}
        <div class='input-group-append'>
          <button
            class='btn btn-danger'
            type='button'
            onClick={(e) => {
              text.current.value = "";
              onChange(e);
            }}
          >
            <i class='fa fa-times'></i>
          </button>
        </div>
      </div>

      {/* Map through each returned recipe and pass into RecipeItem component */}
      <ul className='list-group'>
        {recipes.recipes.map((recipe) => (
          <li className='list-group mb-4 recipe-item'>
            <RecipeItem recipe={recipe} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  recipe: state.recipe,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getRecipes,
  searchRecipes,
  clearRecipes,
})(BrowseRecipes);
