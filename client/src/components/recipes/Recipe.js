import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getSpecificRecipe,
  saveRecipe,
  removeSavedRecipe,
  getUserRecipes,
} from "../../actions/recipeActions";

import Spinner from "../layout/Spinner";
import TescoLogo from "./Tesco.png";
import MorrisonsLogo from "./Morrisons.png";
import AsdaLogo from "./Asda2.png";

const Recipe = ({
  recipe: {
    image,
    title,
    readyInMinutes,
    extendedIngredients,
    id,
    servings,
    analyzedInstructions,
    glutenFree,
    vegetarian,
    vegan,
  },
  loading,
  match,
  auth: { isAuthenticated },
  getSpecificRecipe,
  userRecipes,
  saveRecipe,
  removeSavedRecipe,
  getUserRecipes,
}) => {
  useEffect(() => {
    getUserRecipes();
    getSpecificRecipe(match.params.id);
    // eslint-disable-next-line
  }, []);

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
        onClick={(e) => saveRecipe({ id, title }, getUserRecipes())}
      >
        <i class='fas fa-plus-circle'></i> SAVE RECIPE
      </button>
    );

  return loading ? (
    <Spinner />
  ) : (
    <div>
      <div className='container mb-4 mt-3'>
        <div className='row'>
          <div className='col-lg mb-4'>
            <h4>
              <div className='bg-dark recipe-header text-light '>{title}</div>
            </h4>
            <h5 className='font-weight-light'>
              Ready in{" "}
              <div className='badge badge-success font-weight-bold mt-2'>
                {readyInMinutes}
              </div>{" "}
              minutes
            </h5>
            <h5 className='font-weight-light'>
              Serves <div className='badge badge-info mt-2'>{servings}</div>
            </h5>

            {/* If logged in, show recipe options, else show prompt to login in order to save */}
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
            <div className='card'>
              <h4 className='card-header'>Ingredients</h4>

              <table className='table mb-0'>
                <tbody>
                  {/* Map through ingredients, add table rows with amounts, shopping links etc. */}
                  {extendedIngredients &&
                    extendedIngredients.map((ingredient) => (
                      <tr>
                        <td>{ingredient.name.toUpperCase()}</td>
                        <td>
                          {ingredient.amount} {ingredient.unit}
                        </td>
                        <td>
                          {/* Tesco hyperlink - searches online shopping for ingredient */}
                          <a
                            href={`https://www.tesco.com/groceries/en-GB/search?query=${ingredient.name}`}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <img
                              src={TescoLogo}
                              style={{
                                height: "30px",
                                margin: "auto",
                                display: "block",
                              }}
                              alt='Tesco'
                            ></img>
                          </a>
                        </td>
                        <td>
                          {/* Morrisons hyperlink - searches online shopping for ingredient */}
                          <a
                            href={`https://groceries.morrisons.com/search?entry=${ingredient.name}`}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <img
                              src={MorrisonsLogo}
                              style={{
                                height: "30px",
                                display: "block",
                                margin: "auto",
                              }}
                              alt='Morrisons'
                            ></img>
                          </a>
                        </td>
                        <td>
                          {/* Asda hyperlink - searches online shopping for ingredient */}
                          <a
                            href={`https://groceries.asda.com/search/${ingredient.name}`}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <img
                              src={AsdaLogo}
                              style={{
                                height: "30px",
                                display: "block",
                                margin: "auto",
                              }}
                              alt='Asda'
                            ></img>
                          </a>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className='col-lg-5'>
            <img src={image} className='browse-recipe-image' alt='Recipe' />
            <div className='card mt-4'>
              <h4 className='card-header text-center'>Dietary</h4>
              <table className='table mb-0'>
                <tr>
                  <th>
                    <p>Vegan?</p>
                  </th>
                  <th>
                    {/* If vegan = true, show tick, else show cross */}
                    {vegan ? (
                      <p className='text-center'>
                        <i className='fas fa-check text-success diet-info'></i>
                      </p>
                    ) : (
                      <p className='text-center'>
                        <i className='fas fa-times text-danger diet-info'></i>
                      </p>
                    )}
                  </th>
                </tr>
                <tr>
                  <th>
                    <p>Vegetarian?</p>
                  </th>
                  <th>
                    {vegetarian ? (
                      <p className='text-center'>
                        <i className='fas fa-check text-success diet-info'></i>
                      </p>
                    ) : (
                      <p className='text-center'>
                        <i className='fas fa-times text-danger diet-info'></i>
                      </p>
                    )}
                  </th>
                </tr>
                <tr>
                  <th>
                    <p>Gluten Free?</p>
                  </th>
                  <th>
                    {glutenFree ? (
                      <p className='text-center'>
                        <i className='fas fa-check text-success diet-info'></i>
                      </p>
                    ) : (
                      <p className='text-center'>
                        <i className='fas fa-times text-danger diet-info'></i>
                      </p>
                    )}
                  </th>
                </tr>
              </table>
            </div>
          </div>
        </div>
        {/* Display instructions - map through each instruction, then map through steps and output them */}
        <div className='card instruction-card mt-4'>
          <h4 className='card-header'>Instructions</h4>
          {analyzedInstructions &&
            analyzedInstructions.map((instruction) => (
              <p>
                <ol>
                  {instruction.steps.map((step) => (
                    <li className='mt-2'>{step.step}</li>
                  ))}
                </ol>
              </p>
            ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  recipe: state.recipe.recipe,
  loading: state.recipe.loading,
  userRecipes: state.recipe.userRecipes,
});

export default connect(mapStateToProps, {
  getSpecificRecipe,
  saveRecipe,
  removeSavedRecipe,
  getUserRecipes,
})(Recipe);
