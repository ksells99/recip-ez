import {
  GET_RECIPES,
  GET_SPECIFIC_RECIPE,
  GET_BULK_RECIPE_INFO,
  GET_USER_RECIPES,
  RECIPES_ERROR,
  SET_LOADING,
  SAVE_RECIPE,
  REMOVE_SAVED_RECIPE,
  SEARCH_RECIPES,
  CLEAR_RECIPES,
} from "../actions/types";

const initialState = {
  recipes: [],
  recipe: {},
  userRecipes: [],
  userRecipeInfo: [],
  loading: false,
  error: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES:
    case SEARCH_RECIPES:
      return {
        ...state,
        recipes: action.payload, // fill recipes state with payload data
        loading: false,
        recipe: {},
      };
    case GET_BULK_RECIPE_INFO:
      return {
        ...state,
        userRecipeInfo: action.payload,
        loading: false,
      };
    case GET_SPECIFIC_RECIPE:
      return {
        ...state,
        recipe: action.payload,
        loading: false,
      };
    case GET_USER_RECIPES:
      return {
        ...state,
        userRecipes: action.payload,
        loading: false,
      };
    case SAVE_RECIPE:
      return {
        ...state,
        userRecipes: [action.payload, ...state.userRecipes],
        loading: false,
      };
    case REMOVE_SAVED_RECIPE:
      return {
        ...state,
        userRecipeInfo: state.userRecipeInfo.filter(
          (recipeInfo) => recipeInfo.id !== action.payload
        ),

        userRecipes: state.userRecipes.filter(
          (userRecipe) => userRecipe.spoonacularID !== action.payload.toString()
        ), // only return recipes not matching removed one
        loading: false,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CLEAR_RECIPES: // runs on logout
      return {
        ...state,
        recipes: [],
        recipe: {},
        userRecipes: [],
        userRecipeInfo: [],
        loading: false,
        error: {},
      };
    case RECIPES_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};
