const express = require("express");
const request = require("request");
const config = require("config");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Recipe = require("../../models/Recipe");

// @route GET api/recipes
// @desc GET user's saved recipes
// @access PRIVATE

router.get("/", auth, async (req, res) => {
  try {
    // Find saved recipes linked to user
    const recipes = await Recipe.find({
      user: req.user.id,
    });

    // Throw error if no saved recipes for the user
    if (recipes.length === 0) {
      return res
        .status(400)
        .json({ msg: "There are no saved recipes for this user" });
    }

    res.json(recipes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/recipes
// @desc Add a new saved recipe for user
// @access PRIVATE
router.post("/", auth, async (req, res) => {
  try {
    // Pull out fields from body - spoonacular ID and recipe name
    const { spoonacularID, recipeName } = req.body;

    // Get user from JWT
    const user = req.user.id;

    // Build new recipe
    const recipe = new Recipe({
      spoonacularID,
      recipeName,
      user,
    });

    // Save to DB
    await recipe.save();

    // Return the new recipe
    res.json(recipe);

    //
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error.");
  }
});

// @route DELETE api/recipes/:id
// @desc Remove recipe from user's saved list
// @access PRIVATE

router.delete("/:id", auth, async (req, res) => {
  try {
    // Find saved recipes for this user, containing the spoonacular ID (from URL)
    const userRecipes = await Recipe.findOne({
      user: req.user.id,
      spoonacularID: req.params.id,
    });

    // Throw error if recipe not found
    if (!userRecipes) {
      return res.status(404).json({ msg: "Saved recipe not found." });
    }

    // Check the user owns the saved recipe they are trying to delete - if it doesn't...
    if (userRecipes.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorised" });
    }

    // Remove saved recipe from DB
    await userRecipes.remove();

    res.json({ msg: "Recipe removed from user's saved list" });

    //
  } catch (err) {
    console.error(err.message);
    // If recipe ID entered is not a valid ID...
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "Recipe not found" });
    }
    res.status(500).send("Server Error.");
  }
});

module.exports = router;
