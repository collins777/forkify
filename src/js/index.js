// Global App Controller
import Search from "./models/Search";
import Recipe from "./models/Recipe";
import * as searchView from "./views/searchView";
import { elements, renderLoader, clearLoader } from "./views/base";

// Search Object
// Current Recipe Object
// Shopping List Object
// Liked Recipes

const state = {};

////////////////////////////////////////////////////////////////////
//////////////  SEARCH CONTROLLER
////////////////////////////////////////////////////////////////////

const controlSearch = async () => {
  // Get query from view
  const query = searchView.getInput();

  if (query) {
    // New Search object and add it to the state
    state.search = new Search(query);

    // Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchResults);

    try {
      // Search for recipes
      await state.search.getResults();

      // Render Results on the UI
      clearLoader();
      searchView.renderResults(state.search.result);
    } catch (error) {
      alert("Error");
      console.log("Error in controlSearch() index.js");
      clearLoader();
    }
  }
};

elements.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener("click", e => {
  // using event delegation and the closest() method
  // .btn-inline and its children === btn
  const btn = e.target.closest(".btn-inline");

  if (btn) {
    // dataset is a string so convert into interger in base 10
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
});

////////////////////////////////////////////////////////////////////
//////////////  RECIPE CONTROLLER
////////////////////////////////////////////////////////////////////

const controlRecipe = async () => {
  // Get ID from url
  const id = window.location.hash.replace("#", ""); // replaces hash on window url with empty string
  console.log(id);

  if (id) {
    // Prepare UI for changes

    // Create new recipe object
    state.recipe = new Recipe(id);

    try {
      // Get recipe data
      await state.recipe.getRecipe();

      // Calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();

      // Render recipe to UI
      console.log(state.recipe);
    } catch (error) {
      alert("Error");
      console.log("Error in controlRecipe() index.js");
    }
  }
};

// window.addEventListener("hashchange", controlRecipe);
// window.addEventListener("load", controlRecipe);

// Adding event listener to multiple events
["hashchange", "load"].forEach(event =>
  window.addEventListener(event, controlRecipe)
);
