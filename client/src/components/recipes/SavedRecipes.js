import React, { useEffect } from "react";
import { connect } from "react-redux";

import Spinner from "../layout/Spinner";

import {
  getUserRecipes,
  getSavedRecipeInfo,
} from "../../actions/recipeActions";
import RecipeItem from "./RecipeItem";

const SavedRecipes = ({
  getUserRecipes,
  getSavedRecipeInfo,

  auth: { isAuthenticated },
  recipe: { userRecipes, userRecipeInfo, loading },
}) => {
  // Initialise blank array for recipe IDs
  const userRecipeIdArray = [];

  useEffect(() => {
    getUserRecipes();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (userRecipes.length > 0 && loading === false) {
      // For each user recipe, add ID to array
      userRecipes.map((recipe) => userRecipeIdArray.push(recipe.spoonacularID));

      // Create string based on IDs from this array
      if (userRecipeIdArray.length > 0) {
        let spoonacularIds = userRecipeIdArray.join(",");

        // Get info on these recipes - pass in string on IDs
        getSavedRecipeInfo(spoonacularIds);
      }
    }

    // eslint-disable-next-line
  }, [userRecipes]);

  return loading ? (
    <Spinner />
  ) : (
    <div className='container mb-4'>
      <h4>
        <div className='bg-success recipe-header text-center text-light mt-3 mb-3 '>
          My Recipes
        </div>
      </h4>
      {/* If user has no recipes, show placeholder text */}
      {userRecipes.length === 0 ? <h2>No recipes to show</h2> : null}

      {/* Map through user recipe info and pass into RecipeItem component */}
      <ul className='list-group'>
        {userRecipeInfo.map((userRecipe) => (
          <li className='list-group mb-4 recipe-item'>
            <RecipeItem recipe={userRecipe} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  recipe: state.recipe,
  userRecipeInfo: state.userRecipeInfo,
  auth: state.auth,
});

export default connect(mapStateToProps, { getUserRecipes, getSavedRecipeInfo })(
  SavedRecipes
);
