// RECIPE DATA MODEL
import axios from "axios";
import { apiKey, proxy } from "../config";

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  // Gets Recipe from API and sets properties of Recipe Class if promise is successful
  async getRecipe() {
    try {
      const res = await axios(
        `https://www.food2fork.com/api/get?key=${apiKey}&rId=${this.id}`
      );
      this.title = res.data.recipe.title;
      this.author = res.data.recipe.publisher;
      this.img = res.data.recipe.image_url;
      this.url = res.data.recipe.source_url;
      this.ingredients = res.data.recipe.ingredients;
    } catch (error) {
      console.log(error);
      alert("Something went wrong :(");
    }
  }

  // Time to Prepare Each Meal
  calcTime() {
    // Assume that we need 15 minut for each 3 ingredients
    const numIng = this.ingredients.length; // array of ingredients
    const periods = Math.ceil(numIng / 3);
    this.time = periods * 15;
  }

  // Servings Per Meal
  calcServings() {
    this.servings = 4;
  }
}
