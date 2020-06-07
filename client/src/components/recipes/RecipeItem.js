import React from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { saveRecipe, removeSavedRecipe } from "../../actions/recipeActions";

const RecipeItem = ({
  recipe: { image, title, readyInMinutes, id },
  auth: { isAuthenticated },
  userRecipes,
  saveRecipe,
  removeSavedRecipe,
}) => {
  // Check if user's saved recipes includes the ID of this recipe - if so, show option to remove. If not, show option to add
  const recipeActions =
    userRecipes &&
    userRecipes.filter((recipe) => recipe.spoonacularID === `${id}`).length >
      0 ? (
      <button
        className='btn btn-danger mt-2 mb-4 remove-button'
        onClick={(e) => removeSavedRecipe({ id })}
      >
        <i class='fas fa-times-circle'></i> REMOVE
      </button>
    ) : (
      <button
        className='btn btn-success mt-2 mb-4 save-button'
        onClick={(e) => saveRecipe({ id, title })}
      >
        <i class='fas fa-plus-circle'></i> SAVE RECIPE
      </button>
    );

  return (
    <div>
      <div className='row'>
        <div className='col-lg'>
          <h4>
            <div className='bg-dark recipe-header text-light '>{title}</div>
          </h4>
          <h5>
            Ready in <div className='badge badge-success'>{readyInMinutes}</div>{" "}
            minutes
          </h5>
          <Link to={`/recipe/${id}`} className='btn btn-info view-button mt-4'>
            <i class='fas fa-info-circle'></i> VIEW RECIPE
          </Link>

          {/* If user is logged in, show buttons to save/remove */}

          {/* Check if user's saved recipes includes the ID of this recipe - if so, show option to remove. If not, show option to add */}

          {isAuthenticated ? (
            recipeActions
          ) : (
            <button
              className='btn btn-outline-success disabled mt-2 mb-4 save-button'
              disabled
            >
              <i class='fas fa-user'></i> Login to save this recipe
            </button>
          )}
        </div>
        <div className='col-lg-5'>
          {/* If no image from Spoonacular, show placeholder text */}
          {image ? (
            <img src={image} className='browse-recipe-image' alt='Recipe' />
          ) : (
            <p>No photo available</p>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  userRecipes: state.recipe.userRecipes,
});

export default connect(mapStateToProps, { saveRecipe, removeSavedRecipe })(
  RecipeItem
);
