import {
  GET_RECIPES,
  GET_SPECIFIC_RECIPE,
  GET_USER_RECIPES,
  GET_BULK_RECIPE_INFO,
  RECIPES_ERROR,
  SAVE_RECIPE,
  REMOVE_SAVED_RECIPE,
  SET_LOADING,
  SEARCH_RECIPES,
  CLEAR_RECIPES,
} from "./types";

import { setAlert } from "./alertActions";

import axios from "axios";

// GET RANDOM RECIPES FROM SPOONACULAR
export const getRecipes = () => async (dispatch) => {
  try {
    // Set loading to true
    dispatch(setLoading());

    console.log(process.env.REACT_APP_SPOONACULAR_API_KEY);

    const res = await axios.get(
      `https://cors-anywhere.herokuapp.com/https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&number=3`
    );

    dispatch({ type: GET_RECIPES, payload: res.data });

    //
  } catch (err) {
    dispatch({ type: RECIPES_ERROR, payload: err.message });
  }
};

// SEARCH RECIPES FROM SPOONACULAR
export const searchRecipes = (text) => async (dispatch) => {
  try {
    const res = await axios.get(
      `https://cors-anywhere.herokuapp.com/https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&query=${text}&addRecipeInformation=true&number=2`
    );

    const recipeArray = new Object({ recipes: res.data.results });

    dispatch({ type: SEARCH_RECIPES, payload: recipeArray });

    //
  } catch (err) {
    dispatch({ type: RECIPES_ERROR, payload: err.message });
  }
};

// GET USER'S SAVED RECIPES

export const getUserRecipes = () => async (dispatch) => {
  try {
    // Set loading to true
    dispatch(setLoading());

    const res = await axios.get("/api/recipes");

    dispatch({ type: GET_USER_RECIPES, payload: res.data });

    //
  } catch (err) {
    // dispatch({ type: RECIPES_ERROR, payload: err.message });
  }
};

// GET SPECIFIC RECIPE INFO
export const getSpecificRecipe = (id) => async (dispatch) => {
  try {
    // Set loading to true
    dispatch(setLoading());

    const res = await axios.get(
      `https://cors-anywhere.herokuapp.com/https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
    );

    dispatch({ type: GET_SPECIFIC_RECIPE, payload: res.data });

    //
  } catch (err) {
    // dispatch({ type: RECIPES_ERROR, payload: err.message });
  }
};

// GET BULK RECIPE INFO
export const getSavedRecipeInfo = (spoonacularIds) => async (dispatch) => {
  try {
    // Set loading to true
    dispatch(setLoading());

    const res = await axios.get(
      `https://cors-anywhere.herokuapp.com/https://api.spoonacular.com/recipes/informationBulk?ids=${spoonacularIds}&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
    );
    console.log(res.data);

    dispatch({ type: GET_BULK_RECIPE_INFO, payload: res.data });

    //
  } catch (err) {
    // dispatch({ type: RECIPES_ERROR, payload: err.message });
  }
};

// Save a recipe
export const saveRecipe = (recipe) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    console.log(recipe);

    const spoonacularID = recipe.id;
    const recipeName = recipe.title;

    const res = await axios.post(
      "/api/recipes",
      { spoonacularID, recipeName },
      config
    );

    dispatch({
      type: SAVE_RECIPE,
      payload: res.data,
    });

    dispatch(setAlert("Recipe saved", "success"));

    //
  } catch (err) {
    dispatch({
      type: RECIPES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Remove recipe from user's saved list
export const removeSavedRecipe = (recipe) => async (dispatch) => {
  try {
    const spoonacularID = recipe.id;

    await axios.delete(`/api/recipes/${spoonacularID}`);

    dispatch({ type: REMOVE_SAVED_RECIPE, payload: recipe.id });

    dispatch(setAlert("Recipe removed from your saved list", "success"));
  } catch (err) {
    dispatch({ type: RECIPES_ERROR, payload: err.response.status });
  }
};

// SET LOADING TO TRUE
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};

// CLEAR RECIPES
export const clearRecipes = () => {
  return {
    type: CLEAR_RECIPES,
  };
};
