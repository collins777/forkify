// Search Model
import axios from "axios";
import { apiKey, proxy } from "../config";

export default class Search {
  constructor(query) {
    this.query = query;
  }

  // Every async function returns a promise
  // so inside the function we await untill the promise resolves
  // Our first API call
  async getResults() {
    const apiKey = "376d23085e464bccab79bf4ba2fc3038";

    try {
      // axios works the same as fetch which will return a promise and store the result in the constant
      const res = await axios(
        `https://www.food2fork.com/api/search?key=${apiKey}&q=${this.query}`
      );
      this.result = res.data.recipes; // the result of the above promise.. returns array of recipes
      //console.log(this.result);
    } catch (error) {
      alert(error);
    }
  }
}
